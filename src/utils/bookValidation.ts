import { z } from 'zod';
import { categories } from '../constants/categories';
import { ContentType, KeyPointType } from '../types/book';

const validCategoryIds = new Set(categories.map((category) => category.id));

const paragraphSchema = z.object({
  type: z.literal(ContentType.PARAGRAPH),
  text: z.string().min(1, { message: 'O texto do parágrafo é obrigatório.' }),
});

const keyPointSchema = z.object({
  type: z.literal(ContentType.KEY_POINT),
  keyPointType: z.nativeEnum(KeyPointType),
  text: z.string().min(1, { message: 'O texto do ponto chave é obrigatório.' }),
  reference: z.string().optional(),
});

const chapterSchema = z.object({
  title: z.string().min(1, { message: 'O título do capítulo é obrigatório.' }),
  content: z
    .array(z.discriminatedUnion('type', [paragraphSchema, keyPointSchema]))
    .nonempty({
      message: 'O conteúdo do capítulo não pode estar vazio.',
    }),
});

export const bookValidation = z
  .object({
    title: z.string().min(1, { message: 'O título do livro é obrigatório.' }),
    author: z.string().min(1, { message: 'O nome do autor é obrigatório.' }),
    image: z
      .instanceof(File, {
        message: 'A imagem é obrigatória.',
      })
      .refine(
        (file) =>
          ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
            file.type
          ),
        {
          message:
            'Formato de imagem inválido. Apenas JPEG, PNG, GIF e WebP são permitidos.',
        }
      )
      .optional(),
    description: z
      .string()
      .min(1, { message: 'A descrição do livro é obrigatória.' }),
    chapters: z.array(chapterSchema).nonempty({
      message: 'O livro deve ter pelo menos um capítulo.',
    }),
    categoryIds: z
      .array(z.number())
      .refine(
        (categoryIds) =>
          categoryIds?.every((id: number) => validCategoryIds.has(id)),
        {
          message: 'ID(s) de categoria inválido(s).',
        }
      ),
    purchaseLink: z
      .string()
      .url({
        message: 'O link de compra deve ser uma URL válida.',
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.title) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O título do livro é obrigatório.',
        path: ['title'],
      });
    }
    if (!data.author) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O nome do autor é obrigatório.',
        path: ['author'],
      });
    }
    if (!data.description) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A descrição do livro é obrigatória.',
        path: ['description'],
      });
    }
    if (!data.chapters || data.chapters.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O livro deve ter pelo menos um capítulo.',
        path: ['chapters'],
      });
    }
    if (!data.categoryIds || data.categoryIds.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As categorias são obrigatórias.',
        path: ['categoryIds'],
      });
    }
  });

export type Book = z.infer<typeof bookValidation>;
