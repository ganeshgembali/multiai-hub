import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/gembaliganesh280@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            _captcha: "false" // Disables the annoying captcha redirect
        })
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Have a question, feedback, or partnership idea? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {[
              { Icon: Mail,          label: 'Email',   value: 'gembaliganesh280@gmail.com' },
              { Icon: MessageSquare, label: 'GitHub',  value: 'github.com/ganeshgembali' },
              { Icon: MapPin,        label: 'LinkedIn',value: 'linkedin.com/in/ganesh-gembali' },
              { Icon: Phone,         label: 'Author',  value: 'Gembali Ganesh' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-3xl p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="John Doe"
                  className="input-glass w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="john@example.com"
                  className="input-glass w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Subject</label>
              <input
                required
                value={form.subject}
                onChange={set('subject')}
                placeholder="How can we help?"
                className="input-glass w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Message</label>
              <textarea
                required
                value={form.message}
                onChange={set('message')}
                placeholder="Tell us more..."
                rows={5}
                className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              id="contact-submit-btn"
              disabled={sending}
              className="btn-gradient w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
