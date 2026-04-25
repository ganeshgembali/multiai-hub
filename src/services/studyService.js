// =============================================
// STUDY SERVICE
// Paste your endpoints below when ready
// =============================================
import { apiCall } from './apiConfig';

const ENDPOINTS = {
  summarizeNotes  : '/study/notes/summarize',
  quizGenerator   : '/study/quiz/generate',
  flashcardMaker  : '/study/flashcards/create',
  pdfQA           : '/study/pdf/qa',
};

export async function summarizeNotes({ text, style = 'bullet', length = 'concise' }) {
  return apiCall(ENDPOINTS.summarizeNotes, { text, style, length });
}

export async function generateQuiz({ topic, count = 10, difficulty = 'medium', type = 'mcq' }) {
  return apiCall(ENDPOINTS.quizGenerator, { topic, count, difficulty, type });
}

export async function createFlashcards({ text, count = 10 }) {
  return apiCall(ENDPOINTS.flashcardMaker, { text, count });
}

export async function pdfQA({ question, pdfFile }) {
  const form = new FormData();
  form.append('question', question);
  form.append('pdf', pdfFile);
  return apiCall(ENDPOINTS.pdfQA, form, true);
}

// ---- Mock helpers ----
export function mockQuizResult() {
  return {
    questions: [
      { question: 'What is React?', options: ['A library', 'A framework', 'A language', 'A database'], answer: 0 },
      { question: 'What hook manages state?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
    ],
  };
}
