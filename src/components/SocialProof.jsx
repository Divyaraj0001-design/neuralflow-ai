const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'CTO, DataStack',
    initial: 'P',
    quote: 'NeuralFlow cut our pipeline setup from weeks to hours. The architecture is rock-solid.',
    color: '#FFC801',
  },
  {
    name: 'Alex Chen',
    role: 'Lead Engineer, Finova',
    initial: 'A',
    quote: 'The state isolation alone sold us. Zero layout thrash, even at 10M events per day at scale.',
    color: '#FF9932',
  },
  {
    name: 'Riya Gupta',
    role: 'Head of Data, Growthify',
    initial: 'R',
    quote: 'We process 10M events/day. NeuralFlow handles it like nothing. Impressive reliability.',
    color: '#D9E8E2',
  },
];

const LOGOS = [
  'DataStack', 'Finova', 'Growthify', 'NexaCloud', 'PipelineHQ', 'FlowBase',
];

export default function SocialProof() {
  return (
    <section id="social-proof" style={{ padding: '6rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.75rem',
            color: 'var(--color-accent)', letterSpacing: '0.1em', fontWeight: 600,
          }}>
            TRUSTED BY TEAMS
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem,3vw,2.5rem)',
            fontWeight: 700, color: 'var(--color-powder)', marginTop: '0.5rem',
          }}>
            What our users say
          </h2>
        </div>

        {/* Logo strip — continuous scroll */}
        <div
          className="reveal"
          style={{ overflow: 'hidden', marginBottom: '4rem', position: 'relative' }}
        >
          {/* Fade edges */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 60,
            background: 'linear-gradient(90deg, var(--color-bg), transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} aria-hidden="true" />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 60,
            background: 'linear-gradient(-90deg, var(--color-bg), transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} aria-hidden="true" />

          <div className="logos-strip" style={{ display: 'flex', gap: '3rem', width: 'max-content' }}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '10px 20px', borderRadius: 8,
                  border: '1px solid rgba(217,232,226,0.1)',
                  backgroundColor: 'rgba(17,76,90,0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                <img src="/assets/cube-16-solid.svg" alt=""
                  className="icon-muted" style={{ width: 14, height: 14 }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.8rem',
                  color: 'var(--color-mint)', fontWeight: 500, opacity: 0.7,
                }}>
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {TESTIMONIALS.map(({ name, role, initial, quote, color }) => (
            <article
              key={name}
              className="reveal"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid rgba(217,232,226,0.1)',
                borderRadius: 16, padding: '2rem', position: 'relative',
                transition: 'border-color var(--t-micro), transform var(--t-micro)',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,200,1,0.3)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(217,232,226,0.1)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Quote mark decoration */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: 'Georgia, serif', fontSize: '5rem',
                lineHeight: 1, color: 'rgba(255,200,1,0.06)',
                pointerEvents: 'none', userSelect: 'none',
              }} aria-hidden="true">
                "
              </div>

              {/* Star rating — using arrow-trending-up as stars per spec */}
              <div style={{ display: 'flex', gap: 4, marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/arrow-trending-up.svg"
                    alt=""
                    className="icon-accent"
                    style={{ width: 14, height: 14 }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                color: 'var(--color-mint)', lineHeight: 1.7, marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}>
                "{quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Avatar initials */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: `${color}22`,
                  border: `2px solid ${color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem',
                    fontWeight: 700, color: color,
                  }}>
                    {initial}
                  </span>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem',
                    fontWeight: 600, color: 'var(--color-powder)',
                  }}>
                    {name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                    color: 'var(--color-accent)',
                  }}>
                    {role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats ticker */}
        <div className="reveal" style={{
          marginTop: '4rem', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem', textAlign: 'center',
          backgroundColor: 'rgba(17,76,90,0.3)',
          border: '1px solid rgba(217,232,226,0.08)',
          borderRadius: 16, padding: '2rem',
        }}>
          {[
            { value: '500+', label: 'Enterprise clients' },
            { value: '99.9%', label: 'Uptime guaranteed' },
            { value: '10M+', label: 'Pipelines processed' },
            { value: '24/7', label: 'Expert support' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '2rem',
                fontWeight: 700, color: 'var(--color-accent)',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                color: 'var(--color-mint)', marginTop: '0.25rem',
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
