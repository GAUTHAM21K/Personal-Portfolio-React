import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skils";
import Work from "./components/Works";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [isDev, setIsDev] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("theme-dev", isDev);
  }, [isDev]);

  return (
    <div
      className={`${isDev ? "theme-dev" : ""} min-h-screen bg-main-bg text-main-text transition-colors duration-700 ease-in-out`}
    >
      {/* 1. Global Navbar - Static */}
      <Navbar isDev={isDev} setIsDev={setIsDev} />

      <main className="relative">
        <AnimatePresence mode="wait">
          {/* 2. Seamless Page Wrapper */}
          <motion.div
            key={isDev ? "dev-site" : "art-site"}
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full flex flex-col" // Added flex-col to manage vertical flow
          >
            <Hero isDev={isDev} />
            <Skills isDev={isDev} />
            <Work isDev={isDev} />
            <Contact isDev={isDev} />
            <Footer isDev={isDev} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Subtle Grain Overlay for Artistic Depth */}
      {!isDev && (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-[99]" />
      )}
    </div>
  );
}

export default App;
