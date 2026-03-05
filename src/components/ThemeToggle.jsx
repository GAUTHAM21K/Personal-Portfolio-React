import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Palette } from "lucide-react";
import confetti from "canvas-confetti";

const ThemeToggle = ({ isDev, setIsDev }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleTheme = () => {
    if (!hasInteracted) setHasInteracted(true);

    if (isDev) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.1 },
        colors: ["#d44d8b", "#fb923c", "#9333ea"],
      });
    }
    setIsDev(!isDev);
  };

  return (
    <motion.div
      onClick={toggleTheme}
      // THE NUDGE: Shakes every 5 seconds until the first click
      animate={
        !hasInteracted
          ? {
              x: [0, -4, 4, -4, 4, 0],
              rotate: [0, -1, 1, -1, 1, 0],
            }
          : { x: 0, rotate: 0 }
      }
      transition={
        !hasInteracted
          ? {
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 5, // Stays still for 5 seconds between shakes
              ease: "easeInOut",
            }
          : { type: "spring", stiffness: 300 }
      }
      className={`relative w-40 h-14 rounded-full cursor-pointer p-2 flex items-center transition-all duration-500
        ${
          isDev
            ? "bg-[#0d1117] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),inset_0_-1px_1px_rgba(255,255,255,0.1)]"
            : "bg-[#eaddd7] shadow-[inset_0_4px_6px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.5)]"
        }`}
    >
      {/* Internal Track Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-20">
        <Palette
          size={14}
          className={!isDev ? "text-accent" : "text-zinc-500"}
        />
        <Terminal
          size={14}
          className={isDev ? "text-accent" : "text-zinc-500"}
        />
      </div>

      {/* The Physical 3D Knob */}
      <motion.div
        animate={{ x: isDev ? 96 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className={`z-10 w-10 h-10 rounded-full flex items-center justify-center relative
          ${
            isDev
              ? "bg-[#161b22] shadow-[0_4px_10px_rgba(0,0,0,0.5),0_0_15px_rgba(88,166,255,0.3)] border border-white/5"
              : "bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1),0_8px_20px_rgba(212,77,139,0.2)]"
          }`}
      >
        <motion.div
          animate={{ rotate: isDev ? 360 : 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {isDev ? (
            <Terminal size={18} style={{ color: "var(--accent)" }} />
          ) : (
            <Palette size={18} style={{ color: "var(--accent)" }} />
          )}
        </motion.div>
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
      </motion.div>

      {/* Background Animated Clouds/Stars Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-30">
        <motion.div
          animate={{ x: isDev ? -20 : 0 }}
          className="absolute inset-0 flex gap-4 items-center px-4"
        >
          {isDev ? (
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-3 bg-white/40 rounded-full blur-sm"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;
