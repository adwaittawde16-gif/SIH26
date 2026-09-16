"""
app_backend/ingestion/FinancialTransactionIngestor.py
-----------------------------------------------------
Financial Transaction Connector for ingesting financial transaction data.
Handles extraction, transformation, and loading of financial transaction records.
"""

import json
import csv
import re
from typing import Dict, Any, List, Optional
from datetime import datetime
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class FinancialTransactionIngestor(BaseIngestor):
    """
    Connector for ingesting financial transaction data from various sources.
    Supports CSV, JSON, database, and API sources for bank transactions,
    wallet transactions, and other financial movements.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Financial Transaction ingestor.

        Args:
            config: Configuration containing:
                - source_type: 'csv', 'json', 'database', 'api', or 'stream'
                - file_path: Path to source file (for file-based sources)
                - api_endpoint: API endpoint (for API sources)
                - database_connection: DB connection string (for database sources)
                - transaction_types: List of transaction types to process
                - amount_threshold: Minimum transaction amount to process
                - batch_size: Number of records to process per batch
                - polling_interval: How often to check for new data (seconds)
        """
        super().__init__(DataSourceType.FINANCIAL_TRANSACTION, config)
        self.source_config = config.get('source', {})
        self.transaction_types = config.get('transaction_types', [
            'NEFT', 'RTGS', 'IMPS', 'UPI', 'CARD', 'Wallet', 'Cash', 'Cheque', 'DD'
        ])
        self.amount_threshold = config.get('amount_threshold', 1.0)  # Minimum ₹1
        self.batch_size = config.get('batch_size', 1000)
        self.polling_interval = config.get('polling_interval', 60)  # 1 minute
        self.last_processed_timestamp = None

    def connect(self) -> bool:
        """
        Establish connection to financial transaction data source.

        Returns:
            bool: True if connection successful
        """
        try:
            source_type = self.source_config.get('type', 'file')

            if source_type == 'csv':
                # Validate CSV file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"Financial transaction CSV file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to financial transaction CSV source: {file_path}")

            elif source_type == 'json':
                # Validate JSON file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"Financial transaction JSON file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to financial transaction JSON source: {file_path}")

            elif source_type == 'api':
                # Validate API endpoint
                api_endpoint = self.source_config.get('api_endpoint')
                if not api_endpoint:
                    self.logger.error("Financial transaction API endpoint not configured")
                    return False
                self.logger.info(f"Connected to financial transaction API source: {api_endpoint}")

            elif source_type == 'database':
                # Validate database connection
                db_connection = self.source_config.get('database_connection')
                if not db_connection:
                    self.logger.error("Financial transaction database connection not configured")
                    return False
                self.logger.info("Connected to financial transaction database source")

            elif source_type == 'stream':
                # Validate streaming connection (Kafka, etc.)
                stream_config = self.source_config.get('stream_config', {})
                if not stream_config:
                    self.logger.error("Financial transaction stream configuration not provided")
                    return False
                self.logger.info("Connected to financial transaction stream source")

            else:
                self.logger.error(f"Unsupported financial transaction source type: {source_type}")
                return False

            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to financial transaction source: {str(e)}")
            return False

    def disconnect(self) -> bool:
        """
        Close connection to financial transaction data source.

        Returns:
            bool: True if disconnection successful
        """
        # For file-based sources, no explicit disconnect needed
        # For database/API/stream sources, cleanup connections here
        self.logger.info("Disconnected from financial transaction source")
        return True

    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract financial transaction data from the source.

        Returns:
            List of raw financial transaction records
        """
        try:
            source_type = self.source_config.get('type', 'file')

            if source_type == 'csv':
                return self._extract_from_csv()
            elif source_type == 'json':
                return self._extract_from_json()
            elif source_type == 'api':
                return self._extract_from_api()
            elif source_type == 'database':
                return self._extract_from_database()
            elif source_type == 'stream':
                return self._extract_from_stream()
            else:
                self.logger.error(f"Unsupported financial transaction source type for extraction: {source_type}")
                return []

        except Exception as e:
            self.logger.error(f"Failed to extract financial transaction data: {str(e)}")
            return []

    def _extract_from_csv(self) -> List[Dict[str, Any]]:
        """Extract financial transaction data from CSV file."""
        file_path = self.source_config.get('file_path')
        records = []

        try:
            with open(file_path, 'r', encoding='utf-8') as csvfile:
                # Detect delimiter
                sample = csvfile.read(1024)
                csvfile.seek(0)
                sniffer = csv.Sniffer()
                delimiter = sniffer.sniff(sample).delimiter

                reader = csv.DictReader(csvfile, delimiter=delimiter)
                for row in reader:
                    # Convert empty strings to None
                    cleaned_row = {k: (v if v.strip() != '' else None) for k, v in row.items()}
                    records.append(cleaned_row)

            self.logger.info(f"Extracted {len(records)} financial transaction records from CSV")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract financial transaction data from CSV: {str(e)}")
            return []

    def _extract_from_json(self) -> List[Dict[str, Any]]:
        """Extract financial transaction data from JSON file."""
        file_path = self.source_config.get('file_path')

        try:
            with open(file_path, 'r', encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)

            # Handle different JSON structures
            if isinstance(data, list):
                records = data
            elif isinstance(data, dict):
                # Look for common keys containing the array of records
                for key in ['transactions', 'records', 'data', 'financial_transactions']:
                    if key in data and isinstance(data[key], list):
                        records = data[key]
                        break
                else:
                    # Assume the dict itself is a single record
                    records = [data]
            else:
                records = []

            self.logger.info(f"Extracted {len(records)} financial transaction records from JSON")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract financial transaction data from JSON: {str(e)}")
            return []

    def _extract_from_api(self) -> List[Dict[str, Any]]:
        """Extract financial transaction data from API endpoint."""
        # This would typically make an HTTP request to the API
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Financial transaction API extraction not yet implemented - returning empty list")
        return []

    def _extract_from_database(self) -> List[Dict[str, Any]]:
        """Extract financial transaction data from database."""
        # This would typically execute a SQL query
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Financial transaction database extraction not yet implemented - returning empty list")
        return []

    def _extract_from_stream(self) -> List[Dict[str, Any]]:
        """Extract financial transaction data from stream (Kafka, etc.)."""
        # This would typically consume from a message stream
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Financial transaction stream extraction not yet implemented - returning empty list")
        return []

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw financial transaction data into standardized format.

        Args:
            raw_data: List of raw financial transaction records from extract()

        Returns:
            List of transformed financial transaction records in standardized format
        """
        transformed_records = []

        for raw_record in raw_data:
            try:
                transformed_record = self._transform_financial_transaction_record(raw_record)
                if transformed_record:
                    # Filter by amount threshold
                    amount = abs(transformed_record.get('amount', 0))
                    if amount >= self.amount_threshold:
                        transformed_records.append(transformed_record)
                    else:
                        self.logger.debug(f"Skipping transaction below threshold: ₹{amount}")
            except Exception as e:
                self.logger.warning(f"Failed to transform financial transaction record: {str(e)}")
                continue

        self.logger.info(f"Transformed {len(transformed_records)} financial transaction records")
        return transformed_records

    def _transform_financial_transaction_record(self, raw_record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Transform a single financial transaction record into standardized format.

        Args:
            raw_record: Raw financial transaction record dictionary

        Returns:
            Transformed financial transaction record dictionary or None if invalid
        """
        try:
            # Standardized financial transaction record format
            transformed = {
                # Transaction identification
                'transaction_id': self._extract_transaction_id(raw_record),
                'transaction_reference': self._extract_transaction_reference(raw_record),
                'transaction_date': self._extract_transaction_date(raw_record),
                'transaction_time': self._extract_transaction_time(raw_record),

                # Transaction details
                'transaction_type': self._extract_transaction_type(raw_record),
                'transaction_channel': self._extract_transaction_channel(raw_record),
                'transaction_mode': self._extract_transaction_mode(raw_record),
                'amount': self._extract_amount(raw_record),
                'currency': self._extract_currency(raw_record),
                'transaction_status': self._extract_transaction_status(raw_record),

                # Parties involved
                'sender_account': self._extract_sender_account(raw_record),
                'sender_name': self._extract_sender_name(raw_record),
                'sender_ifsc': self._extract_sender_ifsc(raw_record),
                'sender_bank': self._extract_sender_bank(raw_record),
                'receiver_account': self._extract_receiver_account(raw_record),
                'receiver_name': self._extract_receiver_name(raw_record),
                'receiver_ifsc': self._extract_receiver_ifsc(raw_record),
                'receiver_bank': self._extract_receiver_bank(raw_record),

                # Transaction metadata
                'remarks': self._extract_remarks(raw_record),
                'branch_code': self._extract_branch_code(raw_record),
                'city': self._extract_city(raw_record),
                'state': self._extract_state(raw_record),

                # Instrument details (for cheques, DD, etc.)
                'instrument_number': self._extract_instrument_number(raw_record),
                'instrument_date': self._extract_instrument_date(raw_record),
                'instrument_type': self._extract_instrument_type(raw_record),

                # Metadata
                'source_record_id': raw_record.get('id') or raw_record.get('transaction_id') or raw_record.get('ref_no'),
                'source_system': 'Financial_Transaction',
                'ingestion_timestamp': datetime.utcnow().isoformat(),
                'raw_data': raw_record  # Keep original for reference
            }

            # Validate required fields
            if not transformed['transaction_id']:
                self.logger.warning("Financial transaction record missing transaction_id, skipping")
                return None

            if transformed['amount'] is None:
                self.logger.warning("Financial transaction record missing amount, skipping")
                return None

            return transformed

        except Exception as e:
            self.logger.warning(f"Error transforming financial transaction record: {str(e)}")
            return None

    def _extract_transaction_id(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction ID from record."""
        # Try various common field names
        for field in ['transaction_id', 'TRANSACTION_ID', 'txn_id', 'TXN_ID', 'ref_no', 'REF_NO',
                     'transaction_reference', 'TRANSACTION_REFERENCE', 'utr', 'UTR']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_transaction_reference(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction reference from record."""
        for field in ['transaction_reference', 'TRANSACTION_REFERENCE', 'ref_no', 'REF_NO',
                     'reference_number', 'REFERENCE_NUMBER']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_transaction_date(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction date from record."""
        for field in ['transaction_date', 'TRANSACTION_DATE', 'txn_date', 'TXN_DATE', 'date', 'DATE']:
            if field in record and record[field]:
                return self._normalize_date(str(record[field]))
        return None

    def _extract_transaction_time(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction time from record."""
        for field in ['transaction_time', 'TRANSACTION_TIME', 'txn_time', 'TXN_TIME', 'time', 'TIME']:
            if field in record and record[field]:
                return self._normalize_time(str(record[field]))
        return None

    def _extract_transaction_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction type from record."""
        for field in ['transaction_type', 'TRANSACTION_TYPE', 'txn_type', 'TXN_TYPE', 'type', 'TYPE']:
            if field in record and record[field]:
                txn_type = str(record[field]).strip().upper()
                # Normalize transaction type
                return self._normalize_transaction_type(txn_type)
        return None

    def _extract_transaction_channel(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction channel from record."""
        for field in ['transaction_channel', 'TRANSACTION_CHANNEL', 'channel', 'CHANNEL',
                     'medium', 'MEDIUM', 'source', 'SOURCE']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_transaction_mode(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction mode from record."""
        for field in ['transaction_mode', 'TRANSACTION_MODE', 'mode', 'MODE']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_amount(self, record: Dict[str, Any]) -> Optional[float]:
        """Extract transaction amount from record."""
        for field in ['amount', 'AMOUNT', 'txn_amount', 'TXN_AMOUNT', 'value', 'VALUE',
                     'trans_amount', 'TRANS_AMOUNT']:
            if field in record and record[field] is not None:
                try:
                    # Remove currency symbols and commas
                    amount_str = str(record[field]).replace(',', '').replace('₹', '').replace('$', '')
                    return float(amount_str)
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_currency(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract currency from record."""
        for field in ['currency', 'CURRENCY', 'cur', 'CUR']:
            if field in record and record[field]:
                currency = str(record[field]).strip().upper()
                if currency in ['INR', 'USD', 'EUR', 'GBP', 'JPY']:
                    return currency
        return 'INR'  # Default to INR

    def _extract_transaction_status(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract transaction status from record."""
        for field in ['transaction_status', 'TRANSACTION_STATUS', 'status', 'STATUS',
                     'txn_status', 'TXN_STATUS']:
            if field in record and record[field]:
                status = str(record[field]).strip().upper()
                # Normalize status
                if status in ['SUCCESS', 'SUCCESSFUL', 'COMPLETED', 'DONE']:
                    return 'SUCCESS'
                elif status in ['FAILED', 'FAILURE', 'DECLINED', 'REJECTED']:
                    return 'FAILED'
                elif status in ['PENDING', 'PROCESSING']:
                    return 'PENDING'
                else:
                    return status
        return None

    def _extract_sender_account(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract sender account from record."""
        for field in ['sender_account', 'SENDER_ACCOUNT', 'from_account', 'FROM_ACCOUNT',
                     'debit_account', 'DEBIT_ACCOUNT', 'acc_no', 'ACC_NO']:
            if field in record and record[field]:
                return self._normalize_account_number(str(record[field]))
        return None

    def _extract_sender_name(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract sender name from record."""
        for field in ['sender_name', 'SENDER_NAME', 'from_name', 'FROM_NAME',
                     'sender', 'SENDER', 'debtor', 'DEBTOR']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_sender_ifsc(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract sender IFSC from record."""
        for field in ['sender_ifsc', 'SENDER_IFSC', 'from_ifsc', 'FROM_IFSC',
                     'debit_ifsc', 'DEBIT_IFSC', 'ifsc', 'IFSC']:
            if field in record and record[field]:
                ifsc = str(record[field]).strip().upper()
                # Validate IFSC format (4 chars + 0 + 6 chars)
                if re.match(r'^[A-Z]{4}0[A-Z0-9]{6}$', ifsc):
                    return ifsc
        return None

    def _extract_sender_bank(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract sender bank from record."""
        for field in ['sender_bank', 'SENDER_BANK', 'from_bank', 'FROM_BANK',
                     'debit_bank', 'DEBIT_BANK', 'bank_name', 'BANK_NAME']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_receiver_account(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract receiver account from record."""
        for field in ['receiver_account', 'RECEIVER_ACCOUNT', 'to_account', 'TO_ACCOUNT',
                     'credit_account', 'CREDIT_ACCOUNT', 'bene_acc', 'BENE_ACC']:
            if field in record and record[field]:
                return self._normalize_account_number(str(record[field]))
        return None

    def _extract_receiver_name(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract receiver name from record."""
        for field in ['receiver_name', 'RECEIVER_NAME', 'to_name', 'TO_NAME',
                     'receiver', 'RECEIVER', 'beneficiary', 'BENEFICIARY']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_receiver_ifsc(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract receiver IFSC from record."""
        for field in ['receiver_ifsc', 'RECEIVER_IFSC', 'to_ifsc', 'TO_IFSC',
                     'credit_ifsc', 'CREDIT_IFSC']:
            if field in record and record[field]:
                ifsc = str(record[field]).strip().upper()
                # Validate IFSC format
                if re.match(r'^[A-Z]{4}0[A-Z0-9]{6}$', ifsc):
                    return ifsc
        return None

    def _extract_receiver_bank(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract receiver bank from record."""
        for field in ['receiver_bank', 'RECEIVER_BANK', 'to_bank', 'TO_BANK',
                     'credit_bank', 'CREDIT_BANK']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_remarks(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract remarks from record."""
        for field in ['remarks', 'REMARKS', 'description', 'DESCRIPTION',
                     'narration', 'NARRATION', 'details', 'DETAILS']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_branch_code(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract branch code from record."""
        for field in ['branch_code', 'BRANCH_CODE', 'branch', 'BRANCH']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_city(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract city from record."""
        for field in ['city', 'CITY', 'city_name', 'CITY_NAME']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_state(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract state from record."""
        for field in ['state', 'STATE', 'state_name', 'STATE_NAME']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_instrument_number(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract instrument number from record."""
        for field in ['instrument_number', 'INSTRUMENT_NUMBER', 'cheque_no', 'CHEQUE_NO',
                     'dd_no', 'DD_NO', 'instrument_no', 'INSTRUMENT_NO']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_instrument_date(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract instrument date from record."""
        for field in ['instrument_date', 'INSTRUMENT_DATE', 'cheque_date', 'CHEQUE_DATE',
                     'dd_date', 'DD_DATE']:
            if field in record and record[field]:
                return self._normalize_date(str(record[field]))
        return None

    def _extract_instrument_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract instrument type from record."""
        for field in ['instrument_type', 'INSTRUMENT_TYPE', 'cheque_dd', 'CHEQUE_DD',
                     'inst_type', 'INST_TYPE']:
            if field in record and record[field]:
                inst_type = str(record[field]).strip().upper()
                if inst_type in ['CHEQUE', 'DD', 'BILL', 'NOTE']:
                    return inst_type
        return None

    def _normalize_account_number(self, account_str: Optional[str]) -> Optional[str]:
        """
        Normalize account number.

        Args:
            account_str: Account number string

        Returns:
            Normalized account number string or None
        """
        if not account_str:
            return None

        # Remove spaces, dashes
        normalized = re.sub(r'[\s\-]', '', account_str)

        # Return if not empty
        return normalized if normalized else None

    def _normalize_transaction_type(self, txn_type: str) -> str:
        """
        Normalize transaction type to standard values.

        Args:
            txn_type: Transaction type string

        Returns:
            Normalized transaction type
        """
        if not txn_type:
            return 'UNKNOWN'

        txn_type_upper = txn_type.upper().strip()

        # Map various transaction type values to standard ones
        if any(t in txn_type_upper for t in ['NEFT', 'NATIONAL ELECTRONIC']):
            return 'NEFT'
        elif 'RTGS' in txn_type_upper:
            return 'RTGS'
        elif 'IMPS' in txn_type_upper or 'IMMEDIATE' in txn_type_upper:
            return 'IMPS'
        elif 'UPI' in txn_type_upper or 'UNIFIED PAYMENT' in txn_type_upper:
            return 'UPI'
        elif 'CARD' in txn_type_upper or 'DEBIT' in txn_type_upper or 'CREDIT' in txn_type_upper:
            return 'CARD'
        elif 'WALLET' in txn_type_upper or 'MOBILE' in txn_type_upper:
            return 'Wallet'
        elif 'CASH' in txn_type_upper:
            return 'Cash'
        elif 'CHEQUE' in txn_type_upper or 'CHECK' in txn_type_upper:
            return 'Cheque'
        elif 'DD' in txn_type_upper or 'DEMAND DRAFT' in txn_type_upper:
            return 'DD'
        elif 'FD' in txn_type_upper or 'FIXED DEPOSIT' in txn_type_upper:
            return 'FD'
        elif 'RD' in txn_type_upper or 'RECURRING DEPOSIT' in txn_type_upper:
            return 'RD'
        elif 'LOAN' in txn_type_upper:
            return 'Loan'
        else:
            return txn_type_upper

    def _normalize_time(self, time_str: Optional[str]) -> Optional[str]:
        """
        Normalize time string to HH:MM:SS format.

        Args:
            time_str: Time string

        Returns:
            Normalized time string in HH:MM:SS format or None
        """
        if not time_str:
            return None

        time_str = time_str.strip()

        # Try various time formats
        formats = [
            '%H:%M:%S',
            '%H:%M',
            '%I:%M:%S %p',
            '%I:%M %p',
            '%H.%M.%S',
            '%H.%M'
        ]

        for fmt in formats:
            try:
                parsed_time = datetime.strptime(time_str, fmt)
                return parsed_time.strftime('%H:%M:%S')
            except ValueError:
                continue

        # If none worked, return original
        self.logger.warning(f"Could not normalize time: {time_str}")
        return time_str

    def _normalize_date(self, date_str: str) -> Optional[str]:
        """
        Normalize date string to ISO format (YYYY-MM-DD).

        Args:
            date_str: Date string in various formats

        Returns:
            Normalized date string in YYYY-MM-DD format or None if invalid
        """
        if not date_str or date_str.strip() == '':
            return None

        date_str = date_str.strip()

        # Try various date formats
        formats = [
            '%Y-%m-%d',
            '%d/%m/%Y',
            '%m/%d/%Y',
            '%d-%m-%Y',
            '%m-%d-%Y',
            '%Y/%m/%d',
            '%d.%m.%Y',
            '%m.%d.%Y',
            '%Y-%m-%d %H:%M:%S',
            '%d/%m/%Y %H:%M:%S',
            '%m/%d/%Y %H:%M:%S'
        ]

        for fmt in formats:
            try:
                parsed_date = datetime.strptime(date_str, fmt)
                return parsed_date.strftime('%Y-%m-%d')
            except ValueError:
                continue

        # If none of the formats worked, return original string
        self.logger.warning(f"Could not normalize date: {date_str}")
        return date_str

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed financial transaction data into the target system.

        Args:
            transformed_data: List of transformed financial transaction records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No financial transaction data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file

            output_file = self.config.get('output_file', 'data/financial_transactions_ingested.json')
            import os
            os.makedirs(os.path.dirname(output_file) if os.path.dirname(output_file) else '.', exist_ok=True)

            # Load existing data if file exists
            existing_data = []
            if os.path.exists(output_file):
                try:
                    with open(output_file, 'r', encoding='utf-8') as f:
                        existing_data = json.load(f)
                except:
                    existing_data = []

            # Merge with new data (avoid duplicates based on transaction_id)
            existing_transaction_ids = {record.get('transaction_id') for record in existing_data if record.get('transaction_id')}
            new_records = [record for record in transformed_data if record.get('transaction_id') not in existing_transaction_ids]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new financial transaction records. Total: {len(all_data)}")
            else:
                self.logger.info("No new financial transaction records to load (all are duplicates)")

            # Here we would normally insert into database
            self.logger.info(f"Successfully loaded {len(transformed_data)} financial transaction records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load financial transaction data: {str(e)}")
            return IngestionStatus.FAILED