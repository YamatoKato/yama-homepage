import React, { FC } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { LayoutProps } from '@/types/types';
import ResponsiveAppBar from './AppBar';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative overflow-hidden min-h-screen box-border'>
      <ResponsiveAppBar />
      <div className='flex flex-col items-center max-w-4xl w-full mx-auto'>
        {/*  */}
        <Navbar />
        {/*  */}
        <main className='h-full w-full pb-12 px-4'>{children}</main>
        {/*  */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
