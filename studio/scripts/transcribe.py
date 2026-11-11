#!/usr/bin/env python3
"""Szószintű átírás (Whisper, faster-whisper). Kimenet: JSON szavankénti időbélyegekkel.

Használat:
  python scripts/transcribe.py input/felvetel.mp4 work/felvetel.words.json
  python scripts/transcribe.py input/felvetel.mp4 work/felvetel.words.json --model large-v3 --device cuda
"""
import argparse, json, sys
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--model", default="medium", help="tiny, base, small, medium, large-v3 (nagyobb = pontosabb, lassabb)")
ap.add_argument("--language", default="hu")
ap.add_argument("--device", default="auto", help="auto, cpu, cuda")
a = ap.parse_args()

compute = "float16" if a.device == "cuda" else "int8"
model = WhisperModel(a.model, device=a.device, compute_type=compute)
segments, info = model.transcribe(a.src, language=a.language, word_timestamps=True, vad_filter=True,
                                  vad_parameters={"min_silence_duration_ms": 300})
words, text = [], []
for seg in segments:
    text.append(seg.text.strip())
    for w in (seg.words or []):
        words.append({"text": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})
json.dump({"language": info.language, "duration": round(info.duration, 3), "text": " ".join(text), "words": words},
          open(a.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(words)} szó, {info.duration:.1f} mp -> {a.out}", file=sys.stderr)
