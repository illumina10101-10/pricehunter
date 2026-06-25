#!/usr/bin/env python3
"""Pubblica l'offerta del giorno su TikTok e Instagram."""
import json
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

from bot.generate_video import create_video
from bot.tiktok_poster import upload_video_tiktok
from bot.instagram_poster import upload_reel_instagram

DATA_FILE = Path(__file__).parent.parent / "data" / "products.json"

def get_top_product() -> dict | None:
    if not DATA_FILE.exists():
        print("❌ data/products.json non trovato")
        return None
    products = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    if not products:
        return None
    return max(products, key=lambda p: p["discount"])

def build_caption(product: dict) -> str:
    total = product["currentPrice"] + product.get("shippingCost", 0)
    return (
        f"🔥 OFFERTA PAZZESCA!\n\n"
        f"{product.get('titleIT', product['title'])}\n\n"
        f"Da €{product['originalPrice']:.2f} → solo €{total:.2f} (-{product['discount']}%!)\n\n"
        f"🛒 Link in bio!\n\n"
        f"#offerte #risparmio #shopping #aliexpress #temu #amazon #pricehunter #deal #sconti"
    )

def run():
    print("📱 Bot social avviato...")

    product = get_top_product()
    if not product:
        print("❌ Nessun prodotto trovato")
        sys.exit(1)

    print(f"🎯 Prodotto scelto: {product.get('titleIT', product['title'])} (-{product['discount']}%)")

    print("🎬 Generazione video...")
    video_path = create_video(product)
    print(f"✅ Video creato: {video_path}")

    caption = build_caption(product)

    upload_video_tiktok(video_path, caption)

    video_url = os.getenv("VIDEO_PUBLIC_URL", "")
    if video_url:
        upload_reel_instagram(video_path, caption, video_url)
    else:
        print("ℹ️ Instagram: imposta VIDEO_PUBLIC_URL nel .env per attivare il post")

if __name__ == "__main__":
    run()
