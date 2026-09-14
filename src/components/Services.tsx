import { useState } from 'react';
import { Code2, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ServiceDialog from '@/components/ServiceDialog';
import { useInView } from '@/hooks/useInView';

const SERVICES: { icon: LucideIcon; title: string; description: string; includes: string[] }[] = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Software built around how your business actually works, not the other way around — internal tools, dashboards, and platforms tailored to your workflow.',
    includes: [
      'A working understanding of your current process before any code is written',
      'Software scoped to the problem you actually have, not a generic template',
      "Clear documentation so the system doesn't depend on any one person",
    ],
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Applications',
    description:
      'Websites and apps for the browser, iOS, and Android, built to be fast, easy to use, and straightforward to maintain as your product grows.',
    includes: [
      'A single codebase approach where it makes sense, to keep cost and maintenance down',
      'Interfaces designed to be simple for your actual users, not just impressive in a demo',
      'Built to perform well on real devices and real connections',
    ],
  },
  {
    icon: Sparkles,
    title: 'AI & Automation',
    description:
      'We identify where AI and automation can remove manual, repetitive work, then build the integrations that make it part of your day-to-day operations.',
    includes: [
      "An honest assessment of where automation will and won't help, before we build anything",
      'Integrations with the tools you already use, rather than a system that replaces them',
      'Automations you can monitor and adjust, not a black box',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'QA & Testing',
    description:
      'Every build is tested for functionality, performance, and edge cases before it reaches your users, with a clear report on what was checked.',
    includes: [
      'Testing planned alongside development, not bolted on at the end',
      'Coverage for everyday paths and the edge cases that usually get missed',
      "A clear report of what was tested and what wasn't, so nothing is assumed",
    ],
  },
];

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  onExpand,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  onExpand: () => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const arcClass = index % 2 === 0 ? 'animate-arc-left' : 'animate-arc-right';

  return (
    <div
      ref={ref}
      className={`h-full opacity-0 ${inView ? arcClass : ''}`}
      style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
    >
      <button
        type="button"
        onClick={onExpand}
        className={`group relative w-full h-full text-left overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.08] p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:bg-[rgba(24,21,26,0.55)] hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          inView ? 'service-card-idle' : ''
        }`}
        style={{ animationDelay: inView ? `${index * 300}ms` : undefined }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(130%_100%_at_15%_0%,rgba(59,130,246,0.22),transparent_60%),radial-gradient(130%_100%_at_100%_100%,rgba(239,68,68,0.14),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 sm:mb-6 transition-colors group-hover:bg-white/10">
            <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-white" strokeWidth={1.6} aria-hidden="true" />
          </div>
          <h3 className="text-white text-[18px] sm:text-[19px] font-[450] leading-[1.25] mb-2.5 sm:mb-3">
            {title}
          </h3>
          <p className="text-white/70 text-[14px] sm:text-[14.5px] font-[450] leading-[1.5]">
            {description}
          </p>
        </div>
      </button>
    </div>
  );
}

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full bg-red-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-12 sm:mb-16">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Services
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.05] mb-4 sm:mb-5">
            What we build for you
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] font-[450] leading-[1.4]">
            Four core offerings, each scoped to your goals rather than sold as a fixed package.
            Click any of them for more detail.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={i}
              onExpand={() => setExpandedIndex(i)}
            />
          ))}
        </div>
      </div>

      {expandedIndex !== null && (
        <ServiceDialog service={SERVICES[expandedIndex]} onClose={() => setExpandedIndex(null)} />
      )}
    </section>
  );
}
