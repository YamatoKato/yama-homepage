import React, { FC } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { LayoutProps } from '@/types/types';
import ResponsiveAppBar from './AppBar';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative overflow-hidden min-h-screen box-border pb-16'>
      <ResponsiveAppBar />
      <div className='flex flex-col items-center max-w-4xl w-full mx-auto'>
        {/*  */}
        <Navbar />
        {/*  */}
        <main className='h-full w-full pb-12 mb-20 px-4'>{children}</main>
        {/*  */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
