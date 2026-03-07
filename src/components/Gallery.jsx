import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const featuredArt = [
    {
      id: "f2",
      title: "Portrait Study",
      type: "Digital Art",
      path: "/art/face.jpg",
    },
    {
      id: "f1",
      title: "Portrait",
      type: "Digital Art",
      path: "/art/zendaya.jpg",
    },
    {
      id: "f3",
      title: "Commission Work",
      type: "Digital Art",
      path: "/art/sm.jpg",
    },
  ];

  const archiveArt = [
    { id: "a1", path: "/art/1.jpg" },
    { id: "a2", path: "/art/2.jpg" },
    { id: "a3", path: "/art/3.jpg" },
    { id: "a4", path: "/art/4.jpg" },
    { id: "a5", path: "/art/5.jpg" },
    { id: "a6", path: "/art/6.jpg" },
    { id: "a7", path: "/art/7.jpg" },
    { id: "a8", path: "/art/8.jpg" },
    { id: "a9", path: "/art/9.jpg" },
    { id: "a10", path: "/art/10.jpg" },
    { id: "a11", path: "/art/11.jpg" },
    { id: "a12", path: "/art/12.jpg" },
    { id: "a13", path: "/art/13.jpeg" },
    { id: "a14", path: "/art/14.jpeg" },
    { id: "a15", path: "/art/15.jpeg" },
    { id: "a16", path: "/art/16.jpg" },
  ];

  // Updated useEffect to handle dynamic resizing and image loading
  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        // Measure total width minus visible width to find the scroll distance
        setScrollWidth(
          containerRef.current.scrollWidth - containerRef.current.offsetWidth,
        );
      }
    };

    // Wait for images/DOM to settle before measuring
    const timer = setTimeout(calculateWidth, 100);
    window.addEventListener("resize", calculateWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);
  return (
    <div className="py-12 space-y-20">
      {/* 1. FEATURED HORIZONTAL SLIDER */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-4">
          <div className="h-px w-12 bg-accent opacity-50" />
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold">
            Featured Works
          </span>
        </div>

        {/* touch-pan-y allows normal vertical page scrolling while dragging horizontally */}
        <div ref={containerRef} className="overflow-hidden px-4 touch-pan-y">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -scrollWidth }}
            dragElastic={0.1} // Makes the edge "bounce" feel natural
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
          >
            {featuredArt.map((art) => (
              <motion.div
                key={art.id}
                // flex-shrink-0 is REQUIRED so cards don't shrink to fit the screen width
                className="relative w-80 md:w-100 h-125 bg-zinc-900 group shadow-2xl overflow-hidden rounded-sm flex-shrink-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${art.path})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-accent font-bold italic text-[10px] tracking-[0.4em] mb-1 uppercase">
                    {art.type}
                  </span>
                  <h3 className="text-white text-2xl font-black italic tracking-tighter uppercase">
                    {art.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. ARCHIVE GRID (remains unchanged but included for context) */}
      <div className="flex flex-col items-center px-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex flex-col items-center gap-2 mb-12 hover:text-accent transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">
            {showAll ? "Hide Archives" : "View Full Collection"}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {archiveArt.map((art) => (
                <motion.div
                  key={art.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="aspect-[3/4] bg-zinc-800 relative group overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${art.path})` }}
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="text-white" size={24} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
