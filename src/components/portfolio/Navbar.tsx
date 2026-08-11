import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "./data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.querySelector(i.href)).filter(
      Boolean,
    ) as Element[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in oklab, var(--background) 88%, transparent)"
          : "color-mix(in oklab, var(--background) 30%, transparent)",
        borderBottom: scrolled
          ? "1px solid color-mix(in oklab, var(--primary) 22%, transparent)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="relative grid size-10 place-items-center rounded-md border border-primary/40 bg-primary/10 font-display text-sm font-bold text-cyan transition-transform duration-300 group-hover:scale-105">
            PP
            <span className="absolute inset-0 rounded-md ring-1 ring-cyan/20 transition group-hover:ring-cyan/60" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-[0.18em] text-foreground">
              {PROFILE.name.toUpperCase()}
            </span>
            <span className="mono-label block text-[0.6rem]">{PROFILE.role}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`nav-underline relative rounded-md px-3 py-2 font-mono text-[0.68rem] tracking-[0.16em] transition-colors ${
                  active === item.href
                    ? "text-cyan"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-cyan/80"
                    style={{
                      boxShadow: "0 0 8px 0 color-mix(in oklab, var(--cyan) 70%, transparent)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 lg:flex">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-emerald">
              AVAILABLE FOR DEVOPS OPPORTUNITIES
            </span>
          </div>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-md border border-border text-foreground transition hover:border-cyan/50 hover:text-cyan xl:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 font-mono text-xs tracking-[0.18em] text-muted-foreground transition hover:bg-secondary hover:text-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-2 px-3">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald" />
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-emerald">
                  AVAILABLE FOR DEVOPS OPPORTUNITIES
                </span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
