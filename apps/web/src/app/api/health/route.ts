import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'SolfaMe Web API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not implemented yet' },
    { status: 501 }
  );
}
