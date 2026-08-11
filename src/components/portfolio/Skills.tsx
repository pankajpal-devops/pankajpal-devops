import {
  Cloud,
  FileCode2,
  Boxes,
  GitBranch,
  GitMerge,
  TerminalSquare,
  Network,
  Server,
  BrainCircuit,
} from "lucide-react";
import { motion } from "motion/react";
import { Section, Reveal } from "./Section";
import { Tilt } from "./Tilt";
import { SKILL_GROUPS } from "./data";

const ICONS = {
  cloud: Cloud,
  code: FileCode2,
  box: Boxes,
  pipeline: GitMerge,
  git: GitBranch,
  terminal: TerminalSquare,
  network: Network,
  server: Server,
  brain: BrainCircuit,
} as const;

/** Tone per stack area — Terraform/IaC violet, Azure/network cyan, Linux/servers emerald. */
const TONES: Record<keyof typeof ICONS, string> = {
  cloud: "var(--cyan)",
  code: "var(--violet)",
  box: "var(--primary)",
  pipeline: "var(--cyan)",
  git: "var(--primary)",
  terminal: "var(--emerald)",
  network: "var(--cyan)",
  server: "var(--emerald)",
  brain: "var(--violet)",
};

export function Skills() {
  return (
    <Section
      id="skills"
      label="02 / STACK"
      title="DEVOPS STACK"
      description="Live inventory of the tooling, platforms and concepts used day to day."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = ICONS[group.icon];
          const tone = TONES[group.icon];
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.07}>
              <Tilt className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="glass sweep-host group h-full rounded-xl p-5 transition-[border-color,box-shadow] duration-300"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone} 45%, transparent), 0 18px 50px -28px ${tone}`,
                      background: `radial-gradient(80% 60% at 20% 0%, color-mix(in oklab, ${tone} 10%, transparent), transparent 70%)`,
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <motion.span
                      whileHover={{ rotate: 8 }}
                      className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tone }}
                    >
                      <Icon className="size-4" />
                    </motion.span>
                    <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-4 font-display text-sm font-bold tracking-[0.16em] text-foreground">
                    {group.title}
                  </h3>
                  <ul className="relative mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ y: -2, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className="rounded border border-border/80 bg-surface/50 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
