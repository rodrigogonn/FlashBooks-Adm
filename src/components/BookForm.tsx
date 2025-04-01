import { useState, useMemo, useEffect } from 'react';
import { Book } from '../types/book';
import { BookPreview } from './BookPreview';
import { BookFormData } from '../types/bookForm';
import { Editor } from '@monaco-editor/react';
import { bookValidation } from '../utils/bookValidation';
import { pdfExtractorService } from '../services/pdfExtractor';
import '../styles/BookForm.css';

interface BookFormProps {
  formData: BookFormData;
  onSubmit: (data: BookFormData) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  isEdit?: boolean;
  error?: string | null;
}

export function BookForm({
  formData,
  onSubmit,
  onImageChange,
  loading = false,
  isEdit = false,
  error = null,
}: BookFormProps) {
  const [purchaseLink, setPurchaseLink] = useState(formData.purchaseLink || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfExtracting, setPdfExtracting] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        chapters: formData.chapters,
        categoryIds: formData.categoryIds,
      },
      null,
      2
    )
  );
  const [validationError, setValidationError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const imageUrl = useMemo(
    () => formData.image && URL.createObjectURL(formData.image),
    [formData.image]
  );

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file.type.startsWith('image/')) {
        const event = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onImageChange(event);
      }
    }
  };

  const handleJsonChange = (value: string | undefined) => {
    const input = value || '';
    setJsonInput(input);
    validateFormData(input, purchaseLink);
  };

  const validateFormData = (json: string, link: string) => {
    const errors: Record<string, string> = {};

    try {
      const parsedInput = JSON.parse(json);
      const validationResult = bookValidation.safeParse({
        ...parsedInput,
        image:
          formData.image ||
          new File([], 'placeholder.jpg', { type: 'image/jpeg' }),
        purchaseLink: link || undefined,
      });

      if (!validationResult.success) {
        validationResult.error.errors.forEach((error) => {
          const path = error.path.join('.');
          errors[path] = error.message;
        });
      }
    } catch (error) {
      errors.json = 'JSON inválido';
    }

    setFormErrors(errors);
    setValidationError(errors.json || '');
  };

  useEffect(() => {
    validateFormData(jsonInput, purchaseLink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseLink, imageUrl, jsonInput]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.image && !isEdit) {
      setFormErrors((prev) => ({
        ...prev,
        image: 'Por favor, selecione uma imagem para o livro',
      }));
      return;
    }

    try {
      const parsedInput = JSON.parse(jsonInput);
      const validationResult = bookValidation.safeParse({
        ...parsedInput,
        image: formData.image || undefined,
        purchaseLink: purchaseLink || undefined,
      });

      if (!validationResult.success) {
        const errors: Record<string, string> = {};
        validationResult.error.errors.forEach((error) => {
          const path = error.path.join('.');
          errors[path] = error.message;
        });
        setFormErrors(errors);
        return;
      }

      onSubmit({
        ...parsedInput,
        image: formData.image || undefined,
        purchaseLink,
      });
      setValidationError('');
      setFormErrors({});
    } catch (error) {
      setValidationError('JSON inválido');
      setFormErrors({ json: 'JSON inválido' });
    }
  };

  let bookPreview: Book | undefined;
  try {
    const parsedInput = JSON.parse(jsonInput);
    bookPreview = {
      id: 'preview',
      title: parsedInput.title || '',
      author: parsedInput.author || '',
      description: parsedInput.description || '',
      imageUrl: imageUrl || formData.imageUrl || 'https://placehold.co/160x230',
      chapters: parsedInput.chapters || [],
      categoryIds: parsedInput.categoryIds || [],
      purchaseLink: purchaseLink,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    // Ignora erro de parsing do JSON
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const input = document.getElementById('image-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    onImageChange({
      target: {
        files: null,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePdfDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPdf(true);
  };

  const handlePdfDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPdf(false);
  };

  const handlePdfDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPdf(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file.type === 'application/pdf') {
        setSelectedPdf(file);
      }
    }
  };

  const handlePdfFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
    }
  };

  const handlePdfExtraction = async () => {
    if (!selectedPdf) return;

    setPdfExtracting(true);
    setPdfError(null);
    try {
      const bookData = await pdfExtractorService.extractBookData(selectedPdf);
      const jsonString = JSON.stringify(
        {
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          chapters: bookData.chapters,
          categoryIds: bookData.categoryIds,
        },
        null,
        2
      );
      setJsonInput(jsonString);
    } catch (error) {
      console.error('Erro ao extrair dados do PDF:', error);
      setPdfError('Erro ao extrair dados do PDF. Por favor, tente novamente.');
    } finally {
      setPdfExtracting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="pdf-upload-section">
        <div
          className={`pdf-upload ${isDraggingPdf ? 'dragging' : ''}`}
          onDragOver={handlePdfDragOver}
          onDragLeave={handlePdfDragLeave}
          onDrop={handlePdfDrop}
          onClick={() => document.getElementById('pdf-input')?.click()}>
          <p>Arraste um PDF aqui ou clique para selecionar</p>
          <input
            id="pdf-input"
            type="file"
            accept=".pdf"
            onChange={handlePdfFileSelect}
            hidden
          />
          {selectedPdf && (
            <div className="pdf-actions" onClick={(e) => e.stopPropagation()}>
              <p className="selected-file">{selectedPdf.name}</p>
              <button
                type="button"
                className="extract-button"
                onClick={handlePdfExtraction}
                disabled={pdfExtracting}>
                {pdfExtracting ? 'Extraindo...' : 'Extrair Dados'}
              </button>
            </div>
          )}
          {pdfError && <p className="error-message">{pdfError}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <Editor
            defaultLanguage="json"
            value={jsonInput}
            theme="vs-dark"
            onChange={handleJsonChange}
            height={500}
            width="100%"
          />
          {validationError && (
            <p className="error-message">{validationError}</p>
          )}
          {error && <p className="error-message">{error}</p>}
          {Object.entries(formErrors).map(
            ([path, message]) =>
              path !== 'json' && (
                <p key={path} className="error-message">
                  {path}: {message}
                </p>
              )
          )}
        </div>

        <div>
          <label htmlFor="purchaseLink">Link de Compra</label>
          <input
            type="url"
            id="purchaseLink"
            name="purchaseLink"
            value={purchaseLink}
            onChange={(e) => setPurchaseLink(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`image-upload ${isDragging ? 'dragging' : ''}`}
          onClick={() => document.getElementById('image-input')?.click()}>
          {imageUrl && (
            <button
              type="button"
              className="remove-image"
              onClick={handleRemoveImage}>
              Remover imagem
            </button>
          )}
          <img
            src={
              imageUrl || formData.imageUrl || 'https://placehold.co/160x230'
            }
            alt="Capa do livro"
            className="book-image"
          />
          <p>Arraste uma imagem aqui ou clique para selecionar</p>
          <input
            id="image-input"
            type="file"
            accept=".jpeg,.jpg,.png,.gif,.webp"
            onChange={onImageChange}
            hidden
          />
          {formErrors.image && (
            <p className="error-message">{formErrors.image}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="success" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>

      {bookPreview && (
        <div className="preview-section">
          <h2>Preview</h2>
          <BookPreview book={bookPreview} />
        </div>
      )}
    </div>
  );
}
