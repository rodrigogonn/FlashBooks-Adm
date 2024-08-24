import '../../App.css';
import { useState } from 'react';
import axios from 'axios';
import { env } from '../../environment';

interface LoginProps {
  onFetchToken: (token: string) => void;
}

export const Login = ({ onFetchToken }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await axios.post(
            `${env.API_URL}/api/auth/admLogin`,
            undefined,
            {
              headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
              },
            }
          );

          onFetchToken(response.data.token);
        }}>
        <label>username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
        <label>password</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
        <button>Enter</button>
      </form>
    </div>
  );
};
