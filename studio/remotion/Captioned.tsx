import React from "react";
import {AbsoluteFill, OffthreadVideo, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

export type Word = {text: string; start: number; end: number};
export type CaptionedProps = {src: string; title: string; cta: string; words: Word[]; durationSec: number};

export const Captioned: React.FC<CaptionedProps> = ({src, title, cta, words, durationSec}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const t = frame / fps;

  // Szavankénti felirat: az aktuális 3-4 szavas csoport, az éppen mondott szó kiemelve.
  const idx = words.findIndex((w) => t >= w.start && t < w.end + 0.15);
  const group = idx < 0 ? [] : words.slice(Math.floor(idx / 3) * 3, Math.floor(idx / 3) * 3 + 3);
  const pop = idx < 0 ? 0 : spring({frame: frame - Math.round(words[idx].start * fps), fps, config: {damping: 12, stiffness: 180}});

  const titleOn = !!title && t < Math.min(2.6, durationSec * 0.4);
  const ctaOn = !!cta && durationSec > 4 && t > durationSec - Math.min(2.4, durationSec * 0.35);
  const bar = interpolate(t, [0, durationSec], [0, width], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: "#000", fontFamily: "Inter, system-ui, sans-serif"}}>
      {src ? <OffthreadVideo src={src} style={{width: "100%", height: "100%", objectFit: "cover"}} /> : null}
      {titleOn && (
        <div style={{position: "absolute", top: 200, left: 60, right: 60, textAlign: "center", color: "#fff", fontSize: 76, fontWeight: 800,
          lineHeight: 1.12, textShadow: "0 6px 30px rgba(0,0,0,.7)", transform: `scale(${spring({frame, fps, config: {damping: 11}})})`}}>
          {title}
        </div>
      )}
      <div style={{position: "absolute", left: 50, right: 50, top: 1180, textAlign: "center", fontSize: 96, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1}}>
        {group.map((w, i) => {
          const active = words[idx] === w;
          return (
            <span key={i} style={{display: "inline-block", margin: "0 12px", color: active ? "#FFE14D" : "#fff", WebkitTextStroke: "10px #000", paintOrder: "stroke fill",
              transform: active ? `scale(${1 + 0.12 * pop})` : "none"}}>{w.text}</span>
          );
        })}
      </div>
      {ctaOn && (
        <div style={{position: "absolute", left: 70, right: 70, bottom: 300, padding: "34px 40px", borderRadius: 48, textAlign: "center", color: "#fff", fontSize: 58, fontWeight: 700,
          background: "linear-gradient(135deg,#7A5CFF,#FF4D9D)"}}>{cta}</div>
      )}
      <div style={{position: "absolute", left: 0, bottom: 0, height: 10, width: bar, background: "linear-gradient(90deg,#7A5CFF,#FF4D9D)"}} />
    </AbsoluteFill>
  );
};
