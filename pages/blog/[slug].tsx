import Layout from '@/components/Layout/Layout';
import Meta from '@/components/Blog/Article/Meta';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ArticleProps, Params } from '@/types/types';
import { fetchArticles, fetchBlocksByArticleId } from '@/utils/notion';
import { getCover, getRichText } from '@/utils/property';
import Block from '@/components/Blog/Article/Blocks';
import { useEffect } from 'react';
import tocbot from 'tocbot';
import Seo from '@/components/Layout/Seo';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchArticles({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: page.properties.slug.formula.string,
      },
    };
  });
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchArticles({ slug: slug });
  const article = results[0];
  const articleId = article.id;
  const { results: blocks } = await fetchBlocksByArticleId(articleId);

  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await fetchBlocksByArticleId(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block: any) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      article: article,
      blocks: blocksWithChildren,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

const Article: NextPage<ArticleProps> = ({ article, blocks }) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post',
      headingSelector: 'h1, h2, h3',
    });

    return () => tocbot.destroy();
  }, []);

  if (!article || !blocks) {
    return <div />;
  }

  const headerBlocks = blocks.filter(
    (block: any) =>
      block.type === 'heading_1' ||
      block.type === 'heading_2' ||
      block.type === 'heading_3'
  );

  const getParagraphs = (blocks: any) => {
    const paragraphs = blocks
      .filter((block: any) => block.type === 'paragraph')
      .map((block: any) => block.paragraph.rich_text)[0];
    return getRichText(paragraphs);
  };

  return (
    <>
      <Layout>
        <Seo
          pageTitle={getRichText(article.properties.name.title)}
          pageDescription={getParagraphs(blocks)}
          pageImg={getCover(article.cover)}
          pageImgWidth={640}
          pageImgHeight={360}
        />
        <article className='w-full'>
          {/* meta section */}
          <div className='my-12'>
            <Meta meta={article} />
          </div>

          {/* article */}
          <div className='my-12 post'>
            {blocks.map((block) => (
              <Block key={block.id} headerBlocks={headerBlocks} block={block} />
            ))}
          </div>
        </article>
      </Layout>
    </>
  );
};

export default Article;
