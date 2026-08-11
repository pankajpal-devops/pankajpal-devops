import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, color-mix(in oklab, var(--primary) 80%, transparent), var(--cyan), var(--emerald))",
        boxShadow: "0 0 12px 0 color-mix(in oklab, var(--cyan) 55%, transparent)",
      }}
    />
  );
}
