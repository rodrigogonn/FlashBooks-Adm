import '../../styles/global.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksService } from '../../services/books';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Book } from '../../types/book';

export const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await booksService.list();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bookToDelete) return;

    try {
      setDeleting(true);
      await booksService.delete(bookToDelete.id);
      await loadBooks();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    } finally {
      setDeleteModalOpen(false);
      setBookToDelete(null);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Carregando livros...</h2>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="page-header">
          <h1>Livros</h1>
          <button className="success" onClick={() => navigate('/books/new')}>
            Novo Livro
          </button>
        </div>

        <div className="book-grid">
          {books.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() =>
                navigate(`/books/${book.id}/edit`, { state: { book } })
              }>
              <img src={book.imageUrl} alt={book.title} />
              <h3>{book.title}</h3>
              <div className="author">{book.author}</div>
              <div className="chapters">{book.chapters.length} capítulos</div>
              <div className="actions">
                <button
                  className="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/books/${book.id}/edit`, { state: { book } });
                  }}>
                  Editar
                </button>
                <button
                  className="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBookToDelete(book);
                    setDeleteModalOpen(true);
                  }}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setBookToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir o livro "${bookToDelete?.title}"?`}
        loading={deleting}
      />
    </div>
  );
};
