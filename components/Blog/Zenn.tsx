import Link from 'next/link';

import { ZennArticleType, ZennProps } from '../../types/types';
import dayjs from 'dayjs';
const Zenn: React.FC<ZennProps> = ({ posts }) => {
  // 横クロールで表示したい
  return (
    <div>
      <h1 className='text-2xl font-semibold px-2 pt-4'>Zenn記事↓ </h1>
      <div className='overflow-x-auto'>
        <div className='max-w-screen-xl mx-auto'>
          <Link
            href={'https://zenn.dev/yamakt'}
            target='blank'
            className=' underline'
          >
            Zenn一覧はこちら
          </Link>
          <ul className='flex space-x-4 p-4'>
            {posts.map((post: ZennArticleType) => (
              <li key={post.id} className='flex-none'>
                <Link href={`https://zenn.dev/${post.path}`} target='blank'>
                  <div className=' px-2 border rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 bg-sky-100'>
                    <p className='text-lg font-semibold my-2'>
                      {post.emoji}
                      {post.title}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {dayjs(post.published_at).format('YYYY/MM/DD')}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Zenn;
