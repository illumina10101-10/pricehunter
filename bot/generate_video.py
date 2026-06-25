"""Genera un video 9:16 (TikTok/Reels) per un prodotto."""
import asyncio
import json
import os
import textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import edge_tts
from moviepy.editor import ImageClip, AudioFileClip

OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

W, H = 1080, 1920

def draw_product_frame(product: dict) -> Path:
    img = Image.new("RGB", (W, H), color="#1a1a2e")
    draw = ImageDraw.Draw(img)

    try:
        font_big = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 90)
        font_med = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 55)
        font_sm  = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 42)
    except Exception:
        font_big = font_med = font_sm = ImageFont.load_default()

    draw.text((W//2, 200), "🔥", font=font_big, anchor="mm", fill="#ff4500")

    title = product.get("titleIT", product.get("title", ""))
    wrapped = textwrap.fill(title, width=22)
    draw.text((W//2, 420), wrapped, font=font_med, anchor="mm", fill="white", align="center")

    draw.text((W//2, 750), f"€{product['originalPrice']:.2f}", font=font_med,
              anchor="mm", fill="#888888")
    bbox = draw.textbbox((W//2, 750), f"€{product['originalPrice']:.2f}", font=font_med, anchor="mm")
    mid_y = (bbox[1] + bbox[3]) // 2
    draw.line([(bbox[0]-5, mid_y), (bbox[2]+5, mid_y)], fill="#888888", width=4)

    total = product["currentPrice"] + product.get("shippingCost", 0)
    draw.text((W//2, 900), f"€{total:.2f}", font=font_big, anchor="mm", fill="#ff4500")

    draw.ellipse([(W-220, 140), (W-40, 320)], fill="#ff4500")
    draw.text((W-130, 230), f"-{product['discount']}%", font=font_sm, anchor="mm", fill="white")

    draw.text((W//2, 1100), f"Su {product.get('source','').capitalize()}", font=font_sm,
              anchor="mm", fill="#aaaaaa")

    draw.rounded_rectangle([(140, 1250), (W-140, 1400)], radius=50, fill="#ff4500")
    draw.text((W//2, 1325), "🛒 SCOPRI L'OFFERTA", font=font_med, anchor="mm", fill="white")

    draw.text((W//2, H-80), "pricehunter.vercel.app", font=font_sm, anchor="mm", fill="#555555")

    out_path = OUTPUT_DIR / f"frame_{product['id']}.png"
    img.save(out_path)
    return out_path

async def generate_voiceover(text: str, out_path: Path) -> None:
    communicate = edge_tts.Communicate(text, voice="it-IT-DiegoNeural")
    await communicate.save(str(out_path))

def create_video(product: dict) -> Path:
    frame_path = draw_product_frame(product)

    total = product["currentPrice"] + product.get("shippingCost", 0)
    tts_text = (
        f"Offerta incredibile! {product.get('titleIT', product['title'])}. "
        f"Da {product['originalPrice']:.0f} euro a soli {total:.0f} euro. "
        f"Sconto del {product['discount']} percento! "
        f"Clicca il link per acquistare su {product.get('source','').capitalize()}."
    )

    audio_path = OUTPUT_DIR / f"audio_{product['id']}.mp3"
    asyncio.run(generate_voiceover(tts_text, audio_path))

    clip = ImageClip(str(frame_path), duration=8)
    audio = AudioFileClip(str(audio_path))
    final = clip.set_audio(audio)

    video_path = OUTPUT_DIR / f"video_{product['id']}.mp4"
    final.write_videofile(str(video_path), fps=30, codec="libx264", audio_codec="aac", verbose=False, logger=None)

    return video_path
