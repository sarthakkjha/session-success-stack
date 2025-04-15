import axios from 'axios';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const getGroqResponse = async (
  chatHistory: { role: string; content: string }[]
): Promise<string> => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: chatHistory,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('❌ Groq API error:', error);

    if (error.response) {
      console.error('📛 Status:', error.response.status);
      console.error('📦 Error data:', JSON.stringify(error.response.data, null, 2));
    }

    return "Sorry, I'm having trouble responding right now.";
  }
}; 