"""Render a local page with Playwright and save a screenshot."""

import argparse
import pathlib
import sys
import time
import urllib.error
import urllib.request

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

VIEWPORTS = {
    "mobile-sm": (360, 800),
    "mobile": (390, 844),
    "tablet": (834, 1112),
    "laptop": (1280, 800),
    "desktop": (1440, 900),
    "wide": (1920, 1080),
}

OUT = pathlib.Path(".diseno")


def wait_for(url, timeout=60):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as r:
                if r.status < 500:
                    return True
        except urllib.error.HTTPError as e:
            if e.code < 500:
                return True
        except Exception:
            pass
        time.sleep(0.5)
    return False


def capture(page, url, vp, name, full, selector, wait_ms, out_dir):
    width, height = VIEWPORTS[vp]
    page.set_viewport_size({"width": width, "height": height})
    page.goto(url, wait_until="networkidle", timeout=60000)
    page.evaluate("document.fonts && document.fonts.ready")
    if wait_ms:
        page.wait_for_timeout(wait_ms)
    if selector:
        el = page.query_selector(selector)
        if el is None:
            sys.exit(f"selector not found: {selector}")
        el.screenshot(path=str(out_dir / f"{name}.png"))
    else:
        page.screenshot(path=str(out_dir / f"{name}.png"), full_page=full)
    return out_dir / f"{name}.png"


def compare(render, ref, out, vp):
    a = Image.open(render).convert("RGB")
    b = Image.open(ref).convert("RGB")
    b = b.resize(a.size)
    gap = 24
    canvas = Image.new("RGB", (a.width, a.height * 2 + gap), (24, 24, 27))
    canvas.paste(b, (0, 0))
    canvas.paste(a, (0, a.height + gap))
    canvas.save(out)
    mask = ImageChops.difference(a, b).convert("L").point(
        lambda p: 255 if p > 24 else 0
    )
    changed = mask.histogram()[255]
    total = a.width * a.height
    return changed / total * 100, a.size


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="http://localhost:3000")
    ap.add_argument("--name", default="shot")
    ap.add_argument("--vp", default="desktop", choices=list(VIEWPORTS))
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--selector")
    ap.add_argument("--wait", type=int, default=250)
    ap.add_argument("--ref")
    ap.add_argument("--out", default=".diseno")
    args = ap.parse_args()

    out_dir = pathlib.Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    if not wait_for(args.url):
        sys.exit(f"dev server not responding at {args.url}")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(device_scale_factor=2)
        shot = capture(
            page, args.url, args.vp, f"{args.name}__{args.vp}", args.full,
            args.selector, args.wait, out_dir,
        )
        browser.close()

    print(shot.resolve())

    if args.ref:
        pair = out_dir / f"{args.name}__cmp_{args.vp}.png"
        pct, size = compare(shot, args.ref, pair, args.vp)
        print(f"compare: {pair.resolve()}")
        print(f"pixels distintos: {pct:.1f}% @ {size[0]}x{size[1]}")


if __name__ == "__main__":
    main()
