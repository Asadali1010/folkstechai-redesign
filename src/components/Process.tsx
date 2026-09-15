import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Code2, Layers3, Route, Sparkles } from 'lucide-react';

const PROCESS_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4';
const PIN_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';

const STEPS = [
  {
    title: 'Discover',
    headline: 'Start with clarity.',
    summary: 'We map your problem, users, data, and constraints in a focused kickoff.',
    receive: 'A clear problem definition and scope you can sign off on before any work begins.',
    artifact: 'A shared direction',
    icon: Route,
  },
  {
    title: 'Prototype',
    headline: 'Make it tangible.',
    summary: 'A working prototype in days so you can react to something real — not slides.',
    receive: "A hands-on preview of the direction, early enough to change course cheaply if something's off.",
    artifact: 'Something you can try',
    icon: Layers3,
  },
  {
    title: 'Build & Test',
    headline: 'Build with confidence.',
    summary: 'Test-driven development with automated CI and security scans on every change.',
    receive: "Software that's verified as it's built, with a clear record of what was tested.",
    artifact: 'Quality at every step',
    icon: Code2,
  },
  {
    title: 'Ship & Iterate',
    headline: 'Launch. Learn. Improve.',
    summary: 'Continuous deployment and rapid changes as your requirements evolve.',
    receive: 'A live product from day one, plus ongoing support as real usage shows what to adjust next.',
    artifact: 'Built to keep getting better',
    icon: Sparkles,
  },
];

function ProcessArtifact({ step }: { step: number }) {
  const Icon = STEPS[step].icon;

  return (
    <div className="process-artifact" aria-hidden="true">
      <div className="process-artifact-heading">
        <span className="process-artifact-icon"><Icon size={21} strokeWidth={1.4} /></span>
        <span>{STEPS[step].artifact}</span>
        <span className="process-artifact-index">0{step + 1}</span>
      </div>
      {step === 0 && (
        <div className="process-brief">
          {['Understand the problem', 'Map the people & possibilities', 'Define the path forward'].map((item, i) => (
            <div className="process-brief-row" key={item}>
              <span>0{i + 1}</span><p>{item}</p><ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="process-prototype">
          <div className="process-window-bar"><span /><span /><span /><p>Prototype</p></div>
          <div className="process-wireframe">
            <div className="process-wire-sidebar"><span /><span /><span /></div>
            <div className="process-wire-content"><div className="process-wire-title" /><div className="process-wire-tiles"><span /><span /></div><div className="process-wire-line" /><div className="process-wire-line process-wire-line-short" /></div>
          </div>
          <div className="process-artifact-footer">Explore the idea. Shape the direction.<ArrowUpRight size={15} /></div>
        </div>
      )}
      {step === 2 && (
        <div className="process-checks">
          {['Test-driven development', 'Automated CI checks', 'Security scans'].map((item) => (
            <div key={item}><span className="process-check-icon"><Check size={15} /></span><p>{item}</p><span className="process-check-line" /></div>
          ))}
          <p className="process-checks-note">Verification built into every change.</p>
        </div>
      )}
      {step === 3 && (
        <div className="process-release">
          <p className="process-release-label">Continuous delivery</p>
          <p className="process-release-title">Every release<br />moves you forward.</p>
          <div className="process-release-cycle"><span>Ship</span><ArrowUpRight size={16} /><span>Learn</span><ArrowUpRight size={16} /><span>Improve</span></div>
        </div>
      )}
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [pinned, setPinned] = useState(() => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const media = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !pinned) return;

    let frame = 0;
    // CSS handles pinning; one frame per scroll updates only the progress paint.
    // React changes chapters at the four boundaries, not on every scroll event.
    const update = () => {
      frame = 0;
      const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      section.style.setProperty('--process-progress', String(progress));
      section.style.setProperty('--process-drift', `${progress * -24}px`);
      setActiveStep(Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length)));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(section);
    resize.observe(stage);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resize.disconnect();
    };
  }, [pinned]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(section);
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, []);

  const goToStep = (index: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (pinned) {
      const start = window.scrollY + section.getBoundingClientRect().top;
      const distance = section.offsetHeight - stage.offsetHeight;
      window.scrollTo({ top: start + distance * ((index + 0.12) / STEPS.length), behavior: 'smooth' });
    } else {
      chapterRefs.current[index]?.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  };

  return (
    <section ref={sectionRef} id="process" className="process-section" data-pinned={pinned} aria-labelledby="process-title">
      <div ref={stageRef} className="process-stage">
        <div className="process-backdrop" aria-hidden="true">
          <video ref={videoRef} className="process-video" src={PROCESS_VIDEO_SRC} muted loop playsInline preload="none" />
          <div className="process-video-shade" />
        </div>
        <div className="process-container">
          <header className="process-header">
            <div><p className="process-eyebrow">Our process</p><h2 id="process-title">How we work.</h2></div>
            <p className="process-intro">Four steps, from first conversation to a live product — and what you get at each one.</p>
          </header>
          <div className="process-chapters">
            {STEPS.map((step, i) => (
              <article
                key={step.title}
                id={`process-step-${i + 1}`}
                ref={(node) => { chapterRefs.current[i] = node; }}
                className="process-chapter"
                data-active={!pinned || i === activeStep}
                data-position={i < activeStep ? 'before' : 'after'}
                aria-hidden={pinned && i !== activeStep ? true : undefined}
                aria-labelledby={`process-heading-${i + 1}`}
              >
                <div className="process-chapter-copy">
                  <p className="process-step-label"><span>0{i + 1}</span>{step.title}</p>
                  <h3 id={`process-heading-${i + 1}`}>{step.headline}</h3>
                  <p className="process-summary">{step.summary}</p>
                  <div className="process-deliverable"><span>What you get</span><p>{step.receive}</p></div>
                </div>
                <ProcessArtifact step={i} />
              </article>
            ))}
          </div>
          <nav className="process-navigation" aria-label="Process steps">
            <div className="process-progress" aria-hidden="true"><div /></div>
            <div className="process-step-buttons">
              {STEPS.map((step, i) => (
                <button key={step.title} type="button" onClick={() => goToStep(i)} aria-current={pinned && i === activeStep ? 'step' : undefined} aria-controls={`process-step-${i + 1}`}>
                  <span className="process-nav-number">0{i + 1}</span><span>{step.title}</span><ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </nav>
          <p className="process-scroll-hint" aria-hidden="true"><ArrowDown size={13} /> Scroll to explore <span>0{activeStep + 1} / 04</span></p>
        </div>
      </div>
    </section>
  );
}
