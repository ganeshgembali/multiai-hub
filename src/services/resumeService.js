// =============================================
// RESUME / CAREER SERVICE
// Paste your endpoints below when ready
// =============================================
import { apiCall } from './apiConfig';

// ---- Endpoints (replace with real paths) ----
const ENDPOINTS = {
  analyzeResume : '/career/resume/analyze',
  atsScore      : '/career/resume/ats-score',
  interviewQs   : '/career/interview/questions',
  coverLetter   : '/career/cover-letter/generate',
};

/** Analyze a resume file */
export async function analyzeResume(file) {
  const form = new FormData();
  form.append('resume', file);
  return apiCall(ENDPOINTS.analyzeResume, form, true);
}

/** Get ATS compatibility score */
export async function getAtsScore(file, jobDescription = '') {
  const form = new FormData();
  form.append('resume', file);
  form.append('job_description', jobDescription);
  return apiCall(ENDPOINTS.atsScore, form, true);
}

/** Generate interview questions */
export async function generateInterviewQuestions({ role, level = 'mid', count = 10 }) {
  return apiCall(ENDPOINTS.interviewQs, { role, level, count });
}

/** Write a cover letter */
export async function writeCoverLetter({ resumeText, jobDescription, tone = 'professional' }) {
  return apiCall(ENDPOINTS.coverLetter, { resumeText, jobDescription, tone });
}

// ---- Mock helpers (used until endpoints provided) ----
export function mockResumeAnalysis() {
  return {
    score: 82,
    strengths: ['Strong technical skills section', 'Quantified achievements', 'Clear formatting'],
    improvements: ['Add more action verbs', 'Tailor keywords to job description', 'Include a summary section'],
    keywords: ['React', 'Node.js', 'REST API', 'Team Leadership'],
  };
}

export function mockAtsScore() {
  return { score: 74, matched: 18, total: 24, missing: ['TypeScript', 'CI/CD', 'Docker'] };
}
