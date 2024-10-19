import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import Email from '@/models/Email';

export async function GET() {
  try {
    await connectMongo();
    const emails = await Email.find();
    return NextResponse.json({ success: true, data: emails }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const newEmail = await Email.create({ email });
    return NextResponse.json(
      { success: true, data: newEmail },
      { status: 201 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}