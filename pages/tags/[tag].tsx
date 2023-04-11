import Layout from '@/components/Layout/Layout';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Card from '@/components/Blog/Card';
import { fetchArticles } from '@/utils/notion';
import { Params, TagProps } from '@/types/types';
import { getMultiSelect } from '@/utils/property';
import Seo from '@/components/Layout/Seo';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchArticles(
    {}
  );
  const pathSet: Set<string> = new Set();
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag);
    }
  }

  const paths = Array.from(pathSet).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchArticles({ tag: tag });
  return {
    props: {
      articles: results ? results : [],
      tag: tag,
    },
    revalidate: 10,
  };
};

const Tag: NextPage<TagProps> = ({ articles, tag }) => {
  return (
    <>
      <Layout>
        <div className='pt-12'>
          <Seo
            pageTitle={`${tag}タグ一覧`}
            pageDescription={`${tag}タグ一覧です`}
          />
          <h1 className='text-5xl mb-8'>#&thinsp;{`${tag}`}</h1>
          <div className='grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12'>
            {/* Card */}
            {articles.map((article, index) => (
              <Card key={index} article={article} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Tag;
