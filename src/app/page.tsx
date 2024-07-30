import axios from 'axios';

import { getAll } from '@/lib/endpoints';

import Test from '../components/test/page';

const getItems = async () => {
  const data = await axios(getAll);
  return data.data;
};

export default async function Home({ props }: any): Promise<JSX.Element> {
  // const products: any = await getItems();
  function getBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL
    );
  }

  return (
    <>
      <h2>Home Page</h2>
      <Test products={getBaseUrl()} />
    </>
  );
}
