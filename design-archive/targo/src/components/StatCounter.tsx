type StatCounterProps = {
  value: string;
  label: string;
};

export function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="flex aspect-square w-full max-w-[240px] flex-col items-center justify-center gap-8 rounded-full bg-void p-32 text-center">
      <span className="text-display-sm font-display font-semibold text-snow">
        {value}
      </span>
      <span className="max-w-[160px] text-caption text-smoke">{label}</span>
    </div>
  );
}

type StatTileProps = {
  value: string;
  label: string;
};

export function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="flex flex-col gap-8 rounded-xl border border-linen bg-snow p-24">
      <span className="text-heading font-semibold text-electric-iris">
        {value}
      </span>
      <span className="text-body text-iron-veil">{label}</span>
    </div>
  );
}
