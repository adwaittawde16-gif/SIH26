"""
app_backend/ingestion/SocialMediaIngestor.py
--------------------------------------------
Social Media Connector for ingesting social media data.
Handles extraction, transformation, and loading of social media records.
"""

import json
import re
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import logging

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus

logger = logging.getLogger(__name__)

class SocialMediaIngestor(BaseIngestor):
    """
    Connector for ingesting social media data from various platforms.
    Supports Twitter/X, Facebook, Instagram, YouTube, Telegram, and other platforms.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize Social Media ingestor.

        Args:
            config: Configuration containing:
                - platform: 'twitter', 'facebook', 'instagram', 'youtube', 'telegram', etc.
                - api_credentials: Dictionary with API keys/tokens for the platform
                - keywords: List of keywords to monitor
                - hashtags: List of hashtags to monitor
                - accounts: List of account usernames/IDs to monitor
                - geolocation: Geographic bounds for location-based monitoring
                - language: Language filter for content
                - since_date: Only collect posts since this date
                - batch_size: Number of records to process per batch
                - polling_interval: How often to check for new data (seconds)
        """
        super().__init__(DataSourceType.SOCIAL_MEDIA, config)
        self.platform = config.get('platform', 'twitter').lower()
        self.api_credentials = config.get('api_credentials', {})
        self.keywords = config.get('keywords', [])
        self.hashtags = config.get('hashtags', [])
        self.accounts = config.get('accounts', [])
        self.geolocation = config.get('geolocation', {})
        self.language = config.get('language', 'en')
        self.since_date = config.get('since_date')
        self.batch_size = config.get('batch_size', 100)
        self.polling_interval = config.get('polling_interval', 60)  # 1 minute
        self.last_since_id = None  # For Twitter-style pagination
        self.last_processed_timestamp = None

    def connect(self) -> bool:
        """
        Establish connection to social media data source.

        Returns:
            bool: True if connection successful
        """
        try:
            # Validate platform-specific credentials
            if not self._validate_credentials():
                self.logger.error(f"Invalid or missing credentials for {self.platform}")
                return False

            # Test connection (platform-specific)
            if not self._test_connection():
                self.logger.error(f"Failed to establish connection to {self.platform} API")
                return False

            self.logger.info(f"Connected to {self.platform} social media source")
            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to social media source: {str(e)}")
            return False

    def _validate_credentials(self) -> bool:
        """Validate that required credentials are present for the platform."""
        if not self.api_credentials:
            return False

        # Platform-specific credential validation
        if self.platform == 'twitter':
            required_keys = ['bearer_token']  # or api_key/api_secret for v1.1
            return any(key in self.api_credentials for key in required_keys)
        elif self.platform == 'facebook':
            required_keys = ['access_token']
            return all(key in self.api_credentials for key in required_keys)
        elif self.platform == 'instagram':
            required_keys = ['access_token']
            return all(key in self.api_credentials for key in required_keys)
        elif self.platform == 'youtube':
            required_keys = ['api_key']
            return all(key in self.api_credentials for key in required_keys)
        elif self.platform == 'telegram':
            required_keys = ['bot_token']
            return all(key in self.api_credentials for key in required_keys)
        else:
            # For unknown platforms, assume credentials are valid if present
            return len(self.api_credentials) > 0

    def _test_connection(self) -> bool:
        """Test the connection to the social media platform API."""
        # This would make an actual API call to test connectivity
        # For now, we'll simulate success if credentials are present
        return self._validate_credentials()

    def disconnect(self) -> bool:
        """
        Close connection to social media data source.

        Returns:
            bool: True if disconnection successful
        """
        # For API sources, cleanup any open sessions/connections
        self.logger.info(f"Disconnected from {self.platform} social media source")
        return True

    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract social media data from the source.

        Returns:
            List of raw social media records
        """
        try:
            if self.platform == 'twitter':
                return self._extract_from_twitter()
            elif self.platform == 'facebook':
                return self._extract_from_facebook()
            elif self.platform == 'instagram':
                return self._extract_from_instagram()
            elif self.platform == 'youtube':
                return self._extract_from_youtube()
            elif self.platform == 'telegram':
                return self._extract_from_telegram()
            else:
                self.logger.warning(f"Platform {self.platform} not yet implemented for extraction")
                return []

        except Exception as e:
            self.logger.error(f"Failed to extract social media data: {str(e)}")
            return []

    def _extract_from_twitter(self) -> List[Dict[str, Any]]:
        """Extract data from Twitter/X API."""
        # This would make actual API calls to Twitter/X
        # For now, return empty list and log that implementation is needed
        self.logger.warning("Twitter extraction not yet implemented - returning empty list")
        return []

    def _extract_from_facebook(self) -> List[Dict[str, Any]]:
        """Extract data from Facebook API."""
        # This would make actual API calls to Facebook Graph API
        # For now, return empty list and log that implementation is needed
        self.logger.warning("Facebook extraction not yet implemented - returning empty list")
        return []

    def _extract_from_instagram(self) -> List[Dict[str, Any]]:
        """Extract data from Instagram API."""
        # This would make actual API calls to Instagram Graph API
        # For now, return empty list and log that implementation is needed
        self.logger.warning("Instagram extraction not yet implemented - returning empty list")
        return []

    def _extract_from_youtube(self) -> List[Dict[str, Any]]:
        """Extract data from YouTube API."""
        # This would make actual API calls to YouTube Data API
        # For now, return empty list and log that implementation is needed
        self.logger.warning("YouTube extraction not yet implemented - returning empty list")
        return []

    def _extract_from_telegram(self) -> List[Dict[str, Any]]:
        """Extract data from Telegram Bot API."""
        # This would make actual API calls to Telegram Bot API
        # For now, return empty list and log that implementation is needed
        self.logger.warning("Telegram extraction not yet implemented - returning empty list")
        return []

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw social media data into standardized format.

        Args:
            raw_data: List of raw social media records from extract()

        Returns:
            List of transformed social media records in standardized format
        """
        transformed_records = []

        for raw_record in raw_data:
            try:
                transformed_record = self._transform_social_media_record(raw_record)
                if transformed_record:
                    transformed_records.append(transformed_record)
            except Exception as e:
                self.logger.warning(f"Failed to transform social media record: {str(e)}")
                continue

        self.logger.info(f"Transformed {len(transformed_records)} social media records")
        return transformed_records

    def _transform_social_media_record(self, raw_record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Transform a single social media record into standardized format.

        Args:
            raw_record: Raw social media record dictionary

        Returns:
            Transformed social media record dictionary or None if invalid
        """
        try:
            # Standardized social media record format
            transformed = {
                # Post identification
                'post_id': self._extract_post_id(raw_record),
                'platform': self.platform,
                'post_url': self._extract_post_url(raw_record),

                # Timing
                'post_timestamp': self._extract_post_timestamp(raw_record),
                'collected_timestamp': datetime.utcnow().isoformat(),

                # Author information
                'author_id': self._extract_author_id(raw_record),
                'author_username': self._extract_author_username(raw_record),
                'author_display_name': self._extract_author_display_name(raw_record),
                'author_verified': self._extract_author_verified(raw_record),
                'author_followers_count': self._extract_author_followers_count(raw_record),
                'author_following_count': self._extract_author_following_count(raw_record),

                # Content
                'content_text': self._extract_content_text(raw_record),
                'content_type': self._extract_content_type(raw_record),  # text, image, video, link, etc.
                'media_urls': self._extract_media_urls(raw_record),
                'media_description': self._extract_media_description(raw_record),

                # Engagement metrics
                'likes_count': self._extract_likes_count(raw_record),
                'shares_count': self._extract_shares_count(raw_record),
                'comments_count': self._extract_comments_count(raw_record),
                'reactions_count': self._extract_reactions_count(raw_record),

                # Hashtags and mentions
                'hashtags': self._extract_hashtags(raw_record),
                'mentions': self._extract_mentions(raw_record),

                # Location information
                'location': self._extract_location(raw_record),
                'geotag': self._extract_geotag(raw_record),

                # Language and sentiment
                'language': self._extract_language(raw_record),
                'sentiment_score': self._extract_sentiment_score(raw_record),

                # Threat/relevance indicators
                'threat_indicators': self._extract_threat_indicators(raw_record),
                'relevance_score': self._extract_relevance_score(raw_record),

                # Metadata
                'source_record_id': raw_record.get('id') or raw_record.get('post_id'),
                'source_system': f'Social_Media_{self.platform.title()}',
                'ingestion_timestamp': datetime.utcnow().isoformat(),
                'raw_data': raw_record  # Keep original for reference
            }

            # Validate required fields
            if not transformed['post_id']:
                self.logger.warning("Social media record missing post_id, skipping")
                return None

            if not transformed['post_timestamp']:
                self.logger.warning("Social media record missing post_timestamp, skipping")
                return None

            # Filter by relevance score if configured
            min_relevance = self.config.get('min_relevance_score', 0.1)
            if transformed['relevance_score'] < min_relevance:
                self.logger.debug(f"Social media post filtered out due to low relevance: {transformed['relevance_score']}")
                return None

            return transformed

        except Exception as e:
            self.logger.warning(f"Error transforming social media record: {str(e)}")
            return None

    def _extract_post_id(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract post ID from record."""
        # Platform-specific field names
        if self.platform == 'twitter':
            for field in ['id', 'ID', 'tweet_id']:
                if field in record and record[field]:
                    return str(record[field]).strip()
        elif self.platform == 'facebook':
            for field in ['id', 'ID', 'post_id']:
                if field in record and record[field]:
                    return str(record[field]).strip()
        elif self.platform == 'instagram':
            for field in ['id', 'ID', 'media_id']:
                if field in record and record[field]:
                    return str(record[field]).strip()
        elif self.platform == 'youtube':
            for field in ['id', 'ID', 'video_id']:
                if field in record and record[field]:
                    return str(record[field]).strip()
        elif self.platform == 'telegram':
            for field in ['message_id', 'MESSAGE_ID', 'post_id']:
                if field in record and record[field]:
                    return str(record[field]).strip()

        # Generic fallback
        for field in ['post_id', 'POST_ID', 'id', 'ID']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_post_url(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract post URL from record."""
        for field in ['url', 'URL', 'post_url', 'POST_URL', 'link', 'LINK', 'permalink']:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_post_timestamp(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract post timestamp from record."""
        timestamp_fields = [
            'created_at', 'CREATED_AT', 'timestamp', 'TIMESTAMP',
            'posted_at', 'POSTED_AT', 'date', 'DATE', 'time', 'TIME'
        ]

        for field in timestamp_fields:
            if field in record and record[field]:
                return self._normalize_timestamp(str(record[field]))
        return None

    def _extract_author_id(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract author ID from record."""
        author_fields = [
            'user_id', 'USER_ID', 'author_id', 'AUTHOR_ID',
            'from_id', 'FROM_ID', 'sender_id', 'SENDER_ID'
        ]

        for field in author_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_author_username(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract author username from record."""
        username_fields = [
            'username', 'USERNAME', 'screen_name', 'SCREEN_NAME',
            'handle', 'HANDLE', 'from_name', 'FROM_NAME'
        ]

        for field in username_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_author_display_name(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract author display name from record."""
        name_fields = [
            'name', 'NAME', 'display_name', 'DISPLAY_NAME',
            'full_name', 'FULL_NAME', 'from_display_name', 'FROM_DISPLAY_NAME'
        ]

        for field in name_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_author_verified(self, record: Dict[str, Any]) -> Optional[bool]:
        """Extract author verified status from record."""
        verified_fields = [
            'verified', 'VERIFIED', 'is_verified', 'IS_VERIFIED',
            'blue_verified', 'BLUE_VERIFIED'
        ]

        for field in verified_fields:
            if field in record and record[field] is not None:
                value = record[field]
                if isinstance(value, bool):
                    return value
                elif isinstance(value, str):
                    return value.lower() in ['true', 'yes', '1', 'verified']
                elif isinstance(value, int):
                    return value == 1
        return None

    def _extract_author_followers_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract author followers count from record."""
        followers_fields = [
            'followers_count', 'FOLLOWERS_COUNT', 'followers', 'FOLLOWERS',
            'follower_count', 'FOLLOWER_COUNT'
        ]

        for field in followers_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_author_following_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract author following count from record."""
        following_fields = [
            'following_count', 'FOLLOWING_COUNT', 'following', 'FOLLOWING',
            'friends_count', 'FRIENDS_COUNT'
        ]

        for field in following_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_content_text(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract content text from record."""
        content_fields = [
            'text', 'TEXT', 'content', 'CONTENT', 'message', 'MESSAGE',
            'caption', 'CAPTION', 'description', 'DESCRIPTION', 'body', 'BODY'
        ]

        for field in content_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_content_type(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract content type from record."""
        type_fields = [
            'type', 'TYPE', 'content_type', 'CONTENT_TYPE',
            'media_type', 'MEDIA_TYPE', 'post_type', 'POST_TYPE'
        ]

        for field in type_fields:
            if field in record and record[field]:
                content_type = str(record[field]).strip().lower()
                # Normalize content type
                if content_type in ['text', 'image', 'photo', 'video', 'reel', 'story', 'link', 'article']:
                    return content_type
                elif 'video' in content_type:
                    return 'video'
                elif 'image' in content_type or 'photo' in content_type:
                    return 'image'
                elif 'text' in content_type:
                    return 'text'
        return None

    def _extract_media_urls(self, record: Dict[str, Any]) -> List[str]:
        """Extract media URLs from record."""
        media_urls = []

        # Common media URL fields
        media_fields = [
            'media_url', 'MEDIA_URL', 'media_urls', 'MEDIA_URLS',
            'url', 'URL', 'urls', 'URLS', 'attachment', 'ATTACHMENT'
        ]

        for field in media_fields:
            if field in record:
                value = record[field]
                if isinstance(value, str) and value:
                    media_urls.append(value.strip())
                elif isinstance(value, list):
                    for item in value:
                        if isinstance(item, str) and item:
                            media_urls.append(item.strip())
                        elif isinstance(item, dict) and 'url' in item:
                            url_val = item['url']
                            if isinstance(url_val, str) and url_val:
                                media_urls.append(url_val.strip())

        # Extract URLs from text content using regex
        text_content = self._extract_content_text(record) or ""
        url_pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
        urls_found = re.findall(url_pattern, text_content)
        media_urls.extend(urls_found)

        # Remove duplicates while preserving order
        seen = set()
        unique_urls = []
        for url in media_urls:
            if url not in seen:
                seen.add(url)
                unique_urls.append(url)

        return unique_urls

    def _extract_media_description(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract media description from record."""
        desc_fields = [
            'media_description', 'MEDIA_DESCRIPTION', 'alt_text', 'ALT_TEXT',
            'description', 'DESCRIPTION', 'caption', 'CAPTION'
        ]

        for field in desc_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_likes_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract likes count from record."""
        likes_fields = [
            'likes_count', 'LIKES_COUNT', 'likes', 'LIKES', 'favorite_count', 'FAVORITE_COUNT',
            'favourites_count', 'FAVOURITES_COUNT', 'love_count', 'LOVE_COUNT'
        ]

        for field in likes_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_shares_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract shares count from record."""
        shares_fields = [
            'shares_count', 'SHARES_COUNT', 'shares', 'SHARES',
            'retweet_count', 'RETWEET_COUNT', 'repost_count', 'REPOST_COUNT'
        ]

        for field in shares_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_comments_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract comments count from record."""
        comments_fields = [
            'comments_count', 'COMMENTS_COUNT', 'comments', 'COMMENTS',
            'reply_count', 'REPLY_COUNT'
        ]

        for field in comments_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_reactions_count(self, record: Dict[str, Any]) -> Optional[int]:
        """Extract reactions count from record."""
        reactions_fields = [
            'reactions_count', 'REACTIONS_COUNT', 'reactions', 'REACTIONS'
        ]

        for field in reactions_fields:
            if field in record and record[field] is not None:
                try:
                    return int(record[field])
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_hashtags(self, record: Dict[str, Any]) -> List[str]:
        """Extract hashtags from record."""
        hashtags = []

        # Direct hashtags field
        if 'hashtags' in record and isinstance(record['hashtags'], list):
            for tag in record['hashtags']:
                if isinstance(tag, str) and tag:
                    hashtags.append(tag.lower().strip())
        elif 'hashtags' in record and isinstance(record['hashtags'], str):
            # Parse comma/space separated hashtags
            tags = re.split(r'[,|\s]+', record['hashtags'])
            for tag in tags:
                if tag:
                    hashtags.append(tag.lower().strip())

        # Extract hashtags from content text
        text_content = self._extract_content_text(record) or ""
        hashtag_pattern = r'#(\w+)'
        hashtags_found = re.findall(hashtag_pattern, text_content)
        hashtags.extend([tag.lower() for tag in hashtags_found])

        # Remove duplicates while preserving order
        seen = set()
        unique_hashtags = []
        for tag in hashtags:
            if tag not in seen:
                seen.add(tag)
                unique_hashtags.append(tag)

        return unique_hashtags

    def _extract_mentions(self, record: Dict[str, Any]) -> List[str]:
        """Extract mentions from record."""
        mentions = []

        # Direct mentions field
        if 'mentions' in record and isinstance(record['mentions'], list):
            for mention in record['mentions']:
                if isinstance(mention, str) and mention:
                    mentions.append(mention.strip())
        elif 'mentions' in record and isinstance(record['mentions'], str):
            # Parse comma/space separated mentions
            names = re.split(r'[,|\s]+', record['mentions'])
            for name in names:
                if name:
                    mentions.append(name.strip())

        # Extract mentions from content text (platform-specific)
        text_content = self._extract_content_text(record) or ""
        if self.platform == 'twitter':
            mention_pattern = r'@(\w+)'
        elif self.platform == 'facebook':
            mention_pattern = r'@([\w\.]+)'
        elif self.platform == 'instagram':
            mention_pattern = r'@(\w+)'
        else:
            mention_pattern = r'@(\w+)'

        mentions_found = re.findall(mention_pattern, text_content)
        mentions.extend([mention.strip() for mention in mentions_found])

        # Remove duplicates while preserving order
        seen = set()
        unique_mentions = []
        for mention in mentions:
            if mention not in seen:
                seen.add(mention)
                unique_mentions.append(mention)

        return unique_mentions

    def _extract_location(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract location from record."""
        location_fields = [
            'location', 'LOCATION', 'place', 'PLACE', 'city', 'CITY'
        ]

        for field in location_fields:
            if field in record and record[field]:
                return str(record[field]).strip()
        return None

    def _extract_geotag(self, record: Dict[str, Any]) -> Optional[Dict[str, float]]:
        """Extract geotag (coordinates) from record."""
        # Check for coordinates object
        coord_fields = [
            'coordinates', 'COORDINATES', 'geotag', 'GEOTAG',
            'position', 'POSITION', 'location_coords'
        ]

        for field in coord_fields:
            if field in record and isinstance(record[field], dict):
                coord_data = record[field]
                lat_keys = ['latitude', 'lat', 'LATITUDE', 'LAT']
                lng_keys = ['longitude', 'lng', 'lon', 'LONGITUDE', 'LONG']

                lat = lng = None
                for lat_key in lat_keys:
                    if lat_key in coord_data and coord_data[lat_key] is not None:
                        try:
                            lat = float(coord_data[lat_key])
                            break
                        except (ValueError, TypeError):
                            continue

                for lng_key in lng_keys:
                    if lng_key in coord_data and coord_data[lng_key] is not None:
                        try:
                            lng = float(coord_data[lng_key])
                            break
                        except (ValueError, TypeError):
                            continue

                if lat is not None and lng is not None:
                    return {'latitude': lat, 'longitude': lng}

        # Check for separate lat/lng fields
        lat_fields = ['latitude', 'LATITUDE', 'lat', 'LAT']
        lng_fields = ['longitude', 'LONGITUDE', 'lng', 'LON']

        lat = lng = None
        for lat_field in lat_fields:
            if lat_field in record and record[lat_field] is not None:
                try:
                    lat = float(record[lat_field])
                    break
                except (ValueError, TypeError):
                    continue

        for lng_field in lng_fields:
            if lng_field in record and record[lng_field] is not None:
                try:
                    lng = float(record[lng_field])
                    break
                except (ValueError, TypeError):
                    continue

        if lat is not None and lng is not None:
            return {'latitude': lat, 'longitude': lng}

        return None

    def _extract_language(self, record: Dict[str, Any]) -> Optional[str]:
        """Extract language from record."""
        lang_fields = [
            'language', 'LANGUAGE', 'lang', 'LANG'
        ]

        for field in lang_fields:
            if field in record and record[field]:
                lang = str(record[field]).strip().lower()
                # Return standard language codes
                if len(lang) == 2:
                    return lang
                elif lang in ['english', 'eng']:
                    return 'en'
                elif lang in ['hindi', 'hin']:
                    return 'hi'
                elif lang in ['urdu', 'urd']:
                    return 'ur'
        return self.language  # Default to configured language

    def _extract_sentiment_score(self, record: Dict[str, Any]) -> Optional[float]:
        """Extract sentiment score from record."""
        sentiment_fields = [
            'sentiment_score', 'SENTIMENT_SCORE', 'sentiment', 'SENTIMENT',
            'polarity', 'POLARITY', 'emotion_score', 'EMOTION_SCORE'
        ]

        for field in sentiment_fields:
            if field in record and record[field] is not None:
                try:
                    score = float(record[field])
                    # Normalize to -1 to 1 range
                    return max(-1.0, min(1.0, score))
                except (ValueError, TypeError):
                    continue
        return None

    def _extract_threat_indicators(self, record: Dict[str, Any]) -> List[str]:
        """Extract threat indicators from record."""
        indicators = []

        # Direct threat indicators field
        threat_fields = [
            'threat_indicators', 'THREAT_INDICATORS', 'flags', 'FLAGS',
            'alerts', 'ALERTS', 'risk_factors', 'RISK_FACTORS'
        ]

        for field in threat_fields:
            if field in record:
                value = record[field]
                if isinstance(value, list):
                    for item in value:
                        if isinstance(item, str) and item:
                            indicators.append(item.strip().upper())
                elif isinstance(value, str) and value:
                    # Parse comma/space separated indicators
                    items = re.split(r'[,|\s]+', value)
                    for item in items:
                        if item:
                            indicators.append(item.strip().upper())

        # Check content for threat keywords
        text_content = (self._extract_content_text(record) or "").lower()
        threat_keywords = [
            'bomb', 'explosive', 'attack', 'kill', 'terror', 'weapon',
            'gun', 'knife', 'attack', 'murder', 'kidnap', 'extortion',
            'drug', 'narcotics', 'money laundering', 'fraud', 'scam',
            'cyber attack', 'hacking', 'data breach', 'ransomware'
        ]

        for keyword in threat_keywords:
            if keyword in text_content:
                indicators.append(keyword.upper())

        # Remove duplicates while preserving order
        seen = set()
        unique_indicators = []
        for indicator in indicators:
            if indicator not in seen:
                seen.add(indicator)
                unique_indicators.append(indicator)

        return unique_indicators

    def _extract_relevance_score(self, record: Dict[str, Any]) -> float:
        """Calculate relevance score based on configured keywords/hashtags/accounts."""
        score = 0.0
        max_score = 0.0

        # Check keywords
        if self.keywords:
            text_content = (self._extract_content_text(record) or "").lower()
            for keyword in self.keywords:
                max_score += 1.0
                if keyword.lower() in text_content:
                    score += 1.0

        # Check hashtags
        if self.hashtags:
            post_hashtags = self._extract_hashtags(record)
            for hashtag in self.hashtags:
                max_score += 1.0
                if hashtag.lower() in [h.lower() for h in post_hashtags]:
                    score += 1.0

        # Check accounts (if this is about a specific account)
        if self.accounts:
            author_username = self._extract_author_username(record) or ""
            for account in self.accounts:
                max_score += 1.0
                if account.lower() == author_username.lower():
                    score += 1.0

        # Normalize score to 0-1 range
        if max_score > 0:
            return min(1.0, score / max_score)
        else:
            # If no filters configured, return moderate relevance
            return 0.5

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
            '%Y/%m/%d',
            '%a %b %d %H:%M:%S %z %Y',  # Twitter format
            '%a, %d %b %Y %H:%M:%S %z'   # RFC 2822
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

    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed social media data into the target system.

        Args:
            transformed_data: List of transformed social media records

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        if not transformed_data:
            self.logger.warning("No social media data to load")
            return IngestionStatus.SUCCESS

        try:
            # In a real implementation, this would load data into a database
            # For now, we'll simulate by saving to a JSON file

            output_file = self.config.get('output_file', f'data/social_media_{self.platform}_ingested.json')
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

            # Merge with new data (avoid duplicates based on post_id)
            existing_post_ids = {record.get('post_id') for record in existing_data if record.get('post_id')}
            new_records = [record for record in transformed_data if record.get('post_id') not in existing_post_ids]

            if new_records:
                all_data = existing_data + new_records
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(all_data, f, indent=2, default=str)
                self.logger.info(f"Loaded {len(new_records)} new social media records. Total: {len(all_data)}")
            else:
                self.logger.info("No new social media records to load (all are duplicates)")

            # Here we would normally insert into database
            self.logger.info(f"Successfully loaded {len(transformed_data)} social media records into target system")

            return IngestionStatus.SUCCESS

        except Exception as e:
            self.logger.error(f"Failed to load social media data: {str(e)}")
            return IngestionStatus.FAILED