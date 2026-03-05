import { motion } from "framer-motion";
import { Code, GitBranch, Binary } from "lucide-react";
import Game from "./Game";

const Skills = ({ isDev }) => {
  const devSkills = [
    { name: "Flutter", level: "80%", icon: <Code size={14} /> },
    { name: "Python", level: "75%", icon: <Binary size={14} /> },
    { name: "React / Node", level: "75%", icon: <Code size={14} /> },
    { name: "Git & Control", level: "85%", icon: <GitBranch size={14} /> },
  ];

  return (
    <section
      id="skills"
      className="py-12 md:py-20 px-6 md:px-10 min-h-svh flex flex-col justify-center bg-main-bg text-main-text transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Title: Adjusted size for mobile */}
        <h2
          className={`text-2xl md:text-4xl mb-10 md:mb-16 ${
            isDev ? "font-mono" : "font-sans font-bold italic"
          }`}
        >
          {isDev ? "> system_capabilities.sh" : "Creative Arsenal"}
        </h2>

        {isDev ? (
          /* DEV VIEW: Grid transitions from 1 column (mobile) to 2 columns (desktop) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 md:gap-y-12">
            {devSkills.map((skill, index) => (
              <div key={skill.name} className="font-mono">
                <div className="flex justify-between items-end mb-3 md:mb-4">
                  <span className="text-accent text-xs md:text-sm flex items-center gap-2 md:gap-3">
                    <span className="opacity-30 text-[9px] md:text-[10px]">
                      0{index}
                    </span>
                    {skill.name}
                  </span>
                  <span className="text-[9px] md:text-[10px] opacity-40">
                    {skill.level}
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-0.5 md:h-0.75 w-full bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute h-full bg-(--accent) shadow-[0_0_15px_var(--accent)]"
                  />
                </div>

                <div className="flex justify-between mt-2 text-[7px] md:text-[8px] opacity-20 uppercase tracking-tighter">
                  <span>core_module</span>
                  <span className="animate-pulse">active_stable</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ART VIEW: Game container scaled for mobile responsiveness */
          <div className="w-full flex justify-center">
            <div className="w-full max-w-full overflow-hidden flex justify-center">
              {/* The Game component usually has a fixed-width canvas (800px).
                  On mobile, we ensure it doesn't break the layout.
               */}
              <Game isDev={isDev} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
