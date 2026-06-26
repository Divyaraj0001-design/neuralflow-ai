import { useEffect, useRef } from 'react';

const STATS = [
  { icon: 'arrow-trending-up.svg', value: '99.9%',  label: 'Uptime SLA' },
  { icon: 'chart-pie.svg',         value: '10M+',   label: 'Pipelines Run' },
  { icon: 'arrow-path.svg',        value: '<50ms',  label: 'Avg Latency' },
];

const PARTICLES = [
  { cls: 'float-1', top: '15%', left: '8%',  size: 40, opacity: 0.12 },
  { cls: 'float-2', top: '70%', left: '5%',  size: 28, opacity: 0.08 },
  { cls: 'float-3', top: '25%', right: '7%', size: 52, opacity: 0.10 },
  { cls: 'float-1', top: '75%', right: '10%',size: 32, opacity: 0.09 },
  { cls: 'float-2', top: '50%', left: '50%', size: 20, opacity: 0.06 },
];

export default function Hero() {
  const canvasRef = useRef(null);

  /* Lightweight canvas particle effect */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,1,${d.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section
      id="hero"
      className="mesh-bg"
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 1.5rem 4rem',
        background: 'linear-gradient(135deg, #172B36 0%, #0f3d4a 40%, #114C5A 65%, #172B36 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Canvas particle layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Floating geometric shapes */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={p.cls}
          style={{
            position: 'absolute', top: p.top, left: p.left, right: p.right,
            width: p.size, height: p.size, borderRadius: 8,
            border: `1px solid rgba(255,200,1,${p.opacity * 2})`,
            backgroundColor: `rgba(255,200,1,${p.opacity})`,
            pointerEvents: 'none', zIndex: 0,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Radial glow behind content */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(255,200,1,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} aria-hidden="true" />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div
          className="entry-fade delay-0 badge-glow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid rgba(255,200,1,0.4)', borderRadius: 100,
            padding: '6px 16px', backgroundColor: 'rgba(255,200,1,0.08)',
            marginBottom: '1.5rem',
          }}
        >
          <img src="./assets/arrow-trending-up.svg" alt="" className="icon-accent"
            style={{ width: 16, height: 16 }} aria-hidden="true" />
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.75rem',
            color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            NEXT-GEN AI AUTOMATION
          </span>
        </div>

        {/* H1 */}
        <h1
          className="entry-slide delay-100"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem,6vw,5rem)',
            fontWeight: 700, color: 'var(--color-powder)',
            lineHeight: 1.1, maxWidth: '900px',
            marginBottom: '1.5rem', marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          Automate Your Data{' '}
          <span className="gradient-text">Pipeline</span>
          {' '}at Scale
        </h1>

        {/* Terminal-style sub text */}
        <div
          className="entry-fade delay-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem', color: 'var(--color-accent)',
            opacity: 0.7, marginBottom: '0.5rem', letterSpacing: '0.05em',
          }}
        >
          {'> '}<span className="cursor-blink">|</span>
          {' '}neural.pipeline.init() — ready
        </div>

        {/* Subtext */}
        <p
          className="entry-fade delay-200"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem,2vw,1.25rem)',
            color: 'var(--color-mint)', maxWidth: '600px',
            lineHeight: 1.7, marginBottom: '2.5rem',
            marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          NeuralFlow transforms raw data into intelligent workflows. Built for enterprise scale, designed for speed. No code required.
        </p>

        {/* CTAs */}
        <div
          className="entry-scale delay-300"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            justifyContent: 'center', marginBottom: '4rem',
          }}
        >
          <button
            style={{
              fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)', border: 'none', borderRadius: 10,
              padding: '14px 32px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
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
            <img src="./assets/arrow-path.svg" alt="" className="icon-svg"
              style={{ width: 18, height: 18, filter: 'brightness(0)' }} aria-hidden="true" />
            Start Building Free
          </button>
          <button
            style={{
              fontFamily: 'var(--font-body)', backgroundColor: 'transparent',
              color: 'var(--color-powder)',
              border: '1px solid rgba(241,246,244,0.2)', borderRadius: 10,
              padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              transition: 'border-color var(--t-micro), color var(--t-micro), background-color var(--t-micro)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-accent)';
              e.currentTarget.style.backgroundColor = 'rgba(255,200,1,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(241,246,244,0.2)';
              e.currentTarget.style.color = 'var(--color-powder)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            View Demo →
          </button>
        </div>

        {/* Stats bar */}
        <div
          className="entry-fade delay-350"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '2.5rem',
            justifyContent: 'center', alignItems: 'center',
          }}
        >
          {STATS.map(({ icon, value, label }, idx) => (
            <>
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  backgroundColor: 'rgba(255,200,1,0.1)',
                  border: '1px solid rgba(255,200,1,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <img src={`./assets/${icon}`} alt="" className="icon-accent"
                    style={{ width: 20, height: 20 }} aria-hidden="true" />
                </div>
                <div>
                  <div className="shimmer-text" style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
                  }}>{value}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-mint)',
                  }}>{label}</div>
                </div>
              </div>
              {idx < STATS.length - 1 && (
                <div key={`sep-${idx}`} style={{
                  width: 1, height: 36,
                  backgroundColor: 'rgba(217,232,226,0.15)',
                }} aria-hidden="true" />
              )}
            </>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          marginTop: '4rem', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.5rem', opacity: 0.4,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-mint)',
            letterSpacing: '0.1em',
          }}>SCROLL TO EXPLORE</span>
          <img src="./assets/chevron-down.svg" alt="" className="icon-svg"
            style={{ width: 20, height: 20 }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
