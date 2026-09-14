import { useEffect, useRef, useState } from 'react'
import { useAutoplayVideo } from '../hooks/useAutoplayVideo'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4'
const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4'

const CONTACT_URL = 'mailto:hello@folkstechai.com'
const LEARN_MORE_URL = CONTACT_URL + '?subject=Tell%20me%20more%20about%20Targo'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact us', href: CONTACT_URL },
]

function MailIcon() {
  return (
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
      <rect x="0.7" y="0.7" width="15.6" height="11.6" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="m1.1 1.5 7.4 5.8 7.4-5.8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 701px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Targo home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true" />
        <span>targo</span>
      </a>

      <nav className="desktop-links" aria-label="Main navigation">
        {NAV_LINKS.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
      </nav>

      <a className="contact-button" href={CONTACT_URL}>
        <span>Contact us</span>
        <MailIcon />
      </a>

      <button
        ref={menuButton}
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>

      <nav
        id="mobile-navigation"
        className="mobile-links"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setMenuOpen(false)
            menuButton.current?.focus()
          }
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function ActionLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="action-button" href={href}>
      <span>{children}</span>
      <span className="action-line" aria-hidden="true" />
    </a>
  )
}

export function Home() {
  const heroVideo = useAutoplayVideo()
  const aboutVideo = useAutoplayVideo()

  return (
    <main>
      <section id="home" className="hero" aria-labelledby="hero-heading">
        <video
          ref={heroVideo}
          className="hero-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-scrim" aria-hidden="true" />
        <Navigation />

        <h1 id="hero-heading" className="hero-heading">
          <span>Scaling</span>
          <span>The</span>
          <span>Platform</span>
          <span className="heading-indent">For</span>
          <span className="heading-indent">Your</span>
          <span className="heading-indent accent">Business</span>
        </h1>
        <div className="hero-action">
          <ActionLink href="#about">Get started</ActionLink>
        </div>
      </section>

      <section id="about" className="about" aria-labelledby="about-heading">
        <div className="about-copy">
          <h2 id="about-heading" className="about-heading">
            <span>About</span>
            <span className="about-indent accent">Business</span>
          </h2>
          <p>
            Targo builds the testing infrastructure modern teams rely on. From automated
            pipelines to full-scale QA audits, we make sure your software ships fast and
            breaks nothing. Hundreds of releases, zero surprises.
          </p>
          <div className="about-action">
            <ActionLink href={LEARN_MORE_URL}>Learn more</ActionLink>
          </div>
        </div>

        <div className="about-media">
          <video
            ref={aboutVideo}
            src={ABOUT_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="about-video-tint" aria-hidden="true" />
        </div>
      </section>
    </main>
  )
}
