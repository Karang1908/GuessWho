import { ChatMessage } from "../types";

export interface ChatSession {
    systemPrompt: string;
    history: ChatMessage[];
}

const OLLAMA_URL = "http://localhost:11434/api/chat";
//const OLLAMA_URL = "http://10.30.77.124:11434/api/chat";
const DEFAULT_MODEL = "gemini-3-flash-preview:latest"; // User can change this to their preferred model

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
 * Handles variations, nicknames, and aliases.
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

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: [
                    { role: 'user', content: prompt }
                ],
                stream: false,
                options: {
                    temperature: 0.1
                }
            })
        });

        const data = await response.json();
        const text = data.message?.content || "";
        return text.trim().toUpperCase().includes('YES');
    } catch (error) {
        console.error("Error verifying guess with Ollama:", error);
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

        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: DEFAULT_MODEL,
                messages: messages,
                stream: false,
                options: {
                    temperature: 0.9
                }
            })
        });

        const data = await response.json();
        const responseText = data.message?.content || "I'm having trouble thinking of a response right now.";

        // Update history with model response
        session.history.push({ role: 'model', text: responseText });

        return responseText;
    } catch (error) {
        console.error("Error sending message to Ollama:", error);
        return "Something went wrong with the connection. Make sure Ollama is running locally.";
    }
};
