import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, X } from 'lucide-react';
import Reveal from '@/components/Reveal';

const SERVICES = [
  'AI Enablement & Strategy',
  'Custom Software Development',
  'AI Agents & Automation',
  'Data & Analytics',
  'Rapid Delivery & Iteration',
  'Legacy Modernization',
];

const COMPANY = [
  { label: 'About', href: '#why' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Trust', href: '#trust' },
  { label: 'Insights', href: '#insights' },
  { label: 'Careers', href: '#careers' },
];

const SOCIALS = [
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'X', icon: X, href: 'https://x.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'GitHub', icon: Github, href: 'https://github.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0A0C18] border-t border-white/[0.08] overflow-hidden">
      <video
        className="footer-video absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0C18]/90 via-[#0A0C18]/85 to-[#0A0C18]/95"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-16 sm:pt-20 pb-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 lg:gap-8">
            <div className="max-w-[380px]">
              <a href="#" className="inline-flex items-center gap-2.5 mb-5">
                <span
                  className="w-9 h-9 rounded-[10px] bg-black flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 3L11 11L6 21"
                      stroke="url(#footer-logo-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="16" cy="6" r="1.6" fill="url(#footer-logo-grad)" />
                    <defs>
                      <linearGradient id="footer-logo-grad" x1="6" y1="3" x2="17" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F6577C" />
                        <stop offset="1" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="text-white text-[19px] sm:text-[21px] font-[450] leading-none tracking-[-0.02em]">
                  FolksTech
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #F6577C, #8B5CF6)' }}
                  >
                    AI
                  </span>
                </span>
              </a>

              <p className="text-white/60 text-[14px] sm:text-[15px] font-[450] leading-[1.5] mb-4">
                AI enablement for every business · trustworthy AI, delivered fast.
              </p>

              <div className="flex items-center gap-2 text-white/60 text-[13.5px] sm:text-[14px] font-[450] mb-6">
                <MapPin className="w-4 h-4 text-[#B48CFF] shrink-0" strokeWidth={2} />
                <span>Lahore, Pakistan · serving clients worldwide</span>
              </div>

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white text-[15px] font-[500] mb-5">Services</p>
              <ul className="flex flex-col gap-3.5">
                {SERVICES.map((label) => (
                  <li key={label}>
                    <a
                      href="#services"
                      className="text-white/60 text-[14px] font-[450] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-[15px] font-[500] mb-5">Company</p>
              <ul className="flex flex-col gap-3.5">
                {COMPANY.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/60 text-[14px] font-[450] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-[15px] font-[500] mb-5">Get in touch</p>
              <a
                href="mailto:hello@folkstechai.com"
                className="flex items-center gap-2 text-white/60 text-[14px] font-[450] hover:text-white transition-colors mb-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
              >
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                hello@folkstechai.com
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[14px] font-[500] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                style={{ color: '#B48CFF' }}
              >
                Book a consultation
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="h-px bg-white/[0.08] mt-14 sm:mt-16 mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/40 text-[13px] font-[450]">
            © {year} FolksTechAI · all rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-[13px] font-[450]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
            trustworthy AI, delivered fast
          </div>
        </div>
      </div>
    </footer>
  );
}
