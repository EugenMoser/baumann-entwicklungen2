'use client';
import { Suspense } from 'react';

import Image from 'next/image';
import useSWR from 'swr';

import { getThumbnails } from '@/lib/endpoints';
import fetcherThumbnails from '@/lib/services/fetchThumbnails';
import { CategoryProps } from '@/src/common/types';

interface ProductCardProps {
  product: CategoryProps;
}

function ProductButton({ product }: ProductCardProps): React.JSX.Element {
  const {
    data: url,
    error,
    isLoading,
  } = useSWR(
    [getThumbnails, product.product_imagepath_small],
    ([url, thumbnailName]) => fetcherThumbnails(url, thumbnailName)
  );

  return (
    <button className='border-4'>
      <h1>{product.product_name}</h1>
      <p>{product.product_description1}</p>

      <Suspense fallback={<h2>Loading Image...</h2>}>
        <Image
          src={url}
          alt={`Bild von ${product.product_name}`}
          placeholder='empty'
          width={80}
          height={80}
          loading='lazy'
        />
      </Suspense>
    </button>
  );
}

export default ProductButton;
