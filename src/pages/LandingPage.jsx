import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import PricingSection from '../components/PricingSection';

// Animated background blobs
function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="blob absolute w-[600px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, #2563eb 100%)',
          top: '-15%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-2 absolute w-[500px] h-[500px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, #7c3aed 100%)',
          top: '30%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-3 absolute w-[400px] h-[400px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #2563eb 100%)',
          bottom: '10%',
          left: '20%',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

// Floating particles
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.05,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const FEATURES = [
  { icon: <Sparkles className="w-5 h-5" />, title: '20+ AI Tools', desc: 'Career, coding, writing, study & productivity in one hub.' },
  { icon: <Zap className="w-5 h-5" />,       title: 'Instant Results', desc: 'AI-powered outputs delivered in seconds, not minutes.' },
  { icon: <Shield className="w-5 h-5" />,    title: 'Secure & Private', desc: 'Your data is never stored or shared with third parties.' },
  { icon: <Globe className="w-5 h-5" />,     title: 'Works Anywhere', desc: 'Fully responsive — works on mobile, tablet, and desktop.' },
];

const TOOL_PREVIEWS = [
  { emoji: '📄', name: 'Resume Analyzer',     cat: 'Career' },
  { emoji: '🐛', name: 'Code Debugger',        cat: 'Coding' },
  { emoji: '📝', name: 'Notes Summarizer',     cat: 'Study' },
  { emoji: '📧', name: 'Email Writer',          cat: 'Writing' },
  { emoji: '💡', name: 'Idea Generator',        cat: 'Productivity' },
  { emoji: '🎯', name: 'ATS Score Checker',     cat: 'Career' },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBlobs />
        <Particles />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-violet-300 border border-violet-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Powered by Cutting-Edge AI Models
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            One Platform.{' '}
            <span className="gradient-text">Unlimited</span>{' '}
            <span className="block mt-1">AI Tools.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Use powerful AI tools for career, coding, study, writing, and productivity —{' '}
            <span className="text-slate-300">all in one place.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/tools"
              id="hero-get-started-btn"
              className="btn-gradient text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 text-base shadow-lg shadow-violet-500/20"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tools"
              id="hero-explore-btn"
              className="glass text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 text-base hover:bg-white/8 transition-all"
            >
              Explore Tools
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {[['20+', 'AI Tools'], ['10K+', 'Users'], ['1M+', 'Outputs Generated'], ['4.9★', 'User Rating']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{val}</div>
                <div className="text-slate-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          </div>
        </motion.div>
      </section>

      {/* ── Tool Preview Grid ─────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Tools Overview</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need, <span className="gradient-text">In One Hub</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From writing a cover letter to debugging code — our AI tools handle the heavy lifting.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TOOL_PREVIEWS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 flex items-center gap-3 card-hover"
              >
                <span className="text-3xl">{t.emoji}</span>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.cat}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              View all 20 tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why <span className="gradient-text">MultiAI Hub</span>?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <Testimonials />

      {/* ── Pricing ───────────────────────────────── */}
      <PricingSection />

      {/* ── CTA Banner ────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-blue-600/10 pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">
              Ready to work smarter?
            </h2>
            <p className="text-slate-400 mb-8 relative z-10">
              Join thousands of students, developers and professionals using MultiAI Hub every day.
            </p>
            <Link
              to="/tools"
              className="btn-gradient inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl relative z-10 text-base shadow-lg shadow-violet-500/25"
            >
              Start for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
