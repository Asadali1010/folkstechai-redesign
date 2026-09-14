import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import { PillButton } from "./PillButton";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Work", to: "/work" },
  { label: "Trust", to: "/trust" },
  { label: "Company", to: "/company" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-slate-edge bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-64 items-center justify-between">
        <Link
          to="/"
          className="text-body-lg font-bold tracking-tight text-snow"
          onClick={() => setMenuOpen(false)}
        >
          FolksTechAI
        </Link>

        <nav className="hidden items-center gap-32 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-body transition-colors duration-150 hover:text-snow ${
                  isActive ? "text-snow" : "text-smoke"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <PillButton
            variant="primary"
            href="mailto:hello@folkstechai.com"
            className="text-caption md:text-body"
          >
            Book a free consultation
          </PillButton>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-40 w-40 items-center justify-center rounded-full border border-slate-edge text-snow md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-slate-edge bg-void px-24 py-24 md:hidden">
          <nav className="flex flex-col gap-24">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-subheading ${isActive ? "text-snow" : "text-smoke"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <PillButton
              variant="primary"
              href="mailto:hello@folkstechai.com"
              className="w-full"
            >
              Book a free consultation
            </PillButton>
          </nav>
        </div>
      )}
    </header>
  );
}
