import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    backgroundColor: scrolled ? 'rgba(23,43,54,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(217,232,226,0.1)' : 'none',
    transition: 'background-color 300ms ease-in-out, border-color 300ms ease-in-out',
  };

  return (
    <header style={navStyle} className="entry-fade delay-0">
      <nav style={{
        maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem',
        height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src="/assets/cube-16-solid.svg" alt="" className="icon-accent"
            style={{ width: 24, height: 24 }} aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
            NeuralFlow
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex" style={{ gap: '2rem', listStyle: 'none', margin: 0, display: 'flex' }}>
          {['Features', 'Pricing', 'Social Proof', 'Blog'].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                style={{
                  fontFamily: 'var(--font-body)', color: 'var(--color-mint)',
                  fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
                  transition: 'color var(--t-micro)',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-mint)'}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA group */}
        <div className="hidden md:flex" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Search icon */}
          <button
            aria-label="Search"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', borderRadius: 8, opacity: 0.6,
              transition: 'opacity var(--t-micro)',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
          >
            <img src="/assets/search.svg" alt="Search" className="icon-svg" style={{ width: 18, height: 18 }} />
          </button>

          <button
            style={{
              fontFamily: 'var(--font-body)', background: 'none', border: 'none',
              color: 'var(--color-mint)', cursor: 'pointer', fontSize: '0.9rem',
              transition: 'color var(--t-micro)',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--color-powder)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-mint)'}
          >
            Sign In
          </button>

          <button
            style={{
              fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)', border: 'none', borderRadius: 8,
              padding: '8px 20px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,200,1,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Free
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <img
            src={mobileOpen ? '/assets/x-mark.svg' : '/assets/search.svg'}
            alt=""
            className="icon-svg"
            style={{ width: 24, height: 24 }}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          backgroundColor: 'var(--color-surface)', padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(217,232,226,0.1)',
        }}>
          {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 0', color: 'var(--color-mint)',
                fontFamily: 'var(--font-body)', fontSize: '1rem', textDecoration: 'none',
                borderBottom: '1px solid rgba(217,232,226,0.08)',
              }}
            >
              {item}
            </a>
          ))}
          <button style={{
            width: '100%', marginTop: '1rem', backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)', border: 'none', borderRadius: 8,
            padding: 12, fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            Start Free
          </button>
        </div>
      )}
    </header>
  );
}
