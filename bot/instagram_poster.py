import httpx
import os
from pathlib import Path

GRAPH_API = "https://graph.instagram.com/v19.0"

def upload_reel_instagram(video_path: Path, caption: str, video_url: str) -> bool:
    access_token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    user_id = os.getenv("INSTAGRAM_USER_ID")

    if not access_token or not user_id:
        print("⚠️ Instagram: INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_USER_ID non configurati")
        return False

    container_resp = httpx.post(
        f"{GRAPH_API}/{user_id}/media",
        params={
            "media_type": "REELS",
            "video_url": video_url,
            "caption": caption,
            "access_token": access_token,
        },
        timeout=60,
    ).json()

    if "error" in container_resp:
        print(f"❌ Instagram container error: {container_resp['error']}")
        return False

    container_id = container_resp["id"]

    publish_resp = httpx.post(
        f"{GRAPH_API}/{user_id}/media_publish",
        params={
            "creation_id": container_id,
            "access_token": access_token,
        },
    ).json()

    if "error" in publish_resp:
        print(f"❌ Instagram publish error: {publish_resp['error']}")
        return False

    print(f"✅ Instagram: Reel pubblicato (id: {publish_resp.get('id')})")
    return True
