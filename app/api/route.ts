// app/api/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}


export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'Data received', data: body }, { status: 201 });
}
