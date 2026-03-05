import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Code2,
  Coffee,
  Instagram,
  Palette,
  MessageCircle,
  Terminal,
  PenTool,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";

export const Footer = ({ isDev }) => {
  const [uptime, setUptime] = useState("00:00:00");

  // Unique Function: Live System Uptime for Dev Side
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const s = (seconds % 60).toString().padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const devLinks = [
    {
      name: "git",
      icon: <Github size={16} />,
      url: "https://www.github.com/GAUTHAM21K",
    },
    {
      name: "ln",
      icon: <Linkedin size={16} />,
      url: "https://www.linkedin.com/in/gautham-krishnar/",
    },
    {
      name: "lc",
      icon: <Code2 size={16} />,
      url: "https://www.leetcode.com/u/Gautham_krishna2004/",
    },
    {
      name: "buy",
      icon: <Coffee size={16} />,
      url: "https://www.buymeacoffee.com/Gautham21",
    },
  ];

  const artLinks = [
    {
      name: "Ig",
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com/thatblank_canvas/",
    },
    {
      name: "As",
      icon: <Palette size={18} />,
      url: "https://www.artstation.com/gautham_krishnar61",
    },

    {
      name: "Sup",
      icon: <Coffee size={18} />,
      url: "https://www.buymeacoffee.com/Gautham21",
    },
  ];

  return (
    <footer
      className={`relative overflow-hidden py-16 transition-all duration-1000 
      ${isDev ? "bg-[#05070a] border-t border-[#58a6ff1a]" : "bg-[#eaddd7] border-t border-black/5"}`}
    >
      {/* BACKGROUND FLARE: Dev (Grid) / Art (Blur) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {isDev ? (
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        ) : (
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#d44d8b] blur-[120px] rounded-full opacity-20" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* LEFT: CHARACTER COLUMN */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <AnimatePresence mode="wait">
            {isDev ? (
              <motion.div
                key="dev-char"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono space-y-1"
              >
                <div className="flex items-center gap-2 text-[#58a6ff] text-xs font-bold">
                  <Cpu size={14} /> <span>CORE_PROCESSOR_v2.6</span>
                </div>
                <h3 className="text-white text-xl tracking-tighter">
                  GAUTHAM_KRISHNA_R
                </h3>
                <p className="text-white/30 text-[9px] uppercase tracking-[0.4em]">
                  Palakkad_Node // 10.0.0.1
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="art-char"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center md:text-left"
              >
                <h3 className="font-serif italic text-4xl text-[#2a2a2a] leading-none">
                  Gautham Krishna.
                </h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="h-[1px] bg-gradient-to-r from-[#d44d8b] to-transparent mt-2"
                />
                <p className="text-[#2a2a2a]/40 text-[10px] uppercase tracking-[0.6em] mt-3 font-bold">
                  Visual Archives
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MIDDLE: SOCIAL INTERFACE */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex gap-4">
            {(isDev ? devLinks : artLinks).map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 5 : -5 }}
                className={`p-4 transition-all duration-300
                  ${
                    isDev
                      ? "bg-[#161b22] border border-white/10 text-[#58a6ff] hover:shadow-[0_0_20px_rgba(88,166,255,0.2)] rounded-sm"
                      : "bg-white/50 backdrop-blur-md border border-black/5 text-[#2a2a2a] shadow-sm hover:shadow-xl rounded-2xl"
                  }`}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <div
            className={`text-[9px] tracking-[0.3em] uppercase opacity-40 font-bold ${isDev ? "text-white" : "text-black"}`}
          >
            Connect with the source
          </div>
        </div>

        {/* RIGHT: UNIQUE FUNCTION COLUMN */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          {isDev ? (
            <div className="bg-[#0a0c10] border border-white/5 p-4 rounded-sm w-full md:w-48 font-mono">
              <div className="flex justify-between text-[9px] text-white/20 mb-2">
                <span>STATUS</span>
                <span className="text-green-500 animate-pulse">ACTIVE</span>
              </div>
              <div className="text-[#58a6ff] text-sm">UPTIME: {uptime}</div>
              <div className="w-full bg-white/5 h-[2px] mt-2 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-1/3 h-full bg-[#58a6ff]"
                />
              </div>
            </div>
          ) : (
            <div className="text-center md:text-right space-y-2">
              <PenTool
                size={20}
                className="text-[#d44d8b] ml-auto mb-2 opacity-40"
              />
              <p className="font-serif italic text-sm text-[#2a2a2a]/60 max-w-[200px]">
                "Capturing the ephemeral through code and graphite."
              </p>
              <p className="text-[9px] text-[#2a2a2a]/30 uppercase tracking-widest pt-2 italic">
                Based in Kerala, India
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div
        className={`mt-16 py-4 text-center border-t 
        ${isDev ? "border-white/5 text-white/20 font-mono text-[9px]" : "border-black/5 text-[#2a2a2a]/20 font-sans text-[10px] font-bold"}`}
      >
        © 2026 // GAUTHAM_KRISHNA_R // ALL_SYSTEMS_GO
      </div>
    </footer>
  );
};
