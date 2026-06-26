const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'CTO, DataStack',
    initial: 'P',
    quote: 'NeuralFlow cut our pipeline setup from weeks to hours. The architecture is genuinely rock-solid at every scale.',
    color: '#FFC801',
    stars: 5,
  },
  {
    name: 'Alex Chen',
    role: 'Lead Engineer, Finova',
    initial: 'A',
    quote: 'The state isolation alone sold us. Zero layout thrash, even at 10M events per day. Nothing else comes close.',
    color: '#FF9932',
    stars: 5,
  },
  {
    name: 'Riya Gupta',
    role: 'Head of Data, Growthify',
    initial: 'R',
    quote: 'We process 10M events daily. NeuralFlow handles it effortlessly. Reliability we never had to worry about again.',
    color: '#1de9b6',
    stars: 5,
  },
];

const LOGOS = [
  'DataStack', 'Finova', 'Growthify', 'NexaCloud', 'PipelineHQ', 'FlowBase', 'Orbix', 'Streamly',
];

const STATS = [
  { value: '500+', label: 'Enterprise clients', color: '#FFC801' },
  { value: '99.9%', label: 'Uptime guaranteed', color: '#1de9b6' },
  { value: '10M+', label: 'Pipelines processed', color: '#FF9932' },
  { value: '24/7', label: 'Expert support', color: '#FFC801' },
];

export default function SocialProof() {
  return (
    <section id="social-proof" style={{ padding: '7rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-accent)',
              letterSpacing: '0.15em', fontWeight: 600,
            }}>TRUSTED BY TEAMS</span>
            <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem,3.5vw,2.75rem)',
            fontWeight: 700, color: 'var(--color-powder)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Loved by teams building at{' '}
            <span className="gradient-text">scale</span>
          </h2>
        </div>

        {/* Logo strip */}
        <div className="reveal" style={{ overflow: 'hidden', marginBottom: '5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(90deg, var(--color-bg), transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} aria-hidden="true" />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
            background: 'linear-gradient(-90deg, var(--color-bg), transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} aria-hidden="true" />

          <div className="logos-strip" style={{ display: 'flex', gap: '1rem', width: 'max-content', padding: '0.5rem 0' }}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '10px 20px', borderRadius: 10,
                background: 'rgba(17,47,58,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(200,223,218,0.08)',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: LOGOS.indexOf(logo) % 3 === 0 ? '#FFC801' : LOGOS.indexOf(logo) % 3 === 1 ? '#FF9932' : '#1de9b6',
                  boxShadow: '0 0 6px currentColor', opacity: 0.8,
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.78rem',
                  color: 'rgba(200,223,218,0.6)', fontWeight: 500,
                }}>
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem', marginBottom: '4rem',
        }}>
          {TESTIMONIALS.map(({ name, role, initial, quote, color, stars }) => (
            <article key={name} className="reveal" style={{
              background: 'rgba(17,47,58,0.65)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(200,223,218,0.1)',
              borderRadius: 20, padding: '2rem', position: 'relative',
              transition: 'border-color var(--t-micro), transform var(--t-micro), box-shadow var(--t-micro)',
              overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}55`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${color}33`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,223,218,0.1)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Large background quote */}
              <div style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: 'Georgia, serif', fontSize: '8rem', lineHeight: 1,
                background: `linear-gradient(180deg, ${color}18, transparent)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                pointerEvents: 'none', userSelect: 'none',
              }} aria-hidden="true">"</div>

              {/* Background glow */}
              <div style={{
                position: 'absolute', bottom: -40, left: -20,
                width: 140, height: 140, borderRadius: '50%',
                background: `radial-gradient(circle, ${color}0A 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} aria-hidden="true" />

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                {[...Array(stars)].map((_, i) => (
                  <span key={i} style={{ color: '#FFC801', fontSize: '0.85rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                color: 'var(--color-mint)', lineHeight: 1.75, marginBottom: '1.75rem',
                fontStyle: 'italic', position: 'relative',
              }}>
                "{quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                {/* Avatar with gradient ring */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${color}44, ${color}22)`,
                  border: `2px solid ${color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 16px ${color}30`,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '1rem',
                    fontWeight: 700, color: color,
                  }}>
                    {initial}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-powder)' }}>
                    {name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(200,223,218,0.5)', marginTop: 2 }}>
                    {role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats grid */}
        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px', textAlign: 'center',
          background: 'rgba(200,223,218,0.06)',
          border: '1px solid rgba(200,223,218,0.08)',
          borderRadius: 20, overflow: 'hidden',
          backdropFilter: 'blur(16px)',
        }}>
          {STATS.map(({ value, label, color }, i) => (
            <div key={label} style={{
              padding: '2.25rem 1.5rem',
              background: 'rgba(13,31,42,0.5)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 50% 0%, ${color}0A 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} aria-hidden="true" />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '2.25rem',
                fontWeight: 700, color: color,
                textShadow: `0 0 20px ${color}50`,
                letterSpacing: '-0.02em', position: 'relative',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                color: 'rgba(200,223,218,0.5)', marginTop: '0.4rem', position: 'relative',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
