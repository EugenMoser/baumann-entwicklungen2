import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProductDetails } from '@/lib/endpoints';
import { Product } from '@/src/common/types';

interface ProductDetailsProps {
  params: { id: number };
}

//todo Funktion z,B, in src/service/detailsService.ts auslagern
const getDetails = async (id: number): Promise<Product> => {
  const response: Response = await fetch(getProductDetails, {
    method: 'POST',
    body: JSON.stringify({ productId: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product details ${response.statusText}`
    );
  }

  const { data } = await response.json();
  console.log('Fetched product DETAILS', data);
  return data;
};

async function ProductDetails({
  params,
}: ProductDetailsProps): Promise<JSX.Element> {
  // fetch the product details
  const numberId: number = Number(params.id);
  const product: Product = await getDetails(numberId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <h1>ProductDetails</h1>
      <p>Params ID -{params.id}-</p>

      <p>PRODUCT ID -{product.product_id}-</p>
      <p>PRODUCT NAME{product.product_name}</p>
    </>
  );
}

export default ProductDetails;
