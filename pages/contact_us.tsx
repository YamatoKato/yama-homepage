import Layout from '@/components/Layout/Layout';
import type { GetStaticProps, NextPage } from 'next';
import { siteConfig } from '../site.config';
import { sampleCards } from '@/utils/sample';
import Card from '@/components/Blog/Card';
import { fetchArticles } from '@/utils/notion';
import { IndexProps } from '@/types/types';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import ResponsiveAppBar from '@/components/Layout/AppBar';
import { HomeContent } from '../components/Home/Index';
import { ContactUs } from '@/components/ContactUs/Index';
import Seo from '@/components/Layout/Seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo pageTitle='お問い合わせ' pageDescription='お問い合わせページです' />
      <ContactUs />
    </Layout>
  );
};

export default Home;
