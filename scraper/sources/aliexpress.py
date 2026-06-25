import httpx
import time
from datetime import datetime, timezone
from scraper.utils import generate_ali_sign

CATEGORIES_KEYWORDS = {
    "elettronica":   ["bluetooth earbuds", "smartwatch", "phone holder", "led lamp"],
    "moda":          ["women dress", "men sneakers", "summer t-shirt", "handbag"],
    "casa-cucina":   ["air fryer", "kitchen gadget", "storage box", "pillow"],
    "sport":         ["resistance bands", "yoga mat", "jump rope", "water bottle"],
    "bellezza":      ["vitamin c serum", "face mask", "electric massager", "nail kit"],
    "giocattoli":    ["rc car", "building blocks", "doll", "fidget toy"],
    "animali":       ["dog harness", "cat tree", "pet bowl", "dog toy"],
    "auto-moto":     ["car phone holder", "car vacuum", "car organizer", "dash cam"],
}

BASE_URL = "https://api-sg.aliexpress.com/sync"

def fetch_products(app_key: str, app_secret: str, tracking_id: str) -> list[dict]:
    products = []
    client = httpx.Client(timeout=30)

    for category, keywords in CATEGORIES_KEYWORDS.items():
        for keyword in keywords[:2]:
            params = {
                "method": "aliexpress.affiliate.product.query",
                "app_key": app_key,
                "timestamp": str(int(time.time() * 1000)),
                "sign_method": "md5",
                "v": "2.0",
                "format": "json",
                "keywords": keyword,
                "tracking_id": tracking_id,
                "fields": "product_id,product_title,target_sale_price,target_original_price,target_sale_price_currency,discount,evaluate_rate,lastest_volume,product_main_image_url,product_detail_url,ship_to_days",
                "page_no": "1",
                "page_size": "5",
                "sort": "SALE_PRICE_ASC",
                "min_sale_price": "100",
                "max_sale_price": "5000",
            }
            params["sign"] = generate_ali_sign(params, app_secret)

            try:
                resp = client.get(BASE_URL, params=params)
                data = resp.json()
                items = (
                    data.get("aliexpress_affiliate_product_query_response", {})
                        .get("resp_result", {})
                        .get("result", {})
                        .get("products", {})
                        .get("product", [])
                )
                for item in items:
                    original = float(item.get("target_original_price", 0))
                    current = float(item.get("target_sale_price", 0))
                    if original <= 0 or current <= 0:
                        continue
                    discount = int((1 - current / original) * 100)
                    if discount < 50:
                        continue

                    products.append({
                        "id": f"ali-{item['product_id']}",
                        "title": item.get("product_title", ""),
                        "titleIT": item.get("product_title", ""),
                        "titleEN": item.get("product_title", ""),
                        "titleDE": item.get("product_title", ""),
                        "titleFR": item.get("product_title", ""),
                        "titleES": item.get("product_title", ""),
                        "category": category,
                        "originalPrice": original,
                        "currentPrice": current,
                        "shippingCost": 0.0,
                        "currency": item.get("target_sale_price_currency", "EUR"),
                        "discount": discount,
                        "imageUrl": item.get("product_main_image_url", ""),
                        "affiliateUrl": item.get("product_detail_url", ""),
                        "source": "aliexpress",
                        "sourceCountry": "CN",
                        "estimatedDeliveryDays": int(item.get("ship_to_days", 20) or 20),
                        "rating": round(float(item.get("evaluate_rate", "0").replace("%", "")) / 20, 1),
                        "reviewCount": int(item.get("lastest_volume", 0) or 0),
                        "updatedAt": datetime.now(timezone.utc).isoformat(),
                    })
            except Exception as e:
                print(f"⚠️ Errore AliExpress [{keyword}]: {e}")

    client.close()
    print(f"📦 AliExpress: {len(products)} prodotti trovati")
    return products
