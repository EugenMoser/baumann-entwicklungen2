export const getAll =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/products/getAll';

export const getCategory =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/products/getCategory';

export const getThumbnails =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/products/getThumbnails';

export const getProductDetails =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/products/getDetails';

export const getProductImages =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/products/getImages';
