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

export default fetcherDetails;
