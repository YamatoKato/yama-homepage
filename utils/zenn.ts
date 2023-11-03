import { ZennArticleType } from '../types/types';
export const fetchZennArticles = async () => {
  const res = await fetch(
    'https://zenn.dev/api/articles?username=yamakt&order=latest'
  );
  const data = await res.json();
  const posts: ZennArticleType[] = data.articles.slice(0, 10);
  return posts;
};
