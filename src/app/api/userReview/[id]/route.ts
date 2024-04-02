
import { getRoomReviews } from '@/lib/apis';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'Successfully',
    });
  } catch (error) {
    console.log('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}