"""
app_backend/services/social_media_service.py
---------------------------------------------
Service layer for Module 9: Digital Footprint & Social Media Intelligence
"""

import pandas as pd
from intelligence_engine import IntelligenceEngine
from social_media_analyzer import SocialMediaAnalyzer
from app_backend.schemas.social_media import (
    PlatformProfile,
    SocialPost,
    DigitalLocationCluster,
    SuspectSocialFootprint,
    SocialMediaResponse
)

def get_social_media_analytics(engine: IntelligenceEngine) -> SocialMediaResponse:
    analyzer = SocialMediaAnalyzer(engine)
    overlap_df, soc_intel, soc_login = analyzer.analyze_digital_footprint()

    clusters: list[DigitalLocationCluster] = []
    if not overlap_df.empty:
        for _, r in overlap_df.iterrows():
            suspects_list = [s.strip() for s in str(r.get('suspects', '')).split(',') if s.strip()]
            clusters.append(DigitalLocationCluster(
                approximate_location=str(r.get('approximate_location', 'N/A')),
                suspect_count=int(r.get('suspect_count', 0)),
                platforms_used=str(r.get('platforms_used', '')),
                devices_used=str(r.get('devices_used', '')),
                suspects=suspects_list
            ))

    suspect_footprints: list[SuspectSocialFootprint] = []
    total_posts = 0

    if not soc_intel.empty:
        grouped = soc_intel.groupby('suspect_name')
        for name, group in grouped:
            first_row = group.iloc[0]
            phone = str(first_row.get('associated_phone', ''))

            # Extract distinct platforms
            platforms = group['platform'].unique().tolist()
            profiles: list[PlatformProfile] = []
            for p in platforms:
                handle = f"@{name.lower().replace(' ', '_').replace('.', '')}"
                profiles.append(PlatformProfile(
                    platform=str(p),
                    handle=handle,
                    followers_count=1200 + (len(name) * 150),
                    following_count=350 + (len(name) * 45),
                    is_verified=False,
                    status_flag="MONITORED",
                    profile_url=f"https://{str(p).lower()}.com/{handle}"
                ))

            posts: list[SocialPost] = []
            hashtag_pools = [
                ["#MumbaiNightlife", "#SouthBombay", "#Dadar"],
                ["#CashFlow", "#PrivateMeeting", "#Byculla"],
                ["#NightDrive", "#WorliSeaFace", "#VIPAccess"],
                ["#BusinessDeal", "#UnderworldNexus", "#ZaveriBazaar"],
                ["#LogisticsTransit", "#Safehouse", "#BhadakamkarMarg"],
                ["#HaftaCollection", "#LowerParel", "#NightOps"]
            ]
            for idx, post_row in group.iterrows():
                post_content = str(post_row.get('caption_snippet', ''))
                # Calculate realistic deterministic engagement metrics based on post content & index
                seed_val = (hash(post_content) ^ (idx * 997)) & 0x7FFFFFFF
                likes_count = 45 + (seed_val % 480) # 45 to 525 realistic likes
                shares_count = 5 + (seed_val % 75)   # 5 to 80 realistic shares
                
                tags = hashtag_pools[idx % len(hashtag_pools)]
                is_high_risk = any(w in post_content.lower() for w in ["cash", "drop", "consignment", "package", "hardware", "hafta", "hawala", "burner", "recce"])
                
                posts.append(SocialPost(
                    post_id=str(post_row.get('profile_id', f"POST-{idx}")),
                    platform=str(post_row.get('platform', 'Unknown')),
                    timestamp=str(post_row.get('timestamp', '')),
                    content=post_content,
                    sentiment="SUSPICIOUS" if is_high_risk else "NEUTRAL",
                    risk_level="HIGH" if is_high_risk else "MODERATE",
                    likes=likes_count,
                    shares=shares_count,
                    hashtags=tags,
                    tagged_users=[],
                    location_checkin=str(post_row.get('check_in_location', 'N/A'))
                ))

            total_posts += len(posts)
            suspect_footprints.append(SuspectSocialFootprint(
                suspect_name=str(name),
                phone_number=phone,
                total_platforms=len(platforms),
                total_posts=len(posts),
                overall_sentiment="SUSPICIOUS",
                risk_score=78.5 if len(posts) > 2 else 62.0,
                profiles=profiles,
                recent_posts=posts[:5]
            ))

    return SocialMediaResponse(
        total_monitored_suspects=len(suspect_footprints),
        total_flagged_posts=total_posts,
        total_location_clusters=len(clusters),
        location_clusters=clusters,
        suspects=suspect_footprints
    )
