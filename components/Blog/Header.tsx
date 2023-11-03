import Link from 'next/link';
import { BiFootball } from 'react-icons/bi';
import { GrPersonalComputer } from 'react-icons/gr';
const Header: React.FC = () => {
  // タグ一覧を横クロールで表示したい
  return (
    <div className='bg-gray-400 p-4 rounded-lg shadow-2xl overflow-x-auto'>
      <span>ジャンルから記事を探せます</span>
      <div className='overflow-x-auto'>
        <div className='flex space-x-2  '>
          <Link href={`tags/技術系`}>
            <h1 className=' text-white text-xl px-2 py-1 font-normal bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900 rounded-lg break-words mx-1 my-1 hover:cursor-pointer hover:opacity-75 hover:shadow-lg transition duration-300 transform hover:scale-105'>
              技術系 &nbsp;
              <GrPersonalComputer />
            </h1>
          </Link>
          <Link href={`tags/プレミアリーグ`}>
            <h1 className=' text-white text-xl px-2 py-1 font-normal bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900 rounded-lg break-words mx-1 my-1 hover:cursor-pointer hover:opacity-75 hover:shadow-lg transition duration-300 transform hover:scale-105'>
              プレミアリーグ &nbsp;
              <BiFootball />
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
