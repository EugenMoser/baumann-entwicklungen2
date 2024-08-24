'use client';
import { notFound } from 'next/navigation';
import useSWR from 'swr';

import { getCategory } from '@/lib/endpoints';
import fetcherCategory from '@/lib/services/fetchCategory';
import { CategoryProps } from '@/src/common/types';
import ProductCard from '@/src/components/Cards/productCard';
import { sections } from '@/src/constants/sections';

interface ProductCategoryProps {
  params: { category: string };
}

function ProductCategory({ params }: ProductCategoryProps): JSX.Element {
  const { category } = params;

  // fetch the all products with the given category
  const {
    data: products,
    error,
    isLoading,
  } = useSWR([getCategory, category], ([url, category]) =>
    fetcherCategory(url, category)
  );
  console.log('products', products);

  // find the category name for the title
  const categoryData = sections.find(
    (section) => section.category === category
  );
  const categoryName = categoryData ? categoryData.name : '';

  // if no products are found, return 404
  if (error) {
    notFound();
  }
  if (isLoading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <main>
      <h1>Produktbereich {categoryName} </h1>
      <ul>
        {products &&
          products.map((product: CategoryProps, index: number) => (
            <li key={index}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </main>
  );
}

export default ProductCategory;
