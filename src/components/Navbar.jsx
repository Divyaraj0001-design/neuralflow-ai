import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });

    // Track active section
    const sections = ['features', 'pricing', 'social-proof'];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id); }),
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => { window.removeEventListener('scroll', fn); obs.disconnect(); };
  }, []);

  const links = [
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Customers', href: '#social-proof', id: 'social-proof' },
    { label: 'Docs', href: '#', id: '' },
  ];

  const navbarStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'center',
    padding: scrolled ? '0.6rem 1.5rem' : '1rem 1.5rem',
    transition: 'padding 300ms ease',
    pointerEvents: 'none',
  };

  const pillStyle = {
    pointerEvents: 'all',
    maxWidth: '72rem', width: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 1.5rem', height: '3.5rem', borderRadius: '16px',
    background: scrolled ? 'rgba(13,31,42,0.85)' : 'rgba(13,31,42,0.5)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: scrolled ? '1px solid rgba(200,223,218,0.15)' : '1px solid rgba(200,223,218,0.06)',
    boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,200,1,0.05)' : 'none',
    transition: 'background 300ms ease, border 300ms ease, box-shadow 300ms ease',
  };

  return (
    <header style={navbarStyle} className="entry-fade delay-0">
      <div style={pillStyle}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, rgba(255,200,1,0.2), rgba(255,153,50,0.1))',
            border: '1px solid rgba(255,200,1,0.35)',
            boxShadow: '0 0 16px rgba(255,200,1,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="./assets/cube-16-solid.svg" alt="" className="icon-accent"
              style={{ width: 18, height: 18 }} aria-hidden="true" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', color: 'var(--color-powder)',
            fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em',
          }}>
            Neural<span style={{ color: 'var(--color-accent)' }}>Flow</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hide-mobile" style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', alignItems: 'center' }}>
          {links.map(({ label, href, id }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                  textDecoration: 'none', padding: '6px 14px', borderRadius: 8,
                  color: activeLink === id ? 'var(--color-accent)' : 'var(--color-mint)',
                  background: activeLink === id ? 'rgba(255,200,1,0.08)' : 'transparent',
                  transition: 'color var(--t-micro), background var(--t-micro)',
                  display: 'block',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-powder)'; e.currentTarget.style.background = 'rgba(200,223,218,0.06)'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = activeLink === id ? 'var(--color-accent)' : 'var(--color-mint)';
                  e.currentTarget.style.background = activeLink === id ? 'rgba(255,200,1,0.08)' : 'transparent';
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hide-mobile" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button style={{
            fontFamily: 'var(--font-body)', background: 'none',
            border: '1px solid rgba(200,223,218,0.2)', color: 'var(--color-mint)',
            cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
            padding: '7px 18px', borderRadius: 9,
            transition: 'border-color var(--t-micro), color var(--t-micro), background var(--t-micro)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,200,1,0.5)';
              e.currentTarget.style.color = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(255,200,1,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(200,223,218,0.2)';
              e.currentTarget.style.color = 'var(--color-mint)';
              e.currentTarget.style.background = 'none';
            }}
          >
            Sign In
          </button>

          <button className="btn-shimmer" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #FFC801, #FF9932)',
            color: '#0d1f2a', border: 'none', borderRadius: 9,
            padding: '8px 20px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255,200,1,0.35)',
            transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,200,1,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,200,1,0.35)'; }}
          >
            Start Free →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hide-desktop"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle navigation"
          style={{
            background: 'rgba(200,223,218,0.08)', border: '1px solid rgba(200,223,218,0.12)',
            borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 20 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: 2, borderRadius: 2,
                background: 'var(--color-mint)',
                transform: mobileOpen
                  ? i === 1 ? 'scaleX(0)' : i === 0 ? 'rotate(45deg) translate(4px,4px)' : 'rotate(-45deg) translate(4px,-4px)'
                  : 'none',
                transition: 'transform 200ms ease, opacity 200ms ease',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: '1.5rem', right: '1.5rem', marginTop: 8,
          background: 'rgba(13,31,42,0.95)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(200,223,218,0.12)', borderRadius: 14,
          padding: '1rem', pointerEvents: 'all',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        }}>
          {links.map(({ label, href }) => (
            <a
              key={label} href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 16px', color: 'var(--color-mint)',
                fontFamily: 'var(--font-body)', fontSize: '1rem', textDecoration: 'none',
                borderRadius: 8, marginBottom: 4,
                transition: 'background var(--t-micro), color var(--t-micro)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,200,1,0.08)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-mint)'; }}
            >
              {label}
            </a>
          ))}
          <div style={{ height: 1, background: 'rgba(200,223,218,0.08)', margin: '0.5rem 0' }} />
          <button style={{
            width: '100%', marginTop: 8,
            background: 'linear-gradient(135deg, #FFC801, #FF9932)',
            color: '#0d1f2a', border: 'none', borderRadius: 10,
            padding: 14, fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            Start Free →
          </button>
        </div>
      )}
    </header>
  );
}
