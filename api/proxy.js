export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const model = body.model;
    
    // Default safety model key
    let apiKey = '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'; 
    
    if (model.includes('deepseek')) {
      apiKey = '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';
    } else if (model.includes('qwen')) {
      apiKey = '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';
    } else if (model.includes('minimax')) {
      apiKey = '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';
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
