import { useEffect, useRef } from "react";
import { useHasFinePointer, usePointerPosition } from "@/hooks/use-pointer";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

export function CommandBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fine = useHasFinePointer();
  const pointer = usePointerPosition(fine);
  const pointerRef = useRef(pointer);
  pointerRef.current = pointer;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = w < 768;
      const density = mobile ? 44000 : 26000;
      const cap = mobile ? 26 : 70;
      const count = Math.min(cap, Math.max(16, Math.round((w * h) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        if (!reduce) {
          a.x += a.vx;
          a.y += a.vy;

          if (fine) {
            // Nodes drift very slightly toward the cursor when close.
            const dx = px - a.x;
            const dy = py - a.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 40000 && d2 > 1) {
              const f = 0.00025;
              a.x += dx * f;
              a.y += dy * f;
            }
          }
        }
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.22;
            ctx.strokeStyle = `rgba(120, 200, 235, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const near = fine ? Math.hypot(n.x - px, n.y - py) < 160 : false;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.5 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(150, 235, 210, 0.75)" : "rgba(150, 215, 245, 0.5)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="grid-bg animate-drift-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(90%_70%_at_50%_25%,black,transparent)]" />
      <div
        className="animate-glow-breathe absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 30%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      {fine && (
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background: `radial-gradient(22rem 22rem at ${pointer.x * 100}% ${pointer.y * 100}%, color-mix(in oklab, var(--cyan) 10%, transparent), transparent 70%)`,
          }}
        />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="mono-label animate-float-y absolute left-6 top-1/3 hidden rotate-90 origin-left opacity-20 lg:block">
        az group list --output table
      </div>
      <div className="mono-label animate-float-y absolute right-6 top-2/3 hidden -rotate-90 origin-right opacity-20 lg:block">
        terraform apply -auto-approve
      </div>
    </div>
  );
}
