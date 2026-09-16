"""
app_backend/ingestion/CDRIngestor.py
------------------------------------
CDR Feed Connector for ingesting Call Detail Record data.
Handles extraction, transformation, and loading of CDR records.
"""

import json
import csv
import re
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class CDRIngestor(BaseIngestor):
    """
    Connector for ingesting CDR (Call Detail Record) data from various sources.
    Supports CSV, JSON, database, and streaming sources.
    """

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw CDR data into standardized format.

        Args:
            raw_data: List of raw CDR records from extract()

        Returns:
            List of transformed CDR records in standardized format
        """
        transformed_records = []

        for raw_record in raw_data:
            # Parse timestamp
            timestamp_str = self._extract_cdr_field(raw_record, ['timestamp', 'TIMESTAMP', 'call_timestamp', 'CALL_TIMESTAMP', 'start_time', 'START_TIME'])
            call_timestamp = self._normalize_timestamp(timestamp_str) if timestamp_str else None

            # Parse duration
            duration_str = self._extract_cdr_field(raw_record, ['duration', 'DURATION', 'call_duration', 'CALL_DURATION', 'duration_sec'])
            call_duration = int(duration_str) if duration_str and duration_str.isdigit() else 0

            # Parse location information
            cell_tower_id = self._extract_cdr_field(raw_record, ['cell_tower_id', 'CELL_TOWER_ID', 'tower_id', 'TOWER_ID', 'cell_id', 'CELL_ID'])
            location_area_code = self._extract_cdr_field(raw_record, ['location_area_code', 'LOCATION_AREA_CODE', 'lac', 'LAC'])

            # Parse IMEI/IMSI
            imei = self._extract_cdr_field(raw_record, ['imei', 'IMEI', 'device_imei', 'DEVICE_IMEI'])
            imsi = self._extract_cdr_field(raw_record, ['imsi', 'IMSI'])

            # Parse call type
            call_type = self._extract_cdr_field(raw_record, ['call_type', 'CALL_TYPE', 'type_of_call', 'TYPE_OF_CALL'])
            call_type = self._normalize_call_type(call_type) if call_type else 'UNKNOWN'

            # Parse SMS specific fields
            sms_content = None
            if call_type == 'SMS':
                sms_content = self._extract_cdr_field(raw_record, ['sms_content', 'SMS_CONTENT', 'message_text', 'MESSAGE_TEXT'])

            # Parse financial value if applicable
            charge_amount = None
            charge_str = self._extract_cdr_field(raw_record, ['charge_amount', 'CHARGE_AMOUNT', 'amount', 'AMOUNT', 'call_charge'])
            if charge_str:
                try:
                    charge_amount = float(charge_str)
                except ValueError:
                    charge_amount = 0.0

            warnings: List[str] = []

            transformed_record = {
                # Call identification
                'call_id': self._extract_cdr_field(raw_record, ['call_id', 'CALL_ID', 'record_id', 'RECORD_ID']),
                'calling_number': self._extract_cdr_field(raw_record, ['calling_number', 'CALLING_NUMBER', 'source', 'SOURCE', 'caller_number', 'CALLER_NUMBER']),
                'called_number': self._extract_cdr_field(raw_record, ['called_number', 'CALLED_NUMBER', 'destination', 'DESTINATION', 'receiver_number', 'RECEIVER_NUMBER']),

                # Call timing
                'call_timestamp': call_timestamp,
                'call_duration_seconds': call_duration,

                # Call characteristics
                'call_type': call_type,
                'call_direction': self._extract_cdr_field(raw_record, ['call_direction', 'CALL_DIRECTION', 'direction', 'DIRECTION']),

                # Location information
                'cell_tower_id': cell_tower_id,
                'location_area_code': location_area_code,

                # Device identification
                'imei': imei,
                'imsi': imsi,

                # Communication content (for SMS)
                'sms_content': sms_content,

                # Financial information
                'charge_amount': charge_amount,
                'currency': 'INR',

                # Metadata
                'source_record_id': self._extract_cdr_field(raw_record, ['id', 'ID', 'record_id', 'RECORD_ID', 'cdr_id']),
                'source_system': 'CDR_Feed',
                'ingestion_timestamp': datetime.utcnow().isoformat(),
                'raw_data': raw_record  # Keep original for reference
            }

            # Validate required fields
            if not transformed_record['calling_number'] or not transformed_record['called_number']:
                self.logger.warning("CDR record missing calling or called number, skipping")
                continue

            if not transformed_record['call_timestamp']:
                self.logger.warning("CDR record missing timestamp, skipping")
                continue

            transformed_records.append(transformed_record)

        return transformed_records

    def _extract_cdr_field(self, record: Dict[str, Any], field_names: List[str]) -> Optional[str]:
        """
        Extract a field value from CDR record trying multiple possible field names.

        Args:
            record: CDR record dictionary
            field_names: List of possible field names to try

        Returns:
            Field value as string or None if not found
        """
        for field_name in field_names:
            if field_name in record and record[field_name] is not None:
                value = str(record[field_name]).strip()
                if value:  # Return non-empty values
                    return value
        return None

    def _normalize_phone_number(self, phone_str: Optional[str]) -> Optional[str]:
        """
        Normalize phone number to standard format.

        Args:
            phone_str: Phone number string

        Returns:
            Normalized phone number string or None
        """
        if not phone_str:
            return None

        # Remove all non-digit characters except leading +
        cleaned = re.sub(r'[^\d\+]', '', phone_str)

        # Handle Indian numbers
        if cleaned.startswith('+91'):
            return cleaned
        elif cleaned.startswith('91') and len(cleaned) == 12:
            return '+' + cleaned
        elif cleaned.startswith('0') and len(cleaned) == 11:
            return '+91' + cleaned[1:]
        elif len(cleaned) == 10:
            return '+91' + cleaned
        elif len(cleaned) == 11 and cleaned.startswith('1'):  # US-style
            return '+' + cleaned

        # Return as-is if we can't normalize
        return cleaned if cleaned else None

    def _normalize_timestamp(self, timestamp_str: Optional[str]) -> Optional[str]:
        """
        Normalize timestamp to ISO format.

        Args:
            timestamp_str: Timestamp string

        Returns:
            Normalized timestamp in ISO format or None
        """
        if not timestamp_str:
            return None

        # Try various timestamp formats
        formats = [
            '%Y-%m-%d %H:%M:%S',
            '%d/%m/%Y %H:%M:%S',
            '%m/%d/%Y %H:%M:%S',
            '%d-%m-%Y %H:%M:%S',
            '%m-%d-%Y %H:%M:%S',
            '%Y/%m/%d %H:%M:%S',
            '%Y-%m-%d',
            '%d/%m/%Y',
            '%m/%d/%Y',
            '%d-%m-%Y',
            '%m-%d-%Y',
            '%Y/%m/%d'
        ]

        for fmt in formats:
            try:
                parsed_time = datetime.strptime(timestamp_str.strip(), fmt)
                return parsed_time.isoformat()
            except ValueError:
                continue

        # If none worked, return original
        self.logger.warning(f"Could not normalize timestamp: {timestamp_str}")
        return timestamp_str

    def _normalize_call_type(self, call_type: Optional[str]) -> str:
        """
        Normalize call type to standard values.

        Args:
            call_type: Call type string

        Returns:
            Normalized call type
        """
        if not call_type:
            return 'UNKNOWN'

        call_type_upper = call_type.upper().strip()

        # Map various call type values to standard ones
        if any(t in call_type_upper for t in ['VOICE', 'CALL']):
            return 'VOICE'
        elif 'SMS' in call_type_upper or 'TEXT' in call_type_upper:
            return 'SMS'
        elif 'DATA' in call_type_upper or 'GPRS' in call_type_upper or 'INTERNET' in call_type_upper:
            return 'DATA'
        elif 'VIDEO' in call_type_upper:
            return 'VIDEO'
        elif 'FAX' in call_type_upper:
            return 'FAX'
        else:
            return call_type_upper

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed CDR data into the target system.

        Args:
            transformed_data: List of transformed CDR records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No CDR data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file

            output_file = self.config.get('output_file', 'data/cdr_ingested.json')
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

            # Merge with new data (avoid duplicates based on call_id)
            existing_call_ids = {record.get('call_id') for record in existing_data if record.get('call_id')}
            new_records = [record for record in transformed_data if record.get('call_id') not in existing_call_ids]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new CDR records. Total: {len(all_data)}")
            else:
                self.logger.info("No new CDR records to load (all are duplicates)")

            # Here we would normally insert into database
            self.logger.info(f"Successfully loaded {len(transformed_data)} CDR records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load CDR data: {str(e)}")
            return IngestionStatus.FAILED