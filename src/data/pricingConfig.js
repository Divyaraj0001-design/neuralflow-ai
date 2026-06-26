export const PRICING_MATRIX = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      baseRate: 29,
      features: [
        { label: '5 Automation Pipelines', included: true },
        { label: '10K API calls/month', included: true },
        { label: 'Basic Analytics Dashboard', included: true },
        { label: 'Priority Support', included: false },
        { label: 'Custom Integrations', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      baseRate: 79,
      features: [
        { label: 'Unlimited Pipelines', included: true },
        { label: '500K API calls/month', included: true },
        { label: 'Advanced Analytics', included: true },
        { label: 'Priority Support', included: true },
        { label: 'Custom Integrations', included: false },
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      baseRate: 199,
      features: [
        { label: 'Unlimited Everything', included: true },
        { label: 'Unlimited API calls', included: true },
        { label: 'Real-time Analytics', included: true },
        { label: '24/7 Dedicated Support', included: true },
        { label: 'Custom Integrations', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
  billingMultiplier: {
    monthly: 1,
    annual: 0.8,
  },
  currencyConfig: {
    USD: { symbol: '$', tariff: 1.0,  decimals: 2 },
    INR: { symbol: '₹', tariff: 83.5, decimals: 0 },
    EUR: { symbol: '€', tariff: 0.92, decimals: 2 },
  },
};

export function computePrice(baseRate, billing, currency) {
  const mult = PRICING_MATRIX.billingMultiplier[billing];
  const { tariff, decimals, symbol } = PRICING_MATRIX.currencyConfig[currency];
  const price = baseRate * mult * tariff;
  return { formatted: `${symbol}${price.toFixed(decimals)}` };
}
