import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Terminal,
  Send,
  Mail,
  User,
  MessageSquare,
  PenTool,
  Sparkles,
  Activity,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Contact = ({ isDev }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const SERVICEID = "service_uvw0xor";
  const TEMPLATEID = "template_0w7xhgc";
  const PUBLICKEY = "aU5gjZUsF84GGPeRz";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(SERVICEID, TEMPLATEID, e.target, PUBLICKEY)
      .then(() => {
        alert(
          isDev
            ? "[SYSTEM] Message Broadcast Successful"
            : "Your letter has been sent.",
        );
        setForm({ name: "", email: "", message: "" });
        setIsSending(false);
      })
      .catch(() => {
        alert(isDev ? "[ERROR] Transmission Failed" : "Something went wrong.");
        setIsSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <motion.div
        layout
        className={`w-full max-w-2xl relative transition-all duration-700 
          ${
            isDev
              ? "bg-[#0d1117] border border-[#ffffff1a] p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "bg-[#eaddd7] p-12 rounded-[2.5rem] shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border border-white/40"
          }`}
      >
        {/* Rest of the Header and Form remains consistent with your previous high-quality build */}
        <div className="flex flex-col items-center mb-12 mt-4">
          <div className="w-32 h-32 mb-6">
            <DotLottieReact
              autoplay
              loop
              // New stable public URLs
              src={
                isDev
                  ? "src/assets/dev_animation.lottie"
                  : "src/assets/art_animation.lottie"
              }
              style={{ height: "100%", width: "100%" }}
              // Fallback if the player fails to load
              onEvent={(event) => {
                if (event === "error") console.error("Lottie failed to load");
              }}
            />
          </div>

          <h2
            className={`text-4xl ${isDev ? "text-white font-mono tracking-tighter" : "text-black font-sans font-black italic tracking-tight uppercase"}`}
          >
            {isDev ? "> init_connection" : "The Narrative"}
          </h2>

          <div
            className={`h-1 w-20 mt-4 ${isDev ? "bg-[#58a6ff]" : "bg-gradient-to-r from-[#d44d8b] via-[#fb923c] to-[#9333ea]"}`}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              id: "name",
              type: "text",
              icon: <User size={16} />,
              label: isDev ? "user_id" : "Name on the Letter",
            },
            {
              id: "email",
              type: "email",
              icon: <Mail size={16} />,
              label: isDev ? "return_path" : "Return Address (Email)",
            },
          ].map((field) => (
            <div key={field.id} className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDev ? "text-white/30" : "text-black/30"}`}
              >
                {field.icon}
              </div>
              <input
                type={field.type}
                name={field.id}
                required
                value={form[field.id]}
                onChange={(e) =>
                  setForm({ ...form, [field.id]: e.target.value })
                }
                placeholder={field.label}
                className={`w-full pl-12 pr-4 py-4 border transition-all duration-300 focus:outline-none
                  ${
                    isDev
                      ? "bg-[#ffffff08] border-[#ffffff1a] focus:border-[#58a6ff] text-white font-mono"
                      : "bg-black/5 border-black/10 focus:border-[#d44d8b] text-black italic rounded-2xl placeholder:text-black/40"
                  }`}
              />
            </div>
          ))}

          <div className="relative">
            <div
              className={`absolute left-4 top-6 ${isDev ? "text-white/30" : "text-black/30"}`}
            >
              <MessageSquare size={16} />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={
                isDev ? "transmission_payload" : "Tell your story..."
              }
              className={`w-full pl-12 pr-4 py-4 border transition-all duration-300 focus:outline-none resize-none
                ${
                  isDev
                    ? "bg-[#ffffff08] border-[#ffffff1a] focus:border-[#58a6ff] text-white font-mono"
                    : "bg-black/5 border-black/10 focus:border-[#d44d8b] text-black italic rounded-3xl placeholder:text-black/40"
                }`}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSending}
            className={`w-full py-4 px-6 flex items-center justify-center gap-3 transition-all duration-500 disabled:opacity-50
              ${
                isDev
                  ? "bg-transparent border border-[#58a6ff] text-[#58a6ff] font-mono hover:bg-[#58a6ff1a]"
                  : "bg-black text-white font-black italic tracking-widest uppercase hover:shadow-[0_10px_30px_rgba(212,77,139,0.3)] rounded-full"
              }`}
          >
            {isSending ? (
              <span className="animate-pulse">
                {isDev ? "SENDING..." : "Mailing..."}
              </span>
            ) : (
              <>
                <span className={!isDev ? "text-white" : ""}>
                  {isDev ? "EXECUTE_SEND" : "Seal & Send"}
                </span>
                {isDev ? (
                  <Terminal size={18} />
                ) : (
                  <Send size={18} color="white" />
                )}
              </>
            )}
          </motion.button>
        </form>

        {isDev && (
          <div className="mt-8 pt-8 border-t border-[#ffffff0d] flex justify-between items-center opacity-20 font-mono text-[10px] text-white">
            <span className="animate-pulse">LOCAL_PORT: 3000</span>
            <span className="tracking-widest uppercase">
              Encrypted_Line_Active
            </span>
          </div>
        )}
      </motion.div>
    </section>
  );
};
