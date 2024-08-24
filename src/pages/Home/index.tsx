import '../../App.css';
import { useMemo, useState } from 'react';
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
  const imageUrl = useMemo(
    () => imageFile && URL.createObjectURL(imageFile),
    [imageFile]
  );

  const [validationError, setValidationError] = useState('');

  const handleJsonChange = (value: string | undefined) => {
    const input = value || '';
    setJsonInput(input);

    try {
      const parsedInput = JSON.parse(input);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      setImageFile(image);
    } else {
      setImageFile(undefined);
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
      <form onSubmit={handleSubmit}>
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
        <br />
        <label
          style={{
            cursor: 'pointer',
          }}>
          <img
            src={imageUrl ? imageUrl : 'https://via.placeholder.com/160x230'}
            alt="Book cover"
            style={{
              width: 'calc(160px * 1.5)',
              height: 'calc(230px * 1.5)',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <input
            hidden
            type="file"
            accept=".jpeg,.jpg,.png,.gif"
            onChange={handleImageChange}
          />
        </label>
        <br />
        <button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
