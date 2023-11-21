import { DISPLAY_COUNT_PER_PAGE } from '@/constants';
import { IndexProps } from '@/types/types';
import { fetchArticles } from '@/utils/notion';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Seo from '@/components/Layout/Seo';
import Layout from '@/components/Layout/Layout';
import Card from '@/components/Blog/Card';
import BasicPagination from '@/components/Blog/Pagination';

export const getStaticProps: GetStaticProps = async () => {
  /**
   * ブログ一覧を取得
   */
  const { results } = await fetchArticles({});
  return {
    props: {
      articles: results ? results : [],
    },
    revalidate: 60 * 60, // 1日
  };
};

const Home: NextPage<IndexProps> = ({ articles }) => {
  const [page, setPage] = useState<number>(1);
  const chunkedArticles = [];

  // articleから「個人開発」tagを持つものだけを抽出 articles.properties.tags.multi_select.name
  const filteredPersonalProjectArticles = articles.filter((article) => {
    return article.properties.tags.multi_select.some((tag) => {
      return tag.name === '個人開発';
    });
  });

  for (
    let i = 0;
    i < filteredPersonalProjectArticles.length;
    i += DISPLAY_COUNT_PER_PAGE
  ) {
    const chunk = filteredPersonalProjectArticles.slice(
      i,
      i + DISPLAY_COUNT_PER_PAGE
    );
    chunkedArticles.push(chunk);
  }

  return (
    <Layout>
      <Seo pageTitle='作品一覧' pageDescription='私の作品一覧です' />
      <div className='pt-12'>
        <h1 className='text-3xl'>作品一覧</h1>
        <div>
          <span>今までに制作した作品をブログを通して展示していきます</span>
        </div>
        <div className='grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12'>
          {/* Card */}
          {chunkedArticles[page - 1].map((article, index) => (
            <Card key={index} article={article} />
          ))}
        </div>
      </div>
      <BasicPagination
        setPageProp={setPage}
        currentPage={page}
        allPages={chunkedArticles.length}
      />
    </Layout>
  );
};

export default Home;
