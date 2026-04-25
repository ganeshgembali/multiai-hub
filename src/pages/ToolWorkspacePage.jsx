import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Trash2, Upload, Loader2, Sparkles, Check } from 'lucide-react';
import { getToolById } from '../data/tools';
import toast from 'react-hot-toast';

const loadingMessages = {
  'resume-analyzer': ['Uploading resume...', 'Scanning structure...', 'Checking ATS keywords...', 'Evaluating strengths...', 'Preparing report...'],
  'ats-score': ['Reading resume...', 'Matching ATS rules...', 'Calculating score...', 'Finalizing suggestions...'],
  'interview-generator': ['Understanding job role...', 'Creating questions...', 'Balancing difficulty levels...', 'Finalizing interview set...'],
  'cover-letter': ['Understanding profile...', 'Matching job role...', 'Writing professional letter...', 'Polishing final draft...'],
  'code-debugger': ['Reading code...', 'Detecting bugs...', 'Fixing issues...', 'Preparing clean solution...'],
  'code-explainer': ['Understanding logic...', 'Breaking code into steps...', 'Simplifying explanation...', 'Finalizing response...'],
  'bug-finder': ['Scanning syntax...', 'Checking logic...', 'Detecting risky lines...', 'Preparing report...'],
  'sql-generator': ['Reading requirement...', 'Building query...', 'Optimizing syntax...', 'Finalizing SQL...'],
  'notes-summarizer': ['Reading notes...', 'Extracting key points...', 'Creating summary...', 'Finalizing notes...'],
  'quiz-generator': ['Understanding content...', 'Generating questions...', 'Creating answers...', 'Finalizing quiz...'],
  'flashcard-maker': ['Reading content...', 'Extracting concepts...', 'Building flashcards...', 'Finalizing set...'],
  'pdf-qa': ['Reading document...', 'Searching relevant pages...', 'Finding answer...', 'Preparing response...'],
  'email-writer': ['Understanding request...', 'Drafting email...', 'Improving tone...', 'Finalizing email...'],
  'grammar-fixer': ['Reading text...', 'Fixing grammar...', 'Improving clarity...', 'Finalizing version...'],
  'blog-generator': ['Researching topic...', 'Creating structure...', 'Writing blog...', 'Polishing final content...'],
  'social-caption': ['Understanding topic...', 'Generating captions...', 'Adding hashtags...', 'Finalizing options...'],
  'todo-generator': ['Understanding goal...', 'Breaking tasks...', 'Prioritizing steps...', 'Finalizing checklist...'],
  'meeting-notes': ['Reading transcript...', 'Extracting decisions...', 'Finding action items...', 'Finalizing notes...'],
  'daily-planner': ['Understanding routine...', 'Organizing schedule...', 'Balancing priorities...', 'Finalizing planner...'],
  'idea-generator': ['Understanding topic...', 'Brainstorming ideas...', 'Refining best options...', 'Finalizing list...'],
  'fallback': ['Working on it...', 'Almost ready...', 'Final touches...', 'Just a moment...', 'Done! Preparing output...']
};

// Fallback output generator for unknown tools
function getMockOutput(tool) {
  return `## ${tool.title} â€” Offline\n\nPlease connect the API endpoint to see real results.\n\n### Tool Description:\n${tool.description}`;
}

export default function ToolWorkspacePage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = getToolById(toolId);

  const [input, setInput]       = useState('');
  const [output, setOutput]     = useState('');
  const [reasoning, setReasoning] = useState('');
  const [loading, setLoading]   = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [file, setFile]         = useState(null);
  const [copied, setCopied]     = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingMessageIndex(0);
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => prev + 1);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">ðŸ¤–</p>
          <h2 className="text-white text-2xl font-bold mb-2">Tool Not Found</h2>
          <button onClick={() => navigate('/tools')} className="btn-gradient text-white px-6 py-3 rounded-xl mt-4">
            Back to Tools
          </button>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input.trim() && !file) {
      toast.error('Please provide some input first.');
      return;
    }
    setLoading(true);
    setOutput('');
    setReasoning('');

    // Read file content if a file was uploaded
    let fileContent = '';
    if (file) {
      try {
        fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      } catch {
        toast.error('Could not read the uploaded file. Please paste the text manually.');
        setLoading(false);
        return;
      }
    }

    // Combine file content + textarea input
    const combinedInput = [fileContent.trim(), input.trim()].filter(Boolean).join('\n\n');

    const targetTools = ['resume-analyzer', 'interview-generator'];
    const codingTools = ['code-debugger', 'code-explainer', 'bug-finder', 'sql-generator'];
    const studyProdTools = ['notes-summarizer', 'quiz-generator', 'flashcard-maker', 'meeting-notes', 'daily-planner'];
    const writingTools = ['cover-letter', 'email-writer', 'grammar-fixer', 'blog-generator', 'social-caption'];

    if (targetTools.includes(tool.id) || codingTools.includes(tool.id) || studyProdTools.includes(tool.id) || writingTools.includes(tool.id) || tool.id === 'todo-generator' || tool.id === 'idea-generator' || tool.id === 'ats-score' || tool.id === 'pdf-qa') {

      try {
        // --- 1. Safety Filter Check ---
        try {
          const safetyResponse = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: "meta/llama-guard-3-8b",
              messages: [{ role: "user", content: input }]
            })
          });

          if (safetyResponse.ok) {
            const safetyData = await safetyResponse.json();
            const checkResult = safetyData.choices?.[0]?.message?.content?.trim() || "";
            if (checkResult.toLowerCase().startsWith('unsafe')) {
              toast.error('Input flagged by Safety Filter. Please modify your text.');
              setLoading(false);
              return;
            }
          } else {
            console.warn("Safety endpoint check failed or expired (Status: " + safetyResponse.status + "). Bypassing filter.");
          }
        } catch (safetyError) {
          console.warn("Safety check unreachable:", safetyError, "Bypassing filter.");
        }
        // --- End Safety Filter Check ---

        let prompt = '';
        let model = '';
        let reqBody = {};

        if (targetTools.includes(tool.id)) {
          model = 'minimaxai/minimax-m2.7';
          if (tool.id === 'resume-analyzer') {
            prompt = `Analyze this resume professionally.

Return only in this format:

ATS Score: /100

## Strengths:

## Weaknesses:

## Missing Keywords:

## Improvements:

Final Verdict:
${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;

          } else if (tool.id === 'interview-generator') {
            prompt = `Generate 10 interview questions based on this job role or resume.

Return:
Easy:
Medium:
Advanced:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          }
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.15,
            top_p: 1.00,
            max_tokens: 2048,
            stream: true
          };
        } else if (codingTools.includes(tool.id)) {
          model = 'minimaxai/minimax-m2.7';
          if (tool.id === 'code-debugger') {
            prompt = `Find bugs in this code.

Return:
Issues:
Fixed Code:
Explanation:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'code-explainer') {
            prompt = `Explain this code in simple beginner-friendly language.

Return:
Purpose:
How it works:
Important lines:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'bug-finder') {
            prompt = `Detect logical, syntax, and runtime issues in this code.

Return bullet points only.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'sql-generator') {
            prompt = `Generate the best SQL query for this request.

Return:
SQL Query:
Explanation:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          }
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            top_p: 0.8,
            max_tokens: 4096,
            stream: true
          };
        } else if (studyProdTools.includes(tool.id)) {
          model = 'minimaxai/minimax-m2.7';
          if (tool.id === 'notes-summarizer') {
            prompt = `Summarize these notes clearly.

Return:
Main Points:
------------

Short Summary:
${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'quiz-generator') {
            prompt = `Create 10 MCQ questions with answers from this content.

Return:
Q1.
A)
B)
C)
D)
Answer:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'flashcard-maker') {
            prompt = `Convert this content into flashcards.

Return:
Q:
A:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'meeting-notes') {
            prompt = `Convert this meeting transcript into clean notes.

Return:
Summary:
Action Items:
Deadlines:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'daily-planner') {
            prompt = `Create a practical daily schedule based on this routine.

Return hourly plan.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          }
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.15,
            top_p: 1.00,
            max_tokens: 2048,
            stream: true
          };
        } else if (writingTools.includes(tool.id)) {
          model = 'minimaxai/minimax-m2.7';
          if (tool.id === 'cover-letter') {
            prompt = `Write a professional cover letter based on this job role and profile.

Keep concise and polished.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'email-writer') {
            prompt = `Write a professional email for this request.

Return:
Subject:
Email Body:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'grammar-fixer') {
            prompt = `Correct grammar and improve clarity.

Return only corrected text.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'blog-generator') {
            prompt = `Write a professional blog post.

Return:
Title:
Intro:
Main Content:
Conclusion:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          } else if (tool.id === 'social-caption') {
            prompt = `Generate 5 catchy social media captions with hashtags.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          }
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.15,
            top_p: 1.00,
            frequency_penalty: 0.00,
            presence_penalty: 0.00,
            max_tokens: 2048,
            stream: true
          };
        } else if (tool.id === 'todo-generator') {
          model = 'minimaxai/minimax-m2.7';
          prompt = `Create a productive to-do list based on this goal.

Return checklist format.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 1,
            top_p: 0.95,
            max_tokens: 8192,
            stream: true
          };
        } else if (tool.id === 'idea-generator') {
          model = 'minimaxai/minimax-m2.7';
          prompt = `Generate 10 creative ideas based on this topic.

Return numbered list with short explanation.

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6,
            top_p: 0.9,
            max_tokens: 4096,
            stream: true
          };
        } else if (tool.id === 'ats-score') {
          model = 'minimaxai/minimax-m2.7';
          prompt = `Evaluate this resume for ATS compatibility.

Return:
ATS Score: /100
Issues:
-------

## Fixes:

${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.15,
            top_p: 1.00,
            max_tokens: 2048,
            stream: true
          };
        } else if (tool.id === 'pdf-qa') {
          model = 'minimaxai/minimax-m2.7';
          prompt = `Answer the question based only on the provided PDF content.

If not found, say "Not found in document."

Question:
${combinedInput}

Return only the final answer for the user.

Strict rules:
* Do NOT show thinking process
* Do NOT show internal reasoning
* Do NOT show analysis steps
* Do NOT mention assumptions
* Do NOT include phrases like:
  ""I think""
  ""Let's begin""
  ""We are analyzing""
  ""AI thinking process""

Formatting rules:
* Highlight important headings in bold
* Use bullet points where helpful
* Keep output clean, modern, and easy to read
* Keep concise unless user asks detailed output
* Final answer must look ready for production UI`;
          reqBody = {
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            top_p: 0.95,
            max_tokens: 4096,
            stream: true
          };
        }

        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        });

        if (!response.ok) {
          let errorMsg = response.statusText;
          try {
            const errData = await response.json();
            if (errData.detail) errorMsg = errData.detail;
          } catch(e) {}
          throw new Error(`${response.status} ${errorMsg}`);
        }

        setLoading(false); // Stop spinner, start streaming text
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        readLoop: while (true) {
          const { done, value } = await reader.read();
          if (done) break readLoop;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Keep the last line in the buffer in case it's incomplete
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine.startsWith('data: ')) continue;
            if (trimmedLine === 'data: [DONE]') break readLoop;
            
            try {
              const parsed = JSON.parse(trimmedLine.substring(6));
              const delta = parsed.choices[0]?.delta;
              if (delta) {
                if (delta.reasoning_content) {
                  setReasoning(prev => prev + delta.reasoning_content);
                }
                if (delta.content) {
                  setOutput(prev => prev + delta.content);
                }
              }
            } catch (e) {
              // Ignore partial JSON parse errors
            }
          }
        }
        toast.success('Response completed!');
      } catch (error) {
        console.error("Full Error Output:", error);
        toast.error(`Error: ${error.message}`);
        setLoading(false);
      }
    } else {
      // Mock flow for other tools
      await new Promise((r) => setTimeout(r, 2000));
      setOutput(getMockOutput(tool));
      setLoading(false);
      toast.success('Output generated!');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setReasoning('');
    setFile(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/tools')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </motion.button>

        {/* Tool Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 mb-6 flex items-center gap-4"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
            {tool.icon}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{tool.title}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{tool.description}</p>
          </div>
          {tool.badge && (
            <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 shrink-0">
              {tool.badge}
            </span>
          )}
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 mb-6"
        >
          <label className="block text-sm font-medium text-slate-300 mb-3">
            {tool.inputLabel}
          </label>
          <textarea
            id="tool-input-area"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder}
            rows={7}
            className="input-glass w-full rounded-xl p-4 text-sm resize-none font-mono leading-relaxed"
          />

          {/* File Upload */}
          {tool.acceptsFile && (
            <div className="mt-4">
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-all border border-dashed border-white/15 w-full justify-center"
              >
                <Upload className="w-4 h-4" />
                {file ? `ðŸ“Ž ${file.name}` : 'Upload PDF / DOCX (optional)'}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-5">
            <button
              id="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
              className="btn-gradient flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl flex-1 sm:flex-none justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate</>
              )}
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-3 rounded-xl glass text-sm text-slate-400 hover:text-white transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (() => {
          const messages = loadingMessages[tool?.id] || loadingMessages.fallback;
          const currentMessage = messages[Math.min(loadingMessageIndex, messages.length - 1)];
          const progressPercent = Math.min(((loadingMessageIndex + 1) / messages.length) * 100, 95);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl p-8 mb-6 flex flex-col items-center justify-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
              
              <div className="w-full max-w-md text-center">
                <div className="h-8 mb-2 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentMessage}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-300 font-medium text-sm"
                    >
                      {currentMessage}
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Output Section */}
        {output && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                {tool.outputLabel}
              </h2>
              {output && (
                <button
                  id="copy-output-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-slate-400 hover:text-white transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>



            {output && (
              <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {output}
                </pre>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty Output State */}
        {!output && !loading && (
          <div className="glass rounded-3xl p-10 text-center border border-dashed border-white/10">
            <div className="text-4xl mb-3">âœ¨</div>
            <p className="text-slate-500 text-sm">Your AI-generated output will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

