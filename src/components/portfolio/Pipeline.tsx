import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Code2, GitBranch, Github, Workflow, FileCode2, Cloud, Activity, Check } from "lucide-react";
import { Section, Reveal } from "./Section";

const STAGES = [
  { label: "CODE", icon: Code2, status: "CODE" },
  { label: "GIT", icon: GitBranch, status: "BUILD" },
  { label: "GITHUB", icon: Github, status: "BUILD" },
  { label: "CI PIPELINE", icon: Workflow, status: "VALIDATE" },
  { label: "TERRAFORM", icon: FileCode2, status: "VALIDATE" },
  { label: "AZURE", icon: Cloud, status: "DEPLOY" },
  { label: "MONITORING", icon: Activity, status: "MONITOR" },
];

const CHECKS = ["CODE", "BUILD", "VALIDATE", "DEPLOY", "MONITOR"];
const STEP_MS = 900;

export function Pipeline() {
  const [step, setStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (STAGES.length + 2));
    }, STEP_MS);
    return () => clearInterval(id);
  }, [started]);

  const checkIndex = step < 0 ? -1 : Math.min(Math.floor((step / STAGES.length) * CHECKS.length), CHECKS.length - 1);

  return (
    <Section
      id="pipeline"
      label="06 / DELIVERY"
      title="CI/CD PIPELINE"
      description="From commit to provisioned Azure infrastructure and monitoring."
    >
      <Reveal>
        <div ref={ref} className="glass relative overflow-hidden rounded-xl p-6 sm:p-8">
          <div className="relative grid gap-3 lg:grid-cols-7">
            <div className="pointer-events-none absolute inset-x-8 top-9 hidden h-px bg-border lg:block" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[2.05rem] hidden size-2.5 rounded-full bg-emerald lg:block"
              style={{ boxShadow: "0 0 14px 3px color-mix(in oklab, var(--emerald) 60%, transparent)" }}
              initial={{ left: "2rem" }}
              animate={{ left: ["2rem", "calc(100% - 2rem)"] }}
              transition={{ duration: STEP_MS * (STAGES.length + 2) / 1000, repeat: Infinity, ease: "linear" }}
            />
            {STAGES.map((s, i) => {
              const on = step >= i;
              const current = step === i;
              return (
                <div key={s.label} className="relative flex items-center gap-3 lg:block">
                  <motion.div
                    animate={{ scale: current ? 1.07 : 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="grid size-[4.5rem] shrink-0 place-items-center rounded-lg border bg-surface/70 transition-colors duration-500 lg:mx-auto lg:size-[4.5rem]"
                    style={{
                      borderColor: on
                        ? "color-mix(in oklab, var(--emerald) 55%, transparent)"
                        : "color-mix(in oklab, var(--primary) 30%, transparent)",
                      boxShadow: current
                        ? "0 0 24px -6px color-mix(in oklab, var(--emerald) 70%, transparent)"
                        : "none",
                    }}
                  >
                    <s.icon
                      className="size-5 transition-colors duration-500"
                      style={{ color: on ? "var(--emerald)" : "var(--cyan)" }}
                    />
                  </motion.div>
                  <div className="lg:mt-3 lg:text-center">
                    <div className="font-mono text-[0.62rem] tracking-[0.14em] text-foreground/85">
                      {s.label}
                    </div>
                    <div className="mt-1 font-mono text-[0.55rem] tracking-[0.12em] text-muted-foreground">
                      STAGE {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="absolute left-[2.2rem] top-[4.6rem] h-4 w-px bg-cyan/40 lg:hidden" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-border/70 pt-5">
            {CHECKS.map((c, i) => {
              const done = i <= checkIndex;
              return (
                <motion.span
                  key={c}
                  animate={{ opacity: done ? 1 : 0.4, y: done ? 0 : 2 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.14em]"
                  style={{
                    borderColor: done
                      ? "color-mix(in oklab, var(--emerald) 40%, transparent)"
                      : "var(--border)",
                    color: done ? "var(--emerald)" : "var(--muted-foreground)",
                    background: done ? "color-mix(in oklab, var(--emerald) 8%, transparent)" : "transparent",
                  }}
                >
                  <Check className="size-3" /> {c}
                </motion.span>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
