"""
app_backend/ingestion/FIRIngestor.py
------------------------------------
FIR System Connector for ingesting First Information Report data.
Handles extraction, transformation, and loading of FIR records.
"""

import json
import csv
import re
from typing import Dict, Any, List, Optional
from datetime import datetime
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class FIRIngestor(BaseIngestor):
    """
    Connector for ingesting FIR (First Information Report) data from various sources.
    Supports CSV, JSON, and database sources.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize FIR ingestor.

        Args:
            config: Configuration containing:
                - source_type: 'csv', 'json', 'database', or 'api'
                - file_path: Path to source file (for file-based sources)
                - api_endpoint: API endpoint (for API sources)
                - database_connection: DB connection string (for database sources)
                - polling_interval: How often to check for new data (seconds)
                - batch_size: Number of records to process per batch
        """
        super().__init__(DataSourceType.FIR_SYSTEM, config)
        self.source_config = config.get('source', {})
        self.batch_size = config.get('batch_size', 100)
        self.polling_interval = config.get('polling_interval', 300)  # 5 minutes
        self.last_processed_id = None

    def connect(self) -> bool:
        """
        Establish connection to FIR data source.

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
                    self.logger.error(f"FIR CSV file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to FIR CSV source: {file_path}")

            elif source_type == 'json':
                # Validate JSON file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"FIR JSON file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to FIR JSON source: {file_path}")

            elif source_type == 'api':
                # Validate API endpoint
                api_endpoint = self.source_config.get('api_endpoint')
                if not api_endpoint:
                    self.logger.error("FIR API endpoint not configured")
                    return False
                self.logger.info(f"Connected to FIR API source: {api_endpoint}")

            elif source_type == 'database':
                # Validate database connection
                db_connection = self.source_config.get('database_connection')
                if not db_connection:
                    self.logger.error("FIR database connection not configured")
                    return False
                self.logger.info("Connected to FIR database source")

            else:
                self.logger.error(f"Unsupported FIR source type: {source_type}")
                return False

            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to FIR source: {str(e)}")
            return False

    def disconnect(self) -> bool:
        """
        Close connection to FIR data source.

        Returns:
            bool: True if disconnection successful
        """
        # For file-based sources, no explicit disconnect needed
        # For database/API sources, cleanup connections here
        self.logger.info("Disconnected from FIR source")
        return True

    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract FIR data from the source.

        Returns:
            List of raw FIR records
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
            else:
                self.logger.error(f"Unsupported FIR source type for extraction: {source_type}")
                return []

        except Exception as e:
            self.logger.error(f"Failed to extract FIR data: {str(e)}")
            return []

    def _extract_from_csv(self) -> List[Dict[str, Any]]:
        """Extract FIR data from CSV file."""
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

            self.logger.info(f"Extracted {len(records)} FIR records from CSV")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract FIR data from CSV: {str(e)}")
            return []

    def _extract_from_json(self) -> List[Dict[str, Any]]:
        """Extract FIR data from JSON file."""
        file_path = self.source_config.get('file_path')

        try:
            with open(file_path, 'r', encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)

            # Handle different JSON structures
            if isinstance(data, list):
                records = data
            elif isinstance(data, dict):
                # Look for common keys containing the array of records
                for key in ['fir_records', 'records', 'data', 'fir_reports']:
                    if key in data and isinstance(data[key], list):
                        records = data[key]
                        break
                else:
                    # Assume the dict itself is a single record
                    records = [data]
            else:
                records = []

            self.logger.info(f"Extracted {len(records)} FIR records from JSON")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract FIR data from JSON: {str(e)}")
            return []

    def _extract_from_api(self) -> List[Dict[str, Any]]:
        """Extract FIR data from API endpoint."""
        # This would typically make an HTTP request to the API
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("FIR API extraction not yet implemented - returning empty list")
        return []

    def _extract_from_database(self) -> List[Dict[str, Any]]:
        """Extract FIR data from database."""
        # This would typically execute a SQL query
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("FIR database extraction not yet implemented - returning empty list")
        return []

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw FIR data into standardized format.

        Args:
            raw_data: List of raw FIR records from extract()

        Returns:
            List of transformed FIR records in standardized format
        """
        transformed_records = []

        for raw_record in raw_data:
            try:
                transformed_record = self._transform_fir_record(raw_record)
                if transformed_record:
                    transformed_records.append(transformed_record)
            except Exception as e:
                self.logger.warning(f"Failed to transform FIR record: {str(e)}")
                continue

        self.logger.info(f"Transformed {len(transformed_records)} FIR records")
        return transformed_records

    def _transform_fir_record(self, raw_record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Transform a single FIR record into standardized format.

        Args:
            raw_record: Raw FIR record dictionary

        Returns:
            Transformed FIR record dictionary or None if invalid
        """
        try:
            # Standardized FIR record format
            transformed = {
                # Core identification
                'fir_number': self._extract_fir_number(raw_record),
                'fir_date': self._extract_fir_date(raw_record),
                'police_station': self._extract_police_station(raw_record),
                'district': self._extract_district(raw_record),
                'state': self._extract_state(raw_record),

                # Incident details
                'incident_type': self._extract_incident_type(raw_record),
                'incident_description': self._extract_incident_description(raw_record),
                'incident_date': self._extract_incident_date(raw_record),
                'incident_location': self._extract_incident_location(raw_record),

                # Parties involved
                'accused_names': self._extract_accused_names(raw_record),
                'victim_names': self._extract_victim_names(raw_record),
                'witness_names': self._extract_witness_names(raw_record),

                # Contact information
                'phone_numbers': self._extract_phone_numbers(raw_record),
                'email_addresses': self._extract_email_addresses(raw_record),
                'addresses': self._extract_addresses(raw_record),

                # Vehicle information
                'vehicles': self._extract_vehicles(raw_record),

                # Property/stolen items
                'stolen_items': self._extract_stolen_items(raw_record),
                'property_details': self._extract_property_details(raw_record),

                # Case status
                'case_status': self._extract_case_status(raw_record),
                'investigating_officer': self._extract_investigating_officer(raw_record),

                # Metadata
                'source_record_id': raw_record.get('id') or raw_record.get('FIR_NO') or raw_record.get('fir_no'),
                'source_system': 'FIR_System',
                'ingestion_timestamp': datetime.utcnow().isoformat(),
                'raw_data': raw_record  # Keep original for reference
            }

            # Validate required fields
            if not transformed['fir_number']:
                self.logger.warning("FIR record missing fir_number, skipping")
                return None

            return transformed

        except Exception as e:
            self.logger.warning(f"Error transforming FIR record: {str(e)}")
            return None

    def _extract_fir_number(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract FIR number from record."""
        # Try various common field names
        for field in ['fir_no', 'FIR_NO', 'fir_number', 'FIR_NUMBER', 'fir_id', 'FIR_ID']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_fir_date(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract FIR date from record."""
        for field in ['fir_date', 'FIR_DATE', 'date_of_fir', 'DATE_OF_FIR', 'registration_date']:
            if field in record and record[field]:
                return self._normalize_date(str(record[field]))
        return None

    def _extract_police_station(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract police station from record."""
        for field in ['police_station', 'POLICE_STATION', 'ps_name', 'PS_NAME', 'station']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_district(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract district from record."""
        for field in ['district', 'DISTRICT', 'dist', 'DIST']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_state(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract state from record."""
        for field in ['state', 'STATE', 'st', 'ST']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_incident_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract incident type from record."""
        for field in ['incident_type', 'INCIDENT_TYPE', 'crime_type', 'CRIME_TYPE', 'offence', 'OFFENCE']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_incident_description(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract incident description from record."""
        for field in ['incident_description', 'INCIDENT_DESCRIPTION', 'description', 'DESCRIPTION', 'details', 'DETAILS']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_incident_date(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract incident date from record."""
        for field in ['incident_date', 'INCIDENT_DATE', 'date_of_incident', 'DATE_OF_INCIDENT', 'occurrence_date']:
            if field in record and record[field]:
                return self._normalize_date(str(record[field]))
        return None

    def _extract_incident_location(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract incident location from record."""
        for field in ['incident_location', 'INCIDENT_LOCATION', 'location', 'LOCATION', 'place_of_occurrence']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_accused_names(self, record: Dict[str, Any]) -> List[str]:
        """Extract accused names from record."""
        accused_names = []

        # Try single field first
        for field in ['accused_name', 'ACCUSED_NAME', 'accused', 'ACCUSED', 'accused_names']:
            if field in record and record[field]:
                names = str(record[field]).split('|')
                accused_names.extend([name.strip() for name in names if name.strip()])
                break

        # Try multiple accused fields
        if not accused_names:
            for i in range(1, 6):  # Check for accused_1, accused_2, etc.
                for field in [f'accused_{i}', f'ACCUSED_{i}', f'accused_name_{i}']:
                    if field in record and record[field]:
                        accused_names.append(str(record[field]).strip())

        return accused_names

    def _extract_victim_names(self, record: Dict[str, Any]) -> List[str]:
        """Extract victim names from record."""
        victim_names = []

        # Try single field first
        for field in ['victim_name', 'VICTIM_NAME', 'victim', 'VICTIM', 'victim_names']:
            if field in record and record[field]:
                names = str(record[field]).split('|')
                victim_names.extend([name.strip() for name in names if name.strip()])
                break

        # Try multiple victim fields
        if not victim_names:
            for i in range(1, 6):  # Check for victim_1, victim_2, etc.
                for field in [f'victim_{i}', f'VICTIM_{i}', f'victim_name_{i}']:
                    if field in record and record[field]:
                        victim_names.append(str(record[field]).strip())

        return victim_names

    def _extract_witness_names(self, record: Dict[str, Any]) -> List[str]:
        """Extract witness names from record."""
        witness_names = []

        # Try single field first
        for field in ['witness_name', 'WITNESS_NAME', 'witness', 'WITNESS', 'witness_names']:
            if field in record and record[field]:
                names = str(record[field]).split('|')
                witness_names.extend([name.strip() for name in names if name.strip()])
                break

        # Try multiple witness fields
        if not witness_names:
            for i in range(1, 6):  # Check for witness_1, witness_2, etc.
                for field in [f'witness_{i}', f'WITNESS_{i}', f'witness_name_{i}']:
                    if field in record and record[field]:
                        witness_names.append(str(record[field]).strip())

        return witness_names

    def _extract_phone_numbers(self, record: Dict[str, Any]) -> List[str]:
        """Extract phone numbers from record."""
        phone_numbers = []

        # Common phone number fields
        phone_fields = [
            'phone_number', 'PHONE_NUMBER', 'mobile', 'MOBILE', 'contact_number',
            'telephone', 'TELEPHONE', 'cell_phone', 'CELL_PHONE'
        ]

        for field in phone_fields:
            if field in record and record[field]:
                # Extract phone numbers using regex
                phones = re.findall(r'[\+]?[1-9][\d\s\-\(\)]{8,}', str(record[field]))
                phone_numbers.extend([phone.strip() for phone in phones if phone.strip()])

        # Also check for multiple phone fields
        for i in range(1, 4):
            for field in [f'phone_{i}', f'mobile_{i}', f'contact_{i}']:
                if field in record and record[field]:
                    phones = re.findall(r'[\+]?[1-9][\d\s\-\(\)]{8,}', str(record[field]))
                    phone_numbers.extend([phone.strip() for phone in phones if phone.strip()])

        # Remove duplicates while preserving order
        seen = set()
        unique_phones = []
        for phone in phone_numbers:
            if phone not in seen:
                seen.add(phone)
                unique_phones.append(phone)

        return unique_phones

    def _extract_email_addresses(self, record: Dict[str, Any]) -> List[str]:
        """Extract email addresses from record."""
        email_addresses = []

        # Common email fields
        email_fields = [
            'email', 'EMAIL', 'email_address', 'EMAIL_ADDRESS', 'mail', 'MAIL'
        ]

        for field in email_fields:
            if field in record and record[field]:
                # Extract email addresses using regex
                emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', str(record[field]))
                email_addresses.extend(emails)

        # Remove duplicates while preserving order
        seen = set()
        unique_emails = []
        for email in email_addresses:
            if email not in seen:
                seen.add(email)
                unique_emails.append(email)

        return unique_emails

    def _extract_addresses(self, record: Dict[str, Any]) -> List[str]:
        """Extract addresses from record."""
        addresses = []

        # Common address fields
        address_fields = [
            'address', 'ADDRESS', 'residential_address', 'RESIDENTIAL_ADDRESS',
            'permanent_address', 'PERMANENT_ADDRESS', 'current_address', 'CURRENT_ADDRESS'
        ]

        for field in address_fields:
            if field in record and record[field]:
                addr = str(record[field]).strip()
                if addr:
                    addresses.append(addr)

        return addresses

    def _extract_vehicles(self, record: Dict[str, Any]) -> List[Dict[str, str]]:
        """Extract vehicle information from record."""
        vehicles = []

        # Try to extract vehicle information
        vehicle_fields = [
            'vehicle_number', 'VEHICLE_NUMBER', 'veh_no', 'VEH_NO',
            'vehicle_type', 'VEHICLE_TYPE', 'make', 'MAKE', 'model', 'MODEL'
        ]

        # Simple approach: if we have vehicle number, create a vehicle record
        for field in vehicle_fields:
            if field in record and record[field] and 'number' in field.lower():
                vehicle = {
                    'vehicle_number': str(record[field]).strip(),
                    'vehicle_type': str(record.get('vehicle_type', record.get('VEHICLE_TYPE', ''))).strip(),
                    'make': str(record.get('make', record.get('MAKE', ''))).strip(),
                    'model': str(record.get('model', record.get('MODEL', ''))).strip()
                }
                vehicles.append(vehicle)
                break

        return vehicles

    def _extract_stolen_items(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract stolen items information from record."""
        stolen_items = []

        # Check for stolen items fields
        item_fields = [
            'stolen_items', 'STOLEN_ITEMS', 'property_stolen', 'PROPERTY_STOLEN',
            'items_stolen', 'ITEMS_STOLEN'
        ]

        for field in item_fields:
            if field in record and record[field]:
                items_str = str(record[field])
                # Try to parse as JSON first
                try:
                    items = json.loads(items_str)
                    if isinstance(items, list):
                        stolen_items.extend(items)
                    elif isinstance(items, dict):
                        stolen_items.append(items)
                except json.JSONDecodeError:
                    # Treat as pipe or comma separated list
                    items = re.split(r'[,|]', items_str)
                    for item in items:
                        item = item.strip()
                        if item:
                            stolen_items.append({
                                'description': item,
                                'quantity': 1,
                                'value': None
                            })
                break

        return stolen_items

    def _extract_property_details(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Extract property details from record."""
        property_details = {}

        # Property value fields
        value_fields = [
            'property_value', 'PROPERTY_VALUE', 'value_of_property', 'VALUE_OF_PROPERTY',
            'stolen_value', 'STOLEN_VALUE', 'loss_amount', 'LOSS_AMOUNT'
        ]

        for field in value_fields:
            if field in record and record[field]:
                try:
                    property_details['value'] = float(str(record[field]).replace(',', ''))
                except ValueError:
                    property_details['value'] = None
                break

        # Property description
        desc_fields = [
            'property_description', 'PROPERTY_DESCRIPTION', 'property_details', 'PROPERTY_DETAILS'
        ]

        for field in desc_fields:
            if field in record and record[field]:
                property_details['description'] = str(record[field]).strip()
                break

        return property_details

    def _extract_case_status(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract case status from record."""
        for field in ['case_status', 'CASE_STATUS', 'status', 'STATUS', 'investigation_status']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_investigating_officer(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract investigating officer from record."""
        for field in ['investigating_officer', 'INVESTIGATING_OFFICER', 'io_name', 'IO_NAME', 'officer_in_charge']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

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
        # (it might still be useful even if not perfectly formatted)
        self.logger.warning(f"Could not normalize date: {date_str}")
        return date_str

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed FIR data into the target system.

        Args:
            transformed_data: List of transformed FIR records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No FIR data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file or logging

            # Option 1: Save to file for inspection
            output_file = self.config.get('output_file', 'data/fir_ingested.json')
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

            # Merge with new data (avoid duplicates based on fir_number)
            existing_fir_numbers = {record.get('fir_number') for record in existing_data if record.get('fir_number')}
            new_records = [record for record in transformed_data if record.get('fir_number') not in existing_fir_numbers]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new FIR records. Total: {len(all_data)}")
            else:
                self.logger.info("No new FIR records to load (all are duplicates)")

            # Option 2: Here we would normally insert into database
            # For demonstration, we'll just log the count
            self.logger.info(f"Successfully loaded {len(transformed_data)} FIR records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load FIR data: {str(e)}")
            return IngestionStatus.FAILED