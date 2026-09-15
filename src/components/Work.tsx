import { useShowcaseScroll } from '@/hooks/useShowcaseScroll';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bot, Check, Command, Database, FileText, Globe2, Layers3, LayoutGrid, MessageSquare, PanelLeft, Plus, ShieldCheck, SlidersHorizontal, Sparkles, Users, Workflow } from 'lucide-react';
import './Work.css';

const POSSIBILITIES = [
  {
    id: 'products', label: 'Digital products', title: <>Made for people.<br />Built for possibility.</>,
    description: 'Websites, mobile apps, and software platforms shaped around the people who use them.',
    details: ['Web experiences', 'Mobile apps', 'SaaS platforms'],
  },
  {
    id: 'intelligence', label: 'AI & automation', title: <>Less busywork.<br />More possibility.</>,
    description: 'AI agents and intelligent workflows that turn the repetitive parts of your business into room to grow.',
    details: ['AI agents', 'Smart workflows', 'Human oversight'],
  },
  {
    id: 'systems', label: 'Connected platforms', title: <>Bring it all<br />together.</>,
    description: 'Connect your tools, data, and operations in one system that works the way your business does.',
    details: ['Integrations', 'Data platforms', 'Custom systems'],
  },
  {
    id: 'possibility', label: 'Your next idea', title: <>Something<br />entirely yours.</>,
    description: 'These are starting points. Bring us the idea that doesn’t fit a category. We’ll find the path to building it.',
    details: ['Your industry', 'Your ambition', 'Your next chapter'],
  },
];

function ProductScene() {
  return (
    <div className="work-scene work-product-scene" aria-hidden="true">
      <div className="work-browser work-glass work-layer-back">
        <div className="work-window-chrome"><span /><span /><span /><p>your workspace</p><PanelLeft size={13} /></div>
        <div className="work-product-body">
          <div className="work-product-sidebar"><Command size={20} /><LayoutGrid size={15} /><Users size={15} /><SlidersHorizontal size={15} /></div>
          <div className="work-product-main"><p className="work-ui-eyebrow">A little more connected.</p><h4>A place for<br />your next idea.</h4><div className="work-product-tiles"><div><Layers3 size={18} /><span>Projects</span></div><div><Users size={18} /><span>People</span></div></div><div className="work-ui-rule" /><div className="work-ui-rule work-ui-rule-short" /></div>
        </div>
      </div>
      <div className="work-phone work-glass work-layer-front">
        <div className="work-phone-speaker" /><div className="work-phone-top"><Command size={17} /><Plus size={15} /></div><p className="work-ui-eyebrow">On the move.</p><h4>Your world.<br />In your hand.</h4>
        <div className="work-phone-tile"><Layers3 size={16} /><span>Your projects</span></div><div className="work-phone-lines"><span /><span /><span /></div><div className="work-phone-home" />
      </div>
      <span className="work-scene-caption">One idea. Every screen.</span>
    </div>
  );
}

function IntelligenceScene() {
  return (
    <div className="work-scene work-ai-scene" aria-hidden="true">
      <div className="work-agent-request work-glass work-layer-back"><MessageSquare size={16} /><span>Make this workflow work for us.</span></div>
      <div className="work-agent-flow">
        <span className="work-flow-input"><FileText size={23} /></span><span className="work-flow-connection" />
        <div className="work-agent-core work-glass"><Sparkles size={33} strokeWidth={1.3} /><span>Your AI agent</span></div>
        <span className="work-flow-connection" /><span className="work-flow-input"><ShieldCheck size={24} /></span>
      </div>
      <div className="work-agent-actions work-glass work-layer-front"><div><Bot size={17} /><p>Understand the context</p><Check size={14} /></div><div><Workflow size={17} /><p>Connect the right tools</p><Check size={14} /></div><div><Users size={17} /><p>Keep people in control</p><ArrowUpRight size={14} /></div></div>
      <span className="work-scene-caption">Purposeful intelligence. Human direction.</span>
    </div>
  );
}

function SystemsScene() {
  return (
    <div className="work-scene work-systems-scene" aria-hidden="true">
      <div className="work-system-window work-glass work-layer-back">
        <div className="work-system-heading"><Layers3 size={17} /><span>One connected workspace</span><Command size={15} /></div>
        <div className="work-system-map"><div className="work-system-source"><Globe2 size={18} /><span>Apps</span></div><span className="work-system-link" /><div className="work-system-hub"><Workflow size={29} strokeWidth={1.25} /></div><span className="work-system-link" /><div className="work-system-source"><Database size={18} /><span>Data</span></div></div>
        <div className="work-system-streams">{['Customer relationships', 'Everyday operations', 'Business intelligence'].map((label, i) => <div key={label}><span className="work-stream-index">0{i + 1}</span><p>{label}</p><span className="work-stream-trace"><span /></span></div>)}</div>
      </div>
      <div className="work-system-note work-glass work-layer-front"><Layers3 size={18} /><span>Different tools.<br /><strong>A shared foundation.</strong></span></div>
      <span className="work-scene-caption">From separate tools to a connected business.</span>
    </div>
  );
}

function PossibilityScene() {
  return (
    <div className="work-scene work-possibility-scene" aria-hidden="true">
      <div className="work-idea-frame work-layer-back"><span className="work-idea-corner" /><span className="work-idea-corner" /><span className="work-idea-corner" /><span className="work-idea-corner" /><p className="work-ui-eyebrow">The next possibility</p><p className="work-what-if">What if<span>?</span></p><div className="work-idea-line" /><p className="work-idea-note">It starts with your ambition.</p></div>
      <div className="work-idea-tag work-glass work-layer-front"><Sparkles size={16} /><span>Built around you.</span><ArrowUpRight size={16} /></div>
    </div>
  );
}

const SCENES = [ProductScene, IntelligenceScene, SystemsScene, PossibilityScene];

export default function Work() {
  const { sectionRef, stageRef, viewportRef, trackRef, cardsRef, active, pinned, select } = useShowcaseScroll(POSSIBILITIES.length);

  return (
    <section ref={sectionRef} id="work" className="work-showcase" aria-labelledby="work-title" data-scroll={pinned}>
      <div ref={stageRef} className="work-stage">
        <header className="work-header"><div><p className="work-eyebrow">Work / A world of possibilities</p><h2 id="work-title">What we can build<span>.</span></h2></div><p className="work-intro">Your ambition sets the brief.<br /><span>Let’s build what comes next.</span></p></header>
        <div ref={viewportRef} className="work-viewport">
          <div ref={trackRef} className="work-track">
            {POSSIBILITIES.map((possibility, i) => {
              const Scene = SCENES[i];
              return (
                <article ref={(node) => { cardsRef.current[i] = node; }} key={possibility.id} id={`work-${possibility.id}`} className={`work-card work-card-${possibility.id}`} data-active={i === active} aria-labelledby={`work-heading-${i}`} onFocusCapture={() => { if (i !== active) select(i, true); }}>
                  <div className="work-card-surface">
                    <div className="work-card-copy"><p className="work-card-label"><span>0{i + 1}</span>{possibility.label}</p><h3 id={`work-heading-${i}`}>{possibility.title}</h3><p className="work-card-description">{possibility.description}</p>{i === 3 ? <a className="work-idea-link" href="mailto:hello@folkstechai.com?subject=Let%E2%80%99s%20build%20something">Tell us what you’re imagining<ArrowUpRight size={18} /></a> : <p className="work-card-details">{possibility.details.map((detail) => <span key={detail}>{detail}</span>)}</p>}</div>
                    <div className="work-card-visual"><span className="work-concept-label">Concept interface</span><Scene /></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <footer className="work-footer">
          <p className="work-scroll-cue"><ArrowDown size={14} /><span className="work-desktop-cue">Scroll to discover</span><span className="work-mobile-cue">Swipe to discover</span></p>
          <nav className="work-pagination" aria-label="Explore what we can build">{POSSIBILITIES.map((possibility, i) => <button type="button" key={possibility.id} onClick={() => select(i)} aria-label={possibility.label} aria-current={i === active ? 'step' : undefined} aria-controls={`work-${possibility.id}`}><span /><span className="work-pagination-label">{possibility.label}</span></button>)}</nav>
          <div className="work-gallery-controls"><span className="work-page-count" aria-live="polite">0{active + 1}<span> / 04</span></span><button type="button" aria-label="Previous possibility" disabled={active === 0} onClick={() => select(active - 1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next possibility" disabled={active === POSSIBILITIES.length - 1} onClick={() => select(active + 1)}><ArrowRight size={18} /></button></div>
        </footer>
      </div>
    </section>
  );
}
