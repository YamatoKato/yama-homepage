import Layout from '@/components/Layout/Layout';
import type { GetStaticProps, NextPage } from 'next';
import Card from '@/components/Blog/Card';
import { fetchArticles } from '@/utils/notion';
import { IndexProps } from '@/types/types';
import { useState } from 'react';
import BasicPagination from '../components/Blog/Pagination';
import { DISPLAY_COUNT_PER_PAGE } from '@/constants';
import Seo from '@/components/Layout/Seo';

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchArticles({});
  return {
    props: {
      articles: results ? results : [],
    },
    revalidate: 10,
  };
};

const Home: NextPage<IndexProps> = ({ articles }) => {
  const [page, setPage] = useState<number>(1);
  const chunkedArticles = [];

  for (let i = 0; i < articles.length; i += DISPLAY_COUNT_PER_PAGE) {
    const chunk = articles.slice(i, i + DISPLAY_COUNT_PER_PAGE);
    chunkedArticles.push(chunk);
  }
  return (
    <Layout>
      <Seo pageTitle='ブログ一覧' pageDescription='ブログ一覧です' />
      <div className='pt-12'>
        <h1 className='text-3xl'>一覧</h1>
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
