import React, { FC, Fragment } from 'react';
import { BlockProps } from '../../../types/types';
import Text from './Text';
import styles from '../../styles/post.module.css';
import Link from 'next/link';
import NotionBlocks from 'notion-block-renderer';
import { BsCheck2Square } from 'react-icons/bs';
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Link as Scroll } from 'react-scroll';

const Block: FC<BlockProps> = ({ block, headerBlocks }, key) => {
  return <>{renderBlock(block, key, headerBlocks)}</>;
};

export default Block;

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return (
      <ol>
        {value.children.map((block: any, index: number) =>
          renderBlock(block, index)
        )}
      </ol>
    );
  }
  return (
    <ul>
      {value.children.map((block: any, index: number) =>
        renderBlock(block, index)
      )}
    </ul>
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
              return (
                <li key={index}>
                  <Scroll
                    to={block.id}
                    smooth={true}
                    className='inline-flex items-center py-1 text-base text-stone-700 duration-300 hover:text-stone-500 duotoneLight:text-stone-900 duotoneLight:hover:text-stone-300 md:text-lg'
                  >
                    <BsCheck2Square className='mr-2' />
                    {block[block.type].rich_text[0].text.content}
                  </Scroll>
                </li>
              );
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
        <h1 id={id}>
          <Text text={value.rich_text} key={index} />
        </h1>
      );
    case 'heading_2':
      return (
        <Scroll to={id} smooth={true} className='duration-300 hover:opacity-75'>
          <h2 id={id}>
            <Text text={value.rich_text} key={index} />
            <BsCheck2Square className='ml-2' />
          </h2>
          <div className='bg-black mt-px mb-4 h-px opacity-25'></div>
        </Scroll>
      );
    case 'heading_3':
      return (
        <h3>
          <Text text={value.rich_text} key={index} />
          <BsCheck2Square className='ml-2' />
        </h3>
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
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={type} />;
    case 'quote':
      return <NotionBlocks blocks={[block]} />;
    case 'code':
      return (
        <div className='relative'>
          <div>
            <p className='bg-inherit text-xs text-neutral-600 inline-block absolute -top-0.8 left-1 bg-slate-200 px-1'>
              {value.caption.length === 0
                ? value.language
                : value.caption[0].text.content}
            </p>
          </div>
          <SyntaxHighlighter language={value.language} style={duotoneLight}>
            {value.rich_text[0].text.content}
          </SyntaxHighlighter>
        </div>
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
      return (
        <a href={href} target='_brank' className={styles.bookmark}>
          {href}
        </a>
      );
    case 'callout':
      return <NotionBlocks blocks={[block]} />;
    case 'video':
      const videoSrc =
        value.type === 'external' ? value.external.url : value.file.url;
      if (videoSrc.match('youtu.be')) {
        return (
          <iframe
            width='100%'
            height='400px'
            src={`https://www.youtube.com/embed/${
              videoSrc.match(/(?<=youtu\.be\/)[^\/]+/)[0]
            }`}
            allowFullScreen
          ></iframe>
        );
      }
      return <NotionBlocks blocks={[block]} />;
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
