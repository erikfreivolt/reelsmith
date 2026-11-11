# Reelsmith Studio telepítő (Windows, PowerShell). Futtatás a studio mappában:
#   powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
$ErrorActionPreference = "Stop"
function Need($cmd, $id) { if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Write-Host "Telepítés: $id"; winget install --id $id -e --accept-package-agreements --accept-source-agreements } else { Write-Host "$cmd rendben" } }
Need ffmpeg "Gyan.FFmpeg"
Need node "OpenJS.NodeJS.LTS"
Need python "Python.Python.3.12"
Write-Host "Terminál újraindítás kellhet, ha most települt valami (PATH)."
python -m pip install --upgrade yt-dlp faster-whisper
npm install
Write-Host "Whisper modell előtöltése (első alkalommal letölti)..."
python -c "from faster_whisper import WhisperModel; WhisperModel('medium', device='cpu', compute_type='int8'); print('modell kész')"
Write-Host "Kész. Ellenőrzés: ffmpeg -version; yt-dlp --version; npx remotion versions"
