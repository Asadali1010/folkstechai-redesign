import { Stethoscope, Building2, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const PROJECTS: {
  icon: LucideIcon;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  stats: { value: string; label: string }[];
  tint: 'blue' | 'red';
}[] = [
  {
    icon: Stethoscope,
    industry: 'Healthcare',
    title: 'AI Patient-Intake Assistant for a Multi-Site Clinic',
    problem:
      'Administrative burden at patient intake was slowing staff down and creating a backlog before appointments even started.',
    solution:
      'An AI intake assistant that captures patient details, triages urgency, and hands clean records to staff — with a nurse approving every step.',
    stats: [
      { value: '~60%', label: 'Less admin time at intake (illustrative)' },
      { value: '3 wks', label: 'To first production release (illustrative)' },
    ],
    tint: 'blue',
  },
  {
    icon: Building2,
    industry: 'Real Estate',
    title: 'AI Lead Engine for a Property Brokerage',
    problem: 'Leads were scattered across multiple portals with no consistent way to prioritize or follow up on them.',
    solution:
      'A unified pipeline that captures leads from every portal, scores them with AI, and nudges agents to follow up.',
    stats: [
      { value: '2.4x', label: 'Faster lead response (illustrative)' },
      { value: '+31%', label: 'Conversion lift (illustrative)' },
    ],
    tint: 'red',
  },
  {
    icon: Landmark,
    industry: 'Banking',
    title: 'Explainable Fraud Signals for a Digital Bank',
    problem: "Flagging fraudulent transactions accurately, without burying analysts in false alarms they couldn't explain.",
    solution: 'Real-time, explainable fraud scoring that flags risky transactions and shows analysts exactly why.',
    stats: [
      { value: '-40%', label: 'False positives (illustrative)' },
      { value: 'Real-time', label: 'Transaction scoring' },
    ],
    tint: 'blue',
  },
];

function ProjectRow({
  project,
  reversed,
}: {
  project: (typeof PROJECTS)[number];
  reversed: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Icon = project.icon;
  const tintGradient =
    project.tint === 'blue'
      ? 'radial-gradient(120% 100% at 20% 0%, rgba(59,130,246,0.28), transparent 65%)'
      : 'radial-gradient(120% 100% at 20% 0%, rgba(239,68,68,0.24), transparent 65%)';

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 md:gap-12 md:items-center ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div
        className={`w-full md:w-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
        }`}
      >
        <div
          className="relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] border border-white/[0.08] overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `${tintGradient}, linear-gradient(180deg, rgba(17,16,15,0.6), rgba(17,16,15,0.6))` }}
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />
          <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1.5 rounded-[8px] bg-black/50 backdrop-blur-[10px] border border-white/[0.1] text-white/80 text-[11px] font-[450] tracking-[0.04em] uppercase">
            Illustrative concept
          </span>
          <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-white/70" strokeWidth={1} aria-hidden="true" />
        </div>
      </div>

      <div
        className={`w-full md:w-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: inView ? '120ms' : '0ms' }}
      >
        <p className="text-white/60 text-[13px] font-[450] tracking-[0.08em] uppercase mb-3">
          {project.industry}
        </p>
        <h3 className="text-white text-[24px] sm:text-[28px] font-normal leading-[1.15] mb-5">
          {project.title}
        </h3>

        <p className="text-white/50 text-[12px] font-[450] tracking-[0.08em] uppercase mb-1.5">
          The problem
        </p>
        <p className="text-white/80 text-[15px] sm:text-[16px] font-[450] leading-[1.5] mb-5">
          {project.problem}
        </p>

        <p className="text-white/50 text-[12px] font-[450] tracking-[0.08em] uppercase mb-1.5">
          The solution
        </p>
        <p className="text-white/80 text-[15px] sm:text-[16px] font-[450] leading-[1.5] mb-6">
          {project.solution}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[12px] bg-[rgba(17,16,15,0.5)] border border-white/[0.08] px-4 py-3 min-w-[140px]"
            >
              <p className="text-white text-[20px] font-[450] leading-[1.1] mb-1">{stat.value}</p>
              <p className="text-white/60 text-[12px] font-[450] leading-[1.3]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative w-full bg-[#0A0C18] py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <div className="max-w-[640px] mb-14 sm:mb-20">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Work
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.05] mb-4 sm:mb-5">
            What we can build
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] font-[450] leading-[1.4]">
            These are illustrative concepts, not completed client engagements — a preview of the
            kind of problems we solve. Real case studies will replace these as projects ship.
          </p>
        </div>

        <div className="flex flex-col gap-16 sm:gap-24">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.title} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
