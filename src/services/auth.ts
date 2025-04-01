import axios from 'axios';
import { env } from '../environment';

export const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post(
      `${env.API_URL}/api/auth/admLogin`,
      undefined,
      {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      }
    );

    return response.data.token;
  },
};
