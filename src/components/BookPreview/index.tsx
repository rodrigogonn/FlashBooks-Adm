import { Book, ContentType, KeyPointType, KeyPoint } from '../../types/book';
import './styles.css';

interface BookPreviewProps {
  book: Book;
}

export const BookPreview = ({ book }: BookPreviewProps) => {
  return (
    <div className="book-preview">
      <h1 className="preview-book-title">{book.title}</h1>
      <div className="preview-book-author">{book.author}</div>

      {book.chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="chapter-preview">
          <h2 className="preview-title">{chapter.title}</h2>

          <div className="preview-content">
            {chapter.content.map((content, index) => {
              switch (content.type) {
                case ContentType.PARAGRAPH: {
                  return (
                    <p key={index} className="preview-paragraph">
                      {content.text}
                    </p>
                  );
                }
                case ContentType.KEY_POINT: {
                  return <KeyPointPreview key={index} content={content} />;
                }
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

interface KeyPointPreviewProps {
  content: KeyPoint;
}

const KeyPointPreview = ({ content }: KeyPointPreviewProps) => {
  if (!Object.values(KeyPointType).includes(content.keyPointType)) return null;

  const getKeyPointStyle = (keyPointType: KeyPointType): string => {
    switch (keyPointType) {
      case KeyPointType.QUOTE:
        return 'preview-quote';
      case KeyPointType.INSIGHT:
        return 'preview-insight';
      case KeyPointType.MOMENT:
        return 'preview-moment';
      default:
        return '';
    }
  };

  return (
    <div
      className={`preview-key-point ${getKeyPointStyle(content.keyPointType)}`}>
      <p className="preview-paragraph">
        {content.keyPointType === KeyPointType.QUOTE
          ? `"${content.text}"`
          : content.text}
      </p>

      {content.keyPointType === KeyPointType.QUOTE && !!content.reference && (
        <p className="preview-reference">— {content.reference}</p>
      )}
    </div>
  );
};
