#!/usr/bin/env python3
"""Create or check deterministic Viewer visual baselines with local Chrome."""

from __future__ import annotations

import argparse
import hashlib
import http.server
import shutil
import socket
import subprocess
import tempfile
import threading
import time
from pathlib import Path


REPO = Path(__file__).resolve().parent.parent
VIEWER = REPO / "dist" / "viewer"
BASELINES = REPO / "tests" / "visual" / "baselines"
CHROME_CANDIDATES = (
    Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
    Path("/Applications/Chromium.app/Contents/MacOS/Chromium"),
)
CASES = {
    "default-app-shell": "?skin=default&reducedMotion=true#app-shell",
    "pure-app-shell": "?skin=pure&reducedMotion=true#app-shell",
    "deep-night-app-shell": "?skin=deep-night&reducedMotion=true#app-shell",
}


def chrome_path() -> Path:
    for candidate in CHROME_CANDIDATES:
        if candidate.exists():
            return candidate
    found = shutil.which("google-chrome") or shutil.which("chromium")
    if found:
        return Path(found)
    raise SystemExit("Chrome or Chromium is required for visual regression")


def free_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def capture(output_dir: Path) -> None:
    if not (VIEWER / "index.html").exists():
        raise SystemExit("Viewer build is missing; run `make build` first")
    output_dir.mkdir(parents=True, exist_ok=True)
    port = free_port()
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format: str, *args: object) -> None:
            pass

    handler = lambda *args, **kwargs: QuietHandler(  # noqa: E731
        *args, directory=str(VIEWER), **kwargs
    )
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        with tempfile.TemporaryDirectory(prefix="kai-visual-chrome-") as profile:
            for name, route in CASES.items():
                output = output_dir / f"{name}.png"
                # Baseline updates write into an existing directory. Remove the
                # previous file so the readiness loop cannot mistake stale
                # bytes for Chrome's newly rendered screenshot.
                output.unlink(missing_ok=True)
                process = subprocess.Popen(
                    [
                        str(chrome_path()),
                        "--headless=new",
                        "--disable-gpu",
                        "--hide-scrollbars",
                        "--force-device-scale-factor=1",
                        "--run-all-compositor-stages-before-draw",
                        "--virtual-time-budget=1600",
                        "--window-size=1440,1000",
                        f"--user-data-dir={Path(profile) / name}",
                        f"--screenshot={output}",
                        f"http://127.0.0.1:{port}/{route}",
                    ],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
                for _ in range(120):
                    if output.exists() and output.stat().st_size > 0:
                        break
                    if process.poll() is not None:
                        break
                    time.sleep(0.1)
                if process.poll() is None:
                    process.terminate()
                    try:
                        process.wait(timeout=2)
                    except subprocess.TimeoutExpired:
                        process.kill()
                        process.wait()
                if not output.exists() or output.stat().st_size == 0:
                    raise SystemExit(f"Chrome did not create {output.name}")
    finally:
        server.shutdown()
        server.server_close()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--update", action="store_true", help="replace baselines")
    args = parser.parse_args()
    if args.update:
        capture(BASELINES)
        for path in sorted(BASELINES.glob("*.png")):
            print(f"updated {path.relative_to(REPO)} {digest(path)[:12]}")
        return
    with tempfile.TemporaryDirectory(prefix="kai-visual-check-") as temp:
        actual_dir = Path(temp)
        capture(actual_dir)
        failed = False
        for name in CASES:
            expected = BASELINES / f"{name}.png"
            actual = actual_dir / f"{name}.png"
            if not expected.exists() or digest(expected) != digest(actual):
                print(f"visual mismatch: {name}")
                failed = True
            else:
                print(f"ok visual {name}")
        raise SystemExit(1 if failed else 0)


if __name__ == "__main__":
    main()
