import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brush, Lock, Eye, Play, Gamepad, RefreshCcw } from "lucide-react";

const CreativeChronicle = () => {
  const [sessionState, setSessionState] = useState("BEGIN");
  const [creativeFlow, setCreativeFlow] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const milestones = [
    { threshold: 1, name: "Digital Portraits" },
    { threshold: 5, name: "UI/UX" },
    { threshold: 10, name: "Digital Illustrations" },
    { threshold: 15, name: "Pencil Sketches" },
  ];

  const groundY = 160;

  const artist = useRef({
    x: 50,
    y: groundY - 30,
    width: 30,
    height: 30,
    dy: 0,
    jumpImpulse: -9,
    flow_resistance: 0.45,
    isAnchored: true,
  });

  const element = useRef({
    x: 800,
    y: groundY - 25,
    width: 25,
    height: 25,
    drift: 6,
  });

  const narrativeLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas || sessionState !== "ACTIVE") return;
    const ctx = canvas.getContext("2d");
    const a = artist.current;
    const e = element.current;

    a.dy += a.flow_resistance;
    a.y += a.dy;

    if (a.y > groundY - a.height) {
      a.y = groundY - a.height;
      a.dy = 0;
      a.isAnchored = true;
    }

    e.x -= e.drift;
    if (e.x < -30) {
      e.x = 800;
      setCreativeFlow((prev) => prev + 1);
      e.drift += 0.15;
    }

    if (
      a.x < e.x + e.width &&
      a.x + a.width > e.x &&
      a.y < e.y + e.height &&
      a.y + a.height > e.y
    ) {
      setSessionState("INTERRUPTED");
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(800, groundY);
    ctx.stroke();

    ctx.save();
    ctx.translate(a.x + a.width / 2, a.y + a.height / 2);
    ctx.rotate(a.dy * 0.05);

    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 15);
    ctx.lineTo(-10, 15);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.arc(0, -15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#d44d8b";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#d44d8b";
    ctx.beginPath();
    ctx.moveTo(e.x + e.width / 2, e.y);
    ctx.lineTo(e.x + e.width, e.y + e.height / 2);
    ctx.lineTo(e.x + e.width / 2, e.y + e.height);
    ctx.lineTo(e.x, e.y + e.height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    animationRef.current = requestAnimationFrame(narrativeLoop);
  };

  const performAction = () => {
    if (sessionState === "ACTIVE" && artist.current.isAnchored) {
      artist.current.dy = artist.current.jumpImpulse;
      artist.current.isAnchored = false;
    } else if (sessionState !== "ACTIVE") {
      artist.current.y = groundY - 30;
      element.current.x = 800;
      element.current.drift = 6;
      setCreativeFlow(0);
      setSessionState("ACTIVE");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        performAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sessionState]);

  useEffect(() => {
    if (sessionState === "ACTIVE") {
      animationRef.current = requestAnimationFrame(narrativeLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [sessionState]);

  return (
    <div className="w-full flex justify-center py-2 md:py-12 px-2 md:px-4 select-none font-sans">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-5xl w-full">
        {/* --- MAIN GAME CONTAINER --- */}
        <div className="relative flex-1 p-3 md:p-6 rounded-2xl md:rounded-3xl border bg-[#eaddd7] border-black/5 shadow-xl overflow-visible touch-none">
          <div className="relative z-50 flex justify-between items-center mb-3 md:mb-4 text-[9px] md:text-[10px] tracking-[0.2em] uppercase opacity-60 font-bold text-black">
            <div className="flex items-center gap-2 text-[#d44d8b]">
              <Brush size={12} /> ATELIER_LIVE
            </div>
            <div>Flow: {creativeFlow.toString().padStart(4, "0")}</div>
          </div>

          <div
            className="relative w-full bg-black/5 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center min-h-[160px] md:min-h-[200px]"
            onClick={performAction}
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-auto max-h-full object-contain pointer-events-none"
            />

            <AnimatePresence>
              {sessionState !== "ACTIVE" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 p-4 bg-[#1a1a1a]/90 backdrop-blur-sm"
                >
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-2 md:mb-3 p-2 md:p-3 rounded-full bg-white/10 border border-white/20"
                    >
                      <Gamepad className="text-[#fb923c]" size={20} />
                    </motion.div>

                    <h2 className="text-lg md:text-2xl font-black italic text-white uppercase tracking-tighter mb-1">
                      {sessionState === "BEGIN"
                        ? "The Creative Chronicle"
                        : "Session Failed"}
                    </h2>

                    <p className="text-[8px] md:text-[9px] text-white/50 uppercase tracking-[0.2em] mb-4 md:mb-6">
                      Tap to Jump // Avoid Creative Blocks
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        performAction();
                      }}
                      className="flex items-center rounded-full gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 bg-white text-black font-black italic text-[10px] md:text-xs uppercase tracking-widest transition-transform active:scale-95 shadow-lg"
                    >
                      {sessionState === "BEGIN" ? (
                        <Play size={12} fill="black" />
                      ) : (
                        <RefreshCcw size={12} />
                      )}
                      {sessionState === "BEGIN" ? "Initialize" : "Retry"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 md:mt-4 text-[8px] md:text-[9px] uppercase tracking-widest opacity-40 text-center font-bold">
            Best Flow:{" "}
            {milestones.filter((m) => creativeFlow >= m.threshold).length}{" "}
            Skills Manifested
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="w-full lg:w-64 space-y-2 md:space-y-3 font-sans">
          <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-black/40 mb-1 md:mb-2 px-1">
            Skill Tree Progress
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {milestones.map((m) => {
              const isUnlocked = creativeFlow >= m.threshold;
              return (
                <motion.div
                  key={m.name}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border flex items-center justify-between transition-colors ${
                    isUnlocked
                      ? "bg-white border-[#d44d8b] shadow-sm"
                      : "bg-black/5 border-transparent opacity-40"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[7px] md:text-[8px] font-bold uppercase ${isUnlocked ? "text-[#d44d8b]" : "text-black"}`}
                    >
                      {isUnlocked ? "Manifested" : `Requires: ${m.threshold}`}
                    </span>
                    <span
                      className={`text-[11px] md:text-xs font-black italic ${isUnlocked ? "text-black" : "text-black/60"}`}
                    >
                      {isUnlocked ? m.name : "???"}{" "}
                      {/* This line hides the skill name */}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <Eye size={14} className="text-[#d44d8b]" />
                  ) : (
                    <Lock size={14} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeChronicle;
