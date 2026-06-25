import httpx
import os
from pathlib import Path

TIKTOK_API_BASE = "https://open.tiktokapis.com/v2"

def upload_video_tiktok(video_path: Path, caption: str) -> bool:
    access_token = os.getenv("TIKTOK_ACCESS_TOKEN")
    open_id = os.getenv("TIKTOK_OPEN_ID")

    if not access_token or not open_id:
        print("⚠️ TikTok: TIKTOK_ACCESS_TOKEN o TIKTOK_OPEN_ID non configurati")
        return False

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    init_resp = httpx.post(
        f"{TIKTOK_API_BASE}/post/publish/video/init/",
        headers=headers,
        json={
            "post_info": {
                "title": caption[:150],
                "privacy_level": "PUBLIC_TO_EVERYONE",
                "disable_duet": False,
                "disable_comment": False,
                "disable_stitch": False,
                "video_cover_timestamp_ms": 1000,
            },
            "source_info": {
                "source": "FILE_UPLOAD",
                "video_size": video_path.stat().st_size,
                "chunk_size": video_path.stat().st_size,
                "total_chunk_count": 1,
            },
        },
    ).json()

    if "error" in init_resp:
        print(f"❌ TikTok init error: {init_resp['error']}")
        return False

    upload_url = init_resp["data"]["upload_url"]
    publish_id = init_resp["data"]["publish_id"]

    with open(video_path, "rb") as f:
        video_data = f.read()

    upload_resp = httpx.put(
        upload_url,
        content=video_data,
        headers={
            "Content-Type": "video/mp4",
            "Content-Length": str(len(video_data)),
            "Content-Range": f"bytes 0-{len(video_data)-1}/{len(video_data)}",
        },
        timeout=120,
    )

    if upload_resp.status_code not in (200, 206):
        print(f"❌ TikTok upload fallito: {upload_resp.status_code}")
        return False

    print(f"✅ TikTok: video pubblicato (publish_id: {publish_id})")
    return True
