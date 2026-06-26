import { useState } from 'react';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Developers: ['Documentation', 'API Reference', 'SDKs', 'Status', 'Community'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'],
};

const SOCIALS = [
  {
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setEmail(''); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(13,31,42,0.8) 20%, #0a1a22 100%)',
      borderTop: '1px solid rgba(200,223,218,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, rgba(255,200,1,0.04) 0%, transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      {/* CTA band */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,200,1,0.06) 0%, rgba(255,153,50,0.04) 50%, transparent 100%)',
        borderBottom: '1px solid rgba(200,223,218,0.06)',
        padding: '5rem 1.5rem', textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: '1.25rem', padding: '4px 14px',
          background: 'rgba(255,200,1,0.08)', border: '1px solid rgba(255,200,1,0.2)',
          borderRadius: 100,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1de9b6', boxShadow: '0 0 8px #1de9b6' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.1em' }}>
            READY TO LAUNCH
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem,3.5vw,3rem)',
          fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          <span style={{ color: 'var(--color-powder)' }}>Ready to automate your</span>{' '}
          <span className="gradient-text">pipeline?</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1rem',
          color: 'rgba(200,223,218,0.55)', marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Join 500+ enterprises already running on NeuralFlow. No credit card required.
        </p>

        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-shimmer" style={{
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
            background: 'linear-gradient(135deg, #FFC801, #FF9932)',
            color: '#0d1f2a', border: 'none', borderRadius: 12,
            padding: '14px 32px', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(255,200,1,0.4)',
            transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,200,1,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,200,1,0.4)'; }}
          >
            Start Free Trial →
          </button>
          <button style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem',
            background: 'rgba(200,223,218,0.06)', color: 'var(--color-powder)',
            border: '1px solid rgba(200,223,218,0.15)', borderRadius: 12,
            padding: '14px 32px', cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'border-color var(--t-micro), background var(--t-micro)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,200,1,0.4)'; e.currentTarget.style.background = 'rgba(255,200,1,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,223,218,0.15)'; e.currentTarget.style.background = 'rgba(200,223,218,0.06)'; }}
          >
            Talk to Sales
          </button>
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>

        {/* Top row: brand + newsletter */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '3rem',
          justifyContent: 'space-between', marginBottom: '3.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(200,223,218,0.07)',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(255,200,1,0.2), rgba(255,153,50,0.1))',
                border: '1px solid rgba(255,200,1,0.3)',
                boxShadow: '0 0 16px rgba(255,200,1,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src="./assets/cube-16-solid.svg" alt="" className="icon-accent"
                  style={{ width: 20, height: 20 }} aria-hidden="true" />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                fontWeight: 700, letterSpacing: '-0.02em',
              }}>
                Neural<span style={{ color: 'var(--color-accent)' }}>Flow</span>
                <span style={{ color: 'rgba(200,223,218,0.3)', fontSize: '0.75rem' }}> AI</span>
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              color: 'rgba(200,223,218,0.45)', lineHeight: 1.7,
            }}>
              Enterprise AI data automation platform. Transform raw data into intelligent workflows at scale.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              {SOCIALS.map(({ label, icon }) => (
                <button key={label} aria-label={label} style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'rgba(200,223,218,0.05)',
                  border: '1px solid rgba(200,223,218,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(200,223,218,0.5)',
                  transition: 'all var(--t-micro)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,200,1,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,200,1,0.3)';
                    e.currentTarget.style.color = '#FFC801';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(200,223,218,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(200,223,218,0.1)';
                    e.currentTarget.style.color = 'rgba(200,223,218,0.5)';
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: 340, flex: '1 1 280px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--color-powder)', marginBottom: '0.5rem',
            }}>
              Stay in the loop
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
              color: 'rgba(200,223,218,0.45)', marginBottom: '1rem', lineHeight: 1.6,
            }}>
              Get product updates, tips, and industry news. No spam, ever.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email" placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  background: 'rgba(17,47,58,0.8)', backdropFilter: 'blur(12px)',
                  color: 'var(--color-powder)',
                  border: '1px solid rgba(200,223,218,0.12)',
                  borderRadius: 9, padding: '10px 14px', outline: 'none',
                  transition: 'border-color var(--t-micro), box-shadow var(--t-micro)',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(255,200,1,0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,200,1,0.08)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(200,223,218,0.12)'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="submit" style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem',
                background: submitted ? '#1de9b6' : 'linear-gradient(135deg, #FFC801, #FF9932)',
                color: '#0d1f2a', border: 'none', borderRadius: 9,
                padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background 300ms ease, transform var(--t-micro)',
                boxShadow: '0 4px 12px rgba(255,200,1,0.3)',
              }}>
                {submitted ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '2rem', marginBottom: '3rem',
        }}>
          {Object.entries(FOOTER_LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700,
                color: 'var(--color-accent)', letterSpacing: '0.12em',
                marginBottom: '1rem', textTransform: 'uppercase',
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                      color: 'rgba(200,223,218,0.45)', textDecoration: 'none',
                      transition: 'color var(--t-micro)',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-powder)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,223,218,0.45)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
          borderTop: '1px solid rgba(200,223,218,0.06)',
          paddingTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            color: 'rgba(200,223,218,0.3)',
          }}>
            © 2026 NeuralFlow AI, Inc. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" style={{
                fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: 'rgba(200,223,218,0.3)', textDecoration: 'none',
                transition: 'color var(--t-micro)',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-mint)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,223,218,0.3)'}
              >
                {item}
              </a>
            ))}

            {/* Back to top */}
            <button onClick={scrollToTop} aria-label="Back to top" style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(255,200,1,0.08)', border: '1px solid rgba(255,200,1,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background var(--t-micro), box-shadow var(--t-micro)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,200,1,0.18)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,200,1,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,200,1,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <img src="./assets/chevron-up.svg" alt="" className="icon-accent"
                style={{ width: 14, height: 14 }} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
