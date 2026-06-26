export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid rgba(217,232,226,0.1)',
    }}>
      {/* CTA band */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,200,1,0.08) 0%, rgba(255,153,50,0.05) 100%)',
        borderBottom: '1px solid rgba(217,232,226,0.08)',
        padding: '4rem 1.5rem', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem,3vw,2.5rem)',
          fontWeight: 700, color: 'var(--color-powder)', marginBottom: '0.75rem',
        }}>
          Ready to automate your pipeline?
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1rem',
          color: 'var(--color-mint)', marginBottom: '2rem',
        }}>
          Join 500+ enterprises already running on NeuralFlow.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)', border: 'none', borderRadius: 10,
            padding: '14px 32px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
            transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,200,1,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Free Trial
          </button>
          <button style={{
            fontFamily: 'var(--font-body)', backgroundColor: 'transparent',
            color: 'var(--color-powder)', border: '1px solid rgba(241,246,244,0.2)',
            borderRadius: 10, padding: '14px 32px', fontSize: '1rem',
            fontWeight: 600, cursor: 'pointer',
            transition: 'border-color var(--t-micro)',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(241,246,244,0.2)'}
          >
            Talk to Sales
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div style={{
        maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="./assets/cube-16-solid.svg" alt="" className="icon-accent"
            style={{ width: 20, height: 20 }} aria-hidden="true" />
          <span style={{
            fontFamily: 'var(--font-display)', color: 'var(--color-accent)', fontWeight: 700,
          }}>
            NeuralFlow AI
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Docs', 'Status'].map(item => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--color-mint)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'color var(--t-micro)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-mint)'}
                >
                  <img src="./assets/link.svg" alt="" className="icon-svg"
                    style={{ width: 12, height: 12 }} aria-hidden="true" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright + back to top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            color: 'var(--color-mint)', opacity: 0.5,
          }}>
            © 2026 NeuralFlow AI
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.2)',
              borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
              transition: 'background var(--t-micro)',
              display: 'flex', alignItems: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,200,1,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,200,1,0.1)'}
          >
            <img src="./assets/chevron-up.svg" alt="" className="icon-accent"
              style={{ width: 16, height: 16 }} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
