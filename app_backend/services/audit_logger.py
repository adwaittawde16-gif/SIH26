"""
app_backend/services/audit_logger.py
-------------------------------------
SHA-256 Tamper-Evident Audit Logging Engine.
Records every search and access event across CDR, CCTV, Dossiers, and Threat modules.
Uses cryptographic hash chaining (prev_hash -> current_hash) stored in a dedicated SQLite database.
For: Brihanmumbai Police Department — SIH 26
"""

import sqlite3
import hashlib
import os
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

AUDIT_DB_PATH = os.getenv("AUDIT_DB_PATH", "audit_log.db")

class AuditLogger:
    def __init__(self, db_path: str = AUDIT_DB_PATH):
        self.db_path = db_path
        db_dir = os.path.dirname(db_path)
        if db_dir:
            os.makedirs(db_dir, exist_ok=True)

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        """Creates the audit_logs table if it does not exist."""
        with self._get_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    endpoint TEXT NOT NULL,
                    method TEXT NOT NULL,
                    request_params TEXT NOT NULL,
                    source_ip TEXT NOT NULL,
                    prev_hash TEXT NOT NULL,
                    hash TEXT NOT NULL
                )
            """)
            conn.commit()

    def get_last_hash(self) -> str:
        """Retrieves the hash of the most recent audit log entry, or genesis hash if empty."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT hash FROM audit_logs ORDER BY id DESC LIMIT 1")
            row = cursor.fetchone()
            if row and row["hash"]:
                return row["hash"]
            # Genesis hash for the initial entry (64 zeroes)
            return "0" * 64

    def log_event(
        self,
        endpoint: str,
        method: str,
        request_params: str,
        source_ip: str
    ) -> Dict[str, Any]:
        """
        Records an audit log entry with SHA-256 hash chaining.
        Formula: hash = SHA256(timestamp | method | endpoint | request_params | source_ip | prev_hash)
        """
        timestamp = datetime.now(timezone.utc).isoformat()
        prev_hash = self.get_last_hash()

        # Construct canonical string for deterministic SHA-256 calculation
        canonical_str = f"{timestamp}|{method}|{endpoint}|{request_params}|{source_ip}|{prev_hash}"
        entry_hash = hashlib.sha256(canonical_str.encode("utf-8")).hexdigest()

        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO audit_logs (timestamp, endpoint, method, request_params, source_ip, prev_hash, hash)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (timestamp, endpoint, method, request_params, source_ip, prev_hash, entry_hash)
            )
            conn.commit()
            log_id = cursor.lastrowid

        return {
            "id": log_id,
            "timestamp": timestamp,
            "endpoint": endpoint,
            "method": method,
            "request_params": request_params,
            "source_ip": source_ip,
            "prev_hash": prev_hash,
            "hash": entry_hash
        }

    def verify_audit_chain(self) -> Dict[str, Any]:
        """
        Walks the entire audit log chain sequentially from ID 1 to verify:
        1. Each entry's prev_hash matches the previous entry's hash.
        2. Re-computed SHA-256 matches the stored entry hash.
        Returns verification status report.
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM audit_logs ORDER BY id ASC")
            rows = cursor.fetchall()

        if not rows:
            return {
                "is_valid": True,
                "total_records": 0,
                "latest_hash": "0" * 64,
                "message": "Audit trail is empty. Cryptographic chain intact."
            }

        expected_prev_hash = "0" * 64
        for row in rows:
            record_id = row["id"]
            stored_prev_hash = row["prev_hash"]
            stored_hash = row["hash"]

            # 1. Verify hash link continuity
            if stored_prev_hash != expected_prev_hash:
                return {
                    "is_valid": False,
                    "tampered_id": record_id,
                    "reason": f"Hash chain broken at entry #{record_id}. Expected prev_hash: {expected_prev_hash}, Found: {stored_prev_hash}",
                    "verified_records_before_breach": record_id - 1
                }

            # 2. Re-compute payload hash
            canonical_str = f"{row['timestamp']}|{row['method']}|{row['endpoint']}|{row['request_params']}|{row['source_ip']}|{stored_prev_hash}"
            recomputed_hash = hashlib.sha256(canonical_str.encode("utf-8")).hexdigest()

            if stored_hash != recomputed_hash:
                return {
                    "is_valid": False,
                    "tampered_id": record_id,
                    "reason": f"Payload content modified at entry #{record_id}. Stored hash: {stored_hash}, Re-calculated: {recomputed_hash}",
                    "verified_records_before_breach": record_id - 1
                }

            expected_prev_hash = stored_hash

        return {
            "is_valid": True,
            "total_records": len(rows),
            "latest_hash": expected_prev_hash,
            "message": f"Audit trail integrity verified across all {len(rows)} log entries. Zero tampered records."
        }

    def get_recent_logs(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Retrieves recent audit log entries."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM audit_logs ORDER BY id DESC LIMIT ?", (limit,))
            rows = cursor.fetchall()
            return [dict(r) for r in rows]

# Singleton instance
audit_logger = AuditLogger()
