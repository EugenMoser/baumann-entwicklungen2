const fetcherImages = async (url: string, imageName: string) => {
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

export default fetcherImages;
