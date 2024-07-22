import { sql } from '@vercel/postgres';

export default async function Home({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from product`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.product_id}>{row.category}</div>
      ))}
    </div>
  );
}
