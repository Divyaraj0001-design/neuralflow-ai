import { useEffect, useRef, useState } from 'react';

const STATS = [
  { icon: 'arrow-trending-up.svg', value: '99.9%', label: 'Uptime SLA', color: '#FFC801' },
  { icon: 'chart-pie.svg',         value: '10M+',  label: 'Pipelines Run', color: '#FF9932' },
  { icon: 'arrow-path.svg',        value: '<50ms', label: 'Avg Latency', color: '#1de9b6' },
];

const TRUSTED = ['DataStack', 'Finova', 'NexaCloud', 'Growthify', 'FlowBase', 'PipelineHQ'];

const ACTIVITY = [
  { label: 'Pipeline #4821', status: 'completed', time: '0.2s', color: '#1de9b6' },
  { label: 'Route optimizer', status: 'running',   time: '—',    color: '#FFC801' },
  { label: 'ML model sync',  status: 'queued',     time: '—',    color: '#FF9932' },
];

function DashboardCard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      width: '100%', maxWidth: 480,
      background: 'rgba(13,31,42,0.75)',
      backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(200,223,218,0.12)',
      borderRadius: 20,
      padding: '1.5rem',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,200,1,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'rgba(200,223,218,0.4)' }}>
          neural.dashboard
        </span>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {STATS.map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(200,223,218,0.08)',
            borderRadius: 12, padding: '0.75rem',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color }}>{value}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(200,223,218,0.5)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div style={{ borderRadius: 12, background: 'rgba(0,0,0,0.2)', padding: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'rgba(200,223,218,0.4)', marginBottom: '0.6rem', letterSpacing: '0.1em' }}>
          LIVE ACTIVITY
        </div>
        {ACTIVITY.map(({ label, status, time, color }, i) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 0',
            borderBottom: i < ACTIVITY.length - 1 ? '1px solid rgba(200,223,218,0.05)' : 'none',
            opacity: tick % 3 === i ? 1 : 0.6,
            transition: 'opacity 600ms ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-powder)' }}>{label}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color, fontWeight: 600 }}>{status}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: 'linear-gradient(90deg, #FFC801, #FF9932)',
          width: `${68 + (tick % 4) * 6}%`,
          transition: 'width 2.8s ease',
          boxShadow: '0 0 8px rgba(255,200,1,0.5)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'rgba(200,223,218,0.4)' }}>throughput capacity</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#FFC801' }}>{68 + (tick % 4) * 6}%</span>
      </div>

      {/* Glow decoration */}
      <div style={{
        position: 'absolute', bottom: -60, right: -60,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,1,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.35 + 0.05,
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
        display: 'flex', alignItems: 'center',
        padding: '7rem 1.5rem 4rem',
        background: 'linear-gradient(135deg, #0d1f2a 0%, #0f2d38 35%, #112f3a 65%, #0d1f2a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }} aria-hidden="true" />

      {/* Aurora blobs */}
      <div className="aurora-1" aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,1,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="aurora-2" aria-hidden="true" style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,153,50,0.06) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '40%', left: '40%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,233,182,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Main content — two column on desktop */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '80rem', margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap: '4rem', alignItems: 'center',
      }}
        className="hero-grid"
      >
        {/* LEFT: Content */}
        <div>
          {/* Badge */}
          <div
            className="entry-fade delay-0 badge-glow"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid rgba(255,200,1,0.35)', borderRadius: 100,
              padding: '5px 14px',
              background: 'linear-gradient(90deg, rgba(255,200,1,0.1), rgba(255,153,50,0.06))',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFC801', boxShadow: '0 0 8px #FFC801' }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '0.7rem',
              color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.1em',
            }}>
              NEXT-GEN AI AUTOMATION · v2.0
            </span>
          </div>

          {/* H1 */}
          <h1
            className="entry-slide delay-100"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem,5vw,4.2rem)',
              fontWeight: 700, lineHeight: 1.08,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            <span style={{ color: 'var(--color-powder)' }}>Automate Your</span>{' '}
            <span className="gradient-text">Data Pipeline</span>
            <br />
            <span style={{ color: 'var(--color-powder)' }}>at Enterprise</span>{' '}
            <span style={{ color: 'var(--color-teal)' }}>Scale</span>
          </h1>

          {/* Terminal line */}
          <div className="entry-fade delay-150" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem', color: 'rgba(29,233,182,0.8)',
            marginBottom: '0.6rem', letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <span style={{ color: 'rgba(200,223,218,0.3)' }}>▶</span>
            neural.init() — pipeline ready{' '}
            <span className="cursor-blink" style={{ color: '#FFC801' }}>█</span>
          </div>

          {/* Subtext */}
          <p className="entry-fade delay-200" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem,1.8vw,1.15rem)',
            color: 'var(--color-mint)', lineHeight: 1.75,
            marginBottom: '2.5rem', maxWidth: 480,
            opacity: 0.85,
          }}>
            NeuralFlow transforms raw data into intelligent automated workflows. Zero code required — built for teams that move fast.
          </p>

          {/* CTAs */}
          <div className="entry-scale delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '3rem' }}>
            <button className="btn-shimmer" style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
              color: '#0d1f2a', border: 'none', borderRadius: 12,
              padding: '13px 28px', cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(255,200,1,0.4), 0 2px 8px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,200,1,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,200,1,0.4)'; }}
            >
              <img src="./assets/arrow-path.svg" alt="" className="icon-svg"
                style={{ width: 16, height: 16, filter: 'brightness(0)' }} aria-hidden="true" />
              Start Building Free
            </button>
            <button style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
              background: 'rgba(200,223,218,0.06)', color: 'var(--color-powder)',
              border: '1px solid rgba(200,223,218,0.18)', borderRadius: 12,
              padding: '13px 28px', cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'border-color var(--t-micro), background var(--t-micro)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,200,1,0.4)'; e.currentTarget.style.background = 'rgba(255,200,1,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,223,218,0.18)'; e.currentTarget.style.background = 'rgba(200,223,218,0.06)'; }}
            >
              Watch Demo →
            </button>
          </div>

          {/* Trusted by */}
          <div className="entry-fade delay-400" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(200,223,218,0.4)', letterSpacing: '0.06em' }}>
              TRUSTED BY TEAMS AT
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TRUSTED.map(name => (
                <span key={name} style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem',
                  color: 'rgba(200,223,218,0.5)', fontWeight: 500,
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(200,223,218,0.05)',
                  border: '1px solid rgba(200,223,218,0.08)',
                }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Dashboard card */}
        <div className="entry-scale delay-300 hide-mobile" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Floating stat mini-cards */}
          <div style={{
            position: 'absolute', top: -20, left: -30, zIndex: 2,
            background: 'rgba(13,31,42,0.9)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,200,1,0.2)', borderRadius: 12,
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }} className="float-2">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#FFC801' }}>99.9%</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(200,223,218,0.5)' }}>Uptime SLA</div>
          </div>

          <div style={{
            position: 'absolute', bottom: 20, right: -20, zIndex: 2,
            background: 'rgba(13,31,42,0.9)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(29,233,182,0.25)', borderRadius: 12,
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }} className="float-1">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#1de9b6' }}>&lt;50ms</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(200,223,218,0.5)' }}>Avg Latency</div>
          </div>

          <DashboardCard />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        opacity: 0.35, zIndex: 1,
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-mint)', letterSpacing: '0.12em' }}>
          SCROLL TO EXPLORE
        </span>
        <img src="./assets/chevron-down.svg" alt="" className="icon-svg float-2"
          style={{ width: 18, height: 18 }} aria-hidden="true" />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
