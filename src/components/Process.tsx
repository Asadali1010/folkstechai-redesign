import Reveal from '@/components/Reveal';

const STEPS = [
  {
    title: 'Discover',
    summary: 'We map your problem, users, data, and constraints in a focused kickoff.',
    receive: 'A clear problem definition and scope you can sign off on before any work begins.',
  },
  {
    title: 'Prototype',
    summary: 'A working prototype in days so you can react to something real — not slides.',
    receive: "A hands-on preview of the direction, early enough to change course cheaply if something's off.",
  },
  {
    title: 'Build & Test',
    summary: 'Test-driven development with automated CI and security scans on every change.',
    receive: "Software that's verified as it's built, with a clear record of what was tested.",
  },
  {
    title: 'Ship & Iterate',
    summary: 'Continuous deployment and rapid changes as your requirements evolve.',
    receive: 'A live product from day one, plus ongoing support as real usage shows what to adjust next.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative w-full bg-[#0A0C18] py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-16 sm:mb-24">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Process
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.05] mb-4 sm:mb-5">
            How we work
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] font-[450] leading-[1.4]">
            Four steps, from first conversation to a live product — and what you get at each one.
          </p>
        </Reveal>

        <div className="how-we-work-track relative max-w-[760px] pl-10 sm:pl-14">
          <div
            className="absolute left-[3px] sm:left-[5px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full"
            aria-hidden="true"
          />
          <div
            className="how-we-work-fill absolute left-[3px] sm:left-[5px] top-2 bottom-2 w-[2px] bg-white/70 rounded-full origin-top scale-y-100"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16 sm:gap-20">
            {STEPS.map((step, i) => (
              <div key={step.title} className="how-we-work-step relative">
                <span
                  className="absolute -left-10 sm:-left-14 top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0A0C18] border-2 border-white/70 flex items-center justify-center text-white text-[12px] font-[450]"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="text-white/50 text-[12px] font-[450] tracking-[0.08em] uppercase mb-2">
                  Step {i + 1}
                </p>
                <h3 className="text-white text-[22px] sm:text-[26px] font-normal leading-[1.15] mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 text-[15px] sm:text-[16px] font-[450] leading-[1.5] mb-3">
                  {step.summary}
                </p>
                <p className="text-white/50 text-[13px] sm:text-[13.5px] font-[450] leading-[1.5]">
                  <span className="text-white/70">What you get:</span> {step.receive}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
