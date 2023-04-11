import Link from 'next/link';
import React from 'react';
import { siteConfig } from '../../site.config';
import { useRouter } from 'next/router';
import { AiOutlineRollback } from 'react-icons/ai';

const Navbar = () => {
  const router = useRouter();
  const navHeaderName = () => {
    if (router.pathname === '/') {
      return siteConfig.title;
    }
    if (router.pathname === '/blog') {
      return siteConfig.blogTitle;
    }
    if (router.pathname === '/contact_us') {
      return 'Contact Us';
    }
    return '';
  };
  if (navHeaderName() === '') {
    return (
      <nav className='relative w-full flex flex-wrap items-center justify-between text-gray-500 hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg navbar-light w-screen h-0'>
        <div className='container-fluid w-full flex flex-wrap items-center pt-2'>
          <Link href='/blog' className='text-md font-bold italic ml-11'>
            <p className='text-center mb-0 bg-clip-text bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900'>
              一覧に戻る&nbsp;
            </p>
          </Link>
          <AiOutlineRollback className='bg-clip-text bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900' />
          {/* Breadcrumb */}
          {/* <Breadcrumb /> */}
        </div>
      </nav>
    );
  }
  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3  text-gray-500 hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg navbar-light w-screen'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-center pt-2'>
        <p className='text-4xl font-bold italic bg-clip-text bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900'>
          {navHeaderName()}
        </p>
        {/* Breadcrumb */}
        {/* <Breadcrumb /> */}
      </div>
    </nav>
  );
};

export default Navbar;
