import { motion, AnimatePresence } from "framer-motion";
import Projects from "./Projects";
import Gallery from "./Gallery";

const Work = ({ isDev }) => {
  return (
    <section
      id="projects"
      className="py-24 px-6 min-h-screen transition-colors duration-700 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDev ? "projects" : "gallery"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {isDev ? <Projects isDev={isDev} /> : <Gallery />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Work;
