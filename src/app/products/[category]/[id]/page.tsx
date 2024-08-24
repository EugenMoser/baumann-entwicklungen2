'use client';
import {
  useEffect,
  useState,
} from 'react';

import { notFound } from 'next/navigation';
import useSWR from 'swr';

import {
  getProductDetails,
  getProductImages,
} from '@/lib/endpoints';
import {
  ImagesArrayProps,
  ProductProps,
} from '@/src/common/types';
import ProductDescription from '@/src/container/ProductSections/description';
import Article from '@/src/container/ProductSections/ProductVariant/articles';

interface ProductDetailsProps {
  params: { id: number };
}

const fetcherDetails = async (url: string, id: number) => {
  const response: Response = await fetch(url, {
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
  return data;
};

const fetcherImage = async (url: string, imageName: string) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ imageName: imageName.split('.')[0] }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch image ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

function ProductDetails({ params }: ProductDetailsProps): JSX.Element {
  const numberId: number = Number(params.id);
  const placeholderImage: string[] = ['/images/placeholder.jpg'];
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useSWR([getProductDetails, numberId], ([url, numberId]) =>
    fetcherDetails(url, numberId)
  );

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageArray: string[] = [
    productData?.product_imagepath_big1,
    productData?.product_imagepath_big2,
    productData?.product_imagepath_big3,
  ].filter((image: string) => !!image);

  const {
    data: imagesData,
    error: imageError,
    isLoading: imageIsLoading,
  } = useSWR(
    imageArray.length ? [getProductImages, imageArray] : null,
    async ([url, imageArray]) => {
      const fetchedImages: string[] = await Promise.all(
        imageArray.map((image) => fetcherImage(url, image))
      );
      //if no images are found, return placeholder image
      return fetchedImages.length > 0 ? fetchedImages : placeholderImage;
    }
  );
  console.log('imagesData', imagesData);
  useEffect(() => {
    if (imagesData) {
      setImageUrls(imagesData);
    }
  }, [imagesData]);

  if (productIsLoading) {
    return <h2>Loading Product Details...</h2>;
  }

  if (productError) {
    notFound();
  }

  if (imageError) {
    console.error('Error fetching images:', imageError);
  }

  const {
    product_name: name,
    product_description1: description1,
    product_description2: description2,
    product_description3: description3,
    product_description4: description4,
    product_material: material,
  } = productData as ProductProps;

  const formattedImages: ImagesArrayProps[] = imageUrls.map(
    (imageUrl: string) => ({
      original: imageUrl,
      thumbnail: imageUrl,
      originalAlt: `Ein Bild von ${name}`,
    })
  );

  const descriptionSection = {
    description2,
    description3,
    description4,
    material,
    imageIsLoading,
    images: formattedImages,
  };

  return (
    <main>
      <h1>{name}</h1>
      {description1 && <p>{description1}</p>}
      <ProductDescription descriptionSection={descriptionSection} />
      <Article articleSection={productData?.article} />
    </main>
  );
}

export default ProductDetails;
