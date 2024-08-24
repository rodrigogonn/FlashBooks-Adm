import './App.css';
import { useState } from 'react';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  const [token, setToken] = useState('');

  if (!token) {
    return <Login onFetchToken={setToken} />;
  }

  return <Home token={token} />;
}

export default App;
