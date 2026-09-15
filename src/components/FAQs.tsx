import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/Reveal';

type FAQ = { question: string; answer: string };

const FAQS: FAQ[] = [
  {
    question: 'What services do you offer?',
    answer:
      'AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, and Legacy Modernization — see the Services section above for details on each.',
  },
  {
    question: 'What does your process look like?',
    answer:
      'Discover → Prototype → Build & Test → Ship & Iterate. You get a working prototype in days, then continuous delivery as your requirements evolve.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      "Pricing depends on scope, so the fastest way to get a real number is a free consultation — tell us what you're building and we'll follow up with details.",
  },
  {
    question: 'Where are you based?',
    answer: "We're based in Lahore, Pakistan, and work with clients worldwide.",
  },
  {
    question: 'How do I get in touch?',
    answer:
      'Email us any time at hello@folkstechai.com, or use the "Book a consultation" link in the header or footer.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes — signing an NDA before discussing project details is standard practice for us.',
  },
  {
    question: 'Do you work with startups and small businesses, or only larger companies?',
    answer:
      "Both. We built FolksTechAI to make world-class AI accessible beyond large enterprises, so we work with businesses of every size.",
  },
  {
    question: 'Do you support the product after launch?',
    answer:
      "Yes — our process doesn't end at launch. We continue iterating and supporting the product as real usage shows what to adjust next.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-12 sm:mb-16">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            FAQs
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1]">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="max-w-[860px] divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={faq.question} delay={i * 60}>
                <div>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
                  >
                    <span className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.35]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-white/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-white/70 text-[14.5px] sm:text-[15.5px] font-[450] leading-[1.6] pb-5 sm:pb-6 pr-9">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
