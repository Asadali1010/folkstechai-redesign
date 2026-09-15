import Reveal from '@/components/Reveal';

export default function Contact() {
  function handleBookConsultation() {
    window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI';
  }

  return (
    <section
      id="contact"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-24 sm:py-32 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mx-auto text-center">
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1] mb-4 sm:mb-5">
            Ready to become AI-enabled?
          </h2>
          <p className="text-white/70 text-[16px] sm:text-[18px] font-[450] leading-[1.5] mb-8 sm:mb-10">
            Tell us what's slowing your business down. In a free consultation we'll show you a practical, trustworthy path to a working solution — fast.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleBookConsultation}
              className="inline-flex items-center justify-center h-[52px] px-8 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15px] font-[450] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a free consultation
            </button>
            <a
              href="mailto:hello@folkstechai.com"
              className="text-white/60 text-[14px] font-[450] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
            >
              or email hello@folkstechai.com directly
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
