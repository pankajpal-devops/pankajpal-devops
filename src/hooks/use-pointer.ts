import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Fine-pointer desktop only: coarse pointers (touch) get no tracking. */
export function useHasFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

/** Normalized pointer position in [0,1] across the viewport, rAF-throttled. */
export function usePointerPosition(enabled: boolean) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.35 });

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let next = { x: 0.5, y: 0.35 };
    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPos(next);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return pos;
}
