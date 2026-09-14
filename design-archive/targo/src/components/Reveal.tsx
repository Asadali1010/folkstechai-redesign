import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms, applied via transition-delay. */
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>();

  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {};

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
