import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/db/client';

export const dynamic = 'force-static';
export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    const convertedProductId: number = Number(productId);

    // validation
    if (!convertedProductId) {
      return NextResponse.json(
        { error: 'Invalid or missing product id parameter' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        product_id: convertedProductId,
      },

      include: {
        article: {
          select: {
            article_id: true,
            product_id: false,
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

    const formattedProduct = {
      ...product,
      colors:
        product &&
        product.product_color_connection.map((connection) => ({
          color_id: connection.color.color_id,
          color_name: connection.color.color_name,
          color_code: connection.color.color_code,
          color_suffix: connection.color_suffix,
        })),
    };

    // Remove the product_color_connection property from the response
    const { product_color_connection, ...cleanedProduct } =
      formattedProduct;

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: cleanedProduct });
  } catch (err) {
    return NextResponse.error();
  } finally {
    prisma.$disconnect();
  }
}
