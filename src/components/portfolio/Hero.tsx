import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { PROFILE, ROTATING_PHRASES } from "./data";
import { CloudTopology } from "./CloudTopology";

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const },
  },
};

const BTN = "sweep-host inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-[0.7rem] tracking-[0.18em] transition";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING_PHRASES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative scroll-mt-24 pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <motion.div variants={parent} initial="hidden" animate="show">
          <motion.div
            variants={child}
            className="mono-label inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-3 py-1.5"
          >
            <span className="text-cyan">&gt;</span> CLOUD INFRASTRUCTURE / DEVOPS
          </motion.div>

          <motion.h1
            variants={child}
            className="mt-6 font-display text-[clamp(2.6rem,8vw,5.2rem)] font-bold leading-[0.95] tracking-tight"
          >
            <span className="text-gradient">PANKAJ PAL</span>
          </motion.h1>

          <motion.p
            variants={child}
            className="mt-3 font-display text-xl font-semibold tracking-[0.2em] text-foreground/80 sm:text-2xl"
          >
            DEVOPS ENGINEER
          </motion.p>

          <motion.div variants={child} className="mt-5 flex h-8 items-center gap-3 overflow-hidden">
            <span className="h-px w-6 bg-emerald/60" />
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_PHRASES[index]}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.2, 0.7, 0.2, 1] }}
                className="font-mono text-sm tracking-[0.2em] text-emerald sm:text-base"
              >
                {ROTATING_PHRASES[index]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={child}
            className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div variants={child} className="mt-9 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              href="#projects"
              className={`${BTN} group border border-primary/50 bg-primary/15 text-cyan hover:border-cyan/60 hover:bg-primary/25`}
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              EXPLORE PROJECTS
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              href={PROFILE.resume}
              download="Pankaj-Pal-Resume.pdf"
              className={`${BTN} border border-border text-foreground hover:border-emerald/50 hover:text-emerald`}
            >
              <Download className="size-3.5" /> DOWNLOAD RESUME
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              className={`${BTN} border border-border text-foreground hover:border-cyan/50 hover:text-cyan`}
            >
              <Github className="size-3.5" /> GITHUB
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={`${BTN} border border-border text-foreground hover:border-violet/50 hover:text-violet`}
            >
              <Linkedin className="size-3.5" /> LINKEDIN
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <CloudTopology />
        </motion.div>
      </div>
    </section>
  );
}
