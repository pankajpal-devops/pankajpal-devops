import * as React from "react";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer";

/** Subtle 3D tilt that follows the cursor. No-ops on touch / reduced motion. */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={className}
      {...(enabled
        ? {
            style: {
              rotateX: rx,
              rotateY: ry,
              transformPerspective: 900,
              transformStyle: "preserve-3d" as const,
            },
            onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            },
            onPointerLeave: () => {
              mx.set(0);
              my.set(0);
            },
          }
        : {})}
    >
      {children}
    </motion.div>
  );
}
