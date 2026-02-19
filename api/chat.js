export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, model, temperature } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error('SERVER ERROR: GROQ_API_KEY is missing');
        return res.status(500).json({
            error: 'GROQ_API_KEY is not configured on the server.',
            details: 'Please add GROQ_API_KEY in the Vercel Project Settings > Environment Variables.'
        });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model || 'openai/gpt-oss-120b',
                messages: messages,
                temperature: temperature ?? 0.7,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API Error:', data);
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('API Proxy Error:', error);
        return res.status(500).json({ error: 'Failed to communicate with AI provider' });
    }
}
