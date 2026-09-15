import { useEffect, useRef, useState } from 'react';
import { Map, Code2, Bot, BarChart3, Rocket, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Hls from 'hls.js';
import Reveal from '@/components/Reveal';
import ServiceDialog from '@/components/ServiceDialog';
import { useInView } from '@/hooks/useInView';

const SERVICES_VIDEO_SRC = 'https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8';

const SERVICES: { icon: LucideIcon; title: string; description: string; includes: string[] }[] = [
  {
    icon: Map,
    title: 'AI Enablement & Strategy',
    description: 'A clear, no-hype roadmap to put AI to work on the problems that actually move your business.',
    includes: [
      'An honest look at where AI can help your business, and where it can’t',
      'A prioritized roadmap tied to real problems, not trends',
      'Guidance you can act on with or without us building it',
    ],
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Tailored web, mobile, and cloud applications built around your exact workflow · AI-native where it counts.',
    includes: [
      'Software scoped to your actual workflow, not a generic template',
      'AI woven in only where it genuinely helps, never for its own sake',
      'Clear documentation so the system doesn’t depend on any one person',
    ],
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Put AI agents and workflow automation to work on your most repetitive, time-draining operations.',
    includes: [
      'An assessment of which repetitive tasks are worth automating first',
      'Agents and automations integrated with the tools you already use',
      'Automations you can monitor and adjust, not a black box',
    ],
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Turn scattered data into pipelines, dashboards, and insight your team can act on with confidence.',
    includes: [
      'Data pipelines that bring scattered sources into one place',
      'Dashboards built around the decisions your team actually makes',
      'A foundation your team can keep building on after we’re done',
    ],
  },
  {
    icon: Rocket,
    title: 'Rapid Delivery & Iteration',
    description: 'Ship a working product in weeks, then evolve it continuously with fast, safe releases.',
    includes: [
      'A working version in weeks, not months, so you can start learning early',
      'Short, safe release cycles instead of one big, risky launch',
      'Room to adjust direction as real feedback comes in',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Legacy Modernization',
    description: 'Migrate ageing systems to secure, maintainable, modern platforms with zero drama.',
    includes: [
      'A migration plan that protects your data and daily operations',
      'Modern, maintainable platforms in place of fragile legacy systems',
      'Minimal disruption to the people relying on the system today',
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
  const { ref: sectionRef, inView } = useInView<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!inView) return;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(SERVICES_VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SERVICES_VIDEO_SRC;
      video.play().catch(() => {});
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#0A0C18]/70"
        aria-hidden="true"
      />
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
            Each engagement is scoped to your goals rather than sold as a fixed package.
            Click any service for more detail.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
