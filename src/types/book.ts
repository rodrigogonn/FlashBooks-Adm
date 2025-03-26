export enum ContentType {
  PARAGRAPH = 'PARAGRAPH',
  KEY_POINT = 'KEY_POINT',
}

export enum KeyPointType {
  QUOTE = 'QUOTE',
  LESSON = 'LESSON',
  INSIGHT = 'INSIGHT',
  MOMENT = 'MOMENT',
  CONCEPT = 'CONCEPT',
}

export interface Paragraph {
  type: ContentType.PARAGRAPH;
  text: string;
}

export interface KeyPoint {
  type: ContentType.KEY_POINT;
  keyPointType: KeyPointType;
  text: string;
  context?: string;
  reference?: string;
}

export type ChapterContent = Paragraph | KeyPoint;

export interface Chapter {
  title: string;
  content: ChapterContent[];
}

export interface Book {
  title: string;
  author: string;
  description: string;
  chapters: Chapter[];
  categoryIds: number[];
  purchaseLink?: string;
}
