// =============================================
// PRODUCTIVITY SERVICE
// Paste your endpoints below when ready
// =============================================
import { apiCall } from './apiConfig';

const ENDPOINTS = {
  todoGenerator  : '/productivity/todo/generate',
  meetingNotes   : '/productivity/meeting/notes',
  dailyPlanner   : '/productivity/planner/generate',
  ideaGenerator  : '/productivity/ideas/brainstorm',
};

export async function generateTodo({ goal, timeframe = 'today', priority = 'high' }) {
  return apiCall(ENDPOINTS.todoGenerator, { goal, timeframe, priority });
}

export async function processMeetingNotes({ transcript, format = 'summary' }) {
  return apiCall(ENDPOINTS.meetingNotes, { transcript, format });
}

export async function generateDailyPlan({ goals, wakeTime = '07:00', sleepTime = '23:00', breaks = true }) {
  return apiCall(ENDPOINTS.dailyPlanner, { goals, wakeTime, sleepTime, breaks });
}

export async function generateIdeas({ topic, count = 10, type = 'creative' }) {
  return apiCall(ENDPOINTS.ideaGenerator, { topic, count, type });
}

// ---- Mock helpers ----
export function mockTodoResult() {
  return {
    tasks: [
      { time: '09:00', task: 'Review project requirements', priority: 'high' },
      { time: '10:30', task: 'Team standup meeting', priority: 'medium' },
      { time: '11:00', task: 'Code review for PR #42', priority: 'high' },
      { time: '14:00', task: 'Write unit tests', priority: 'medium' },
      { time: '16:00', task: 'Update documentation', priority: 'low' },
    ],
  };
}
