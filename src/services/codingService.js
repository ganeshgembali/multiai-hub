// =============================================
// CODING SERVICE
// Paste your endpoints below when ready
// =============================================
import { apiCall } from './apiConfig';

const ENDPOINTS = {
  debugCode    : '/coding/debug',
  explainCode  : '/coding/explain',
  findBugs     : '/coding/find-bugs',
  sqlGenerator : '/coding/sql/generate',
};

export async function debugCode({ code, language = 'javascript', errorMessage = '' }) {
  return apiCall(ENDPOINTS.debugCode, { code, language, errorMessage });
}

export async function explainCode({ code, language = 'javascript', level = 'beginner' }) {
  return apiCall(ENDPOINTS.explainCode, { code, language, level });
}

export async function findBugs({ code, language = 'javascript' }) {
  return apiCall(ENDPOINTS.findBugs, { code, language });
}

export async function generateSqlQuery({ description, schema = '', dialect = 'postgresql' }) {
  return apiCall(ENDPOINTS.sqlGenerator, { description, schema, dialect });
}

// ---- Mock helpers ----
export function mockDebugResult() {
  return {
    fixed_code: `function add(a, b) {\n  return a + b;\n}`,
    issues: ['Missing return statement', 'Incorrect variable scope'],
    explanation: 'The original function was missing a return statement.',
  };
}
