import { config } from '../config';

export interface Message {
  id: string,
  contextId: string;
  message: string;
  timestamp: number;
  userName: string;
}

export const chatService = {
  sendMessage: async (message: string, token: string): Promise<Message> => {
    const contextId = sessionStorage.getItem('contextId') || '';

    const response = await fetch(`${config.API_URL}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ "message": message, "contextId": contextId }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const responseData = await response.json();

    sessionStorage.setItem('contextId', responseData.contextId);

    return {
      ...responseData,
      message: responseData.response,
      userName: 'LLM (llama3.2)',
      timestamp: Date.now(),
    };
  }
}; 