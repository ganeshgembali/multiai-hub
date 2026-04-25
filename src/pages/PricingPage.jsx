import { motion } from 'framer-motion';
import PricingSection from '../components/PricingSection';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Start free, upgrade when you're ready. No contracts, no surprises.
          </p>
        </motion.div>
      </div>
      <PricingSection />

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time with no questions asked. You keep access until the end of your billing period.' },
              { q: 'What happens when I hit the free limit?', a: 'On the Free plan, once you hit 10 daily uses, you will be prompted to upgrade to Pro for unlimited access.' },
              { q: 'Is my data secure?', a: 'Absolutely. We never store your inputs or outputs. All processing is ephemeral and your data is never used for training.' },
              { q: 'Do you offer student discounts?', a: 'Yes! Email us with your .edu address for a 50% discount on the Pro plan.' },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
