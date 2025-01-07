import { config } from '../config';

export interface Message {
  id: string,
  contextId: string;
  message: string;
  timestamp: number;
  userName: string;
  remainingRequests?: number;
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
      body: JSON.stringify({ "message": message, "context_id": contextId }),
    });

    if (response.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      throw { message: 'Session expired. Please login again.', status: 401 };
    }

    if (response.status === 429) {
      throw { message: 'Rate limit exceeded. Please try again later.', status: 429 };
    }

    if (!response.ok) {
      throw { message: 'Failed to send message', status: response.status };
    }

    const responseData = await response.json();
    const remainingRequests = responseData.quota?.remaining_requests;

    sessionStorage.setItem('contextId', responseData.context_id);
    sessionStorage.setItem('remainingRequests', remainingRequests.toString());

    return {
      ...responseData,
      id: crypto.randomUUID(),
      message: responseData.response,
      userName: 'LLM (llama3.2)',
      timestamp: Date.now(),
      remainingRequests
    };
  }
}; 