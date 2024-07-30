'use client';
interface TestProps {
  products: string | undefined;
}

function Test({ products }: TestProps): JSX.Element {
  console.log('products at client', products);
  return (
    <>
      <h1>TEST</h1>
      {/* <ul>
        {promisedProducts.map((product, index) => (
          <li key={index}>
            <h2>-------{product.product_id}</h2>
            <ul>
              {product.colors.map((color: any, index: number) => (
                <li key={index}>
                  <h3>{color.color_name}</h3>
                  <p>{color.color_id}</p>
                </li>
              ))}
            </ul> 
          </li>
        ))}
      </ul>*/}
    </>
  );
}

export default Test;
