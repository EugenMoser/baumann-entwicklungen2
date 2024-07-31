import { MouseEventHandler, Suspense } from 'react';

import axios from 'axios';

import { getAll } from '@/lib/endpoints';

import HomePage from './container/home-page/page';

const getItems = async () => {
  const { data } = await axios(getAll);
  return data.data;
};

export default async function Home(): Promise<JSX.Element> {
  const allProducts: any = await getItems();

  if (!allProducts) return <h2>msgSiteLoadingError</h2>;

  return (
    <main>
      <Suspense fallback={<h1>Loading..</h1>}>
        <HomePage />
      </Suspense>
    </main>
  );
}
