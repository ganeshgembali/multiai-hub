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

    // Force use of the universal key, but fallback to any available key just in case they named it differently in Vercel
    let apiKey = process.env.NVIDIA_API_KEY || 
                 process.env.NVIDIA_SAFETY_KEY || 
                 process.env.NVIDIA_DEEPSEEK_KEY || 
                 process.env.NVIDIA_QWEN_KEY || 
                 process.env.NVIDIA_MINIMAX_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: `Missing API key for model: ${model}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Force streaming ON to bypass the 25-second limit
    const requestBody = { ...body, stream: true };

    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!nvidiaRes.ok) {
      const errorData = await nvidiaRes.text();
      return new Response(errorData, {
        status: nvidiaRes.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Pipe the stream directly to the client
    return new Response(nvidiaRes.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
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
