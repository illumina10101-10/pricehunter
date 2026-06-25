import hashlib
import hmac
import time
import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "products.json"

def generate_ali_sign(params: dict, app_secret: str) -> str:
    """Genera la firma HMAC per le API AliExpress."""
    sorted_params = sorted(params.items())
    sign_string = app_secret + "".join(f"{k}{v}" for k, v in sorted_params) + app_secret
    h = hmac.new(
        app_secret.encode("utf-8"),
        sign_string.encode("utf-8"),
        hashlib.md5
    )
    return h.hexdigest().upper()

def load_existing_products() -> list[dict]:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return []

def save_products(products: list[dict]) -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(products, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"✅ Salvati {len(products)} prodotti in {DATA_FILE}")

def merge_products(existing: list[dict], new_products: list[dict]) -> list[dict]:
    """Unisce vecchi e nuovi prodotti, aggiornando quelli esistenti per id."""
    existing_map = {p["id"]: p for p in existing}
    for p in new_products:
        existing_map[p["id"]] = p
    return list(existing_map.values())
