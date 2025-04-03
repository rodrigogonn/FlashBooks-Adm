import '../../styles/global.css';
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { booksService } from '../../services/books';
import { Book, ContentType } from '../../types/book';
import { BookFormData } from '../../types/bookForm';
import { BookForm } from '../../components/BookForm';

export const BookFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const book = location.state?.book as Book | undefined;
  const [formData, setFormData] = useState<BookFormData>({
    title: book?.title || 'Título do Livro',
    author: book?.author || 'Nome do Autor',
    description:
      book?.description ||
      'Descrição do livro que será exibida na página inicial.',
    image: null,
    imageUrl: book?.imageUrl || '',
    chapters: book?.chapters || [
      {
        title: 'Capítulo 1',
        content: [
          {
            type: ContentType.PARAGRAPH,
            text: 'Este é o primeiro parágrafo do primeiro capítulo. Aqui você pode começar a escrever o conteúdo do seu livro.',
          },
        ],
      },
    ],
    categoryIds: book?.categoryIds || [1],
    purchaseLink: book?.purchaseLink || '',
  });

  const handleSubmit = async (data: BookFormData) => {
    if (!data.image && !id) {
      alert('Por favor, selecione uma imagem para o livro');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (id) {
        await booksService.update(id, data);
      } else {
        await booksService.create(data);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
      setError(
        'Ocorreu um erro ao salvar o livro. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Carregando...</h2>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="page-header">
          <button className="secondary" onClick={() => navigate('/')}>
            Voltar
          </button>
          <h1>{id ? 'Editar Livro' : 'Novo Livro'}</h1>
          <div style={{ width: '80px' }}></div>
        </div>

        <BookForm
          formData={formData}
          onSubmit={handleSubmit}
          onImageChange={handleImageChange}
          loading={loading}
          isEdit={!!id}
          error={error}
        />
      </header>
    </div>
  );
};
