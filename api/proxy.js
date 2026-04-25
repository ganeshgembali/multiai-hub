export const config = {
  maxDuration: 60
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const model = body.model;
    
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
    
    // Fallback to universal key if specific one isn't provided
    if (!apiKey) {
      apiKey = process.env.NVIDIA_API_KEY;
    }
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: `Missing environment variable for model: ${model}` }), { status: 500 });
    }

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
