import type { ReactNode } from "react";

type ChipTone = "dark" | "light";

type ChipProps = {
  children: ReactNode;
  tone?: ChipTone;
  dot?: boolean;
  className?: string;
};

const toneClasses: Record<ChipTone, string> = {
  dark: "border-slate-edge text-frost",
  light: "border-frost text-obsidian-canvas",
};

export function Chip({
  children,
  tone = "dark",
  dot = false,
  className = "",
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-8 rounded-full border px-16 py-8 text-body ${toneClasses[tone]} ${className}`}
    >
      {dot && (
        <span
          className="h-8 w-8 shrink-0 rounded-full bg-ember-pulse"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
