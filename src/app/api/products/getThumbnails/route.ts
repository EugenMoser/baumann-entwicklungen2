import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/db/client';
import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { thumbnailName } = await request.json();
  const baseThumbnailName = thumbnailName.split('.')[0];

  try {
    // if no thumbnail name is provided
    if (!thumbnailName) {
      return NextResponse.json(
        { error: 'Thumbnail name is missing' },
        { status: 400 }
      );
    }
    const blobs = await list({
      prefix: `tumbnails/${baseThumbnailName}`,
    });

    // if no image / blob is found
    if (blobs === undefined) {
      return NextResponse.json(
        { error: `Blob is missing by thumbnail: ${baseThumbnailName}` },
        { status: 400 }
      );
    }

    // if more than one image / blob is found
    if (blobs.blobs.length > 1) {
      return NextResponse.json(
        { error: `More than one image / blob: ${baseThumbnailName}` },
        { status: 400 }
      );
    }

    return NextResponse.json(blobs.blobs);
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
