import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CardProps } from '../../types/types';
import { getRichText } from '@/utils/property';
import { getCover, getDate, getMultiSelect } from '../../utils/property';

const Card: FC<CardProps> = ({ article }) => {
  return (
    <Link
      href={`/blog/${article.properties.slug.formula.string}`}
      className='flex justify-center '
    >
      <div className='max-w-sm rounded overflow-hidden shadow-lg w-full my-4 md:my-0 content-between grid hover:shadow-lg transition duration-300 transform hover:scale-105'>
        {/* image */}
        <div>
          {' '}
          <Image
            className='w-full static w-full h-auto'
            src={getCover(article.cover)}
            alt=''
            objectFit='cover'
            width={400}
            height={225}
            quality={30}
          />
        </div>

        {/* title & date*/}
        <div className='px-6 pt-4 '>
          <h2 className='text-base font-medium mb-3 '>
            {getRichText(article.properties.name.title)}
          </h2>
          <p className='text-gray-700 text-xs'>
            {getDate(article.properties.published.date)}
          </p>
        </div>

        {/* tag */}
        <div className='p-4'>
          {getMultiSelect(article.properties.tags.multi_select).map(
            (tag, index) => (
              <Link href={`tags/${tag}`} key={index}>
                <span
                  key={index}
                  className=' text-white text-sm px-2 py-1 font-normal bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900 rounded-lg break-words mx-1 my-1 inline-block hover:cursor-pointer hover:opacity-75'
                >
                  {`#${tag}`}
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
