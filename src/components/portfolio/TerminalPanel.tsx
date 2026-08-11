import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Section";
import { TERMINAL_LINES } from "./data";

type Line = { type: "cmd" | "out" | "ok"; text: string };

export function TerminalPanel() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [started, setStarted] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timer = setTimeout(res, ms);
      });

    const run = async () => {
      for (;;) {
        if (cancelled) return;
        setLines([]);
        for (const step of TERMINAL_LINES) {
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return;
            setTyping(step.cmd.slice(0, i));
            await wait(38);
          }
          await wait(280);
          if (cancelled) return;
          setTyping("");
          setLines((prev) => [
            ...prev,
            { type: "cmd", text: step.cmd },
            { type: "out", text: step.out },
          ]);
          await wait(280);
          if (cancelled) return;
          setLines((prev) => [...prev, { type: "ok", text: "✓ completed" }]);
          await wait(420);
        }
        await wait(2200);
      }
    };

    void run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [started]);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-5 pb-4 lg:px-8">
      <Reveal>
        <div className="glass overflow-hidden rounded-xl">
          <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-accent/60" />
            <span className="size-2.5 rounded-full bg-emerald/70" />
            <span className="ml-2 font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground">
              pankaj@devops:~$
            </span>
          </div>
          <div
            ref={boxRef}
            className="h-72 overflow-y-auto px-4 py-4 font-mono text-[0.72rem] leading-relaxed sm:text-xs"
          >
            {lines.map((l, i) => (
              <div
                key={`${l.text}-${i}`}
                className={
                  l.type === "cmd"
                    ? "text-cyan"
                    : l.type === "ok"
                      ? "text-emerald"
                      : "text-muted-foreground"
                }
              >
                {l.type === "cmd" ? (
                  <>
                    <span className="text-emerald">pankaj@devops</span>
                    <span className="text-muted-foreground">:~$ </span>
                    {l.text}
                  </>
                ) : (
                  <span className="pl-4">{l.text}</span>
                )}
              </div>
            ))}
            <div className="text-cyan">
              <span className="text-emerald">pankaj@devops</span>
              <span className="text-muted-foreground">:~$ </span>
              {typing}
              <span className="animate-caret ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-cyan" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
