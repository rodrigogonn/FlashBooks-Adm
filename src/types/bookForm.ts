import { Book } from './book';

export type BookFormData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'> & {
  image: File | null;
  imageUrl?: string;
};
