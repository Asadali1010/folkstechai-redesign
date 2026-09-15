import Animate from '@/components/Animate';

const PROCESS_STEPS = [
  { title: 'Discover', description: 'We map your problem, users, data, and constraints in a focused kickoff' },
  { title: 'Prototype', description: 'A working prototype in days so you can react to something real — not slides' },
  { title: 'Build & Test', description: 'Test-driven development with automated CI and security scans on every change' },
  { title: 'Ship & Iterate', description: 'Continuous deployment and rapid changes as your requirements evolve' },
];

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
    <section className="scroll-fade-section relative w-full h-screen overflow-hidden bg-[#080A19]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#080A19]/80 via-[#080A19]/55 to-[#080A19]/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#080A19]/70 via-[#080A19]/20 to-transparent lg:to-[#080A19]/10"
        aria-hidden="true"
      />
      <div className="relative z-10 h-full flex items-center py-8">
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
    </section>
  );
}
