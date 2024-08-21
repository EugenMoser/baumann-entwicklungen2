// async function fetchDetails(id: string): Promise<ProductDetails> {
//   const response: Response = await fetch(getProductDetails, {
//     method: 'POST',
//     body: JSON.stringify({ productId: id }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch product details ${response.statusText}`
//     );
//   }

//   const { data } = await response.json();
//   return data;
// }

// export default fetchDetails;
