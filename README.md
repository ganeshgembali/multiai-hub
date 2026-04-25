# 🚀 MultiAI Hub

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/ganeshgembali/multiai-hub)

A premium, state-of-the-art Web Application offering **20+ specialized AI Tools** designed to supercharge your career, coding workflow, studying, and productivity. Built with modern web technologies, beautiful glassmorphism UI, and lightning-fast AI models.

## âœ¨ Features
- **Career Tools**: Resume Analyzer, ATS Score Checker, Interview Question Generator, Cover Letter Writer.
- **Coding Tools**: Code Debugger, Code Explainer, Bug Finder, SQL Query Generator.
- **Study & Productivity Tools**: Notes Summarizer, Quiz Generator, Flashcard Maker, PDF Q&A, and more!
- **Writing & Marketing Tools**: Email Writer, Grammar Fixer, Blog Generator, Social Caption Generator.
- **Blazing Fast AI**: Uses specialized models (DeepSeek v3.2, Qwen3 Coder, Minimax m2.7) optimized perfectly for their respective tasks.
- **Stunning UI**: Animated UI elements with Framer Motion, immersive visual gradients, and real-time rotating progress indications.

## ðŸ› ï¸  Tech Stack
- **Frontend Framework:** React 18 & Vite
- **Styling:** Tailwind CSS (Vanilla CSS core + utility integration)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **API/AI Models:** NVIDIA NIM (DeepSeek, Qwen3, Minimax)

## ðŸ’» Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to `http://localhost:5173/` in your browser.

## ðŸŒ  Deployment Guide (Vercel)

The app handles cross-origin AI requests through an API proxy. To deploy successfully and maintain full functionality, **Vercel** is highly recommended as it natively supports the included `vercel.json` routing rules.

### Steps to Deploy on Vercel:
1. **Push your code to GitHub**: `https://github.com/ganeshgembali/multiai-hub.git`
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New -> Project**.
3. Import your repository.
4. Leave the default settings (Framework Preset: **Vite**).
5. Click **Deploy**.

Vercel will automatically read the `vercel.json` file in the root directory to route your `/nvidia-api` endpoints straight to the NVIDIA servers securely while avoiding CORS issues.

---

## 👤 Author

**Gembali Ganesh**
- **Email:** [gembaliganesh280@gmail.com](mailto:gembaliganesh280@gmail.com)
- **GitHub:** [ganeshgembali](https://github.com/ganeshgembali)
- **LinkedIn:** [Ganesh Gembali](https://www.linkedin.com/in/ganesh-gembali)

*Made with ❤️ by Gembali Ganesh*
