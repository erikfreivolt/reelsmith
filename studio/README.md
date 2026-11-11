# Reelsmith Studio: helyi AI videóvágó munkaterület

Ez a mappa a Reelsmith böngészős vágásánál jobb minőségű, gépen futó vágási lánc alapja.
Nem része a Vercel-es oldalnak (a Vercel csak a repo gyökerét szolgálja ki).

## Eszközök

| Eszköz | Mire jó | Parancs |
|---|---|---|
| FFmpeg | csendkivágás, hangtisztítás/hangerő, kódolás | `ffmpeg`, `ffprobe` |
| Whisper (faster-whisper) | szószintű átírás magyarul | `python scripts/transcribe.py` |
| Remotion | animáció, felirat, címkártya, folyamatjelző | `npm run preview`, `npm run render` |
| yt-dlp | referencia/forrásvideó letöltése | `yt-dlp <url>` |

## Mappák

- `input/` nyers felvételek (nem kerül Gitbe)
- `work/` köztes fájlok: átírás JSON, vágási lista
- `output/` kész videók
- `remotion/` a 9:16 kompozíció (`Captioned`: szavankénti felirat, nyitócím, záró kártya, folyamatjelző)
- `scripts/` telepítők és átíró szkript

## Telepítés a saját gépen

Windows: `powershell -ExecutionPolicy Bypass -File scripts\setup.ps1`
Linux/macOS: `bash scripts/setup.sh`

## Tervezett lánc

1. `transcribe.py` szavankénti időbélyeges JSON-t ad.
2. Vágási terv: csendek, töltelékszavak, ismétlések kivétele a szavak időbélyegei alapján (ide jöhet Claude vagy Gemini a "mi marad" döntéshez).
3. FFmpeg a vágási lista szerint vág, hangot tisztít és hangerőt normalizál (`afftdn`, `loudnorm`).
4. Remotion a vágott videóra rárakja a feliratot, címet, CTA-t, majd 1080×1920 H.264-ben kirenderel.

## Megjegyzések

- A Whisper modell az első futásnál tölt le (medium: kb. 1,5 GB). `large-v3` pontosabb magyarra, GPU-n gyors.
- Remotionnél a rendszer Chrome-ja is használható: `--browser-executable=<útvonal>`.
- Licenc: a Remotion cégek számára (több mint 3 fő) fizetős lehet, a feltételeket nézd meg a remotion.dev oldalon, mielőtt a Reelsmith-be építed.
