import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-pointer";

const STEPS = [
  "Initializing Cloud Infrastructure...",
  "Loading Azure...",
  "Loading Terraform...",
  "Starting CI/CD...",
  "System Ready ✓",
];

const STEP_MS = 420;

export function BootScreen() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= STEPS.length) {
        clearInterval(id);
        setStep(STEPS.length - 1);
        setTimeout(() => setVisible(false), 520);
        return;
      }
      setStep(i);
    }, STEP_MS);
    const safety = setTimeout(() => setVisible(false), 3200);
    return () => {
      clearInterval(id);
      clearTimeout(safety);
    };
  }, [reduced]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" />
          <div className="relative w-[min(90vw,26rem)] text-center">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gradient font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              PANKAJ PAL
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-2 font-mono text-[0.68rem] tracking-[0.28em] text-cyan"
            >
              DEVOPS ENGINEER
            </motion.p>

            <div className="mt-8 h-px w-full overflow-hidden bg-border">
              <motion.div
                className="h-full bg-cyan"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ boxShadow: "0 0 12px 1px color-mix(in oklab, var(--cyan) 70%, transparent)" }}
              />
            </div>

            <div className="mt-4 h-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={STEPS[step]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`font-mono text-[0.7rem] tracking-[0.16em] ${
                    step === STEPS.length - 1 ? "text-emerald" : "text-muted-foreground"
                  }`}
                >
                  {STEPS[step]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
