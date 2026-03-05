import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brush,
  Lock,
  Eye,
  Play,
  Gamepad,
  RefreshCcw,
} from "lucide-react";

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

  const artist = useRef({
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    dy: 0,
    jumpImpulse: -10,
    flow_resistance: 0.5,
    isAnchored: false,
  });
  const element = useRef({ x: 800, y: 150, width: 25, height: 40, drift: 6 });

  const narrativeLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas || sessionState !== "ACTIVE") return;
    const ctx = canvas.getContext("2d");
    const a = artist.current;
    const e = element.current;

    a.dy += a.flow_resistance;
    a.y += a.dy;
    if (a.y > 150) {
      a.y = 150;
      a.dy = 0;
      a.isAnchored = true;
    }

    e.x -= e.drift;
    if (e.x < -30) {
      e.x = 800;
      setCreativeFlow((prev) => prev + 1);
      e.drift += 0.2;
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

    // Draw Ground Line
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 185);
    ctx.lineTo(800, 185);
    ctx.stroke();

    // --- NEW SHAPE: Stylus / Pen Tip ---
    ctx.save();
    ctx.translate(a.x + 15, a.y + 15);
    ctx.rotate(a.dy * 0.05); // Tilt slightly based on jump velocity
    ctx.strokeStyle = "#2a2a2a";
    ctx.fillStyle = "#2a2a2a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -15); // Top point
    ctx.lineTo(10, 15); // Bottom right
    ctx.lineTo(-10, 15); // Bottom left
    ctx.closePath();
    ctx.stroke();
    // Add a small "nib" detail
    ctx.beginPath();
    ctx.arc(0, -15, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- NEW SHAPE: Floating Crystal / Diamond ---
    ctx.fillStyle = "#d44d8b";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#d44d8b";
    ctx.beginPath();
    ctx.moveTo(e.x + 12, e.y); // Top
    ctx.lineTo(e.x + 25, e.y + 20); // Right
    ctx.lineTo(e.x + 12, e.y + 40); // Bottom
    ctx.lineTo(e.x, e.y + 20); // Left
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    animationRef.current = requestAnimationFrame(narrativeLoop);
  };

  const performAction = () => {
    if (sessionState === "ACTIVE" && artist.current.isAnchored) {
      artist.current.dy = artist.current.jumpImpulse;
      artist.current.isAnchored = false;
    } else if (sessionState !== "ACTIVE") {
      artist.current.y = 150;
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
    <div className="w-full flex justify-center py-6 md:py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl w-full">
        {/* --- MAIN STUDIO (GAME) --- */}
        <div className="relative flex-1 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border bg-[#eaddd7] border-black/5 shadow-xl transition-all duration-700 overflow-hidden">
          {/* Top Status Bar */}
          <div className="relative z-50 flex justify-between items-center mb-4 md:mb-6 font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase opacity-50 font-bold">
            <div className="flex items-center gap-2 text-[#d44d8b]">
              <Brush size={12} /> ATELIER_ACTIVE
            </div>
            <div className="text-black">
              Flow: {creativeFlow.toString().padStart(4, "0")}
            </div>
          </div>

          {/* MOBILE RESPONSIVE CANVAS CONTAINER */}
          <div className="relative w-full overflow-hidden flex justify-center items-center h-[180px] md:h-[220px]">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              onClick={performAction}
              className="max-w-none h-full cursor-crosshair relative z-10 transition-transform duration-300"
              style={{
                // Scale the 800px canvas to fit small screens
                transform: `scale(${typeof window !== "undefined" && window.innerWidth < 768 ? (window.innerWidth - 60) / 800 : 1})`,
                transformOrigin: "center",
              }}
            />
          </div>

          <AnimatePresence>
            {sessionState !== "ACTIVE" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 p-4"
              >
                {/* COLORFUL THUMBNAIL OVERLAY */}
                <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle at 20% 30%, #d44d8b 0%, transparent 50%), radial-gradient(circle at 80% 70%, #fb923c 0%, transparent 50%), radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 50%)",
                      filter: "blur(40px)",
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-3 md:mb-4 inline-flex p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <Gamepad className="text-[#fb923c]" size={20} />
                  </motion.div>

                  <h2 className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
                    {sessionState === "BEGIN"
                      ? "The Creative Chronicle"
                      : "Session Interrupted"}
                  </h2>

                  <p className="text-[8px] md:text-[10px] text-white/60 uppercase tracking-[0.3em] mb-4 md:mb-6 font-bold">
                    Gautham_Krishna_R // Studio_v1
                  </p>

                  <button
                    onClick={performAction}
                    className="group relative flex items-center rounded-lg gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 bg-white text-black font-sans font-black italic text-xs md:text-sm transition-transform active:scale-95"
                  >
                    {sessionState === "BEGIN" ? (
                      <Play size={14} fill="black" />
                    ) : (
                      <RefreshCcw size={14} />
                    )}
                    <span className="uppercase tracking-widest font-bold">
                      {sessionState === "BEGIN" ? "Initialize" : "Resume"}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- SIDEBAR MANIFEST (SKILLS) --- */}
        <div className="w-full lg:w-64 space-y-3 md:space-y-4 font-sans">
          <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-black/60 mb-2 px-2">
            Unlock My Skills
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
            {milestones.map((m) => {
              const isUnlocked = creativeFlow >= m.threshold;
              return (
                <motion.div
                  key={m.name}
                  animate={{ opacity: isUnlocked ? 1 : 0.5 }}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-500 flex items-center justify-between
                    ${isUnlocked ? "bg-white border-[#d44d8b44] shadow-md" : "bg-black/5 border-transparent"}`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[8px] font-bold tracking-widest uppercase mb-0.5 ${isUnlocked ? "text-[#d44d8b]" : "text-black/40"}`}
                    >
                      {isUnlocked ? "Manifested" : `Goal: ${m.threshold}`}
                    </span>
                    <span
                      className={`text-[11px] md:text-xs font-black italic tracking-tight ${isUnlocked ? "text-black" : "text-black/30"}`}
                    >
                      {isUnlocked ? m.name : "Locked_Archive"}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <Eye size={14} className="text-[#d44d8b]" />
                  ) : (
                    <Lock size={14} className="text-black/20" />
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
