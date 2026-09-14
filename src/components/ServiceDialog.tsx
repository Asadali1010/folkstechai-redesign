import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  includes: string[];
}

export default function ServiceDialog({
  service,
  onClose,
}: {
  service: ServiceDetail;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = 'service-dialog-title';

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const Icon = service.icon;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[560px] max-h-[85vh] overflow-y-auto rounded-[20px] sm:rounded-[24px] bg-[rgba(17,16,15,0.9)] backdrop-blur-[30px] border border-white/[0.08] p-5 sm:pt-8 sm:pr-8 sm:pl-8 sm:pb-6 animate-dialog-in"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 flex items-center justify-center rounded-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="w-12 h-12 rounded-[12px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6">
          <Icon className="w-[22px] h-[22px] text-white" strokeWidth={1.6} aria-hidden="true" />
        </div>

        <h3 id={titleId} className="text-white text-[24px] sm:text-[28px] font-normal leading-[1.1] mb-3 pr-8">
          {service.title}
        </h3>
        <p className="text-white/80 text-[15px] sm:text-[16px] font-[450] leading-[1.5] mb-6">
          {service.description}
        </p>

        <p className="text-white/60 text-[12px] font-[450] tracking-[0.08em] uppercase mb-3">
          What you get
        </p>
        <ul className="flex flex-col gap-3 mb-7">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-3 text-white/80 text-[14px] sm:text-[14.5px] leading-[1.5]">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={onClose}
          className="inline-flex items-center justify-center h-[46px] px-6 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] font-[450] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book a consultation
        </a>
      </div>
    </div>,
    document.body,
  );
}
