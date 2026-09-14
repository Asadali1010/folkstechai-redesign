import type { ReactNode } from "react";

type FeatureCardProps = {
  index: string;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  index,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group flex flex-col gap-16 rounded-xl border border-linen bg-snow p-24 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out-quart hover:-translate-y-4 hover:border-electric-iris/30 hover:shadow-md ${className}`}
    >
      <span className="text-caption text-ash transition-colors duration-300 group-hover:text-ember-pulse">
        {index}
      </span>
      <h3 className="text-subheading font-semibold text-obsidian-canvas">
        {title}
      </h3>
      <p className="text-body text-iron-veil">{description}</p>
    </div>
  );
}

type FeatureCardLargeProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

export function FeatureCardLarge({
  eyebrow,
  title,
  description,
  icon,
  className = "",
}: FeatureCardLargeProps) {
  return (
    <div
      className={`group flex flex-col justify-between gap-32 rounded-xl border border-linen bg-snow p-32 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out-quart hover:-translate-y-4 hover:border-electric-iris/30 hover:shadow-md ${className}`}
    >
      <div className="flex h-48 w-48 items-center justify-center rounded-full bg-electric-iris/10 text-electric-iris transition-transform duration-300 ease-out-quart group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>
      <div className="flex flex-col gap-12">
        <span className="text-caption uppercase tracking-caption text-ember-pulse">
          {eyebrow}
        </span>
        <h3 className="text-heading font-semibold text-obsidian-canvas">
          {title}
        </h3>
        <p className="max-w-[440px] text-body-lg text-iron-veil">
          {description}
        </p>
      </div>
    </div>
  );
}
