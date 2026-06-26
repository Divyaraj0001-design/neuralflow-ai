import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { PRICING_MATRIX, computePrice } from '../data/pricingConfig';

const PriceDisplay = forwardRef(function PriceDisplay({ baseRate, billingRef, currencyRef }, ref) {
  const spanRef = useRef(null);
  const update = useCallback(() => {
    if (!spanRef.current) return;
    spanRef.current.textContent = computePrice(baseRate, billingRef.current, currencyRef.current).formatted;
  }, [baseRate, billingRef, currencyRef]);
  useImperativeHandle(ref, () => ({ update }), [update]);
  return <span ref={el => { spanRef.current = el; if (el) update(); }} aria-live="polite" />;
});

const TIER_COLORS = ['rgba(200,223,218,0.15)', 'rgba(255,200,1,0.18)', 'rgba(255,153,50,0.12)'];
const TIER_GLOW   = ['transparent', 'rgba(255,200,1,0.15)', 'rgba(255,153,50,0.1)'];

export default function PricingMatrix() {
  const billingRef  = useRef('monthly');
  const currencyRef = useRef('USD');
  const displayRefs = useRef([]);

  const flush = useCallback(() => { displayRefs.current.forEach(el => el?.update()); }, []);

  const setBilling = (val) => {
    billingRef.current = val;
    document.querySelectorAll('[data-billing]').forEach(el => {
      const active = el.dataset.billing === val;
      el.style.backgroundColor = active ? 'var(--color-accent)' : 'transparent';
      el.style.color = active ? 'var(--color-bg)' : 'var(--color-mint)';
      el.style.boxShadow = active ? '0 2px 8px rgba(255,200,1,0.3)' : 'none';
    });
    flush();
  };

  const setCurrency = (val) => { currencyRef.current = val; flush(); };

  return (
    <section id="pricing" style={{
      padding: '7rem 1.5rem',
      background: 'linear-gradient(180deg, transparent 0%, rgba(17,47,58,0.25) 30%, rgba(17,47,58,0.4) 60%, transparent 100%)',
      position: 'relative',
    }}>
      {/* Subtle background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(255,200,1,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-accent)',
              letterSpacing: '0.15em', fontWeight: 600,
            }}>PRICING</span>
            <div style={{ width: 24, height: 1, background: 'var(--color-accent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 700, color: 'var(--color-powder)', letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'rgba(200,223,218,0.55)', marginTop: '0.875rem',
          }}>
            No hidden fees. No lock-in. Cancel anytime.
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem',
        }}>
          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(17,47,58,0.8)', backdropFilter: 'blur(12px)',
            borderRadius: 12, padding: 4,
            border: '1px solid rgba(200,223,218,0.1)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
          }}>
            {[
              { val: 'monthly', label: 'Monthly' },
              { val: 'annual',  label: 'Annual · Save 20%' },
            ].map(({ val, label }) => (
              <button key={val} data-billing={val} onClick={() => setBilling(val)} style={{
                fontFamily: 'var(--font-body)', padding: '8px 20px', borderRadius: 9,
                border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                transition: 'all var(--t-micro)',
                backgroundColor: val === 'monthly' ? 'var(--color-accent)' : 'transparent',
                color: val === 'monthly' ? 'var(--color-bg)' : 'var(--color-mint)',
                boxShadow: val === 'monthly' ? '0 2px 8px rgba(255,200,1,0.3)' : 'none',
              }}>
                {label}
              </button>
            ))}
          </div>

          {/* Currency selector */}
          <select onChange={e => setCurrency(e.target.value)} defaultValue="USD"
            aria-label="Select currency"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'rgba(17,47,58,0.8)', backdropFilter: 'blur(12px)',
              color: 'var(--color-powder)',
              border: '1px solid rgba(200,223,218,0.12)',
              borderRadius: 9, padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer',
              outline: 'none',
            }}>
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* Tier cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {PRICING_MATRIX.tiers.map((tier, i) => (
            <article key={tier.id} className="reveal" style={{
              background: tier.popular ? 'rgba(17,47,58,0.9)' : 'rgba(13,31,42,0.6)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: tier.popular ? '1px solid rgba(255,200,1,0.4)' : '1px solid rgba(200,223,218,0.08)',
              borderRadius: 20, padding: '2rem', position: 'relative',
              transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
              overflow: 'hidden',
              boxShadow: tier.popular ? `0 0 60px ${TIER_GLOW[i]}, 0 20px 60px rgba(0,0,0,0.3)` : '0 8px 32px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = tier.popular
                  ? '0 0 80px rgba(255,200,1,0.25), 0 32px 80px rgba(0,0,0,0.4)'
                  : '0 24px 60px rgba(0,0,0,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = tier.popular
                  ? `0 0 60px ${TIER_GLOW[i]}, 0 20px 60px rgba(0,0,0,0.3)`
                  : '0 8px 32px rgba(0,0,0,0.2)';
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #FFC801, #FF9932)',
                  color: '#0d1f2a', fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem', fontWeight: 700,
                  padding: '5px 18px', borderRadius: '0 0 10px 10px',
                  letterSpacing: '0.08em', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(255,200,1,0.4)',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Background decoration */}
              <div style={{
                position: 'absolute', top: -50, right: -50,
                width: 160, height: 160, borderRadius: '50%',
                background: `radial-gradient(circle, ${TIER_COLORS[i]} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} aria-hidden="true" />

              {/* Tier name */}
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700,
                color: tier.popular ? 'var(--color-accent)' : 'var(--color-mint)',
                letterSpacing: '0.1em', marginBottom: '1.25rem',
                marginTop: tier.popular ? '1rem' : 0,
              }}>
                {tier.name.toUpperCase()}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.8rem',
                  fontWeight: 700, color: 'var(--color-powder)', letterSpacing: '-0.03em',
                }}>
                  <PriceDisplay
                    ref={el => displayRefs.current[i] = el}
                    baseRate={tier.baseRate}
                    billingRef={billingRef}
                    currencyRef={currencyRef}
                  />
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(200,223,218,0.45)' }}>
                  /mo
                </span>
              </div>

              {/* Features list */}
              <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tier.features.map(({ label, included }) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 6, flexShrink: 0,
                      background: included ? 'rgba(255,200,1,0.15)' : 'rgba(200,223,218,0.05)',
                      border: `1px solid ${included ? 'rgba(255,200,1,0.3)' : 'rgba(200,223,218,0.08)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img
                        src={included ? './assets/chevron-right.svg' : './assets/x-mark.svg'}
                        alt={included ? 'Included' : 'Not included'}
                        className={included ? 'icon-accent' : 'icon-muted'}
                        style={{ width: 10, height: 10 }}
                      />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                      color: included ? 'var(--color-powder)' : 'rgba(200,223,218,0.35)',
                    }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className={tier.popular ? 'btn-shimmer' : ''} style={{
                width: '100%', fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: '0.9rem', padding: '13px', borderRadius: 12,
                border: tier.popular ? 'none' : '1px solid rgba(200,223,218,0.15)',
                background: tier.popular
                  ? 'linear-gradient(135deg, #FFC801, #FF9932)'
                  : 'rgba(200,223,218,0.05)',
                color: tier.popular ? '#0d1f2a' : 'var(--color-powder)',
                cursor: 'pointer',
                boxShadow: tier.popular ? '0 4px 16px rgba(255,200,1,0.35)' : 'none',
                transition: 'transform var(--t-micro), box-shadow var(--t-micro), background var(--t-micro)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  if (tier.popular) e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,200,1,0.5)';
                  else e.currentTarget.style.background = 'rgba(200,223,218,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  if (tier.popular) e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,200,1,0.35)';
                  else e.currentTarget.style.background = 'rgba(200,223,218,0.05)';
                }}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Trust footer */}
        <div className="reveal" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {['14-day free trial', 'No credit card required', 'SOC 2 compliant', 'Cancel anytime'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(200,223,218,0.45)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
