// app/api/email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail'; // Adjust path as needed
import generateCode from '@/utils/otp'; // Adjust path as needed
import mongoose, { Schema, model } from 'mongoose';
import { connectToDatabase } from '@/lib/db';


// Define Mongoose Schema and Model
interface IEmailVerification {
    email: string;
    code: string;
    expiresAt: Date;
}

const EmailVerificationSchema = new Schema<IEmailVerification>({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true, expires: '60s' } //TTL index
});

// Define TTL index for automatic deletion
// EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const EmailVerificationModel = mongoose.models.EmailVerification || model<IEmailVerification>('EmailVerification', EmailVerificationSchema);

// Handler for sending the verification email
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const code = generateCode();

        // Construct HTML email
        const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Paycasso Verification Code</title>
      <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .container {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 30px;
        text-align: center;
      }
      .logo {
        color: #2c3e50;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo img {
        height: 40px;
        margin-right: 10px;
      }
      .code-container {
        background-color: #f0f4f8;
        border: 2px solid #3498db;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #2c3e50;
      }
      .instructions {
        color: #34495e;
        font-size: 14px;
        margin-top: 20px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #7f8c8d;
        text-align: center;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          Paycasso
        </div>
        <p>Your verification code is ready for retrieval.</p>

        <div class="code-container">
          ${code}
        </div>

        <div class="instructions">
          <p>Enter this code on our platform.</p>
          <p><strong>Note:</strong> This code will expire after 60 seconds.</p>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Paycasso. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;

        // Send the email
        await sendEmail({
            to: email,
            subject: 'Paycasso Email Verification',
            html: html,
        });

        await connectToDatabase(); // Connect to the database

        // Delete existing entry if exists to prevent duplicates
        await EmailVerificationModel.deleteOne({ email });

        // Store the verification code in MongoDB with expiration
        const expiresAt = new Date(Date.now() + 60000); // Expires in 60 seconds
        const newVerification = new EmailVerificationModel({
            email,
            code,
            expiresAt,
        });
        await newVerification.save();

        return NextResponse.json({ message: 'Verification email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending verification email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handler for validating the OTP code
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const email = searchParams.get('email')
        const code = searchParams.get('code');

        if (!email || !code) {
            return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
        }

        await connectToDatabase(); // Connect to the database

        const verificationEntry = await EmailVerificationModel.findOne({
            email,
            code,
            expiresAt: { $gt: new Date() }, // Check if not expired (redundant, TTL index handles this)
        });

        if (verificationEntry) {
            // Code is valid, delete the entry
            await EmailVerificationModel.deleteOne({ email });
            return NextResponse.json({ message: 'Code verified successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid code or email' }, { status: 400 });
        }

    } catch (error) {
        console.error('Error validating code:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

