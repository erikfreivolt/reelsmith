#!/usr/bin/env bash
# Reelsmith Studio telepítő (Linux/macOS). Futtatás a studio mappában: bash scripts/setup.sh
set -e
command -v ffmpeg >/dev/null || { echo "Telepítsd az FFmpeg-et (brew install ffmpeg / apt install ffmpeg)"; exit 1; }
python3 -m pip install --upgrade yt-dlp faster-whisper
npm install
python3 -c "from faster_whisper import WhisperModel; WhisperModel('medium', device='cpu', compute_type='int8'); print('modell kész')"
ffmpeg -version | head -1; yt-dlp --version; npx remotion versions | head -3
