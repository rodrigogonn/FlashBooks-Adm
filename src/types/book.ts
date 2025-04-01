export enum ContentType {
  PARAGRAPH = 'PARAGRAPH',
  KEY_POINT = 'KEY_POINT',
}

export enum KeyPointType {
  QUOTE = 'QUOTE',
  INSIGHT = 'INSIGHT',
  MOMENT = 'MOMENT',
}

export interface Paragraph {
  type: ContentType.PARAGRAPH;
  text: string;
}

export interface KeyPoint {
  type: ContentType.KEY_POINT;
  keyPointType: KeyPointType;
  text: string;
  reference?: string;
}

export type ChapterContent = Paragraph | KeyPoint;

export interface Chapter {
  title: string;
  content: ChapterContent[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  chapters: Chapter[];
  categoryIds: number[];
  purchaseLink?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
