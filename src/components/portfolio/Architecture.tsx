import { useState } from "react";
import { Section, Reveal } from "./Section";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  info: string;
};

const H = 32;

const NODES: Node[] = [
  {
    id: "lz",
    label: "AZURE LANDING ZONE",
    x: 155,
    y: 10,
    w: 210,
    info: "Landing zone pattern used to organise Azure subscriptions and workloads.",
  },
  {
    id: "mgmt",
    label: "MANAGEMENT",
    x: 200,
    y: 82,
    w: 120,
    info: "Management layer for governance, monitoring and alerting.",
  },
  {
    id: "hub",
    label: "HUB VNET",
    x: 205,
    y: 154,
    w: 110,
    info: "Central hub VNet hosting shared services such as Bastion and VPN Gateway.",
  },
  { id: "sp1", label: "SPOKE 01", x: 40, y: 230, w: 110, info: "Workload spoke VNet peered to the hub." },
  { id: "sp2", label: "SPOKE 02", x: 205, y: 230, w: 110, info: "Workload spoke VNet peered to the hub." },
  { id: "sp3", label: "SPOKE 03", x: 370, y: 230, w: 110, info: "Workload spoke VNet peered to the hub." },
  { id: "vm1", label: "VM", x: 55, y: 300, w: 80, info: "Azure Virtual Machine provisioned with Terraform." },
  { id: "vm2", label: "VM", x: 220, y: 300, w: 80, info: "Azure Virtual Machine provisioned with Terraform." },
  {
    id: "svc",
    label: "SERVICES",
    x: 375,
    y: 300,
    w: 100,
    info: "Azure services such as Storage Accounts within the spoke.",
  },
  {
    id: "nsg",
    label: "NSG",
    x: 55,
    y: 368,
    w: 80,
    info: "Network Security Groups controlling inbound and outbound traffic.",
  },
  {
    id: "bastion",
    label: "BASTION",
    x: 45,
    y: 436,
    w: 100,
    info: "Azure Bastion providing secure VM access without public IPs.",
  },
  {
    id: "secure",
    label: "SECURE ACCESS",
    x: 25,
    y: 504,
    w: 140,
    info: "Secure administrative access path, complemented by VPN Gateway connectivity.",
  },
];

const EDGES: [string, string][] = [
  ["lz", "mgmt"],
  ["mgmt", "hub"],
  ["hub", "sp1"],
  ["hub", "sp2"],
  ["hub", "sp3"],
  ["sp1", "vm1"],
  ["sp2", "vm2"],
  ["sp3", "svc"],
  ["vm1", "nsg"],
  ["nsg", "bastion"],
  ["bastion", "secure"],
];

const get = (id: string) => NODES.find((n) => n.id === id)!;

export function Architecture() {
  const [active, setActive] = useState<Node | null>(null);

  return (
    <Section
      id="architecture"
      label="05 / LAB"
      title="CLOUD ARCHITECTURE LAB"
      description="Azure Landing Zone and hub-spoke topology built with Terraform. Hover a component for details."
    >
      <Reveal>
        <div className="glass rounded-xl p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <svg
              viewBox="0 0 520 550"
              className="w-full"
              role="img"
              aria-label="Azure landing zone hub and spoke architecture"
            >
              {EDGES.map(([a, b], idx) => {
                const na = get(a);
                const nb = get(b);
                const x1 = na.x + na.w / 2;
                const y1 = na.y + H;
                const x2 = nb.x + nb.w / 2;
                const mid = (y1 + nb.y) / 2;
                const d = `M ${x1} ${y1} V ${mid} H ${x2} V ${nb.y}`;
                const on = active?.id === a || active?.id === b;
                return (
                  <g key={`${a}-${b}`}>
                    <path id={`lz-${a}-${b}`} d={d} fill="none" stroke="var(--border)" strokeWidth={1.2} />
                    <path
                      className="flow-line"
                      d={d}
                      fill="none"
                      stroke={on ? "var(--emerald)" : "var(--cyan)"}
                      strokeWidth={on ? 1.8 : 1}
                      opacity={on ? 0.95 : 0.4}
                    />
                    <circle
                      r={on ? 3.2 : 2.2}
                      fill={on ? "var(--emerald)" : "var(--cyan)"}
                      opacity={on ? 1 : 0.7}
                    >
                      <animateMotion
                        dur={`${4.5 + (idx % 3)}s`}
                        begin={`${idx * 0.5}s`}
                        repeatCount="indefinite"
                      >
                        <mpath href={`#lz-${a}-${b}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
              {NODES.map((n) => {
                const on = active?.id === n.id;
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setActive(n)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(n)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    style={{ cursor: "pointer", outline: "none" }}
                  >
                    <rect
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={H}
                      rx={7}
                      fill="color-mix(in oklab, var(--surface-2) 88%, transparent)"
                      stroke={on ? "var(--emerald)" : "var(--primary)"}
                      strokeWidth={on ? 1.8 : 1}
                      opacity={on ? 1 : 0.85}
                      style={on ? { filter: "drop-shadow(0 0 7px currentColor)" } : undefined}
                    />
                    <text
                      x={n.x + n.w / 2}
                      y={n.y + H / 2 + 4}
                      textAnchor="middle"
                      fill="var(--foreground)"
                      style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em" }}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border/70 bg-surface/50 p-5">
                <div className="mono-label">component inspector</div>
                <h3 className="mt-3 font-display text-lg font-bold">
                  {active ? active.label : "SELECT A COMPONENT"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {active
                    ? active.info
                    : "Hover or focus any node in the diagram to inspect its role in the architecture."}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-surface/50 p-5">
                <div className="mono-label">covered concepts</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Azure Landing Zone",
                    "Hub-Spoke Architecture",
                    "VNets",
                    "Subnets",
                    "NSGs",
                    "Bastion",
                    "VPN Gateway",
                    "Virtual Machines",
                    "Terraform",
                  ].map((c) => (
                    <li
                      key={c}
                      className="rounded border border-violet/25 bg-violet/5 px-2.5 py-1 font-mono text-[0.62rem] text-violet"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
