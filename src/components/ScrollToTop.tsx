import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop({ hidden = false }: { hidden?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = scrolled && !hidden;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(160,80,220,0.35)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
    >
      <ArrowUp className="w-5 h-5 text-white" strokeWidth={2.25} />
    </button>
  );
}
