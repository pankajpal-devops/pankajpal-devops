import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Section, Reveal } from "./Section";
import { EXPERIENCE } from "./data";

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const dotGlow = useTransform(fill, [0, 0.15], [0, 1]);

  return (
    <Section id="experience" label="03 / TIMELINE" title="EXPERIENCE">
      <div ref={ref} className="relative pl-6 sm:pl-10">
        <div className="absolute left-0 top-2 h-full w-px bg-border sm:left-3" />
        {/* progressively illuminated career line */}
        <motion.div
          className="absolute left-0 top-2 w-px origin-top sm:left-3"
          style={{
            height: "100%",
            scaleY: fill,
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--cyan) 85%, transparent), color-mix(in oklab, var(--emerald) 70%, transparent))",
            boxShadow: "0 0 10px 0 color-mix(in oklab, var(--cyan) 60%, transparent)",
          }}
        />

        <Reveal>
          <div className="relative">
            <motion.span
              className="absolute -left-6 top-6 grid size-3 place-items-center sm:-left-[2.35rem]"
              style={{ opacity: dotGlow }}
            >
              <span
                className="animate-pulse-dot size-3 rounded-full bg-cyan"
                style={{ boxShadow: "0 0 12px 2px color-mix(in oklab, var(--cyan) 60%, transparent)" }}
              />
            </motion.span>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="glass sweep-host rounded-xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 sm:p-8"
            >
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                    {EXPERIENCE.position}
                  </h3>
                  <p className="mt-1 font-mono text-xs tracking-[0.14em] text-cyan">
                    {EXPERIENCE.company}
                  </p>
                  <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
                    ROLE: {EXPERIENCE.role.toUpperCase()}
                  </p>
                </div>
                <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-emerald">
                  {EXPERIENCE.period}
                </span>
              </div>

              <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {EXPERIENCE.points.map((point, i) => (
                  <Reveal key={point} delay={i * 0.06}>
                    <li className="flex h-full gap-3 rounded-lg border border-border/70 bg-surface/50 p-3.5 transition hover:-translate-y-0.5 hover:border-cyan/40">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
                      <span className="text-xs leading-relaxed text-muted-foreground">{point}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
