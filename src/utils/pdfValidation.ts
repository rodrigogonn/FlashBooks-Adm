import { z } from 'zod';

export const pdfChapterSchema = z.object({
  name: z.string().min(1, 'Nome do capítulo é obrigatório'),
  startPage: z
    .number()
    .int()
    .positive('Página inicial deve ser um número positivo'),
});

export const pdfChaptersSchema = z.array(pdfChapterSchema).nonempty({
  message: 'É necessário informar pelo menos um capítulo',
});

export type PdfChapter = z.infer<typeof pdfChapterSchema>;
export type PdfChapters = z.infer<typeof pdfChaptersSchema>;
