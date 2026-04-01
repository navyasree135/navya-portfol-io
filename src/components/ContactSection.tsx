import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:dasarinavyasree936@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="relative flex flex-col items-center justify-center px-6 pt-24 pb-12" style={{ background: "transparent" }}>

      <div className="relative z-10 text-center w-full max-w-3xl flex flex-col items-center">
        <h2 id="apt-contact" className="font-display font-bold text-white/90 whitespace-nowrap tracking-tight md:tracking-normal" style={{ fontSize: "clamp(1.8rem, 6.5vw, 7rem)", lineHeight: 1.1 }}>
          Let's build something
        </h2>
        <p className="font-display italic text-destructive-foreground whitespace-nowrap tracking-tight md:tracking-normal" style={{ fontSize: "clamp(1.4rem, 5vw, 5rem)" }}>
          intelligent together.
        </p>

        <p className="mt-8 mb-2 font-body text-white/80 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-center px-4 md:px-0">
          If my profile and skills caught your eye, I'd absolutely love to hear from you! Feel free to drop me a message below.
        </p>

        {/* Form Container */}
        <form onSubmit={handleSend} className="mt-8 mb-10 w-full max-w-2xl glass p-6 md:p-8 rounded-3xl flex flex-col gap-5 text-left shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-mono text-pastel-accent ml-2 font-semibold">Subject</label>
            <input
              id="subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-pastel-dark placeholder:text-pastel-muted/60 focus:outline-none focus:ring-2 focus:ring-pastel-accent transition-all font-body"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-mono text-pastel-accent ml-2 font-semibold">Message</label>
            <textarea
              id="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hello Navya Sree, I'd like to talk about..."
              rows={4}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-pastel-dark placeholder:text-pastel-muted/60 focus:outline-none focus:ring-2 focus:ring-pastel-accent transition-all font-body resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-pastel-accent hover:brightness-110 text-[#0F172A] font-bold font-body py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:-translate-y-1"
          >
            Send via Email <Send size={16} />
          </button>
        </form>

        {/* Social Chips */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:dasarinavyasree936@gmail.com" className="glass-dark flex items-center gap-2 px-5 py-3 text-sm font-mono text-white/80 hover:text-white hover:scale-105 transition-all duration-300 rounded-full">
            <Mail size={16} /> dasarinavyasree936@gmail.com
          </a>
          <a href="tel:+919494125532" className="glass-dark flex items-center gap-2 px-5 py-3 text-sm font-mono text-white/80 hover:text-white hover:scale-105 transition-all duration-300 rounded-full">
            <Phone size={16} /> +91 9494125532
          </a>
          <a href="https://github.com/navyasree135/" target="_blank" rel="noreferrer" className="glass-dark flex items-center gap-2 px-5 py-3 text-sm font-mono text-white/80 hover:text-white hover:scale-105 transition-all duration-300 rounded-full">
            <Github size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/navyasree-dasari-0b5489292" target="_blank" rel="noreferrer" className="glass-dark flex items-center gap-2 px-5 py-3 text-sm font-mono text-white/80 hover:text-white hover:scale-105 transition-all duration-300 rounded-full">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>

      <footer className="mt-16 text-center">
        <p className="font-body text-xs text-pastel-muted tracking-wide opacity-80">© {new Date().getFullYear()} Dasari Navya Sree. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default ContactSection;