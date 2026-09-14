type CaseStudyCardProps = {
  industry: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
};

export function CaseStudyCard({
  industry,
  title,
  description,
  stat,
  statLabel,
}: CaseStudyCardProps) {
  return (
    <div className="flex flex-col gap-32 rounded-xl border border-slate-edge bg-obsidian-canvas p-32">
      <span className="inline-flex w-fit items-center gap-8 rounded-full border border-slate-edge px-16 py-8 text-caption text-frost">
        <span className="h-8 w-8 rounded-full bg-ember-pulse" aria-hidden="true" />
        {industry}
      </span>

      <div>
        <div className="text-display-sm font-display font-semibold text-snow">
          {stat}
        </div>
        <div className="mt-4 text-caption text-iron-veil">{statLabel}</div>
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="text-subheading font-semibold text-snow">{title}</h3>
        <p className="text-body text-smoke">{description}</p>
      </div>
    </div>
  );
}
