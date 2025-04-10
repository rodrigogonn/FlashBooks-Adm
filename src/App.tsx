import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { Home } from './pages/Home';
import { BookFormPage } from './pages/BookForm';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/new"
          element={
            <PrivateRoute>
              <BookFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:id/edit"
          element={
            <PrivateRoute>
              <BookFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
