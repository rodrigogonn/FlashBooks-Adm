import { Book } from '../types/book';
import { ContentType, KeyPointType } from '../types/book';
import { categories } from '../constants/categories';
import '../styles/BookPreview.css';

interface BookPreviewProps {
  book: Book;
}

export function BookPreview({ book }: BookPreviewProps) {
  const bookCategories = categories.filter((category) =>
    book.categoryIds.includes(category.id)
  );

  return (
    <div className="book-preview">
      <div className="book-preview-header">
        <img
          src={book.imageUrl || 'https://placehold.co/160x230'}
          alt={book.title}
          className="book-preview-image"
        />
        <div className="book-preview-info">
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          <div className="categories">
            {bookCategories.map((category) => (
              <span key={category.id} className="category-tag">
                <span className="category-emoji">{category.emoji}</span>
                {category.name}
              </span>
            ))}
          </div>
          <p className="description">{book.description}</p>
        </div>
      </div>

      <div className="book-preview-chapters">
        {book.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="chapter">
            <h3>{chapter.title}</h3>
            <div className="chapter-content">
              {chapter.content.map((content, contentIndex) => {
                switch (content.type) {
                  case ContentType.PARAGRAPH:
                    return (
                      <p key={contentIndex} className="paragraph">
                        {content.text}
                      </p>
                    );
                  case ContentType.KEY_POINT:
                    return (
                      <div key={contentIndex} className="key-point">
                        <p
                          className={`key-point-text ${
                            content.keyPointType === KeyPointType.QUOTE
                              ? 'quote'
                              : content.keyPointType === KeyPointType.INSIGHT
                              ? 'insight'
                              : 'moment'
                          }`}>
                          {content.keyPointType === KeyPointType.QUOTE
                            ? `"${content.text}"`
                            : content.text}
                        </p>
                        {content.keyPointType === KeyPointType.QUOTE &&
                          content.reference && (
                            <p className="key-point-reference">
                              — {content.reference}
                            </p>
                          )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
