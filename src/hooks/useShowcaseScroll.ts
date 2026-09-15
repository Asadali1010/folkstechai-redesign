import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useShowcaseScroll(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const metricsRef = useRef({ travel: 0, distance: 0, stops: [] as number[] });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(() => typeof window !== 'undefined' && window.matchMedia(SCROLL_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(SCROLL_QUERY);
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    let frame = 0;
    let previous = -1;
    let disposed = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Keep the native swipe position separate from the desktop transform.
    if (pinned) viewport.scrollLeft = 0;
    else track.style.removeProperty('transform');

    const draw = () => {
      frame = 0;
      const { travel, distance, stops } = metricsRef.current;
      const progress = pinned ? clamp(-section.getBoundingClientRect().top / Math.max(1, distance)) : clamp(viewport.scrollLeft / Math.max(1, travel));
      if (Math.abs(progress - previous) < 0.00001) return;
      previous = progress;
      const x = progress * travel;
      if (pinned) track.style.transform = `translate3d(${-x}px, 0, 0)`;
      section.style.setProperty('--work-progress', String(progress));

      let nearest = 0;
      stops.forEach((stop, i) => {
        if (Math.abs(stop - x) < Math.abs(stops[nearest] - x)) nearest = i;
        const offset = reducedMotion.matches ? 0 : clamp((stop - x) / viewport.clientWidth, -1, 1);
        const card = cardsRef.current[i];
        card?.style.setProperty('--scene-offset', offset.toFixed(4));
        card?.style.setProperty('--scene-reveal', String(1 - Math.abs(offset) * 0.8));
      });
      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const measure = () => {
      if (disposed) return;
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const distance = travel * 0.72;
      const stops = cardsRef.current.slice(0, count).map((card) => card ? clamp(card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2, 0, travel) : 0);
      metricsRef.current = { travel, distance, stops };
      section.style.setProperty('--work-space', `${distance}px`);
      previous = -1;
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    viewport.addEventListener('scroll', schedule, { passive: true });
    reducedMotion.addEventListener('change', measure);
    document.fonts.ready.then(measure);
    measure();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', schedule);
      reducedMotion.removeEventListener('change', measure);
    };
  }, [count, pinned]);

  const select = useCallback((index: number, immediate = false) => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;
    const { travel, distance, stops } = metricsRef.current;
    const target = stops[clamp(index, 0, count - 1)] ?? 0;
    const behavior = immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    if (pinned) {
      const start = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({ top: start + (target / Math.max(1, travel)) * distance, behavior });
    } else {
      viewport.scrollTo({ left: target, behavior });
    }
  }, [count, pinned]);

  return { sectionRef, stageRef, viewportRef, trackRef, cardsRef, active, pinned, select };
}
