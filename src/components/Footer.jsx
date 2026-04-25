import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Code, Briefcase, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Tools', to: '/tools' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Tools: [
    { label: 'Resume Analyzer', to: '/tools/resume-analyzer' },
    { label: 'Code Debugger', to: '/tools/code-debugger' },
    { label: 'Blog Generator', to: '/tools/blog-generator' },
    { label: 'Quiz Generator', to: '/tools/quiz-generator' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
};

const socials = [
  { Icon: Code,          href: 'https://github.com/ganeshgembali', label: 'GitHub' },
  { Icon: Briefcase,     href: 'https://www.linkedin.com/in/ganesh-gembali', label: 'LinkedIn' },
  { Icon: Mail,          href: 'mailto:gembaliganesh280@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#070711]">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl btn-gradient flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">MultiAI</span>
                <span className="text-white"> Hub</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              One platform with 20+ AI-powered tools for career growth, coding, studying, writing and productivity.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-violet-400 hover:border-violet-500/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} MultiAI Hub. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with ❤️ by Gembali Ganesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
