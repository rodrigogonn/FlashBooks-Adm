import { booksApi } from './api';

export const authService = {
  login: async (username: string, password: string) => {
    const response = await booksApi.post('/api/auth/admLogin', undefined, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    return response.data.token;
  },
};
