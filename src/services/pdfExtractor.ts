import { Book, ContentType, KeyPointType } from '../types/book';

export const pdfExtractorService = {
  async extractBookData(
    pdfFile: File
  ): Promise<
    Omit<Book, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'purchaseLink'>
  > {
    // Simula um delay de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      title: 'Título Extraído do PDF',
      author: 'Autor Extraído do PDF',
      description:
        'Descrição extraída do PDF. Este é um texto de exemplo que simula a descrição do livro que foi extraída do arquivo PDF.',
      chapters: [
        {
          title: 'Capítulo 1',
          content: [
            {
              type: ContentType.PARAGRAPH,
              text: 'Conteúdo do capítulo 1 extraído do PDF.',
            },
            {
              type: ContentType.KEY_POINT,
              keyPointType: KeyPointType.INSIGHT,
              text: 'Ponto chave 1',
            },
            {
              type: ContentType.PARAGRAPH,
              text: 'Conteúdo do capítulo 2 extraído do PDF.',
            },
          ],
        },
      ],
      categoryIds: [1],
    };
  },
};
