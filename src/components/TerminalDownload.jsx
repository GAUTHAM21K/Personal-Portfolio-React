import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Terminal } from "lucide-react";

const TerminalDownload = () => {
  const [status, setStatus] = useState("idle"); // idle | typing | success

  const triggerDownload = () => {
    setStatus("typing");

    // Simulate a system delay for the "terminal" feel
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/Gautham_Krishna_Resume.pdf"; // Place your resume PDF in the 'public' folder
      link.download = "Gautham_Krishna_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus("success");
    }, 2500);
  };

  return (
    <div className="mt-12 font-mono">
      <div className="bg-[#0d1117] border border-white/10 rounded-sm p-4 max-w-md shadow-2xl">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <Terminal size={12} className="text-[#58a6ff]" />
          <span className="text-[10px] text-white/40 italic uppercase tracking-widest">
            secure_transfer_protocol
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex gap-2 text-white">
            <span className="text-accent">{">"}</span>
            {status === "idle" ? (
              <button
                onClick={triggerDownload}
                className="hover:underline text-left"
              >
                fetch_resume --latest
              </button>
            ) : (
              <span>fetch_resume --latest</span>
            )}
          </div>

          <AnimatePresence>
            {status === "typing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/60 text-[11px]"
              >
                <p>Initializing secure connection...</p>
                <p>Locating: /root/documents/cv_v2_2026.pdf</p>
                <p className="animate-pulse text-[#58a6ff]">
                  Downloading [||||||||||] 100%
                </p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-[11px]"
              >
                [SUCCESS] File transferred successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
