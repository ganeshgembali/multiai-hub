// =============================================
// BASE API CONFIGURATION
// Replace BASE_URL with your actual API endpoint
// =============================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api.example.com';
const API_KEY  = import.meta.env.VITE_API_KEY || '';

/**
 * Generic API caller — all service files use this helper.
 * @param {string} endpoint - API route path (e.g. '/resume/analyze')
 * @param {object} body     - JSON body or FormData
 * @param {boolean} isForm  - pass true when sending FormData
 */
export async function apiCall(endpoint, body = {}, isForm = false) {
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
  };

  if (!isForm) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: isForm ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export { BASE_URL, API_KEY };
