import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Typewriter from "typewriter-effect";
import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";

const Hero = ({ isDev }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const splineRef = useRef(null);
  const isInView = useInView(splineRef);

  // 1. State to track if the 3D scene is fully initialized
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-svh w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 bg-main-bg text-main-text transition-colors duration-500"
    >
      {/* 2. CSS to hide Spline Watermark */}
      {isDev && (
        <style>
          {`
            #spline-container a { display: none !important; }
            #spline-container div:last-child { display: none !important; }
          `}
        </style>
      )}

      {/* BACKGROUNDS (ARTIST / DEV) */}
      {!isDev ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-[#d44d8b]/10 blur-[60px] md:blur-[120px] rounded-full"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[#fb923c]/10 blur-[80px] md:blur-[150px] rounded-full"
          />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
          <motion.h2
            style={{ y: y1 }}
            className="text-[25vw] md:text-[15vw] font-black opacity-[0.03] select-none whitespace-nowrap font-mono"
          >
            STABLE_BUILD
          </motion.h2>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div
        className={`z-10 w-full max-w-7xl flex flex-col items-center gap-10 
        ${isDev ? "md:flex-row md:justify-between" : "justify-center text-center"}`}
      >
        {/* LEFT SIDE: Content */}
        <motion.div
          className={`flex-1 w-full ${!isDev ? "flex flex-col items-center" : ""}`}
          key={isDev ? "dev" : "art"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {isDev ? (
            <div className="text-left font-mono space-y-6">
              <div className="inline-block px-3 py-1 bg-[#58a6ff]/10 border border-[#58a6ff]/20 text-[#58a6ff] text-[10px] md:text-xs">
                <Typewriter
                  options={{
                    strings: [
                      "> whoami --gautham_krishna",
                      "> status --final_year_btech",
                      "> active --<b>Flutter_Dev_Intern</b>",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
                GAUTHAM <br className="hidden sm:block" /> KRISHNA R.
              </h1>
              <p className="text-sm md:text-base max-w-xl leading-relaxed opacity-80">
                I am a{" "}
                <span className="text-[#58a6ff] font-bold text-lg">
                  FullStack Developer
                </span>
                . Bridging robust <span className="text-[#58a6ff]">Python</span>{" "}
                logic with seamless{" "}
                <span className="text-[#58a6ff]">Flutter</span> and{" "}
                <span className="text-[#58a6ff]">React</span> interfaces.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center max-w-4xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="mb-6 p-3 border border-[#d44d8b]/20 rounded-full inline-block"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 border-2 border-[#d44d8b] border-dashed rounded-full" />
              </motion.div>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 
                animate-gradient-text bg-linear-to-r 
                from-[#d44d8b] via-[#fb923c] to-[#6366f1] 
                bg-clip-text text-transparent 
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] leading-none"
              >
                GAUTHAM.ART
              </h1>
              <p className="text-lg md:text-2xl font-light italic opacity-70 max-w-2xl px-4">
                “Unveiling the silent dialogue between color and form.”
              </p>
            </div>
          )}
        </motion.div>

        {/* RIGHT SIDE: Spline */}
        {isDev && (
          <motion.div
            ref={splineRef}
            id="spline-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isLoaded ? 1 : 0, // 3. Only show when loaded
              scale: isLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`hidden md:flex relative flex-1 w-full h-125 lg:h-175 
              ${!isInView ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            {/* 4. Optional: A simple loading spinner while the scene loads */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-main-bg/50">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <Spline
              className="w-full h-full"
              onLoad={() => setIsLoaded(true)} // 5. Set load state
              scene="https://prod.spline.design/1jwsk6J7JWqNN-vT/scene.splinecode"
            />
            <div className="absolute bottom-0 right-0 w-32 h-10 bg-main-bg z-20 pointer-events-none" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
