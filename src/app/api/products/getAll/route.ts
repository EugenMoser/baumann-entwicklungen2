import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/db/client';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        article: {
          select: {
            article_id: true,
            product_id: true,
            article_prio: true,
            article_number: true,
            article_name: true,
            article_description: true,
            article_description1: true,
            article_description2: true,
            article_description3: true,
            vpe1: true,
            vpe2: true,
            vpe3: true,
            vpe4: true,
          },
        },
        product_color_connection: {
          select: {
            color_suffix: true,
            color: {
              select: {
                color_id: true,
                color_name: true,
                color_code: true,
              },
            },
          },
          orderBy: {
            color_suffix: 'asc',
          },
        },
      },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      colors: product.product_color_connection.map((connection) => ({
        color_id: connection.color.color_id,
        color_name: connection.color.color_name,
        color_code: connection.color.color_code,
        color_suffix: connection.color_suffix,
      })),
    }));

    // Remove the product_color_connection property from the response
    const cleanedProducts = formattedProducts.map(
      ({ product_color_connection, ...rest }) => rest
    );

    return NextResponse.json({ data: cleanedProducts });
  } catch (err) {
    return NextResponse.error();
  } finally {
    prisma.$disconnect();
  }
}
