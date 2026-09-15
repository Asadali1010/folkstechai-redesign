import Reveal from '@/components/Reveal';

type Accent = 'blue' | 'teal' | 'purple';

const ACCENT_STYLES: Record<Accent, { tint: string; roleColor: string }> = {
  blue: {
    tint: 'linear-gradient(135deg, rgba(80,110,255,0.35), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(59,91,255,0.35), transparent 60%)',
    roleColor: 'text-[#9fc0fb]',
  },
  teal: {
    tint: 'linear-gradient(135deg, rgba(0,194,168,0.30), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(0,194,168,0.35), transparent 60%)',
    roleColor: 'text-[#8fe8d8]',
  },
  purple: {
    tint: 'linear-gradient(135deg, rgba(180,120,255,0.30), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(180,120,255,0.35), transparent 60%)',
    roleColor: 'text-[#dcc2ff]',
  },
};

const TEAM: { name: string; role: string; bio: string; accent: Accent }[] = [
  {
    name: 'Ayesha Khan',
    role: 'Founder & CEO',
    bio: 'Sets the vision: make trustworthy AI practical for every business.',
    accent: 'blue',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Head of Engineering',
    bio: 'Ships production software fast — without cutting corners on quality.',
    accent: 'teal',
  },
  {
    name: 'Sana Malik',
    role: 'Lead AI Engineer',
    bio: 'Builds AI agents with real guardrails, evaluation, and human oversight.',
    accent: 'purple',
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-12 sm:mb-16">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            The team
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1]">
            Three people, no filler roles.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {TEAM.map((member, i) => {
            const accent = ACCENT_STYLES[member.accent];
            return (
              <Reveal key={member.name} delay={i * 100}>
                <div
                  className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/[0.15] backdrop-blur-xl"
                  style={{ backgroundImage: accent.tint }}
                >
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#080b12]/90 to-transparent">
                    <p className="text-white text-[17px] sm:text-[18px] font-[500] leading-[1.25]">
                      {member.name}
                    </p>
                    <p
                      className={`${accent.roleColor} text-[11px] sm:text-[12px] font-[450] uppercase tracking-[0.06em] mt-1 mb-2.5`}
                    >
                      {member.role}
                    </p>
                    <p className="text-white/70 text-[13.5px] sm:text-[14px] font-[450] leading-[1.5]">
                      {member.bio}
                    </p>
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
