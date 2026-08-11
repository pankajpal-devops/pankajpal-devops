import { Mail, Phone, Linkedin, Github, Download } from "lucide-react";
import { motion } from "motion/react";
import { Section, Reveal, staggerParent, staggerChild } from "./Section";
import { PROFILE } from "./data";

const CHANNELS = [
  { label: "EMAIL", value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: Mail },
  { label: "PHONE", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "LINKEDIN", value: PROFILE.linkedinLabel, href: PROFILE.linkedin, icon: Linkedin },
  { label: "GITHUB", value: PROFILE.githubLabel, href: PROFILE.github, icon: Github },
];

const BTN =
  "sweep-host inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-[0.7rem] tracking-[0.18em] transition";

export function Contact() {
  return (
    <Section
      id="contact"
      label="08 / UPLINK"
      title="LET'S CONNECT"
      description="Interested in Cloud, DevOps, Infrastructure Automation and Azure? Let's connect."
    >
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {CHANNELS.map((c) => (
          <motion.a
            key={c.label}
            variants={staggerChild}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="glass sweep-host flex items-center gap-4 rounded-xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-cyan/40"
          >
            <span className="animate-float-y relative grid size-11 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary/10 text-cyan">
              <c.icon className="size-4" />
            </span>
            <span className="relative min-w-0">
              <span className="mono-label block">{c.label}</span>
              <span className="mt-1 block truncate font-mono text-sm text-foreground/90">
                {c.value}
              </span>
            </span>
          </motion.a>
        ))}
      </motion.div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={`${BTN} border border-primary/50 bg-primary/15 text-cyan hover:border-cyan/60 hover:bg-primary/25`}
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <Linkedin className="size-3.5" /> CONNECT ON LINKEDIN
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
            <Github className="size-3.5" /> VIEW GITHUB
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
        </div>
      </Reveal>

      <footer className="relative mt-16 overflow-hidden rounded-xl border-t border-border/60 pt-6">
        <div
          aria-hidden
          className="grid-bg animate-drift-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_100%_at_50%_50%,black,transparent)]"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <div className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
              PANKAJ PAL
            </div>
            <div className="mono-label mt-1 text-[0.6rem]">DEVOPS ENGINEER</div>
          </div>
          <span className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground">
            © {new Date().getFullYear()} PANKAJ PAL — DEVOPS ENGINEER
          </span>
          <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-emerald">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald" /> SYSTEM ONLINE
          </span>
        </div>
      </footer>
    </Section>
  );
}
