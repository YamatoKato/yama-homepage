import React, { FC, Fragment } from 'react';
import { BlockProps } from '../../../types/types';
import Text from './Text';
import styles from '../../styles/post.module.css';
import Link from 'next/link';
import NotionBlocks from 'notion-block-renderer';
import { BsCheck2, BsCheck2All, BsCheck2Square } from 'react-icons/bs';
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs';
import { Link as Scroll } from 'react-scroll';
import Code from './Code';
import LinkCard from './LinkCard';

const Block: FC<BlockProps> = ({ block, headerBlocks }, key) => {
  return <>{renderBlock(block, key, headerBlocks)}</>;
};

export default Block;

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;
  const isNumberedList =
    value.children.results[0].type === 'numbered_list_item';
  return (
    <>
      {isNumberedList ? (
        <ol>
          {value.children.results.map((block: any) =>
            renderBlock(block, block.id)
          )}
        </ol>
      ) : (
        <ul>
          {value.children.results.map((block: any) =>
            renderBlock(block, block.id)
          )}
        </ul>
      )}
    </>
  );
};

const renderBlock = (block: any, index: number, headerBlocks?: any) => {
  const { type, id } = block;
  const value = block[type];
  switch (type) {
    case 'table_of_contents':
      return (
        <details
          open
          className='my-4 rounded-md bg-slate-50 p-2 shadow-md hover:cursor-pointer focus:outline-none white:bg-stone-900 md:p-6'
        >
          <summary className='text-base font-semibold text-stone-800 focus:outline-none duotoneLight:text-stone-900 md:text-lg'>
            目次
          </summary>
          <ol className='p-2 md:p-4'>
            {headerBlocks.map((block: any, index: number) => {
              // header1の時
              if (block.type === 'heading_1') {
                return (
                  <li key={index}>
                    <Scroll
                      to={block.id}
                      smooth={true}
                      className='inline-flex items-center py-1 text-base text-stone-700 duration-300 hover:text-stone-500 duotoneLight:text-stone-900 duotoneLight:hover:text-stone-300 md:text-2xl'
                    >
                      <BsCheck2Square className='mr-2' />
                      {block[block.type].rich_text[0].text.content}
                    </Scroll>
                  </li>
                );
              }
              // header2の時
              if (block.type === 'heading_2') {
                return (
                  <li key={index}>
                    <Scroll
                      to={block.id}
                      smooth={true}
                      className=' ml-10 inline-flex items-center py-1 text-base text-stone-700 duration-300 hover:text-stone-500 duotoneLight:text-stone-900 duotoneLight:hover:text-stone-300 md:text-xl'
                    >
                      <BsCheck2All className='mr-2' />
                      {block[block.type].rich_text[0].text.content}
                    </Scroll>
                  </li>
                );
              }
              // header3の時
              if (block.type === 'heading_3') {
                return (
                  <li key={index}>
                    <Scroll
                      to={block.id}
                      smooth={true}
                      className=' ml-20 inline-flex items-center py-1 text-base text-stone-700 duration-300 hover:text-stone-500 duotoneLight:text-stone-900 duotoneLight:hover:text-stone-300 md:text-lg'
                    >
                      <BsCheck2 className='mr-2' />
                      {block[block.type].rich_text[0].text.content}
                    </Scroll>
                  </li>
                );
              }
            })}
          </ol>
        </details>
      );
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} key={index} />
        </p>
      );
    case 'heading_1':
      return (
        <Scroll to={id} smooth={true} className='duration-300 hover:opacity-75'>
          <div>
            <h1
              id={id}
              className='pt-8 font-bold bg-clip-text bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900 bg-slate-500'
            >
              <BsCheck2Square className='mr-2' />
              <Text text={value.rich_text} key={index} />
            </h1>
            <div className='bg-black h-px opacity-25'></div>
            <div className='bg-black mt-px h-px opacity-25'></div>
            <div className='bg-black mt-px h-px opacity-25'></div>
            <div className='bg-black mt-px mb-4 h-px opacity-25'></div>
          </div>
        </Scroll>
      );
    case 'heading_2':
      return (
        <Scroll to={id} smooth={true} className='duration-300 hover:opacity-75'>
          <div>
            <h2 id={id} className=' text-zinc-800 pt-8'>
              <BsCheck2All className='mr-2' />
              <Text text={value.rich_text} key={index} />
            </h2>
            <div className='bg-black mt-px mb-4 h-px opacity-25'></div>
          </div>
          {/* <div className='bg-black mt-px mb-4 h-px opacity-25'></div> */}
        </Scroll>
      );
    case 'heading_3':
      return (
        <Scroll to={id} smooth={true} className='duration-300 hover:opacity-75'>
          <div>
            <h3 id={id} className='pt-5'>
              <BsCheck2 className='mr-2' />
              <Text text={value.rich_text} key={index} />
            </h3>
          </div>
        </Scroll>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.rich_text} key={index} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type='checkbox' id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.rich_text} key={index} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} key={index} />
          </summary>
          {value.children?.results.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block, index)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} className=' py-7' />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={type} />;
    case 'quote':
      return <NotionBlocks blocks={[block]} />;
    case 'code':
      return (
        <Code
          code={value.rich_text[0].text.content}
          language={value.language}
        />
      );
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className={styles.file}>
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}&ensp;
            </Link>
            <BsFillFileEarmarkArrowDownFill />
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      const href = value.url;
      // return (
      //   <a href={href} target='_brank' className={styles.bookmark}>
      //     {href}
      //   </a>
      // );
      return <LinkCard url={href} />;
    case 'callout':
      return <NotionBlocks blocks={[block]} />;
    case 'video':
      const videoSrc =
        value.type === 'external' ? value.external.url : value.file.url;

      if (videoSrc.includes('youtu.be')) {
        const videoIdMatch = videoSrc.match(/youtu\.be\/([^\/]+)/);

        if (videoIdMatch && videoIdMatch.length > 1) {
          const videoId = videoIdMatch[1];
          return (
            <div>
              <div className='flex items-center justify-center h-[215px] w-[382px] md:h-[500px] md:w-[890px] mt-4'>
                <iframe
                  className='w-4/5 h-4/5'
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        }
      }
      return <NotionBlocks blocks={[block]} />;
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
