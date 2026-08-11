import { Cpu, Lock, Activity, TrendingUp } from "lucide-react";
import { Section, Reveal } from "./Section";
import { PROFILE } from "./data";

const MINDSET = [
  { title: "AUTOMATE", icon: Cpu, text: "Infrastructure as Code with reusable Terraform modules." },
  { title: "SECURE", icon: Lock, text: "NSGs, Bastion and VPN Gateway for controlled access." },
  { title: "SCALE", icon: TrendingUp, text: "Hub-spoke topology and Azure Landing Zone patterns." },
  { title: "MONITOR", icon: Activity, text: "Monitoring and alerting across Azure resources." },
];

const FOCUS = [
  "Microsoft Azure",
  "Terraform",
  "Infrastructure as Code",
  "CI/CD",
  "Azure Networking",
  "Linux",
  "Cloud Infrastructure",
  "Automation",
];

export function About() {
  return (
    <Section id="about" label="01 / PROFILE" title="ABOUT ME">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <article className="glass glass-hover h-full rounded-xl p-6 sm:p-8">
            <div className="mono-label">operator profile</div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {PROFILE.fullSummary}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground transition hover:border-cyan/50 hover:text-cyan"
                >
                  {f}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MINDSET.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="glass glass-hover h-full rounded-xl p-5">
                <m.icon className="size-5 text-cyan" />
                <h3 className="mt-4 font-display text-base font-bold tracking-[0.18em]">
                  {m.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
