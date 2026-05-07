import React, { useEffect, useMemo, useState } from "react";

const SLIDE_DURATION = 6000; 

/**
 * PATHING LOGIC:
 * Since images are now directly in the public folder, we use a relative 
 * path string. This works for both local development and GitHub Pages.
 */
const imagePath = (fileName) => fileName;

const stages = [
  { id: 10, src: imagePath("10.png"), theme: "quantum", label: "QUANTUM AI", color: "#e8ecff", accent: "#8b5cf6" },
  { id: 9, src: imagePath("9.png"), theme: "9.png", label: "DEEPMIND", color: "#9ff7ff", accent: "#22d3ee" },
  { id: 8, src: imagePath("8.png"), theme: "human", label: "ANDROID", color: "#ffd89b", accent: "#34A853" },
  { id: 7, src: imagePath("7.png"), theme: "sun", label: "GOOGLE SEARCH", color: "#ffe066", accent: "#facc15" },
  { id: 6, src: imagePath("6.png"), theme: "moon", label: "GOOGLE MAPS", color: "#c7efff", accent: "#38bdf8" },
  { id: 5, src: imagePath("5.png"), theme: "space", label: "VERTEX AI", color: "#66dcff", accent: "#2563eb" },
  { id: 4, src: imagePath("4.png"), theme: "air", label: "GEMINI AI", color: "#c7e8ff", accent: "#60a5fa" },
  { id: 3, src: imagePath("3.png"), theme: "fire", label: "TPU", color: "#ff875c", accent: "#ef4444" },
  { id: 2, src: imagePath("2.png"), theme: "water", label: "GOOGLE CLOUD", color: "#83dcff", accent: "#0ea5e9" },
  { id: 1, src: imagePath("1.png"), theme: "earth", label: "GOOGLE EARTH", color: "#8cffaa", accent: "#22c55e" },
];

const googleColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#A142F4"];
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function FeatureTerminal({ label, color }) {
  const [display, setDisplay] = useState(label);

  useEffect(() => {
    const startedAt = Date.now();
    const revealDuration = SLIDE_DURATION - 1800; 

    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(elapsed / revealDuration, 1);
      const revealCount = Math.floor(label.length * progress);

      const next = label
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return char;
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        })
        .join("");

      setDisplay(progress >= 1 ? label : next);
      if (progress >= 1) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [label]);

  return (
    <div className="featureTerminal">
      <div className="terminalBoxes">
        {display.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="terminalGap" />
          ) : (
            <span
              key={i}
              className="terminalBox"
              style={{
                color: googleColors[i % googleColors.length],
                borderColor: `${color}55`,
                boxShadow: `0 0 12px ${color}33`,
              }}
            >
              {char}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function StageMotion({ theme, color, accent }) {
  return (
    <div className={`stageMotion ${theme}`}>
      <div className="motionLayer layerA" style={{ "--color": color, "--accent": accent }} />
      <div className="motionLayer layerB" style={{ "--color": color, "--accent": accent }} />
      <div className="motionLayer layerC" style={{ "--color": color, "--accent": accent }} />
    </div>
  );
}

function ParticleNumber({ number, color }) {
  const particles = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: 22 + Math.random() * 56,
      top: 22 + Math.random() * 56,
      delay: Math.random() * 0.9,
      size: 6 + Math.random() * 9,
      color: googleColors[i % googleColors.length],
      glyph: ["✦", "◆", "●", "G", "O", "L", "E", "A", "M","N","I", "◇"][i % 10],
    }));
  }, [number]);

  return (
    <div className="particleLayer" key={number}>
      <div className="particleNumberGhost" style={{ color }}>
        {number}
      </div>

      {particles.map((p) => (
        <span
          key={p.id}
          className="particleGlyph"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            color: p.color,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const current = stages[index];
  const progress = ((index + 1) / stages.length) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < stages.length - 1) setIndex((prev) => prev + 1);
      else setDone(true);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <main className="appRoot">
      <div 
        className="mapBackground" 
        style={{
          backgroundImage: `
            radial-gradient(circle at center, ${current.accent}22, transparent),
            linear-gradient(rgba(0,0,0,0.66), rgba(0,0,0,0.76)),
            url("${imagePath('mountain-view-map.png')}")
          `
        }}
      />

      <section className="cinemaFrame" style={{ borderColor: `${current.color}44` }}>
        {stages.map((stage, i) => {
          const active = i === index;

          return (
            <div
              key={stage.id}
              className="slide"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "scale(1.01)" : "scale(1.05)",
                backgroundColor: "#000",
                filter: active
                  ? "brightness(0.9) contrast(1.1) saturate(1.14)"
                  : "brightness(0.25) blur(18px)",
              }}
            >
              <img 
                src={stage.src} 
                alt={stage.label} 
                className="slideImage"
              />
              {active && <StageMotion theme={stage.theme} color={stage.color} accent={stage.accent} />}
              <div className="brightnessControl" />
            </div>
          );
        })}

        <ParticleNumber number={current.id} color={current.color} />
        <FeatureTerminal label={current.label} color={current.color} />

        <div className="lightSweep" />
        <div className="topBar" />
        <div className="bottomBar" />
        <div className="vignette" />

        <div className="header">
          <div>Google I/O 2026</div>
        </div>

        <div className="progressTrack">
          <div
            className="progressFill"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${current.accent}, ${current.color})`,
              boxShadow: `0 0 24px ${current.color}`,
            }}
          />
        </div>

        {done && (
          <div className="finalOverlay">
            <h1>Google I/O</h1>
            <p>2026</p>
          </div>
        )}
      </section>

      <style>{`
        html, body, #root {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        * { box-sizing: border-box; }

        .appRoot {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Google Sans', Inter, system-ui, sans-serif;
        }

        .mapBackground {
          position: absolute;
          inset: -10%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #000;
          animation: mapDrift 25s ease-in-out infinite alternate;
        }

        .cinemaFrame {
          position: relative;
          width: min(94vw, 1500px);
          height: min(94vh, calc(min(94vw, 1500px) * 9 / 16));
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid;
          background: #050505;
          box-shadow: 0 0 150px rgba(0,0,0,0.95);
          z-index: 10;
        }

        .slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 1200ms ease,
            transform 6000ms cubic-bezier(.19,1,.22,1),
            filter 1200ms ease;
        }

        .slideImage {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .stageMotion {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .motionLayer {
          position: absolute;
          inset: -20%;
          opacity: 0.4;
        }

        .quantum .layerA {
          background: repeating-radial-gradient(circle at center, transparent 0 28px, var(--color) 30px 32px);
          animation: quantumPulse 5s ease-in-out infinite;
        }

        .deepmind .layerA {
          background-image:
            radial-gradient(circle, var(--color) 1px, transparent 2px),
            linear-gradient(45deg, transparent 45%, var(--accent) 50%, transparent 55%);
          background-size: 42px 42px, 160px 160px;
          animation: neuralFlow 5s linear infinite;
        }

        .human .layerA {
          background: radial-gradient(circle at center, var(--accent), transparent 35%);
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .sun .layerA {
          background: radial-gradient(circle at center, var(--accent) 0%, transparent 70%);
          filter: blur(40px);
          animation: sunPulse 4s ease-in-out infinite alternate;
        }

        .moon .layerA {
          background-image: radial-gradient(circle, #fff 1px, transparent 2px);
          background-size: 50px 50px;
          animation: starDrift 15s linear infinite;
        }

        .space .layerA {
          background: radial-gradient(circle at center, var(--accent) 0%, transparent 80%);
          opacity: 0.15;
          animation: spaceVoid 10s ease-in-out infinite alternate;
        }

        .air .layerA {
          background: linear-gradient(90deg, transparent, var(--color), transparent);
          height: 2px;
          top: 50%;
          animation: airSweep 3s ease-in-out infinite;
        }

        .fire .layerA {
          background: radial-gradient(circle at bottom, var(--accent), transparent);
          animation: fireRise 4s ease-in infinite;
        }

        .water .layerA {
          background: repeating-radial-gradient(circle at center, transparent 0 50px, var(--color) 52px 55px);
          animation: waterRipple 6s ease-in-out infinite;
        }

        .earth .layerA {
          border: 1px solid var(--accent);
          border-radius: 50%;
          width: 60vh;
          height: 60vh;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: earthSpin 20s linear infinite;
          opacity: 0.2;
        }

        .featureTerminal {
          position: absolute;
          top: 26px;
          right: 28px;
          z-index: 40;
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
        }

        .terminalBoxes {
          display: flex;
          gap: 4px;
          justify-content: flex-end;
          flex-wrap: wrap;
          max-width: 310px;
        }

        .terminalBox {
          width: 22px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 900;
        }

        .terminalGap { width: 10px; }

        .particleLayer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          mix-blend-mode: screen;
        }

        .particleNumberGhost {
          position: absolute;
          font-size: clamp(160px, 30vw, 520px);
          font-weight: 900;
          opacity: 0.15;
          animation: ghostPulse 2s ease-in-out infinite alternate;
        }

        .particleGlyph {
          position: absolute;
          font-size: 10px;
          opacity: 0;
          animation: splashToNumber 1.4s ease-out forwards;
        }

        .lightSweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
          animation: lightSweep 5s linear infinite;
        }

        .topBar, .bottomBar {
          position: absolute;
          left: 0; width: 100%; height: 15%;
          background: linear-gradient(to bottom, #000, transparent);
        }
        .bottomBar { bottom: 0; background: linear-gradient(to top, #000, transparent); }

        .header {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.6em;
          font-size: 11px;
        }

        .progressTrack {
          position: absolute;
          bottom: 0; left: 0; width: 100%; height: 4px;
          background: rgba(255,255,255,0.05);
        }
        .progressFill { height: 100%; transition: width 0.8s ease; }

        .finalOverlay {
          position: absolute;
          inset: 0; z-index: 100;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 1s ease-out;
        }

        .finalOverlay h1 {
          font-size: clamp(50px, 10vw, 120px);
          background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853);
          -webkit-background-clip: text;
          color: transparent;
          margin: 0;
          animation: gradientShift 5s infinite;
          background-size: 200%;
        }

        @keyframes mapDrift { from { transform: scale(1); } to { transform: scale(1.2) translate(2%, 2%); } }
        @keyframes quantumPulse { 0% { opacity: 0.2; } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 0.2; } }
        @keyframes neuralFlow { from { background-position: 0 0; } to { background-position: 100px 100px; } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.6; } }
        @keyframes ghostPulse { from { transform: scale(0.95); } to { transform: scale(1.05); } }
        @keyframes lightSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes gradientShift { 0% { background-position: 0%; } 100% { background-position: 100%; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes splashToNumber { 0% { opacity: 0; transform: scale(0); } 100% { opacity: 0.7; transform: scale(1); } }
      `}</style>
    </main>
  );
}