import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { PRICING_MATRIX, computePrice } from '../data/pricingConfig';

/**
 * PriceDisplay — State-isolated price span.
 * Only this span's textContent updates when billing/currency changes.
 * Zero parent re-renders (verified with React DevTools).
 */
const PriceDisplay = forwardRef(function PriceDisplay(
  { baseRate, billingRef, currencyRef },
  ref
) {
  const spanRef = useRef(null);
  const update = useCallback(() => {
    if (!spanRef.current) return;
    spanRef.current.textContent = computePrice(
      baseRate, billingRef.current, currencyRef.current
    ).formatted;
  }, [baseRate, billingRef, currencyRef]);
  useImperativeHandle(ref, () => ({ update }), [update]);
  return (
    <span
      ref={el => { spanRef.current = el; if (el) update(); }}
      aria-live="polite"
    />
  );
});

export default function PricingMatrix() {
  const billingRef  = useRef('monthly');
  const currencyRef = useRef('USD');
  const displayRefs = useRef([]);

  const flush = useCallback(() => {
    displayRefs.current.forEach(el => el?.update());
  }, []);

  const setBilling = (val) => {
    billingRef.current = val;
    document.querySelectorAll('[data-billing]').forEach(el => {
      const active = el.dataset.billing === val;
      el.style.backgroundColor = active ? 'var(--color-accent)' : 'transparent';
      el.style.color = active ? 'var(--color-bg)' : 'var(--color-mint)';
    });
    flush();
  };

  const setCurrency = (val) => {
    currencyRef.current = val;
    flush();
  };

  return (
    <section
      id="pricing"
      style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(17,76,90,0.15) 0%, rgba(17,76,90,0.4) 50%, rgba(23,43,54,0) 100%)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.75rem',
            color: 'var(--color-accent)', letterSpacing: '0.1em', fontWeight: 600,
          }}>
            PRICING
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 700, color: 'var(--color-powder)', marginTop: '0.5rem',
          }}>
            Simple, transparent pricing
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'var(--color-mint)', marginTop: '0.75rem',
          }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Controls row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem',
        }}>
          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', backgroundColor: 'var(--color-surface)',
            borderRadius: 10, padding: 4, border: '1px solid rgba(217,232,226,0.1)',
          }}>
            {[
              { val: 'monthly', label: 'Monthly' },
              { val: 'annual',  label: 'Annual · Save 20%' },
            ].map(({ val, label }) => (
              <button
                key={val}
                data-billing={val}
                onClick={() => setBilling(val)}
                style={{
                  fontFamily: 'var(--font-body)', padding: '8px 20px', borderRadius: 8,
                  border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                  transition: 'background-color var(--t-micro), color var(--t-micro)',
                  backgroundColor: val === 'monthly' ? 'var(--color-accent)' : 'transparent',
                  color: val === 'monthly' ? 'var(--color-bg)' : 'var(--color-mint)',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Currency selector */}
          <select
            onChange={e => setCurrency(e.target.value)}
            defaultValue="USD"
            aria-label="Select currency"
            style={{
              fontFamily: 'var(--font-display)', backgroundColor: 'var(--color-surface)',
              color: 'var(--color-powder)', border: '1px solid rgba(217,232,226,0.2)',
              borderRadius: 8, padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* Tier cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {PRICING_MATRIX.tiers.map((tier, i) => (
            <article
              key={tier.id}
              className="reveal"
              style={{
                backgroundColor: tier.popular ? 'var(--color-surface)' : 'rgba(23,43,54,0.8)',
                border: tier.popular
                  ? '2px solid var(--color-accent)'
                  : '1px solid rgba(217,232,226,0.1)',
                borderRadius: 16, padding: '2rem', position: 'relative',
                transition: 'transform var(--t-micro), box-shadow var(--t-micro)',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div style={{
                  position: 'absolute', top: -1, left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)',
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700,
                  padding: '4px 16px', borderRadius: '0 0 8px 8px', letterSpacing: '0.05em',
                }}>
                  MOST POPULAR
                </div>
              )}

              {/* Background decoration */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 120, height: 120, borderRadius: '50%',
                backgroundColor: tier.popular ? 'rgba(255,200,1,0.05)' : 'rgba(255,153,50,0.04)',
                pointerEvents: 'none',
              }} aria-hidden="true" />

              {/* Tier name */}
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--color-accent)', letterSpacing: '0.08em',
                marginBottom: '1rem',
                marginTop: tier.popular ? '0.5rem' : 0,
              }}>
                {tier.name.toUpperCase()}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                  fontWeight: 700, color: 'var(--color-powder)',
                }}>
                  {/* ISOLATED: only textContent updates, zero parent re-render */}
                  <PriceDisplay
                    ref={el => displayRefs.current[i] = el}
                    baseRate={tier.baseRate}
                    billingRef={billingRef}
                    currencyRef={currencyRef}
                  />
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-mint)',
                }}>
                  /mo
                </span>
              </div>

              {/* Features list */}
              <ul style={{
                listStyle: 'none', marginBottom: '2rem',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}>
                {tier.features.map(({ label, included }) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={included ? './assets/chevron-right.svg' : './assets/x-mark.svg'}
                      alt={included ? 'Included' : 'Not included'}
                      className={included ? 'icon-accent' : 'icon-muted'}
                      style={{ width: 16, height: 16, flexShrink: 0 }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                      color: included ? 'var(--color-powder)' : 'var(--color-mint)',
                      opacity: included ? 1 : 0.5,
                    }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button style={{
                width: '100%', fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: '0.9rem', padding: 12, borderRadius: 10,
                border: tier.popular ? 'none' : '1px solid rgba(217,232,226,0.2)',
                backgroundColor: tier.popular ? 'var(--color-accent)' : 'transparent',
                color: tier.popular ? 'var(--color-bg)' : 'var(--color-powder)',
                cursor: 'pointer', transition: 'transform var(--t-micro), opacity var(--t-micro)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1'; }}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Trust footer */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'var(--color-mint)', opacity: 0.6,
          }}>
            All plans include 14-day free trial · No credit card required · SOC 2 compliant
          </p>
        </div>
      </div>
    </section>
  );
}
