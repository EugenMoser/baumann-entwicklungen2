import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/db/client';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { category } = (await request.json()) as { category: string };

  if (!category) {
    return NextResponse.json(
      { error: 'Category parameter is missing' },
      { status: 400 }
    );
  }

  try {
    const productCategory = await prisma.product.findMany({
      select: {
        product_id: true,
        category: true,
        product_name: true,
        product_description1: true,
        product_imagepath_small: true,
      },
      where: {
        category: category,
      },
    });

    return NextResponse.json({ data: productCategory });
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
