import { ArticleProps } from '../../../common/types';

interface ArticlesProps {
  articleSection: ArticleProps[];
}

function Articles({ articleSection }: ArticlesProps): JSX.Element {
  return (
    <>
      <h1>Article / Variant</h1>
      <ul>
        {articleSection.map((article: ArticleProps) => (
          <li key={article.article_id}>
            {article.article_number} - {article.article_description}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Articles;
