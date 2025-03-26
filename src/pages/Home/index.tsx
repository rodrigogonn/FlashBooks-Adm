import '../../App.css';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import Editor from '@monaco-editor/react';
import { Book, bookValidation } from '../../utils/bookValidation';
import axios from 'axios';
import { env } from '../../environment';

interface HomeProps {
  token: string;
}

export const Home = ({ token }: HomeProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Book) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);
      formData.append('image', data.image);
      formData.append('chapters', JSON.stringify(data.chapters));
      if (data.categoryIds) {
        formData.append('categoryIds', JSON.stringify(data.categoryIds));
      }
      if (data.purchaseLink) {
        formData.append('purchaseLink', data.purchaseLink);
      }

      await axios.post(`${env.API_URL}/api/books`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Book submitted successfully!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <JsonInputForm onSubmit={handleSubmit} loading={loading} />
      </header>
    </div>
  );
};

interface JsonInputFormProps {
  onSubmit: (data: Book) => void;
  loading: boolean;
}

const JsonInputForm = ({ onSubmit, loading }: JsonInputFormProps) => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        title: 'Título',
        author: 'Autor',
        description: 'Descrição',
        chapters: [
          {
            title: 'Nome do capítulo',
            content: [
              {
                type: 'PARAGRAPH',
                text: 'Texto do parágrafo',
              },
            ],
          },
        ],
        categoryIds: [],
        purchaseLink: 'example.com',
      } as Omit<Book, 'image'>,
      null,
      2
    )
  );
  const [imageFile, setImageFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const imageUrl = useMemo(
    () => imageFile && URL.createObjectURL(imageFile),
    [imageFile]
  );

  const [validationError, setValidationError] = useState('');

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const image = files[0];
      if (image.type.startsWith('image/')) {
        setImageFile(image);
      } else {
        setValidationError('Por favor, selecione apenas arquivos de imagem.');
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      setImageFile(image);
    } else {
      setImageFile(undefined);
    }
  };

  const handleJsonChange = (value: string | undefined) => {
    const input = value || '';
    setJsonInput(input);
  };

  useEffect(() => {
    validateJson(jsonInput);
  }, [jsonInput, imageFile]);

  const validateJson = (json: string) => {
    try {
      const parsedInput = JSON.parse(json);
      const validatedData = bookValidation
        .omit({
          image: true,
        })
        .safeParse(parsedInput);

      if (!validatedData.success) {
        setValidationError(
          validatedData.error.issues
            .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
            .join('. ')
        );
        return;
      }

      setValidationError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors.map((err) => err.message).join(', '));
      } else {
        setValidationError((error as Error).message);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!imageFile) {
        throw new Error('Image file is required.');
      }

      bookValidation.pick({ image: true }).parse({ image: imageFile });

      const parsedInput = JSON.parse(jsonInput);
      const validatedData = bookValidation.safeParse({
        ...parsedInput,
        image: imageFile,
      });

      if (!validatedData.success) {
        setValidationError(
          validatedData.error.issues
            .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
            .join('. ')
        );
        return;
      }

      onSubmit(validatedData.data);
      setValidationError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors.map((err) => err.message).join(', '));
      } else {
        setValidationError((error as Error).message);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
        <Editor
          defaultLanguage="json"
          defaultValue={jsonInput}
          theme="vs-dark"
          onChange={handleJsonChange}
          height={400}
          width={800}
        />
        {validationError && (
          <p style={{ color: 'red', maxWidth: '800px' }}>{validationError}</p>
        )}

        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            cursor: 'pointer',
            border: isDragging ? '2px dashed #4CAF50' : '2px dashed #ccc',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            width: 'fit-content',
            backgroundColor: isDragging
              ? 'rgba(76, 175, 80, 0.1)'
              : 'transparent',
            transition: 'all 0.3s ease',
            display: 'block',
          }}>
          <img
            src={imageUrl ? imageUrl : 'https://placehold.co/160x230'}
            alt="Book cover"
            style={{
              width: 'calc(160px * 1.5)',
              height: 'calc(230px * 1.5)',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <p
            style={{
              marginTop: '10px',
              color: '#666',
              margin: 0,
              fontSize: 24,
            }}>
            Arraste uma imagem aqui ou clique para selecionar
          </p>
          <input
            hidden
            type="file"
            accept=".jpeg,.jpg,.png,.gif,.webp"
            onChange={handleImageChange}
          />
        </label>
        <button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
