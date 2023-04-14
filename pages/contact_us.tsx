import Layout from '@/components/Layout/Layout';
import type { NextPage } from 'next';
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
