import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect to explore and get started.',
    features: [
      '10 tool uses per day',
      'Access to all 20 tools',
      'Standard output quality',
      'Email support',
      'No credit card required',
    ],
    cta: 'Start for Free',
    ctaLink: '/tools',
    popular: false,
    gradient: 'from-slate-700 to-slate-800',
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For power users who need unlimited AI.',
    features: [
      'Unlimited tool uses',
      'Priority AI processing',
      'Advanced output options',
      'File uploads (PDF, DOCX)',
      'Favorite & history tracking',
      'Priority support',
    ],
    cta: 'Go Pro',
    ctaLink: '/tools',
    popular: true,
    gradient: 'from-violet-600 to-blue-600',
  },
  {
    name: 'Team',
    price: '$39',
    period: '/month',
    description: 'Built for teams and organizations.',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared workspace',
      'Team analytics dashboard',
      'Custom branding',
      'Dedicated account manager',
    ],
    cta: 'Start Team Plan',
    ctaLink: '/tools',
    popular: false,
    gradient: 'from-emerald-600 to-teal-600',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            No hidden fees. Upgrade, downgrade or cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 flex flex-col gap-6 border transition-all duration-300 ${
                plan.popular
                  ? 'border-violet-500/50 bg-gradient-to-b from-violet-600/10 to-blue-600/5 shadow-2xl shadow-violet-500/20 scale-[1.03]'
                  : 'glass border-white/8 hover:border-violet-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Zap className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                id={`pricing-${plan.name.toLowerCase()}-btn`}
                className={`w-full text-center font-semibold py-3.5 rounded-2xl transition-all text-sm ${
                  plan.popular
                    ? 'btn-gradient text-white shadow-lg shadow-violet-500/25'
                    : 'glass text-white hover:bg-white/8'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
