import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { getSection } from '@/lib/endpoints';
import ProductCard from '@/src/components/Cards/productCard';
import { sections } from '@/src/constants/sections';

import { CategoryProps } from '../../../common/types';

interface ProductCategoryProps {
  params: { category: string };
}

//todo Funktion z,B, in src/service/categoryService.ts auslagern
const getCategory = async (category: string): Promise<CategoryProps[]> => {
  const response: Response = await fetch(getSection, {
    method: 'POST',
    body: JSON.stringify({ category: `${category}` }),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
};

async function ProductCategory({
  params,
}: ProductCategoryProps): Promise<JSX.Element> {
  const { category } = params;

  // fetch the all products with the given category
  const products = await getCategory(category);

  // find the category name for the title
  const categoryData = sections.find(
    (section) => section.category === category
  );
  const categoryName = categoryData ? categoryData.name : '';

  // if no products are found, return 404
  if (!products) {
    notFound();
  }

  return (
    <main>
      <h1>Produktbereich {categoryName} </h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ul>
          {products.map((product: CategoryProps, index: number) => (
            <li key={index}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}

export default ProductCategory;
