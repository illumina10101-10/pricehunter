#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")
load_dotenv(Path(__file__).parent / ".env")

from scraper.sources.aliexpress import fetch_products as fetch_ali
from scraper.sources.temu import fetch_products as fetch_temu
from scraper.utils import load_existing_products, save_products, merge_products

def run_scraper():
    print("🚀 PriceHunter Scraper avviato...")

    existing = load_existing_products()
    all_new = []

    app_key = os.getenv("ALIEXPRESS_APP_KEY")
    app_secret = os.getenv("ALIEXPRESS_APP_SECRET")
    tracking_id = os.getenv("ALIEXPRESS_TRACKING_ID", "pricehunter")

    if app_key and app_secret:
        all_new.extend(fetch_ali(app_key, app_secret, tracking_id))
    else:
        print("⚠️ ALIEXPRESS_APP_KEY non configurato — skip")

    all_new.extend(fetch_temu())

    if not all_new:
        print("⚠️ Nessun prodotto trovato. Mantengo i dati esistenti.")
        return

    merged = merge_products(existing, all_new)
    merged.sort(key=lambda p: p["discount"], reverse=True)
    save_products(merged)

    try:
        subprocess.run(["git", "add", "data/products.json"], cwd=Path(__file__).parent.parent, check=True)
        subprocess.run(["git", "commit", "-m", f"data: aggiornamento prodotti ({len(merged)} totali)"],
                      cwd=Path(__file__).parent.parent, check=True)
        subprocess.run(["git", "push"], cwd=Path(__file__).parent.parent, check=True)
        print("✅ Push completato — Vercel ricostruirà il sito automaticamente")
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git push fallito: {e}")

if __name__ == "__main__":
    run_scraper()
