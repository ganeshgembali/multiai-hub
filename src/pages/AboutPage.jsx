import { motion } from 'framer-motion';
import { Zap, Target, Heart, Users } from 'lucide-react';

const TEAM = [
  { name: 'Gembali Ganesh', role: 'Creator & Developer', emoji: '👨‍💻', bio: 'Solo developer passionate about building powerful AI tools and democratizing access to them.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Built to Empower <span className="gradient-text">Everyone</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            MultiAI Hub was born from a simple frustration — too many AI tools, too many subscription fees, too much context-switching.
            We built one hub that does it all.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {[
            { Icon: Zap,    title: 'Our Mission',     desc: 'Make powerful AI accessible to everyone — not just tech giants.' },
            { Icon: Target, title: 'Our Vision',      desc: 'A world where any person can leverage AI to reach their full potential.' },
            { Icon: Heart,  title: 'Our Values',      desc: 'Simplicity, transparency, privacy and genuine user empowerment.' },
            { Icon: Users,  title: 'Our Community',   desc: 'Students, developers, creators and professionals in 50+ countries.' },
          ].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <div className="flex justify-center">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover w-full max-w-sm mx-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-3xl mx-auto mb-4">
                  {m.emoji}
                </div>
                <h3 className="text-white font-semibold">{m.name}</h3>
                <p className="text-violet-400 text-xs font-medium mb-2">{m.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[['20+', 'AI Tools'], ['10K+', 'Active Users'], ['1M+', 'Outputs Created'], ['50+', 'Countries']].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-extrabold gradient-text mb-1">{v}</div>
                <div className="text-slate-500 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
