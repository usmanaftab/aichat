// filepath: /Users/usmanaftab/Workspace/my-rag-app/my-app/src/services/userService.ts
import { config } from '../config';

export const userService = {
  async deleteUser() {
    const response = await fetch(`${config.API_URL}/users/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user');
    }

    return response.json();
  },

  async getUser(token: string) {
    const response = await fetch(`${config.API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user profile');
    }

    return await response.json();
  },
};