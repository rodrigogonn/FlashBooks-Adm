import { Book } from '../types/book';
import { PdfChapters } from '../utils/pdfValidation';
import { pdfExtractorApi } from './api';

export const pdfExtractorService = {
  async extractBookData(pdfFile: File, chapters: PdfChapters) {
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('chapters', JSON.stringify(chapters));

    const response = await pdfExtractorApi.post<
      Omit<Book, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'purchaseLink'>
    >('/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
