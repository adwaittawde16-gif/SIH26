"""
app_backend/ingestion/SurveillanceIngestor.py
---------------------------------------------
Surveillance System Connector for ingesting surveillance data.
Handles extraction, transformation, and loading of surveillance records.
"""

import json
import csv
import re
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class SurveillanceIngestor(BaseIngestor):
    """
    Connector for ingesting surveillance data from various sources.
    Supports CSV, JSON, database, API, and video metadata sources.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Surveillance ingestor.

        Args:
            config: Configuration containing:
                - source_type: 'csv', 'json', 'database', 'api', 'video_metadata', or 'realtime_feed'
                - file_path: Path to source file (for file-based sources)
                - api_endpoint: API endpoint (for API sources)
                - database_connection: DB connection string (for database sources)
                - video_directory: Directory containing surveillance videos (for video metadata)
                - camera_config: Configuration for camera IDs and locations
                - motion_detection_alerts: Whether to process motion detection alerts
                - facial_recognition_events: Whether to process facial recognition events
                - license_plate_recognition: Whether to process license plate recognition data
                - batch_size: Number of records to process per batch
                - polling_interval: How often to check for new data (seconds)
        """
        super().__init__(DataSourceType.SURVEILLANCE_SYSTEM, config)
        self.source_config = config.get('source', {})
        self.camera_config = config.get('camera_config', {})
        self.process_motion_alerts = config.get('motion_detection_alerts', True)
        self.process_facial_recognition = config.get('facial_recognition_events', True)
        self.process_license_plate = config.get('license_plate_recognition', True)
        self.batch_size = config.get('batch_size', 100)
        self.polling_interval = config.get('polling_interval', 30)  # 30 seconds
        self.last_processed_timestamp = None

    def connect(self) -> bool:
        """
        Establish connection to surveillance data source.

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
                    self.logger.error(f"Surveillance CSV file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to surveillance CSV source: {file_path}")

            elif source_type == 'json':
                # Validate JSON file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"Surveillance JSON file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to surveillance JSON source: {file_path}")

            elif source_type == 'api':
                # Validate API endpoint
                api_endpoint = self.source_config.get('api_endpoint')
                if not api_endpoint:
                    self.logger.error("Surveillance API endpoint not configured")
                    return False
                self.logger.info(f"Connected to surveillance API source: {api_endpoint}")

            elif source_type == 'database':
                # Validate database connection
                db_connection = self.source_config.get('database_connection')
                if not db_connection:
                    self.logger.error("Surveillance database connection not configured")
                    return False
                self.logger.info("Connected to surveillance database source")

            elif source_type == 'video_metadata':
                # Validate video directory
                import os
                video_dir = self.source_config.get('video_directory')
                if not video_dir or not os.path.exists(video_dir):
                    self.logger.error(f"Surveillance video directory not found: {video_dir}")
                    return False
                self.logger.info(f"Connected to surveillance video metadata source: {video_dir}")

            elif source_type == 'realtime_feed':
                # Validate real-time feed configuration
                feed_config = self.source_config.get('feed_config', {})
                if not feed_config:
                    self.logger.error("Surveillance real-time feed configuration not provided")
                    return False
                self.logger.info("Connected to surveillance real-time feed source")

            else:
                self.logger.error(f"Unsupported surveillance source type: {source_type}")
                return False

            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to surveillance source: {str(e)}")
            return False

    def disconnect(self) -> bool:
        """
        Close connection to surveillance data source.

        Returns:
            bool: True if disconnection successful
        """
        # For file-based sources, no explicit disconnect needed
        # For database/API/video/stream sources, cleanup connections here
        self.logger.info("Disconnected from surveillance source")
        return True

    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract surveillance data from the source.

        Returns:
            List of raw surveillance records
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
            elif source_type == 'video_metadata':
                return self._extract_from_video_metadata()
            elif source_type == 'realtime_feed':
                return self._extract_from_realtime_feed()
            else:
                self.logger.error(f"Unsupported surveillance source type for extraction: {source_type}")
                return []

        except Exception as e:
            self.logger.error(f"Failed to extract surveillance data: {str(e)}")
            return []

    def _extract_from_csv(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from CSV file."""
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

            self.logger.info(f"Extracted {len(records)} surveillance records from CSV")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract surveillance data from CSV: {str(e)}")
            return []

    def _extract_from_json(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from JSON file."""
        file_path = self.source_config.get('file_path')

        try:
            with open(file_path, 'r', encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)

            # Handle different JSON structures
            if isinstance(data, list):
                records = data
            elif isinstance(data, dict):
                # Look for common keys containing the array of records
                for key in ['surveillance_records', 'records', 'data', 'events', 'alerts']:
                    if key in data and isinstance(data[key], list):
                        records = data[key]
                        break
                else:
                    # Assume the dict itself is a single record
                    records = [data]
            else:
                records = []

            self.logger.info(f"Extracted {len(records)} surveillance records from JSON")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract surveillance data from JSON: {str(e)}")
            return []

    def _extract_from_api(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from API endpoint."""
        # This would typically make an HTTP request to the API
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Surveillance API extraction not yet implemented - returning empty list")
        return []

    def _extract_from_database(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from database."""
        # This would typically execute a SQL query
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Surveillance database extraction not yet implemented - returning empty list")
        return []

    def _extract_from_video_metadata(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from video metadata."""
        # This would typically process video files and extract metadata
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Surveillance video metadata extraction not yet implemented - returning empty list")
        return []

    def _extract_from_realtime_feed(self) -> List[Dict[str, Any]]:
        """Extract surveillance data from real-time feed."""
        # This would typically consume from a real-time surveillance feed
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Surveillance real-time feed extraction not yet implemented - returning empty list")
        return []

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw surveillance data into standardized format.

        Args:
            raw_data: List of raw surveillance records from extract()

        Returns:
            List of transformed surveillance records in standardized format
        """
        transformed_records = []

        for raw_record in raw_data:
            try:
                transformed_record = self._transform_surveillance_record(raw_record)
                if transformed_record:
                    transformed_records.append(transformed_record)
            except Exception as e:
                self.logger.warning(f"Failed to transform surveillance record: {str(e)}")
                continue

        self.logger.info(f"Transformed {len(transformed_records)} surveillance records")
        return transformed_records

    def _transform_surveillance_record(self, raw_record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Transform a single surveillance record into standardized format.

        Args:
            raw_record: Raw surveillance record dictionary

        Returns:
            Transformed surveillance record dictionary or None if invalid
        """
        try:
            # Standardized surveillance record format
            transformed = {
                # Event identification
                'event_id': self._extract_event_id(raw_record),
                'event_timestamp': self._extract_event_timestamp(raw_record),
                'event_type': self._extract_event_type(raw_record),
                'event_subtype': self._extract_event_subtype(raw_record),

                # Camera information
                'camera_id': self._extract_camera_id(raw_record),
                'camera_location': self._extract_camera_location(raw_record),
                'camera_type': self._extract_camera_type(raw_record),

                # Location information
                'latitude': self._extract_latitude(raw_record),
                'longitude': self._extract_longitude(raw_record),
                'address': self._extract_address(raw_record),
                'city': self._extract_city(raw_record),
                'state': self._extract_state(raw_record),

                # Detected entities
                'persons_detected': self._extract_persons_detected(raw_record),
                'faces_recognized': self._extract_faces_recognized(raw_record),
                'license_plates_detected': self._extract_license_plates_detected(raw_record),
                'vehicles_detected': self._extract_vehicles_detected(raw_record),

                # Event details
                'duration_seconds': self._extract_duration_seconds(raw_record),
                'confidence_score': self._extract_confidence_score(raw_record),
                'alert_level': self._extract_alert_level(raw_record),
                'description': self._extract_description(raw_record),

                # Metadata
                'source_record_id': raw_record.get('id') or raw_record.get('event_id') or raw_record.get('timestamp'),
                'source_system': 'Surveillance_System',
                'ingestion_timestamp': datetime.utcnow().isoformat(),
                'raw_data': raw_record  # Keep original for reference
            }

            # Validate required fields
            if not transformed['event_id']:
                self.logger.warning("Surveillance record missing event_id, skipping")
                return None

            if not transformed['event_timestamp']:
                self.logger.warning("Surveillance record missing event_timestamp, skipping")
                return None

            return transformed

        except Exception as e:
            self.logger.warning(f"Error transforming surveillance record: {str(e)}")
            return None

    def _extract_event_id(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract event ID from record."""
        for field in ['event_id', 'EVENT_ID', 'id', 'ID', 'event_identifier', 'EVENT_IDENTIFIER']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_event_timestamp(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract event timestamp from record."""
        for field in ['event_timestamp', 'EVENT_TIMESTAMP', 'timestamp', 'TIMESTAMP', 'date_time', 'DATE_TIME']:
            if field in record and record[field]:
                return self._normalize_timestamp(str(record[field]))
        return None

    def _extract_event_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract event type from record."""
        for field in ['event_type', 'EVENT_TYPE', 'type', 'TYPE', 'category', 'CATEGORY']:
            if field in record and record[field]:
                event_type = str(record[field]).strip().upper()
                # Normalize event type
                return self._normalize_event_type(event_type)
        return None

    def _extract_event_subtype(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract event subtype from record."""
        for field in ['event_subtype', 'EVENT_SUBTYPE', 'subtype', 'SUBTYPE', 'sub_category', 'SUB_CATEGORY']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_camera_id(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract camera ID from record."""
        for field in ['camera_id', 'CAMERA_ID', 'camera', 'CAMERA', 'device_id', 'DEVICE_ID']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_camera_location(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract camera location from record."""
        for field in ['camera_location', 'CAMERA_LOCATION', 'location', 'LOCATION', 'position', 'POSITION']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_camera_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract camera type from record."""
        for field in ['camera_type', 'CAMERA_TYPE', 'type', 'TYPE', 'model', 'MODEL']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_latitude(self, record: Dict[str, Any]) -> Optional[float]:
        """Extract latitude from record."""
        for field in ['latitude', 'LATITUDE', 'lat', 'LAT']:
            if field in record and record[field] is not None:
                try:
                    return float(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_longitude(self, record: Dict[str, Any]) -> Optional[float]:
        """Extract longitude from record."""
        for field in ['longitude', 'LONGITUDE', 'lon', 'LON', 'lng', 'LNG']:
            if field in record and record[field] is not None:
                try:
                    return float(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_address(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract address from record."""
        for field in ['address', 'ADDRESS', 'location_address', 'LOCATION_ADDRESS']:
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

    def _extract_persons_detected(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract persons detected from record."""
        persons = []

        # Try to get persons count
        count_fields = ['persons_detected', 'PERSONS_DETECTED', 'people_count', 'PEOPLE_COUNT']
        count = 0
        for field in count_fields:
            if field in record and record[field] is not None:
                try:
                    count = int(record[field])
                    break
                except (ValueError, TypeError):
                    continue

        # If we have detailed person information
        person_fields = ['persons', 'PERSONS', 'people_detected', 'PEOPLE_DETECTED']
        for field in person_fields:
            if field in record and isinstance(record[field], list):
                for person in record[field]:
                    if isinstance(person, dict):
                        persons.append(person)
                    elif isinstance(person, str):
                        persons.append({'description': person})
                break

        # If we have count but no details, create generic entries
        if count > 0 and not persons:
            for i in range(count):
                persons.append({
                    'detection_id': f'person_{i+1}',
                    'confidence': 0.8,  # Default confidence
                    'bounding_box': None
                })

        return persons

    def _extract_faces_recognized(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract faces recognized from record."""
        faces = []

        # Try to get faces count
        count_fields = ['faces_recognized', 'FACES_RECOGNIZED', 'face_count', 'FACE_COUNT']
        count = 0
        for field in count_fields:
            if field in record and record[field] is not None:
                try:
                    count = int(record[field])
                    break
                except (ValueError, TypeError):
                    continue

        # If we have detailed face information
        face_fields = ['faces', 'FACES', 'recognized_faces', 'RECOGNIZED_FACES']
        for field in face_fields:
            if field in record and isinstance(record[field], list):
                for face in record[field]:
                    if isinstance(face, dict):
                        faces.append(face)
                    elif isinstance(face, str):
                        faces.append({'identity': face, 'confidence': 0.8})
                break

        # If we have count but no details, create generic entries
        if count > 0 and not faces:
            for i in range(count):
                faces.append({
                    'face_id': f'face_{i+1}',
                    'identity': f'unknown_person_{i+1}',
                    'confidence': 0.8
                })

        return faces

    def _extract_license_plates_detected(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract license plates detected from record."""
        plates = []

        # Try to get plates count
        count_fields = ['license_plates_detected', 'LICENSE_PLATES_DETECTED', 'plate_count', 'PLATE_COUNT']
        count = 0
        for field in count_fields:
            if field in record and record[field] is not None:
                try:
                    count = int(record[field])
                    break
                except (ValueError, TypeError):
                    continue

        # If we have detailed plate information
        plate_fields = ['license_plates', 'LICENSE_PLATES', 'plates_detected', 'PLATES_DETECTED']
        for field in plate_fields:
            if field in record and isinstance(record[field], list):
                for plate in record[field]:
                    if isinstance(plate, dict):
                        plates.append(plate)
                    elif isinstance(plate, str):
                        plates.append({'plate_number': plate, 'confidence': 0.8})
                break

        # If we have count but no details, create generic entries
        if count > 0 and not plates:
            for i in range(count):
                plates.append({
                    'plate_id': f'plate_{i+1}',
                    'plate_number': f'UNKNOWN_{i+1}',
                    'confidence': 0.8
                })

        return plates

    def _extract_vehicles_detected(self, record: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract vehicles detected from record."""
        vehicles = []

        # Try to get vehicles count
        count_fields = ['vehicles_detected', 'VEHICLES_DETECTED', 'vehicle_count', 'VEHICLE_COUNT']
        count = 0
        for field in count_fields:
            if field in record and record[field] is not None:
                try:
                    count = int(record[field])
                    break
                except (ValueError, TypeError):
                    continue

        # If we have detailed vehicle information
        vehicle_fields = ['vehicles', 'VEHICLES', 'detected_vehicles', 'DETECTED_VEHICLES']
        for field in vehicle_fields:
            if field in record and isinstance(record[field], list):
                for vehicle in record[field]:
                    if isinstance(vehicle, dict):
                        vehicles.append(vehicle)
                    elif isinstance(vehicle, str):
                        vehicles.append({'description': vehicle})
                break

        # If we have count but no details, create generic entries
        if count > 0 and not vehicles:
            for i in range(count):
                vehicles.append({
                    'vehicle_id': f'vehicle_{i+1}',
                    'vehicle_type': 'unknown',
                    'confidence': 0.8
                })

        return vehicles

    def _extract_duration_seconds(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract duration in seconds from record."""
        for field in ['duration_seconds', 'DURATION_SECONDS', 'duration', 'DURATION', 'time_span']:
            if field in record and record[field] is not None:
                try:
                    return int(float(record[field]))
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_confidence_score(self, record: Dict[str, Any]) -> Optional[float]:
        """Extract confidence score from record."""
        for field in ['confidence_score', 'CONFIDENCE_SCORE', 'confidence', 'CONFIDENCE', 'score', 'SCORE']:
            if field in record and record[field] is not None:
                try:
                    score = float(record[field])
                    # Ensure score is between 0 and 1
                    return max(0.0, min(1.0, score))
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_alert_level(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract alert level from record."""
        for field in ['alert_level', 'ALERT_LEVEL', 'level', 'LEVEL', 'priority', 'PRIORITY']:
            if field in record and record[field]:
                level = str(record[field]).strip().upper()
                # Normalize alert level
                if level in ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']:
                    return level
                elif level in ['EMERGENCY', 'SEVERE']:
                    return 'CRITICAL'
                elif level in ['WARNING', 'WARN']:
                    return 'MEDIUM'
                elif level in ['NOTICE', 'INFORMATION']:
                    return 'LOW'
                else:
                    return level
        return None

    def _extract_description(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract description from record."""
        for field in ['description', 'DESCRIPTION', 'details', 'DETAILS', 'summary', 'SUMMARY']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

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
            '%Y-%m-%d %H:%M:%S.%f',
            '%d/%m/%Y %H:%M:%S.%f',
            '%m/%d/%Y %H:%M:%S.%f',
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

    def _normalize_event_type(self, event_type: str) -> str:
        """
        Normalize event type to standard values.

        Args:
            event_type: Event type string

        Returns:
            Normalized event type
        """
        if not event_type:
            return 'UNKNOWN'

        event_type_upper = event_type.upper().strip()

        # Map various event type values to standard ones
        if any(t in event_type_upper for t in ['MOTION', 'MOVEMENT']):
            return 'MOTION_DETECTED'
        elif 'FACE' in event_type_upper or 'FACIAL' in event_type_upper:
            return 'FACIAL_RECOGNITION'
        elif 'LICENSE' in event_type_upper or 'PLATE' in event_type_upper:
            return 'LICENSE_PLATE_DETECTION'
        elif 'VEHICLE' in event_type_upper:
            return 'VEHICLE_DETECTION'
        elif 'PERSON' in event_type_upper or 'PEOPLE' in event_type_upper:
            return 'PERSON_DETECTION'
        elif 'LOITERING' in event_type_upper:
            return 'LOITERING_DETECTED'
        elif 'INTRUSION' in event_type_upper or 'TRESPASS' in event_type_upper:
            return 'INTRUSION_DETECTED'
        elif 'ABANDONED' in event_type_upper:
            return 'ABANDONED_OBJECT_DETECTED'
        elif 'TRIPWIRE' in event_type_upper:
            return 'TRIPWIRE_CROSSED'
        elif 'INTRUSION' in event_type_upper:
            return 'INTRUSION_DETECTED'
        else:
            return event_type_upper

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed surveillance data into the target system.

        Args:
            transformed_data: List of transformed surveillance records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No surveillance data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file

            output_file = self.config.get('output_file', 'data/surveillance_ingested.json')
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

            # Merge with new data (avoid duplicates based on event_id)
            existing_event_ids = {record.get('event_id') for record in existing_data if record.get('event_id')}
            new_records = [record for record in transformed_data if record.get('event_id') not in existing_event_ids]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new surveillance records. Total: {len(all_data)}")
            else:
                self.logger.info("No new surveillance records to load (all are duplicates)")

            # Here we would normally insert into database
            self.logger.info(f"Successfully loaded {len(transformed_data)} surveillance records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load surveillance data: {str(e)}")
            return IngestionStatus.FAILED