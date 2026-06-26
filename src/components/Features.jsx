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
  },
  {
    id: 1,
    title: 'Deep Analytics',
    desc: 'Real-time pipeline analytics with predictive insights. Know exactly where your data flows and why.',
    icon: 'chart-pie.svg',
    wide: false,
    tag: 'INSIGHTS',
    metric: '360° visibility',
  },
  {
    id: 2,
    title: 'Native Integrations',
    desc: 'Connect 200+ services with one-click integrations. No config files, no YAML — just click and connect.',
    icon: 'link-solid.svg',
    wide: false,
    tag: 'CONNECT',
    metric: '200+ services',
  },
  {
    id: 3,
    title: 'Automation Engine',
    desc: 'Configure complex conditional logic, transformations, and triggers using our visual automation builder.',
    icon: 'cog-8-tooth.svg',
    wide: true,
    tag: 'ENGINE',
    metric: 'Visual builder',
  },
  {
    id: 4,
    title: '3D Data Mesh',
    desc: 'Visualize your entire data architecture in an interactive 3D graph. Spot bottlenecks at a glance.',
    icon: 'cube-16-solid.svg',
    wide: false,
    tag: '3D GRAPH',
    metric: 'Interactive',
  },
];

export default function Features() {
  const isMobile = useBreakpoint(768);
  const wasMobileRef = useRef(isMobile);
  const activeIndexRef = useRef(null);
  const [accordionOpen, setAccordionOpen] = useState(null);

  // CONTEXT LOCK: transfer active bento index to accordion on resize
  useEffect(() => {
    const prev = wasMobileRef.current;
    wasMobileRef.current = isMobile;
    if (isMobile && !prev && activeIndexRef.current !== null) {
      setAccordionOpen(activeIndexRef.current);
    }
  }, [isMobile]);

  // Bento hover — DOM mutation only, no re-render
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
    <section
      id="features"
      style={{ padding: '6rem 1.5rem', maxWidth: '80rem', margin: '0 auto' }}
    >
      {/* Section header */}
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--color-accent)',
          letterSpacing: '0.1em', fontWeight: 600,
        }}>
          CAPABILITIES
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem,4vw,3rem)',
          fontWeight: 700, color: 'var(--color-powder)', marginTop: '0.5rem',
        }}>
          Everything your pipeline needs
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '1rem',
          color: 'var(--color-mint)', marginTop: '0.75rem', maxWidth: '500px',
          margin: '0.75rem auto 0',
        }}>
          Five focused capabilities, engineered to eliminate complexity and amplify throughput.
        </p>
      </div>

      {/* Desktop: Bento grid */}
      {!isMobile && (
        <div
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            transition: 'all var(--t-layout)',
          }}
        >
          {FEATURES.map(f => (
            <article
              key={f.id}
              id={`bento-${f.id}`}
              className="bento-node reveal"
              role="listitem"
              onMouseEnter={() => onEnter(f.id)}
              onMouseLeave={onLeave}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid rgba(217,232,226,0.1)',
                borderRadius: 16, padding: '2rem',
                gridColumn: f.wide ? 'span 2' : 'span 1',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute', bottom: -20, right: -20,
                width: 100, height: 100, borderRadius: '50%',
                backgroundColor: 'rgba(255,200,1,0.03)',
                pointerEvents: 'none',
              }} aria-hidden="true" />

              {/* Tag */}
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                color: 'var(--color-saffron)', letterSpacing: '0.12em',
                fontWeight: 700, marginBottom: '1rem', display: 'block',
              }}>
                {f.tag}
              </span>

              {/* Icon */}
              <img
                src={`/assets/${f.icon}`} alt=""
                className="icon-accent"
                style={{ width: 32, height: 32, marginBottom: '1rem' }}
                aria-hidden="true"
              />

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                fontWeight: 600, color: 'var(--color-powder)', marginBottom: '0.75rem',
              }}>
                {f.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--color-mint)', lineHeight: 1.6,
              }}>
                {f.desc}
              </p>

              {/* Metric badge */}
              <div style={{
                marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center',
                gap: '0.4rem', backgroundColor: 'rgba(255,200,1,0.08)',
                border: '1px solid rgba(255,200,1,0.15)',
                borderRadius: 100, padding: '4px 12px',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem',
                  color: 'var(--color-accent)', fontWeight: 600,
                }}>
                  {f.metric}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Mobile: Accordion */}
      {isMobile && (
        <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FEATURES.map(f => {
            const open = accordionOpen === f.id;
            return (
              <article
                key={f.id}
                role="listitem"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: `1px solid ${open ? 'var(--color-accent)' : 'rgba(217,232,226,0.1)'}`,
                  borderRadius: 12, overflow: 'hidden',
                  transition: 'border-color var(--t-micro)',
                }}
              >
                <button
                  onClick={() => toggleAcc(f.id)}
                  aria-expanded={open}
                  aria-controls={`acc-${f.id}`}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    minHeight: 48, gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={`/assets/${f.icon}`} alt=""
                      className={open ? 'icon-accent' : 'icon-svg'}
                      style={{ width: 20, height: 20 }}
                      aria-hidden="true"
                    />
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                      fontWeight: 600,
                      color: open ? 'var(--color-accent)' : 'var(--color-powder)',
                      textAlign: 'left',
                    }}>
                      {f.title}
                    </span>
                  </div>
                  <img
                    src={open ? '/assets/chevron-up.svg' : '/assets/chevron-down.svg'}
                    alt={open ? 'Collapse' : 'Expand'}
                    className="icon-svg"
                    style={{ width: 20, height: 20, flexShrink: 0, transition: 'transform var(--t-micro)' }}
                  />
                </button>
                <div
                  id={`acc-${f.id}`}
                  className={`accordion-content${open ? ' open' : ''}`}
                  role="region"
                >
                  <div style={{ padding: '0 1.25rem 1.25rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: 'var(--color-mint)', lineHeight: 1.6, marginBottom: '0.75rem',
                    }}>
                      {f.desc}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.7rem',
                      color: 'var(--color-accent)', fontWeight: 600,
                      backgroundColor: 'rgba(255,200,1,0.08)',
                      border: '1px solid rgba(255,200,1,0.15)',
                      borderRadius: 100, padding: '3px 10px',
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
