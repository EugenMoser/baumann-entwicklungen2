const fetcherThumbnails = async (
  url: string,
  thumbnailFullName: string
) => {
  const response: any = await fetch(url, {
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

export default fetcherThumbnails;
