type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We map the workflow, the data, and the outcome that matters most.",
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "A working proof of concept in days, tested against real cases.",
  },
  {
    number: "03",
    title: "Build & Test",
    description:
      "Production-grade software, hardened with humans in the loop.",
  },
  {
    number: "04",
    title: "Deploy & Iterate",
    description:
      "Ship, measure outcomes, and evolve continuously with safe releases.",
  },
];

export function ProcessStepper() {
  return (
    <div className="relative grid grid-cols-1 gap-32 md:grid-cols-4 md:gap-24">
      <div
        aria-hidden="true"
        className="absolute left-[24px] right-[24px] top-[24px] hidden h-px bg-slate-edge md:block"
      />

      {STEPS.map((step) => (
        <div key={step.number} className="relative flex flex-col gap-16">
          <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center rounded-full border border-electric-iris bg-obsidian-canvas text-body-lg font-semibold text-electric-iris">
            {step.number}
          </div>
          <h3 className="text-subheading font-semibold text-snow">
            {step.title}
          </h3>
          <p className="text-body text-smoke">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
