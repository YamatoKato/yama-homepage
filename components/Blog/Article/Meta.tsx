import Image from 'next/image';
import React, { FC } from 'react';
import { ArticleMetaProps } from '../../../types/types';
import {
  getCover,
  getRichText,
  getDate,
  getMultiSelect,
} from '../../../utils/property';
import Link from 'next/link';

const Meta: FC<ArticleMetaProps> = ({ meta }) => {
  return (
    <>
      {/* page cover */}
      <Image
        className='w-full max-w-screen-lg rounded-lg aspect-video my-4'
        src={getCover(meta.cover)}
        alt=''
        objectFit='cover'
        width={640}
        height={360}
        quality={50}
      />
      {/* page name */}
      <h1 className='my-8 subpixel-antialiased'>
        {getRichText(meta.properties.name.title)}
      </h1>
      <div className='rounded-md bg-slate-50 p-2 shadow-md px-6 py-4 text-sm text-gray-500'>
        <div className='grid grid-cols-3 gap-4 items-center'>
          {/* published */}
          <div className='col-span-1'>Published</div>
          <div className='col-span-2 text-black'>
            {getDate(meta.properties.published.date)}
          </div>

          {/* author */}
          <div className='col-span-1'>Author</div>
          <div className='col-span-2 text-black'>
            {getRichText(meta.properties.author.rich_text)}
          </div>

          {/* tags */}
          <div className='col-span-1'>Tags</div>
          <div className='col-span-2'>
            {/* change later */}
            {getMultiSelect(meta.properties.tags.multi_select).map(
              (tag: string, index: number) => (
                <div key={index} className=' inline-flex py-px'>
                  <Link
                    key={index}
                    href={`/tags/${tag}`}
                    className='text-white font-light no-underline mr-3 bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900 rounded-md px-2 py-1 hover:opacity-75'
                  >
                    <span>#&thinsp;{`${tag}`}</span>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className='bg-black mt-4 h-px opacity-25'></div>
    </>
  );
};

export default Meta;
