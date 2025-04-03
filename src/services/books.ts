import { Book } from '../types/book';
import { booksApi } from './api';

type BookForm = Omit<Book, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'> & {
  image: File | null;
};

export const booksService = {
  list: async (): Promise<Book[]> => {
    const response = await booksApi.get<{ books: Book[] }>('/api/books');
    return response.data.books;
  },

  create: async (data: BookForm): Promise<void> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    formData.append('chapters', JSON.stringify(data.chapters));
    if (data.categoryIds) {
      formData.append('categoryIds', JSON.stringify(data.categoryIds));
    }
    if (data.purchaseLink) {
      formData.append('purchaseLink', data.purchaseLink);
    }

    await booksApi.post('/api/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: async (id: string, data: BookForm): Promise<void> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    formData.append('chapters', JSON.stringify(data.chapters));
    if (data.categoryIds) {
      formData.append('categoryIds', JSON.stringify(data.categoryIds));
    }
    if (data.purchaseLink) {
      formData.append('purchaseLink', data.purchaseLink);
    }

    await booksApi.put(`/api/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete: async (id: string): Promise<void> => {
    await booksApi.delete(`/api/books/${id}`);
  },
};
