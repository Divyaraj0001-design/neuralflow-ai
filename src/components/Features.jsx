import { useState, useRef, useEffect, useCallback } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

const FEATURES = [
  {
    id: 0,
    title: 'Intelligent Routing',
    desc: 'AI-powered routing adapts in real-time to traffic patterns, ensuring zero-latency delivery across your entire pipeline.',
    icon: 'arrow-path.svg',
    wide: true,
    tag: 'CORE',
    metric: '0ms latency',
    accent: '#FFC801',
    code: `pipeline.route({
  strategy: "ai-adaptive",
  latency:  "<50ms",
  fallback: "auto"
})`,
  },
  {
    id: 1,
    title: 'Deep Analytics',
    desc: 'Real-time pipeline analytics with predictive insights. Know exactly where your data flows and why.',
    icon: 'chart-pie.svg',
    wide: false,
    tag: 'INSIGHTS',
    metric: '360° visibility',
    accent: '#FF9932',
  },
  {
    id: 2,
    title: 'Native Integrations',
    desc: 'Connect 200+ services with one-click integrations. No config files, no YAML — just click and connect.',
    icon: 'link-solid.svg',
    wide: false,
    tag: 'CONNECT',
    metric: '200+ services',
    accent: '#1de9b6',
  },
  {
    id: 3,
    title: 'Automation Engine',
    desc: 'Configure complex conditional logic, transformations, and triggers using our visual automation builder.',
    icon: 'cog-8-tooth.svg',
    wide: true,
    tag: 'ENGINE',
    metric: 'Visual builder',
    accent: '#FFC801',
    code: `trigger("data.ingested")
  .filter(x => x.size > 1_000)
  .transform("normalize")
  .emit("pipeline.ready")`,
  },
  {
    id: 4,
    title: '3D Data Mesh',
    desc: 'Visualize your entire data architecture in an interactive 3D graph. Spot bottlenecks at a glance.',
    icon: 'cube-16-solid.svg',
    wide: false,
    tag: '3D GRAPH',
    metric: 'Interactive',
    accent: '#FF9932',
  },
];

export default function Features() {
  const isMobile = useBreakpoint(768);
  const wasMobileRef = useRef(isMobile);
  const activeIndexRef = useRef(null);
  const [accordionOpen, setAccordionOpen] = useState(null);

  useEffect(() => {
    const prev = wasMobileRef.current;
    wasMobileRef.current = isMobile;
    if (isMobile && !prev && activeIndexRef.current !== null) {
      setAccordionOpen(activeIndexRef.current);
    }
  }, [isMobile]);

  const onEnter = useCallback((id) => {
    activeIndexRef.current = id;
    document.querySelectorAll('.bento-node').forEach(el => el.classList.remove('active'));
    document.getElementById(`bento-${id}`)?.classList.add('active');
  }, []);

  const onLeave = useCallback(() => {
    document.querySelectorAll('.bento-node').forEach(el => el.classList.remove('active'));
  }, []);

  const toggleAcc = (id) => {
    activeIndexRef.current = id;
    setAccordionOpen(prev => (prev === id ? null : id));
  };

  return (
    <section id="features" style={{ padding: '7rem 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
      {/* Section header */}
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-accent)',
            letterSpacing: '0.15em', fontWeight: 600,
          }}>
            CAPABILITIES
          </span>
          <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem,4vw,3rem)',
          fontWeight: 700, color: 'var(--color-powder)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
        }}>
          Everything your pipeline{' '}
          <span className="gradient-text">needs</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1rem',
          color: 'rgba(200,223,218,0.6)', marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0',
          lineHeight: 1.7,
        }}>
          Five focused capabilities, engineered to eliminate complexity and amplify throughput.
        </p>
      </div>

      {/* Desktop: Bento grid */}
      {!isMobile && (
        <div role="list" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', transition: 'all var(--t-layout)',
        }}>
          {FEATURES.map(f => (
            <article
              key={f.id}
              id={`bento-${f.id}`}
              className="bento-node reveal grad-border"
              role="listitem"
              onMouseEnter={() => onEnter(f.id)}
              onMouseLeave={onLeave}
              style={{
                background: 'rgba(17,47,58,0.7)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(200,223,218,0.1)',
                borderRadius: 18, padding: '2rem',
                gridColumn: f.wide ? 'span 2' : 'span 1',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', bottom: -40, right: -40,
                width: 160, height: 160, borderRadius: '50%',
                background: `radial-gradient(circle, ${f.accent}14 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} aria-hidden="true" />

              <div style={{ display: 'flex', flexDirection: f.wide ? 'row' : 'column', gap: '1.5rem', height: '100%' }}>
                <div style={{ flex: 1 }}>
                  {/* Tag */}
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.62rem',
                    color: f.accent, letterSpacing: '0.15em',
                    fontWeight: 700, marginBottom: '1.25rem', display: 'block',
                  }}>
                    {f.tag}
                  </span>

                  {/* Icon ring */}
                  <div className="icon-ring" style={{ width: 48, height: 48, marginBottom: '1.25rem' }}>
                    <img src={`./assets/${f.icon}`} alt="" className="icon-accent"
                      style={{ width: 24, height: 24 }} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                    fontWeight: 600, color: 'var(--color-powder)', marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {f.title}
                  </h3>

                  {/* Desc */}
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: 'rgba(200,223,218,0.65)', lineHeight: 1.65,
                  }}>
                    {f.desc}
                  </p>

                  {/* Metric badge */}
                  <div style={{
                    marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    backgroundColor: `${f.accent}14`, border: `1px solid ${f.accent}33`,
                    borderRadius: 100, padding: '4px 12px',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: f.accent, boxShadow: `0 0 6px ${f.accent}` }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', color: f.accent, fontWeight: 600 }}>
                      {f.metric}
                    </span>
                  </div>
                </div>

                {/* Code snippet for wide cards */}
                {f.wide && f.code && (
                  <div style={{
                    width: 240, flexShrink: 0,
                    background: 'rgba(0,0,0,0.35)', borderRadius: 12,
                    padding: '1rem',
                    border: '1px solid rgba(200,223,218,0.07)',
                    fontFamily: 'var(--font-display)', fontSize: '0.68rem',
                    color: 'rgba(200,223,218,0.55)', lineHeight: 1.8,
                    whiteSpace: 'pre', overflowX: 'auto',
                  }}>
                    <div style={{ color: 'rgba(200,223,218,0.2)', marginBottom: '0.5rem', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                      ▶ RUN · neural.js
                    </div>
                    {f.code.split('\n').map((line, i) => (
                      <div key={i} style={{
                        color: line.startsWith('pipeline') || line.startsWith('trigger') ? '#FFC801'
                          : line.includes('"') ? '#1de9b6'
                            : line.includes('//') ? 'rgba(200,223,218,0.3)'
                              : 'rgba(200,223,218,0.55)',
                      }}>
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Mobile: Accordion */}
      {isMobile && (
        <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {FEATURES.map(f => {
            const open = accordionOpen === f.id;
            return (
              <article
                key={f.id} role="listitem"
                style={{
                  background: open ? 'rgba(17,47,58,0.8)' : 'rgba(17,47,58,0.5)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${open ? f.accent + '55' : 'rgba(200,223,218,0.08)'}`,
                  borderRadius: 14, overflow: 'hidden',
                  transition: 'border-color var(--t-micro), background var(--t-micro)',
                  boxShadow: open ? `0 0 24px ${f.accent}18` : 'none',
                }}
              >
                <button
                  onClick={() => toggleAcc(f.id)}
                  aria-expanded={open}
                  aria-controls={`acc-${f.id}`}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '1.125rem 1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer', minHeight: 52, gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: open ? `${f.accent}22` : 'rgba(200,223,218,0.06)',
                      border: `1px solid ${open ? f.accent + '44' : 'rgba(200,223,218,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'all var(--t-micro)',
                    }}>
                      <img src={`./assets/${f.icon}`} alt=""
                        className={open ? 'icon-accent' : 'icon-svg'}
                        style={{ width: 18, height: 18 }} aria-hidden="true" />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600,
                      color: open ? f.accent : 'var(--color-powder)', textAlign: 'left',
                      transition: 'color var(--t-micro)',
                    }}>
                      {f.title}
                    </span>
                  </div>
                  <img
                    src={open ? './assets/chevron-up.svg' : './assets/chevron-down.svg'}
                    alt={open ? 'Collapse' : 'Expand'}
                    className="icon-svg"
                    style={{ width: 18, height: 18, flexShrink: 0, transition: 'transform var(--t-micro)' }}
                  />
                </button>
                <div id={`acc-${f.id}`} className={`accordion-content${open ? ' open' : ''}`} role="region">
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                      color: 'rgba(200,223,218,0.65)', lineHeight: 1.65, marginBottom: '0.875rem',
                    }}>
                      {f.desc}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.68rem', color: f.accent,
                      fontWeight: 600, backgroundColor: `${f.accent}14`,
                      border: `1px solid ${f.accent}33`, borderRadius: 100, padding: '3px 10px',
                    }}>
                      {f.metric}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
