import { useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useInView } from '@/hooks/useInView';

const WHY_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_032550_05c8a435-0fb5-41a0-ad67-c7158d7aa425.mp4';

const PILLARS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: 'Trust over hype',
    description:
      'We ship AI you can put in front of customers and regulators — explainable, private, and human-supervised.',
  },
  {
    icon: Zap,
    title: 'Speed with substance',
    description: 'Real software in weeks, with continuous improvement after launch, not a one-off delivery.',
  },
  {
    icon: Globe,
    title: 'Access for everyone',
    description: 'World-class AI made available beyond large enterprises, at a scale that fits your business.',
  },
];

export default function Why() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (inView) {
      videoRef.current?.play().catch(() => {});
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={WHY_VIDEO_SRC}
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0A0C18]/70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[760px] mb-16 sm:mb-24">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Why FolksTechAI
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1] mb-4 sm:mb-5">
            Every business, AI-enabled — without losing the plot.
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] font-[450] leading-[1.4]">
            Based in Lahore, Pakistan, working with businesses worldwide.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-20 sm:mb-28">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100}>
              <pillar.icon className="w-6 h-6 text-white/80 mb-4" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="text-white text-[19px] sm:text-[20px] font-[450] leading-[1.25] mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-white/70 text-[14.5px] sm:text-[15px] font-[450] leading-[1.55]">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
