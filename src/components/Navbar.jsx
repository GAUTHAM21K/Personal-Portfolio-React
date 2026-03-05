import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  PenTool,
  HardDriveDownload,
  Sparkles,
  Menu,
  X,
  Hash,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ isDev, setIsDev }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["About", "Skills", "Projects", "Contact"];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Gautham_Resume.pdf";
    link.download = "Gautham_Krishna_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-700 ${
        isDev
          ? "bg-[#0d1117]/90 border-b border-[#58a6ff1a] backdrop-blur-md"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      {/* 1. DEV MODE DECOR */}
      {isDev && (
        <div className="hidden md:flex bg-[#161b22]/95 px-6 py-1 border-b border-white/5 items-center justify-between">
          <div className="w-12" />
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
            guest@gautham_krishna_r: ~ /portfolio_2026
          </span>
          <div className="w-12" />
        </div>
      )}

      {/* 2. MAIN NAV CONTAINER */}
      <div
        className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-700 ${
          !isDev
            ? "bg-[#eaddd7]/80 backdrop-blur-xl rounded-full border border-white/40 shadow-lg py-2 md:py-3 px-4 md:px-8 mx-4 md:mx-auto"
            : "py-3 md:py-4"
        }`}
      >
        <div className="flex justify-between items-center md:grid md:grid-cols-3">
          {/* Left: Signature (Desktop) / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-current hover:opacity-70 transition-opacity"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden md:flex items-center">
              {!isDev ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-serif italic text-xl text-[#2a2a2a] flex items-center gap-2"
                >
                  <Sparkles size={16} className="text-[#d44d8b]" />
                  <span className="tracking-tighter">Gautham.</span>
                </motion.div>
              ) : (
                <div className="flex gap-6">
                  {navLinks.slice(0, 2).map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#58a6ff] transition-all"
                    >
                      [ {link} ]
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle: Theme Toggle */}
          <div className="flex justify-center">
            <ThemeToggle isDev={isDev} setIsDev={setIsDev} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <div className="hidden md:flex gap-8">
              {navLinks.slice(2).map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`text-[10px] uppercase tracking-[0.2em] transition-all ${
                    isDev
                      ? "font-mono text-white hover:text-[#58a6ff]"
                      : "font-sans font-black italic text-[#2a2a2a]/70 hover:text-black"
                  }`}
                >
                  {isDev ? `[ ${link} ]` : link}
                </a>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {isDev ? (
                <motion.button
                  key="dev-btn"
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#58a6ff44] bg-[#58a6ff22] text-white font-mono text-[9px] hover:bg-[#58a6ff] transition-all rounded-sm shadow-[0_0_15px_rgba(88,166,255,0.1)]"
                >
                  <HardDriveDownload size={11} className="hidden sm:block" />
                  CV
                </motion.button>
              ) : (
                <motion.div
                  key="art-tool"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="p-2 bg-[#d44d8b]/20 rounded-xl text-[#d44d8b]"
                >
                  <PenTool size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`absolute top-full left-0 w-full mt-2 p-6 md:hidden backdrop-blur-2xl border-b ${
              isDev
                ? "bg-[#0d1117]/95 border-[#58a6ff1a] text-white"
                : "bg-[#eaddd7]/95 border-white/20 text-[#2a2a2a]"
            }`}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  variants={itemVariants}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-[0.3em] flex items-center gap-3 ${
                    isDev
                      ? "font-mono text-[#58a6ff]"
                      : "font-sans font-black italic"
                  }`}
                >
                  {isDev ? (
                    <Hash size={14} />
                  ) : (
                    <Sparkles size={14} className="text-[#d44d8b]" />
                  )}
                  {link}
                </motion.a>
              ))}
              <hr className="opacity-10" />
              <motion.button
                variants={itemVariants}
                onClick={handleDownload}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 ${
                  isDev
                    ? "bg-[#58a6ff22] border border-[#58a6ff44] font-mono text-xs"
                    : "bg-[#d44d8b]/10 text-[#d44d8b] font-bold"
                }`}
              >
                <Download size={16} />
                DOWNLOAD RESUME
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
