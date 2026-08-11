import { useState } from "react";
import { motion } from "motion/react";

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  tone: "primary" | "cyan" | "emerald" | "violet";
};

const NODES: NodeDef[] = [
  { id: "cloud", label: "AZURE CLOUD", x: 190, y: 26, w: 128, tone: "primary" },
  { id: "hub", label: "HUB VNET", x: 190, y: 96, w: 116, tone: "cyan" },
  { id: "s1", label: "SPOKE", x: 66, y: 174, w: 92, tone: "violet" },
  { id: "s2", label: "SPOKE", x: 190, y: 174, w: 92, tone: "violet" },
  { id: "s3", label: "SPOKE", x: 314, y: 174, w: 92, tone: "violet" },
  { id: "vm1", label: "VM", x: 66, y: 240, w: 78, tone: "emerald" },
  { id: "vm2", label: "VM", x: 190, y: 240, w: 78, tone: "emerald" },
  { id: "svc", label: "SERVICES", x: 314, y: 240, w: 96, tone: "emerald" },
  { id: "nsg", label: "NSG", x: 66, y: 300, w: 78, tone: "cyan" },
  { id: "bastion", label: "BASTION", x: 66, y: 358, w: 96, tone: "primary" },
];

const EDGES: [string, string][] = [
  ["cloud", "hub"],
  ["hub", "s1"],
  ["hub", "s2"],
  ["hub", "s3"],
  ["s1", "vm1"],
  ["s2", "vm2"],
  ["s3", "svc"],
  ["vm1", "nsg"],
  ["nsg", "bastion"],
];

const toneVar: Record<NodeDef["tone"], string> = {
  primary: "var(--primary)",
  cyan: "var(--cyan)",
  emerald: "var(--emerald)",
  violet: "var(--violet)",
};

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function CloudTopology() {
  const [hover, setHover] = useState<string | null>(null);
  const H = 30;

  return (
    <div className="glass relative overflow-hidden rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-destructive/70" />
          <span className="size-2 rounded-full bg-accent/60" />
          <span className="size-2 rounded-full bg-emerald/70" />
          <span className="mono-label ml-2">cloud command center</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald" />
          <span className="font-mono text-[0.6rem] tracking-[0.14em] text-emerald">HEALTHY</span>
        </div>
      </div>

      <svg
        viewBox="0 0 440 410"
        className="mt-4 w-full"
        role="img"
        aria-label="Azure cloud hub and spoke architecture diagram"
      >
        {EDGES.map(([a, b], idx) => {
          const na = byId(a);
          const nb = byId(b);
          const x1 = na.x + na.w / 2;
          const y1 = na.y + H;
          const x2 = nb.x + nb.w / 2;
          const y2 = nb.y;
          const midY = (y1 + y2) / 2;
          const d = `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
          const active = hover === a || hover === b;
          const pathId = `ct-path-${a}-${b}`;
          return (
            <g key={`${a}-${b}`}>
              <path id={pathId} d={d} fill="none" stroke="var(--border)" strokeWidth={1.2} />
              <path
                className="flow-line"
                d={d}
                fill="none"
                stroke={active ? "var(--emerald)" : "var(--cyan)"}
                strokeWidth={active ? 1.8 : 1.1}
                opacity={active ? 0.95 : 0.55}
              />
              {/* Glowing data packet travelling the link */}
              <circle
                r={active ? 3.4 : 2.6}
                fill={active ? "var(--emerald)" : "var(--cyan)"}
                opacity={active ? 1 : 0.85}
                style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
              >
                <animateMotion
                  dur={`${3.6 + (idx % 3) * 0.8}s`}
                  begin={`${idx * 0.45}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {NODES.map((n, i) => {
          const active = hover === n.id;
          return (
            <motion.g
              key={n.id}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transformOrigin: `${n.x + n.w / 2}px ${n.y + H / 2}px` }}
              animate={{ scale: active ? 1.05 : 1, opacity: active ? 1 : [0.88, 1, 0.88] }}
              transition={
                active
                  ? { duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }
                  : { duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut" }
              }
            >
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={H}
                rx={7}
                fill="color-mix(in oklab, var(--surface-2) 85%, transparent)"
                stroke={toneVar[n.tone]}
                strokeWidth={active ? 1.8 : 1}
                style={active ? { filter: "drop-shadow(0 0 8px currentColor)" } : undefined}
              />
              {active && (
                <rect
                  x={n.x - 4}
                  y={n.y - 4}
                  width={n.w + 8}
                  height={H + 8}
                  rx={10}
                  fill="none"
                  stroke={toneVar[n.tone]}
                  strokeWidth={0.8}
                  opacity={0.4}
                />
              )}
              <text
                x={n.x + n.w / 2}
                y={n.y + H / 2 + 4}
                textAnchor="middle"
                fill="var(--foreground)"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                }}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/70 pt-4">
        {[
          { k: "REGION", v: "central-india" },
          { k: "IaC", v: "terraform" },
          { k: "ACCESS", v: "bastion" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-border/70 bg-surface/50 px-3 py-2">
            <div className="mono-label text-[0.55rem]">{s.k}</div>
            <div className="mt-1 truncate font-mono text-[0.7rem] text-foreground/80">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
