import { Suspense } from 'react';

import Image from 'next/image';

import { getThumbnails } from '@/lib/endpoints';
import { CategoryProps } from '@/src/common/types';

interface ProductCardProps {
  product: CategoryProps;
}

const getProductThumbnails = async (thumbnailFullName: string) => {
  const response: any = await fetch(getThumbnails, {
    method: 'POST',
    body: JSON.stringify({ thumbnailName: `${thumbnailFullName}` }),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch thumbnail: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0].url;
};
async function ProductButton({
  product,
}: ProductCardProps): Promise<React.JSX.Element> {
  // fetch the product thumbnail
  const url = await getProductThumbnails(product.product_imagepath_small);
  return (
    <button>
      <p>{product.product_id}</p>
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
