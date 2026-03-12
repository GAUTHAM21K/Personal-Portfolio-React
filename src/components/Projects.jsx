import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Github,
  ExternalLink,
  Terminal,
  ChevronDown,
  ChevronUp,
  Cpu,
  Calendar,
} from "lucide-react";
import Typewriter from "typewriter-effect";

const Projects = ({ isDev }) => {
  const [showAll, setShowAll] = useState(false);

  // --- DATA OBJECTS ---
  const experiences = [
    {
      period: "2025 - 2026",
      role: "Flutter Developer Intern",
      company: "Nexotech Solutions",
      status: "Ongoing",
      details:
        "Contributed to the development of a production software application following standard SDLC practices .",
    },
  ];

  const featuredProjects = [
    {
      title: "QGuard",
      tech: ["Flutter", "C", "Quantum Cryptography"],
      desc: "Secure messaging application using post-quantum cryptography.",
      git: "https://github.com/gauth/qguard",
      link: "#",
    },
    {
      title: "AI Gym Tracker",
      tech: ["Flutter", "Node.js", "MongoDB"],
      desc: "tracking application that helps users log workouts and receive AI-powered coaching feedback.",
      git: "https://github.com/gauth/AI_Gym_Tracker_Flutter",
      link: "#",
    },
  ];

  const projectArchive = [
    {
      title: "Resume Tailor",
      tech: ["Python", "Google Gemini API"],
      desc: "AI-powered Python application that automatically tailors resumes to specific job descriptions. Implements STAR method optimization.",
    },
    {
      title: "Real Time Project Management Website",
      tech: ["React", "Django", "Socket.io"],
      desc: "real-time project management application built with Django, WebSockets, and React.",
    },
    {
      title: "Url Shortner with Dashboard",
      tech: ["React", "Django"],
      desc: "Url Shortner with Analytic Dashboard.",
    },
    {
      title: "Sift Photo Cleaner",
      tech: ["Flutter"],
      desc: "A powerful and intuitive Flutter application designed to help you organize.",
    },
    {
      title: "Medicine Reminder App",
      tech: ["Flutter"],
      desc: "Flutter-based medicine reminder application.",
    },
    {
      title: "Meal Database",
      tech: ["React Native"],
      desc: "A cross-platform mobile application built with React Native that allows users to browse, search, and save their favorite meals.",
    },
    {
      title: "AI Meal Analysis",
      tech: ["Flutter"],
      desc: "Flutter-based application designed to help users analyze meals with AI to view macros.",
    },
  ];

  // --- HELPER COMPONENT ---
  const ProjectCard = ({ proj, i, isArchive = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group border border-white/10 bg-[#0d1117] rounded-sm shadow-2xl overflow-hidden hover:border-accent/40 transition-colors ${
        isArchive ? "p-5 md:p-6" : ""
      }`}
    >
      {!isArchive && (
        <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-white/5 font-mono">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-accent" />
            <span className="text-[9px] md:text-[10px] text-white/40 truncate max-w-30 md:max-w-none">
              {proj.title.toLowerCase()}.sh
            </span>
          </div>
          <div className="flex gap-4 opacity-100 md:opacity-30 group-hover:opacity-100 transition-opacity text-white">
            <Github
              size={14}
              className="cursor-pointer hover:text-accent"
              onClick={() => window.open(proj.git, "_blank")}
            />
            <ExternalLink
              size={14}
              className="cursor-pointer hover:text-accent"
              onClick={() => window.open(proj.link, "_blank")}
            />
          </div>
        </div>
      )}

      <div className={isArchive ? "" : "p-6 md:p-8 font-mono text-white"}>
        <h3
          className={`${
            isArchive ? "text-base md:text-lg" : "text-lg md:text-xl"
          } font-bold mb-3 md:mb-4 uppercase leading-tight`}
        >
          <span className="text-accent text-xs">
            {isArchive ? ">" : `0${i}`}
          </span>{" "}
          {proj.title}
        </h3>
        <p className="text-xs md:text-sm text-white/60 mb-5 md:mb-6 leading-relaxed">
          {proj.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
          {proj.tech?.map((t) => (
            <span
              key={t}
              className="text-[8px] md:text-[9px] px-2 py-1 border border-accent/20 text-accent bg-accent/5"
            >
              {t}
            </span>
          ))}
        </div>
        {!isArchive && (
          <div className="text-[8px] md:text-[9px] opacity-20 uppercase tracking-widest flex items-center gap-2">
            <span>STABLE_BUILD</span>
            <span className="animate-pulse">●</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-16 md:space-y-32 px-2 md:px-0">
      {/* --- SECTION 1: SYSTEM LOG (EXPERIENCE) --- */}
      {isDev && (
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-2xl md:text-4xl font-mono text-white flex items-center gap-2">
            <span className="text-accent">{"#"}</span> system_runtime_history
          </h2>

          <div className="relative border-l border-white/10 ml-2 md:ml-4 pl-6 md:pl-8 space-y-10 md:space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-7.75 md:-left-9.25 top-1 w-3 md:h-4 h-3 md:w-4 rounded-full bg-[#0d1117] border-2 border-accent shadow-[0_0_10px_var(--accent)]" />

                <div className="font-mono space-y-2">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] tracking-widest uppercase opacity-40">
                    <span className="flex items-center gap-1 text-white">
                      <Calendar size={10} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-green-500">
                      <Cpu size={10} /> {exp.status}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-accent text-xs md:text-sm font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm max-w-xl leading-relaxed italic border-l border-white/5 pl-4 py-1">
                    "{exp.details}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* --- SECTION 2: MAJOR DEPLOYMENTS (PROJECTS) --- */}
      <div className="space-y-8 md:space-y-12">
        <h2 className="text-2xl md:text-4xl font-mono text-white flex items-center gap-2">
          <span>{">"}</span>
          <Typewriter
            options={{
              strings: [
                "sudo_list_projects",
                "fetching_deployments...",
                "active_repos",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              cursor: "_",
              wrapperClassName: "text-white",
            }}
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((proj, i) => (
            <ProjectCard key={proj.title} proj={proj} i={i} />
          ))}
        </div>

        <div className="flex flex-col items-center pt-4 md:pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex flex-col items-center gap-2 mb-8 md:mb-12 text-white/40 hover:text-accent transition-colors font-mono"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">
              {showAll ? "cd .." : "ls --all ./archive"}
            </span>
            {showAll ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} className="animate-bounce" />
            )}
          </button>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
              >
                {projectArchive.map((proj) => (
                  <ProjectCard key={proj.title} proj={proj} isArchive={true} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;
