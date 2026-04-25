export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const model = body.model || '';

    let apiKey = '';

    if (model.includes('deepseek')) {
      apiKey = process.env.NVIDIA_DEEPSEEK_KEY;
    } else if (model.includes('qwen')) {
      apiKey = process.env.NVIDIA_QWEN_KEY;
    } else if (model.includes('minimax')) {
      apiKey = process.env.NVIDIA_MINIMAX_KEY;
    } else {
      apiKey = process.env.NVIDIA_SAFETY_KEY;
    }

    // Fallback to universal key
    if (!apiKey) {
      apiKey = process.env.NVIDIA_API_KEY;
    }

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: `Missing API key for model: ${model}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Force streaming off to avoid edge timeout issues
    const requestBody = { ...body, stream: false };

    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await nvidiaRes.json();

    if (!nvidiaRes.ok) {
      return new Response(JSON.stringify(data), {
        status: nvidiaRes.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return as a fake SSE chunk so the frontend stream parser works
    const content = data.choices?.[0]?.message?.content || '';
    const sseChunk = `data: ${JSON.stringify({
      choices: [{ delta: { content }, finish_reason: 'stop' }]
    })}\n\ndata: [DONE]\n\n`;

    return new Response(sseChunk, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
