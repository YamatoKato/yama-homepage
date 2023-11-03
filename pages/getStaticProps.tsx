import type { GetStaticProps } from 'next';
import { fetchArticles } from '@/utils/notion';
import { fetchZennArticles } from '../utils/zenn';

export const getStaticProps: GetStaticProps = async () => {
  /**
   * ブログ一覧を取得
   */
  const { results } = await fetchArticles({});
  const ZennArticles = await fetchZennArticles();

  return {
    props: {
      articles: results ? results : [],
      zennArticles: ZennArticles ? ZennArticles : [],
    },
    revalidate: 10,
  };
};
