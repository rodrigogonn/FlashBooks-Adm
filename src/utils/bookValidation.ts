import { z } from 'zod';
import { categories } from '../constants/categories';
import { ContentType, KeyPointType } from '../types/book';

const validCategoryIds = new Set(categories.map((category) => category.id));

const paragraphSchema = z.object({
  type: z.literal(ContentType.PARAGRAPH),
  text: z.string().min(1, { message: 'Paragraph text is required.' }),
});

const keyPointSchema = z.object({
  type: z.literal(ContentType.KEY_POINT),
  keyPointType: z.nativeEnum(KeyPointType),
  text: z.string().min(1, { message: 'Key point text is required.' }),
  context: z.string().optional(),
  reference: z.string().optional(),
});

const chapterSchema = z.object({
  title: z.string().min(1, { message: 'Chapter title is required.' }),
  content: z
    .array(z.discriminatedUnion('type', [paragraphSchema, keyPointSchema]))
    .nonempty({
      message: 'Chapter content cannot be empty.',
    }),
});

export const bookValidation = z.object({
  title: z.string().min(1, { message: 'Book title is required.' }),
  author: z.string().min(1, { message: 'Author name is required.' }),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          file.type
        ),
      {
        message:
          'Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed.',
      }
    ),
  description: z.string().min(1, { message: 'Book description is required.' }),
  chapters: z
    .array(chapterSchema)
    .nonempty({ message: 'Chapters are required.' }),
  categoryIds: z
    .array(z.number())
    .refine(
      (categoryIds) =>
        categoryIds?.every((id: number) => validCategoryIds.has(id)),
      {
        message: 'Invalid category ID(s).',
      }
    ),
  purchaseLink: z
    .string()
    .url({ message: 'Purchase link must be a valid URL.' })
    .optional(),
});

export type Book = z.infer<typeof bookValidation>;
