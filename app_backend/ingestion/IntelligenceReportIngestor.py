"""
app_backend/ingestion/IntelligenceReportIngestor.py
--------------------------------------------------
Intelligence Report Connector for ingesting intelligence reports.
Handles extraction, transformation, and loading of intelligence report records.
"""

import json
import re
from typing import Dict, Any, List, Optional
from datetime import datetime
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class IntelligenceReportIngestor(BaseIngestor):
    """
    Connector for ingesting intelligence reports from various sources.
    Supports PDF, DOCX, JSON, CSV, email, and document management systems.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Intelligence Report ingestor.

        Args:
            config: Configuration containing:
                - source_type: 'json', 'csv', 'email', 'document_repository', 'api', or 'file_watch'
                - file_path: Path to source file or directory (for file-based sources)
                - api_endpoint: API endpoint (for API sources)
                - email_config: Email connection configuration (for email sources)
                - document_repo_config: Document repository configuration (for SharePoint, etc.)
                - file_types: List of file types to process (pdf, docx, txt, etc.)
                - keywords: Intelligence keywords to highlight
                - classification_levels: Classification levels to process
                - batch_size: Number of records to process per batch
                - polling_interval: How often to check for new data (seconds)
        """
        super().__init__(DataSourceType.INTELLIGENCE_REPORT, config)
        self.source_config = config.get('source', {})
        self.file_types = config.get('file_types', ['.pdf', '.docx', '.txt', '.json'])
        self.keywords = config.get('keywords', [])
        self.classification_levels = config.get('classification_levels', ['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET'])
        self.batch_size = config.get('batch_size', 50)
        self.polling_interval = config.get('polling_interval', 300)  # 5 minutes
        self.processed_files = set()  # Track processed files to avoid re-processing
        self.last_scan_time = None

    def connect(self) -> bool:
        """
        Establish connection to intelligence report data source.

        Returns:
            bool: True if connection successful
        """
        try:
            source_type = self.source_config.get('type', 'file')

            if source_type == 'file_watch':
                # Validate directory to watch
                import os
                watch_dir = self.source_config.get('directory_path')
                if not watch_dir or not os.path.exists(watch_dir):
                    self.logger.error(f"Intelligence report watch directory not found: {watch_dir}")
                    return False
                self.logger.info(f"Connected to intelligence report file watch source: {watch_dir}")

            elif source_type == 'json':
                # Validate JSON file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"Intelligence report JSON file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to intelligence report JSON source: {file_path}")

            elif source_type == 'csv':
                # Validate CSV file exists
                import os
                file_path = self.source_config.get('file_path')
                if not file_path or not os.path.exists(file_path):
                    self.logger.error(f"Intelligence report CSV file not found: {file_path}")
                    return False
                self.logger.info(f"Connected to intelligence report CSV source: {file_path}")

            elif source_type == 'email':
                # Validate email configuration
                email_config = self.source_config.get('email_config', {})
                required_fields = ['server', 'username', 'password']
                if not all(field in email_config for field in required_fields):
                    self.logger.error("Intelligence report email configuration incomplete")
                    return False
                self.logger.info("Connected to intelligence report email source")

            elif source_type == 'document_repository':
                # Validate document repository configuration
                doc_repo_config = self.source_config.get('document_repo_config', {})
                if not doc_repo_config:
                    self.logger.error("Intelligence report document repository configuration not provided")
                    return False
                self.logger.info("Connected to intelligence report document repository source")

            elif source_type == 'api':
                # Validate API endpoint
                api_endpoint = self.source_config.get('api_endpoint')
                if not api_endpoint:
                    self.logger.error("Intelligence report API endpoint not configured")
                    return False
                self.logger.info(f"Connected to intelligence report API source: {api_endpoint}")

            else:
                self.logger.error(f"Unsupported intelligence report source type: {source_type}")
                return False

            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to intelligence report source: {str(e)}")
            return False

    def disconnect(self) -> bool:
        """
        Close connection to intelligence report data source.

        Returns:
            bool: True if disconnection successful
        """
        # For file/email/repository sources, cleanup connections here
        self.logger.info("Disconnected from intelligence report source")
        return True

    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract intelligence report data from the source.

        Returns:
            List of raw intelligence report records
        """
        try:
            source_type = self.source_config.get('type', 'file')

            if source_type == 'file_watch':
                return self._extract_from_file_watch()
            elif source_type == 'json':
                return self._extract_from_json()
            elif source_type == 'csv':
                return self._extract_from_csv()
            elif source_type == 'email':
                return self._extract_from_email()
            elif source_type == 'document_repository':
                return self._extract_from_document_repository()
            elif source_type == 'api':
                return self._extract_from_api()
            else:
                self.logger.error(f"Unsupported intelligence report source type for extraction: {source_type}")
                return []

        except Exception as e:
            self.logger.error(f"Failed to extract intelligence report data: {str(e)}")
            return []

    def _extract_from_file_watch(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from watched directory."""
        records = []
        watch_dir = self.source_config.get('directory_path')
        file_types = self.source_config.get('file_types', self.file_types)
        include_subdirs = self.source_config.get('include_subdirectories', True)

        try:
            import os
            from pathlib import Path

            # Walk through directory
            if include_subdirs:
                files_to_process = []
                for root, dirs, files in os.walk(watch_dir):
                    for file in files:
                        file_path = os.path.join(root, file)
                        if any(file.lower().endswith(ext.lower()) for ext in file_types):
                            files_to_process.append(file_path)
            else:
                # Only process files in top-level directory
                files_to_process = [
                    os.path.join(watch_dir, f)
                    for f in os.listdir(watch_dir)
                    if os.path.isfile(os.path.join(watch_dir, f)) and
                    any(f.lower().endswith(ext.lower()) for ext in file_types)
                ]

            # Filter out already processed files
            new_files = [f for f in files_to_process if f not in self.processed_files]

            for file_path in new_files:
                try:
                    file_record = self._process_intelligence_file(file_path)
                    if file_record:
                        records.append(file_record)
                        self.processed_files.add(file_path)
                except Exception as e:
                    self.logger.error(f"Failed to process intelligence file {file_path}: {str(e)}")
                    continue

            self.logger.info(f"Extracted {len(records)} intelligence report files from watch directory")
            self.last_scan_time = datetime.utcnow()
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract from file watch directory: {str(e)}")
            return []

    def _extract_from_json(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from JSON file."""
        file_path = self.source_config.get('file_path')

        try:
            with open(file_path, 'r', encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)

            # Handle different JSON structures
            if isinstance(data, list):
                records = data
            elif isinstance(data, dict):
                # Look for common keys containing the array of records
                for key in ['intelligence_reports', 'reports', 'records', 'data']:
                    if key in data and isinstance(data[key], list):
                        records = data[key]
                        break
                else:
                    # Assume the dict itself is a single record
                    records = [data]
            else:
                records = []

            self.logger.info(f"Extracted {len(records)} intelligence report records from JSON")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract intelligence report data from JSON: {str(e)}")
            return []

    def _extract_from_csv(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from CSV file."""
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

            self.logger.info(f"Extracted {len(records)} intelligence report records from CSV")
            return records

        except Exception as e:
            self.logger.error(f"Failed to extract intelligence report data from CSV: {str(e)}")
            return []

    def _extract_from_email(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from email."""
        # This would typically connect to an email server and process messages
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Intelligence report email extraction not yet implemented - returning empty list")
        return []

    def _extract_from_document_repository(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from document repository."""
        # This would typically connect to SharePoint, Documentum, etc.
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Intelligence report document repository extraction not yet implemented - returning empty list")
        return []

    def _extract_from_api(self) -> List[Dict[str, Any]]:
        """Extract intelligence report data from API endpoint."""
        # This would typically make an HTTP request to the API
        # For now, we'll return empty list and log that this needs implementation
        self.logger.warning("Intelligence report API extraction not yet implemented - returning empty list")
        return []

    def _process_intelligence_file(self, file_path: str) -> Optional[Dict[str, Any]]:
        """
        Process a single intelligence report file.

        Args:
            file_path: Path to the intelligence report file

        Returns:
            Processed intelligence report record or None if processing failed
        """
        try:
            import os
            from pathlib import Path

            file_name = os.path.basename(file_path)
            file_ext = Path(file_path).suffix.lower()

            # Get file stats
            stat = os.stat(file_path)
            file_size = stat.st_size
            modified_time = datetime.fromtimestamp(stat.st_mtime).isoformat()

            # Extract text content based on file type
            content_text = ""
            metadata = {}

            if file_ext == '.txt':
                content_text = self._extract_text_from_txt(file_path)
            elif file_ext == '.json':
                content_text, metadata = self._extract_text_from_json(file_path)
            elif file_ext == '.pdf':
                content_text = self._extract_text_from_pdf(file_path)
            elif file_ext == '.docx':
                content_text = self._extract_text_from_docx(file_path)
            else:
                # For unsupported types, try to read as text
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content_text = f.read()
                except:
                    content_text = ""

            if not content_text.strip():
                self.logger.warning(f"No text content extracted from {file_path}")
                return None

            # Analyze content for intelligence value
            intelligence_analysis = self._analyze_intelligence_content(content_text)

            # Create standardized intelligence report record
            transformed_record = {
                # Report identification
                'report_id': self._generate_report_id(file_path, file_name),
                'report_title': self._extract_report_title(file_name, content_text),
                'report_type': self._determine_report_type(file_ext, content_text),
                'classification_level': self._determine_classification_level(content_text),
                'report_date': modified_time,  # Use file modification date as report date

                # Source information
                'source_file_path': file_path,
                'source_file_name': file_name,
                'source_file_size': file_size,
                'source_file_type': file_ext[1:] if file_ext.startswith('.') else file_ext,  # Remove leading dot
                'source_system': 'Intelligence_Report',

                # Content
                'content_text': content_text[:5000],  # Limit content size for storage
                'content_length': len(content_text),
                'content_hash': self._calculate_content_hash(content_text),

                # Intelligence analysis
                'keywords_found': intelligence_analysis['keywords_found'],
                'relevance_score': intelligence_analysis['relevance_score'],
                'threat_indicators': intelligence_analysis['threat_indicators'],
                'entities_mentioned': intelligence_analysis['entities_mentioned'],
                'summary': intelligence_analysis['summary'],

                # Metadata from file (if any)
                'metadata': metadata,

                # Processing information
                'processed_timestamp': datetime.utcnow().isoformat(),
                'processing_version': '1.0',

                # Raw data reference
                'source_record_id': file_path,
                'raw_data_available': True
            }

            return transformed_record

        except Exception as e:
            self.logger.error(f"Error processing intelligence file {file_path}: {str(e)}")
            return None

    def _extract_text_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file."""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        except Exception as e:
            self.logger.error(f"Failed to read TXT file {file_path}: {str(e)}")
            return ""

    def _extract_text_from_json(self, file_path: str) -> tuple[str, Dict[str, Any]]:
        """Extract text and metadata from JSON file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Extract text content
            text_content = ""
            if isinstance(data, dict):
                # Look for common text fields
                text_fields = ['content', 'text', 'body', 'description', 'summary', 'report']
                for field in text_fields:
                    if field in data and isinstance(data[field], str):
                        text_content = data[field]
                        break
                # If no text field found, convert entire JSON to string
                if not text_content:
                    text_content = json.dumps(data, indent=2)
            elif isinstance(data, list):
                text_content = json.dumps(data, indent=2)
            else:
                text_content = str(data)

            text_content = str(data)

            # Extract metadata
            metadata = {}
            if isinstance(data, dict):
                # Exclude content fields from metadata
                content_fields = ['content', 'text', 'body', 'description', 'summary', 'report']
                for key, value in data.items():
                    if key not in content_fields:
                        metadata[key] = value

            return text_content, metadata
        except Exception as e:
            self.logger.error(f"Failed to read JSON file {file_path}: {str(e)}")
            return "", {}

    def _extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file."""
        try:
            # Try to import PyPDF2 or pdfplumber
            try:
                import PyPDF2
                text = ""
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    for page in pdf_reader.pages:
                        text += page.extract_text() + "\n"
                return text
            except ImportError:
                try:
                    import pdfplumber
                    text = ""
                    with pdfplumber.open(file_path) as pdf:
                        for page in pdf.pages:
                            text += page.extract_text() + "\n"
                    return text
                except ImportError:
                    self.logger.warning("PDF extraction libraries not available")
                    return f"[PDF CONTENT NOT AVAILABLE: {file_path}]"
        except Exception as e:
            self.logger.error(f"Failed to extract text from PDF file {file_path}: {str(e)}")
            return f"[PDF EXTRACTION FAILED: {str(e)}]"

    def _extract_text_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file."""
        try:
            # Try to import python-docx
            try:
                import docx
                doc = docx.Document(file_path)
                text = ""
                for paragraph in doc.paragraphs:
                    text += paragraph.text + "\n"
                return text
            except ImportError:
                self.logger.warning("DOCX extraction library not available")
                return f"[DOCX CONTENT NOT AVAILABLE: {file_path}]"
        except Exception as e:
            self.logger.error(f"Failed to extract text from DOCX file {file_path}: {str(e)}")
            return f"[DOCX EXTRACTION FAILED: {str(e)}]"

    def _analyze_intelligence_content(self, content: str) -> Dict[str, Any]:
        """
        Analyze intelligence report content for keywords, threats, and relevance.

        Args:
            content: Text content of the intelligence report

        Returns:
            Dictionary containing analysis results
        """
        content_lower = content.lower()

        # Find keywords
        keywords_found = []
        for keyword in self.keywords:
            if keyword.lower() in content_lower:
                keywords_found.append(keyword)

        # Calculate relevance score based on keyword matches
        max_keyword_score = len(self.keywords) if self.keywords else 1
        keyword_score = len(keywords_found) / max_keyword_score if max_keyword_score > 0 else 0

        # Detect threat indicators
        threat_indicators = []
        threat_patterns = [
            r'\b(?:attack|bomb|explosive|weapon|gun|knife|terror|jihad)\b',
            r'\b(?:kidnap|extortion|blackmail|ransom)\b',
            r'\b(?:drug|narcotic|cocaine|heroin|meth|cannabis)\b',
            r'\b(?:fraud|scam|money.laundering|emezzlement)\b',
            r'\b(?:cyber.attack|hacking|breach|malware|ransomware)\b',
            r'\b(?:riot|protest|demonstration|unrest|violence)\b'
        ]

        for pattern in threat_patterns:
            matches = re.findall(pattern, content_lower, re.IGNORECASE)
            if matches:
                threat_indicators.extend(list(set(matches)))  # Remove duplicates

        # Extract entities (simplified - in reality would use NER)
        entities_mentioned = self._extract_entities_simple(content)

        # Calculate overall relevance score
        relevance_score = min(1.0, keyword_score * 0.6 + min(len(threat_indicators) / 10, 0.4))

        # Generate summary (first 200 chars)
        summary = content[:200].strip() + ("..." if len(content) > 200 else "")

        return {
            'keywords_found': keywords_found,
            'relevance_score': relevance_score,
            'threat_indicators': list(set(threat_indicators)),  # Remove duplicates
            'entities_mentioned': entities_mentioned,
            'summary': summary
        }

    def _extract_entities_simple(self, content: str) -> List[Dict[str, str]]:
        """
        Simple entity extraction from content (placeholder for NER).

        Args:
            content: Text content to analyze

        Returns:
            List of entity dictionaries
        """
        entities = []

        # Simple pattern-based extraction for common entities
        # Phone numbers
        phone_pattern = r'\b(?:\+91[-\s]?)?[6-9]\d{9}\b'
        phones = re.findall(phone_pattern, content)
        for phone in set(phones):  # Remove duplicates
            entities.append({
                'type': 'PHONE_NUMBER',
                'value': phone,
                'confidence': 0.9
            })

        # Email addresses
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, content)
        for email in set(emails):  # Remove duplicates
            entities.append({
                'type': 'EMAIL_ADDRESS',
                'value': email,
                'confidence': 0.9
            })

        # Currency amounts
        currency_pattern = r'\b(?:₹|Rs\.?|INR)\s*[\d,]+(?:\.\d{2})?\b'
        currencies = re.findall(currency_pattern, content)
        for currency in set(currencies):  # Remove duplicates
            entities.append({
                'type': 'CURRENCY_AMOUNT',
                'value': currency,
                'confidence': 0.8
            })

        # Dates (simple patterns)
        date_patterns = [
            r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',
            r'\b\d{2,4}[/-]\d{1,2}[/-]\d{1,2}\b'
        ]
        for pattern in date_patterns:
            dates = re.findall(pattern, content)
            for date in set(dates):  # Remove duplicates
                entities.append({
                    'type': 'DATE',
                    'value': date,
                    'confidence': 0.7
                })

        return entities

    def _generate_report_id(self, file_path: str, file_name: str) -> str:
        """Generate a unique report ID."""
        import hashlib
        # Use file path and name to generate deterministic ID
        id_string = f"{file_path}_{file_name}"
        return hashlib.md5(id_string.encode()).hexdigest()[:12].upper()

    def _extract_report_title(self, file_name: str, content: str) -> str:
        """Extract or generate report title."""
        # Try to get title from filename (remove extension)
        title_without_ext = file_name.rsplit('.', 1)[0] if '.' in file_name else file_name

        # Try to find title in first line of content
        first_line = content.split('\n')[0].strip() if content else ""
        if first_line and len(first_line) < 200:  # Reasonable title length
            return first_line

        # Fallback to filename
        return title_without_ext

    def _determine_report_type(self, file_ext: str, content: str) -> str:
        """Determine report type based on file extension and content."""
        # Map file extensions to report types
        ext_map = {
            '.pdf': 'PDF_REPORT',
            '.docx': 'DOCUMENT_REPORT',
            '.txt': 'TEXT_REPORT',
            '.json': 'JSON_REPORT',
            '.csv': 'CSV_REPORT'
        }

        base_type = ext_map.get(file_ext.lower(), 'UNKNOWN_REPORT')

        # Check content for specific report types
        content_lower = content.lower()
        if 'daily' in content_lower and 'summary' in content_lower:
            return 'DAILY_SUMMARY'
        elif 'weekly' in content_lower and 'summary' in content_lower:
            return 'WEEKLY_SUMMARY'
        elif 'threat' in content_lower and 'assessment' in content_lower:
            return 'THREAT_ASSESSMENT'
        elif 'incident' in content_lower and 'report' in content_lower:
            return 'INCIDENT_REPORT'
        elif 'investigation' in content_lower:
            return 'INVESTIGATION_REPORT'
        elif 'intelligence' in content_lower and 'brief' in content_lower:
            return 'INTELLIGENCE_BRIEF'

        return base_type

    def _determine_classification_level(self, content: str) -> str:
        """Determine classification level based on content."""
        content_upper = content.upper()

        # Check for explicit classification markings
        for level in self.classification_levels:
            if level in content_upper:
                return level

        # Check for common classification indicators
        if any(mark in content_upper for mark in ['TOP SECRET', 'TS']):
            return 'TOP_SECRET'
        elif any(mark in content_upper for mark in ['SECRET', 'S']):
            return 'SECRET'
        elif any(mark in content_upper for mark in ['CONFIDENTIAL', 'C']):
            return 'CONFIDENTIAL'
        elif any(mark in content_upper for mark in ['RESTRICTED', 'R']):
            return 'RESTRICTED'
        elif any(mark in content_upper for mark in ['UNCLASSIFIED', 'U']):
            return 'UNCLASSIFIED'

        # Default to UNCLASSIFIED if no markings found
        return 'UNCLASSIFIED'

    def _calculate_content_hash(self, content: str) -> str:
        """Calculate hash of content for change detection."""
        import hashlib
        return hashlib.sha256(content.encode('utf-8')).hexdigest()

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed intelligence report data into the target system.

        Args:
            transformed_data: List of transformed intelligence report records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No intelligence report data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file

            output_file = self.config.get('output_file', 'data/intelligence_reports_ingested.json')
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

            # Merge with new data (avoid duplicates based on report_id)
            existing_report_ids = {record.get('report_id') for record in existing_data if record.get('report_id')}
            new_records = [record for record in transformed_data if record.get('report_id') not in existing_report_ids]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new intelligence report records. Total: {len(all_data)}")
            else:
                self.logger.info("No new intelligence report records to load (all are duplicates)")

            # Here we would normally insert into database
            self.logger.info(f"Successfully loaded {len(transformed_data)} intelligence report records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load intelligence report data: {str(e)}")
            return IngestionStatus.FAILED