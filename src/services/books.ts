import { Book } from '../types/book';
import { useAuthStore } from '../stores/authStore';
import { mockBooks } from '../mocks/books';

type BookForm = Omit<Book, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'> & {
  image: File | null;
};

const getToken = () => {
  return useAuthStore.getState().token;
};

export const booksService = {
  // TODO: Implementar quando a API estiver pronta
  // list: async (): Promise<Book[]> => {
  //   const response = await axios.get(`${env.API_URL}/api/books`);
  //   return response.data;
  // },

  // Mock temporário
  list: async (): Promise<Book[]> => {
    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockBooks;
  },

  create: async (data: BookForm): Promise<void> => {
    const token = getToken();
    if (!token) return;

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
    formData.append('purchaseLink', data.purchaseLink || '');

    console.log('create', data);

    // await axios.post(`${env.API_URL}/api/books`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  },

  // TODO: Implementar quando a API estiver pronta
  // update: async (id: string, data: BookForm): Promise<void> => {
  //   const token = getToken();
  //   if (!token) return;

  //   const formData = new FormData();
  //   formData.append('title', data.title);
  //   formData.append('author', data.author);
  //   formData.append('description', data.description);
  //   if (data.image) {
  //     formData.append('image', data.image);
  //   }
  //   formData.append('chapters', JSON.stringify(data.chapters));
  //   if (data.categoryIds) {
  //     formData.append('categoryIds', JSON.stringify(data.categoryIds));
  //   }
  //   formData.append('purchaseLink', data.purchaseLink || '');

  //   await axios.put(`${env.API_URL}/api/books/${id}`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },

  // Mock temporário
  update: async (id: string, data: BookForm): Promise<void> => {
    const token = getToken();
    if (!token) return;

    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Em um ambiente real, aqui seria feita a atualização no backend
    // Por enquanto, apenas simulamos o sucesso da operação
    console.log('Livro atualizado:', { id, data });
  },

  // TODO: Implementar quando a API estiver pronta
  // delete: async (id: string): Promise<void> => {
  //   const token = getToken();
  //   if (!token) return;

  //   await axios.delete(`${env.API_URL}/api/books/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },

  // Mock temporário
  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const token = getToken();
    if (!token) return;

    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Em um ambiente real, aqui seria feita a exclusão no backend
    // Por enquanto, apenas simulamos o sucesso da operação
    console.log('Livro excluído:', id);
  },
};
