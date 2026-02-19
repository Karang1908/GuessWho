import { ChatMessage } from "../types";

export interface ChatSession {
    systemPrompt: string;
    history: ChatMessage[];
}

const API_URL = "/api/chat";
const DEFAULT_MODEL = "openai/gpt-oss-120b";
const GROQ_DIRECT_URL = "https://api.groq.com/openai/v1/chat/completions";

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const localApiKey = import.meta.env.VITE_GROQ_API_KEY;

/**
 * Starts a new chat session with a specific system prompt.
 * @param systemPrompt The persona instructions for the AI.
 * @returns A new ChatSession object.
 */
export const startChatSession = (systemPrompt: string): ChatSession => {
    return {
        systemPrompt,
        history: []
    };
};

/**
 * Uses AI to verify if a user's guess matches the target character name.
 * @param characterName The true name of the character.
 * @param guess The user's guess.
 * @returns Boolean indicating if the guess is correct.
 */
export const verifyGuess = async (characterName: string, guess: string): Promise<boolean> => {
    try {
        const prompt = `Task: Determine if the following guess matches the character identity.
Character Name: ${characterName}
User's Guess: ${guess}

Rules:
1. Return ONLY "YES" if the guess is correct (including nicknames, aliases, or close variations).
2. Return ONLY "NO" if it is incorrect.
3. Be generous with common names/aliases (e.g., "Tony" for "Tony Stark", "Iron Man" for "Tony Stark").

Response:`;

        let response;

        if (isLocal && localApiKey) {
            // Call Groq directly during local development
            response = await fetch(GROQ_DIRECT_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: DEFAULT_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1
                })
            });
        } else {
            // Use Vercel API proxy in production
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: DEFAULT_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1
                })
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${response.status}):`, errorText);
            throw new Error(`AI service returned ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "";
        return text.trim().toUpperCase().includes('YES');
    } catch (error) {
        console.error("Error verifying guess with AI:", error);
        // Fallback to simple includes matching if AI fails
        const normalizedName = characterName.toLowerCase();
        const normalizedGuess = guess.toLowerCase();
        return normalizedName.includes(normalizedGuess) || normalizedGuess.includes(normalizedName);
    }
};

/**
 * Sends a message to the existing chat session.
 * @param session The active ChatSession object.
 * @param message The user's message.
 * @returns The AI's text response.
 */
export const sendMessageToChat = async (session: ChatSession, message: string): Promise<string> => {
    try {
        // Update history with user message
        session.history.push({ role: 'user', text: message });

        const messages = [
            { role: 'system', content: session.systemPrompt },
            ...session.history.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.text
            }))
        ];

        let response;

        if (isLocal && localApiKey) {
            // Call Groq directly during local development
            response = await fetch(GROQ_DIRECT_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: DEFAULT_MODEL,
                    messages: messages,
                    temperature: 0.7
                })
            });
        } else {
            // Use Vercel API proxy in production
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: DEFAULT_MODEL,
                    messages: messages,
                    temperature: 0.7
                })
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${response.status}):`, errorText);
            return `AI Connection Error (${response.status}). If you are running locally, ensure VITE_GROQ_API_KEY is in your .env.`;
        }

        const data = await response.json();
        const responseText = data.choices?.[0]?.message?.content || "I'm having trouble thinking of a response right now.";

        // Update history with model response
        session.history.push({ role: 'model', text: responseText });

        return responseText;
    } catch (error) {
        console.error("Error sending message to AI:", error);
        return "Connection failed. Please check your internet and console for errors.";
    }
};
