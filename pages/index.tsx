import Layout from '@/components/Layout/Layout';
import type { NextPage } from 'next';
import { HomeContent } from '../components/Home/Index';
import Seo from '@/components/Layout/Seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo
        pageTitle='私について'
        pageDescription='私について'
        pageImg='/cover-image.jpg'
      />
      <HomeContent />
    </Layout>
  );
};

export default Home;
