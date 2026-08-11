import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Section, Reveal } from "./Section";
import { PROJECTS } from "./data";

const STAGES = ["TERRAFORM", "INIT", "PLAN", "APPLY", "AZURE", "VM / VNET / SUBNET / STORAGE"];
const STAGE_MS = 950;

function TerraformFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (STAGES.length + 1)), STAGE_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="rounded-lg border border-border/70 bg-surface/40 p-5">
      <div className="mono-label">deployment flow</div>
      <div className="mt-4 space-y-2">
        {STAGES.map((s, i) => {
          const done = step >= i;
          const current = step === i;
          return (
            <div key={s}>
              <motion.div
                animate={{
                  opacity: done ? 1 : 0.5,
                  scale: current ? 1.015 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex items-center justify-between rounded-md border px-4 py-2.5"
                style={{
                  borderColor: current
                    ? "color-mix(in oklab, var(--emerald) 50%, transparent)"
                    : "color-mix(in oklab, var(--violet) 25%, transparent)",
                  background: current
                    ? "color-mix(in oklab, var(--emerald) 8%, transparent)"
                    : "color-mix(in oklab, var(--violet) 5%, transparent)",
                  boxShadow: current
                    ? "0 0 22px -8px color-mix(in oklab, var(--emerald) 80%, transparent)"
                    : "none",
                }}
              >
                <span className="font-mono text-[0.7rem] tracking-[0.16em] text-foreground/90">
                  {s}
                </span>
                <span
                  className="font-mono text-[0.6rem]"
                  style={{ color: done ? "var(--emerald)" : "var(--muted-foreground)" }}
                >
                  {done ? "OK" : "…"}
                </span>
              </motion.div>
              {i < STAGES.length - 1 && (
                <div className="relative mx-auto h-5 w-px bg-gradient-to-b from-cyan/70 to-transparent">
                  {current && (
                    <motion.span
                      className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-emerald"
                      style={{
                        boxShadow: "0 0 10px 2px color-mix(in oklab, var(--emerald) 70%, transparent)",
                      }}
                      initial={{ top: 0, opacity: 0 }}
                      animate={{ top: "100%", opacity: [0, 1, 0] }}
                      transition={{ duration: STAGE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const NET = [
  { id: "azure", label: "AZURE", x: 170, y: 10, w: 100 },
  { id: "vnet", label: "VIRTUAL NETWORK", x: 130, y: 70, w: 180 },
  { id: "sn1", label: "SUBNET", x: 30, y: 140, w: 100 },
  { id: "sn2", label: "SUBNET", x: 170, y: 140, w: 100 },
  { id: "sn3", label: "SUBNET", x: 310, y: 140, w: 100 },
  { id: "nsg", label: "NSG", x: 30, y: 205, w: 100 },
  { id: "vm", label: "VM", x: 170, y: 205, w: 100 },
  { id: "svc", label: "SERVICES", x: 310, y: 205, w: 100 },
  { id: "bastion", label: "BASTION", x: 30, y: 265, w: 100 },
  { id: "secure", label: "SECURE ACCESS", x: 10, y: 325, w: 140 },
];
const NET_EDGES: [string, string][] = [
  ["azure", "vnet"],
  ["vnet", "sn1"],
  ["vnet", "sn2"],
  ["vnet", "sn3"],
  ["sn1", "nsg"],
  ["sn2", "vm"],
  ["sn3", "svc"],
  ["nsg", "bastion"],
  ["bastion", "secure"],
];

/** Traffic path used for the sequential inspection micro-interactions. */
const TRAFFIC = ["vnet", "sn1", "nsg", "bastion", "vm"] as const;
const NOTES: Record<string, string> = {
  nsg: "TRAFFIC VERIFIED ✓",
  bastion: "SECURE ACCESS ✓",
};

function NetworkTopology() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [tick, setTick] = useState(0);
  const get = (id: string) => NET.find((n) => n.id === id)!;
  const H = 28;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, [inView]);

  const activeId = TRAFFIC[tick % TRAFFIC.length]!;
  const note = NOTES[activeId];

  return (
    <div ref={ref} className="rounded-lg border border-border/70 bg-surface/40 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="mono-label">network topology — live traffic</div>
        <motion.span
          key={activeId + String(tick)}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: note ? 1 : 0, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-[0.58rem] tracking-[0.12em] text-emerald"
        >
          {note ?? ""}
        </motion.span>
      </div>
      <svg viewBox="0 0 440 370" className="mt-3 w-full" role="img" aria-label="Azure network topology">
        {NET_EDGES.map(([a, b], idx) => {
          const na = get(a);
          const nb = get(b);
          const x1 = na.x + na.w / 2;
          const y1 = na.y + H;
          const x2 = nb.x + nb.w / 2;
          const mid = (y1 + nb.y) / 2;
          const d = `M ${x1} ${y1} V ${mid} H ${x2} V ${nb.y}`;
          const on = a === activeId || b === activeId;
          const pathId = `net-${a}-${b}`;
          return (
            <g key={`${a}-${b}`}>
              <path id={pathId} d={d} fill="none" stroke="var(--border)" strokeWidth={1.2} />
              <path
                className="flow-line"
                d={d}
                fill="none"
                stroke={on ? "var(--emerald)" : "var(--cyan)"}
                strokeWidth={on ? 1.6 : 1}
                opacity={on ? 0.95 : 0.35}
              />
              <circle r={2.4} fill="var(--cyan)" opacity={0.9}>
                <animateMotion
                  dur={`${4 + (idx % 3)}s`}
                  begin={`${idx * 0.4}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        {NET.map((n) => {
          const on = n.id === activeId;
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={H}
                rx={6}
                fill="color-mix(in oklab, var(--surface-2) 85%, transparent)"
                stroke={on ? "var(--emerald)" : "var(--border)"}
                strokeWidth={on ? 1.6 : 1}
                style={on ? { filter: "drop-shadow(0 0 6px currentColor)" } : undefined}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + H / 2 + 4}
                textAnchor="middle"
                fill="var(--foreground)"
                style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.1em" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="04 / BUILDS"
      title="PROJECTS"
      description="Infrastructure built with Terraform and secured Azure networking."
    >
      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="glass sweep-host group rounded-xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 sm:p-8"
            >
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl font-bold text-primary/40 transition-colors duration-300 group-hover:text-primary/70">
                      {p.id}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ y: -2, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="rounded border border-cyan/25 bg-cyan/5 px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.1em] text-cyan"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="transition-transform duration-500 group-hover:scale-[1.015]">
                  {i === 0 ? <TerraformFlow /> : <NetworkTopology />}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
