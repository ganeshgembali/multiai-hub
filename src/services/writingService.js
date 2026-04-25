// =============================================
// WRITING SERVICE
// Paste your endpoints below when ready
// =============================================
import { apiCall } from './apiConfig';

const ENDPOINTS = {
  emailWriter    : '/writing/email/write',
  grammarFixer   : '/writing/grammar/fix',
  blogGenerator  : '/writing/blog/generate',
  captionGen     : '/writing/caption/generate',
};

export async function writeEmail({ purpose, tone = 'professional', recipient = '', details = '' }) {
  return apiCall(ENDPOINTS.emailWriter, { purpose, tone, recipient, details });
}

export async function fixGrammar({ text }) {
  return apiCall(ENDPOINTS.grammarFixer, { text });
}

export async function generateBlog({ topic, tone = 'informative', length = 'medium', keywords = [] }) {
  return apiCall(ENDPOINTS.blogGenerator, { topic, tone, length, keywords });
}

export async function generateCaption({ content, platform = 'instagram', tone = 'engaging' }) {
  return apiCall(ENDPOINTS.captionGen, { content, platform, tone });
}

// ---- Mock helpers ----
export function mockGrammarResult() {
  return {
    corrected: 'This is the corrected version of your text with all grammar mistakes fixed.',
    changes: 3,
    suggestions: ['Use active voice instead of passive', 'Simplify complex sentences'],
  };
}
