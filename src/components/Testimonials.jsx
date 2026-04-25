import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Final Year Student, IIT Bombay',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'The Resume Analyzer and ATS Score Checker helped me land 3 interview calls in a week! The feedback was incredibly specific and actionable.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Full-Stack Developer',
    avatar: '👨‍💻',
    rating: 5,
    text: 'Code Debugger saved me hours of frustration. I pasted a complex async bug and got a clean fix with a perfect explanation. Game-changer.',
  },
  {
    name: 'Ayesha Khan',
    role: 'Content Creator & Blogger',
    avatar: '✍️',
    rating: 5,
    text: 'Blog Generator + Social Caption Generator is my entire content pipeline now. What used to take 4 hours now takes 20 minutes.',
  },
  {
    name: 'Daniel Park',
    role: 'Business Analyst',
    avatar: '📊',
    rating: 5,
    text: 'Meeting Notes AI transformed our team productivity. I drop in transcripts and get clean summaries with action items — perfect every time.',
  },
  {
    name: 'Riya Patel',
    role: 'Medical Student, AIIMS',
    avatar: '👩‍⚕️',
    rating: 5,
    text: 'The Flashcard Maker and Notes Summarizer are incredible for studying. I summarize 40-page chapters into clean bullet points in seconds.',
  },
  {
    name: 'James O\'Brien',
    role: 'Startup Founder',
    avatar: '🚀',
    rating: 5,
    text: 'The Idea Generator and Daily Planner keep me organized and creative. This platform is like having a productivity coach available 24/7.',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">10,000+ Users</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Real feedback from students, developers, creators and professionals worldwide.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 card-hover flex flex-col gap-4"
            >
              <Stars count={t.rating} />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
