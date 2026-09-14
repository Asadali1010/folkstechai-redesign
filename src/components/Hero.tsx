import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['Services', 'Work', 'Process', 'FAQs'];

const PROCESS_STEPS = [
  { title: 'Discover', description: 'Understand your goals and requirements' },
  { title: 'Design', description: 'Plan the experience and technical approach' },
  { title: 'Build', description: 'Develop and test the product' },
  { title: 'Launch', description: 'Ship it and support what comes next' },
];

function Animate({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}) {
  const directionClass = {
    up: 'animate-fade-up',
    down: 'animate-fade-down',
    left: 'animate-fade-left',
    right: 'animate-fade-right',
    scale: 'animate-fade-scale',
  }[direction];

  return (
    <div
      className={`opacity-0 ${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProcessCard() {
  return (
    <Animate delay={900} direction="scale" className="w-full max-w-[405px] mx-auto lg:mx-0">
      <div className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-5 sm:p-8 pb-5 sm:pb-6">
        <p className="text-white text-[20px] sm:text-[26px] font-[450] leading-[1.15] mb-2 sm:mb-3">
          From idea to production
        </p>
        <p className="text-white/80 text-[13px] sm:text-[15px] font-[450] leading-[1.4] mb-7 sm:mb-9 max-w-[300px]">
          A clear path from first conversation to a working product.
        </p>

        <ol className="relative flex flex-col gap-5 sm:gap-6 pl-8 sm:pl-9">
          <div className="absolute left-[5px] sm:left-[6px] top-[6px] bottom-[6px] w-px bg-white/10" aria-hidden="true" />
          <div
            className="absolute left-[5px] sm:left-[6px] top-[6px] bottom-[6px] w-px bg-white/50 origin-top animate-bar-grow"
            style={{ animationDelay: '1300ms', animationDuration: '900ms' }}
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${1200 + i * 120}ms` }}
            >
              <span className="absolute -left-8 sm:-left-9 top-[2px] w-[11px] h-[11px] rounded-full bg-white" aria-hidden="true" />
              <p className="text-white text-[15px] sm:text-[17px] font-[450] leading-[1.2]">{step.title}</p>
              <p className="text-white/70 text-[12px] sm:text-[13px] font-[450] leading-[1.35] mt-0.5">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Animate>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#080A19]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="relative z-10 h-full flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[593px]">
              <Animate delay={300} direction="up">
                <h1 className="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] mb-5 sm:mb-8">
                  Build smarter software. Move your business forward.
                </h1>
              </Animate>
              <Animate delay={500} direction="up">
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[370px] mb-7 sm:mb-10">
                  Custom software, web and mobile applications, and AI automation built around your business.
                </p>
              </Animate>
              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Book a consultation
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore our services
                  </a>
                </div>
              </Animate>
            </div>
            <ProcessCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      <nav className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50" aria-label="Main navigation">
        <Animate delay={0} direction="down">
          <a href="#" className="text-white text-[20px] sm:text-[24px] font-[450] leading-none tracking-[-0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm">
            FolksTechAI
          </a>
        </Animate>

        <Animate delay={100} direction="down" className="hidden lg:block">
          <div className="h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]">
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
              >
                {label}
              </a>
            ))}
          </div>
        </Animate>

        <Animate delay={200} direction="down" className="hidden lg:block">
          <div className="h-[52px] p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] flex items-center gap-[5px]">
            <button
              type="button"
              className="h-[46px] px-6 rounded-[11px] text-white text-[14px] font-[450] leading-[14px] hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => { window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI'; }}
            >
              Contact
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-[46px] px-6 bg-[#E9E9E9] rounded-[11px] text-[#0A0707] text-[14px] font-[450] leading-[14px] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a consultation
            </a>
          </div>
        </Animate>

        <Animate delay={100} direction="down" className="lg:hidden">
          <button
            type="button"
            className="w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] transition-colors hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-5">
              <Menu className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
            </div>
          </button>
        </Animate>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-[#080A19]/90 backdrop-blur-[24px] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-[0.97]'}`}>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((label, i) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={`flex items-center justify-between px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450] hover:bg-white/[0.06] transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms' }}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="h-px bg-white/10 my-5" />
          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
          >
            <a
              href="#contact"
              className="w-full h-[50px] flex items-center justify-center bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15px] font-[450] transition-colors hover:bg-white"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              Book a consultation
            </a>
            <button
              type="button"
              className="w-full h-[50px] rounded-[12px] border border-white/30 text-white text-[15px] font-[450] transition-colors hover:bg-white/5"
              onClick={() => { setIsOpen(false); window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI'; }}
              tabIndex={isOpen ? 0 : -1}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
