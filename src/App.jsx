import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar    from './components/Navbar';
import Footer    from './components/Footer';

import LandingPage        from './pages/LandingPage';
import ToolsPage          from './pages/ToolsPage';
import ToolWorkspacePage  from './pages/ToolWorkspacePage';
import PricingPage        from './pages/PricingPage';
import AboutPage          from './pages/AboutPage';
import ContactPage        from './pages/ContactPage';

// Page transition wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/"              element={<LandingPage />} />
          <Route path="/tools"         element={<ToolsPage />} />
          <Route path="/tools/:toolId" element={<ToolWorkspacePage />} />
          <Route path="/pricing"       element={<PricingPage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/contact"       element={<ContactPage />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center px-4">
              <div>
                <p className="text-7xl mb-4">🚀</p>
                <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
                <p className="text-slate-500 mb-6">Looks like this page doesn't exist yet.</p>
                <a href="/" className="btn-gradient inline-block text-white font-semibold px-6 py-3 rounded-xl">
                  Back to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#070711] text-white">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 15, 30, 0.95)',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#a78bfa', secondary: '#070711' } },
          }}
        />
      </div>
    </BrowserRouter>
  );
}
