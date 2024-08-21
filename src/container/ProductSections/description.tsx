'use client';
import 'react-image-gallery/styles/css/image-gallery.css';

import ImageGallery from 'react-image-gallery';

import { ImagesArrayProps } from '@/src/common/types';

interface ProductdescriptionSection {
  descriptionSection: {
    description2?: string;
    description3?: string;
    description4?: string;
    material?: string;
    imageIsLoading: boolean;
    images: ImagesArrayProps[];
  };
}

function ProductDescription({
  descriptionSection,
}: ProductdescriptionSection): JSX.Element {
  console.log(
    'descriptionSection.images',
    descriptionSection.images.length
  );

  return (
    <section className='border-2 border-black'>
      {descriptionSection.description2 && (
        <p>{descriptionSection.description2}</p>
      )}
      {descriptionSection.description3 && (
        <p>{descriptionSection.description3}</p>
      )}
      {descriptionSection.description4 && (
        <p>{descriptionSection.description4}</p>
      )}
      <p>{descriptionSection.material}</p>
      <div className='border-solid border-2 border-black'>
        {descriptionSection.imageIsLoading ? (
          <p>image gallery is loading</p>
        ) : (
          <ImageGallery
            items={descriptionSection.images}
            showBullets={false}
            showThumbnails={
              descriptionSection.images.length > 0 ? true : false
            }
            showPlayButton={false}
            slideDuration={300}
            showFullscreenButton={false}
            showNav={descriptionSection.images.length > 0 ? true : false}
          />
        )}
      </div>
    </section>
  );
}

export default ProductDescription;
