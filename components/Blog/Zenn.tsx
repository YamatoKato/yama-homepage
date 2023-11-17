import Link from 'next/link';

import { ZennArticleType, ZennProps } from '../../types/types';
import dayjs from 'dayjs';
const Zenn: React.FC<ZennProps> = ({ posts }) => {
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
              <li key={post.id} className='flex-none justify-center'>
                <div className=' px-3 border rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 bg-sky-100 w-96'>
                  <Link href={`https://zenn.dev${post.path}`} target='blank'>
                    <p className='text-lg font-semibold my-2 break-words'>
                      {post.emoji}
                      {post.title}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {dayjs(post.published_at).format('YYYY/MM/DD')}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Zenn;
