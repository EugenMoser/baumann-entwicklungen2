import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/db/client';
import { list } from '@vercel/blob';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
  const { imageName } = await request.json();

  try {
    // if no image name is provided
    if (!imageName) {
      return NextResponse.json(
        { error: 'Image name is missing' },
        { status: 400 }
      );
    }
    const blobs = await list({
      prefix: `images/${imageName}`,
    });

    // if more than one image / blob is found
    if (blobs.blobs.length > 1) {
      return NextResponse.json(
        { error: `More than one image / blob: ${imageName}` },
        { status: 400 }
      );
    }
    return NextResponse.json(blobs.blobs[0].url);
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
