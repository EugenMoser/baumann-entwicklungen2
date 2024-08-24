import { CategoryProps } from '@/src/common/types';

const fetcherCategory = async (url: string, category: string) => {
  const response: Response = await fetch(url, {
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

export default fetcherCategory;
