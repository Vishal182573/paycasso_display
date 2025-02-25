/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User.model";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

import path from 'path';

// Update the interface to match the controller
// interface AssetTransferRequest {
//   body: {
//     asset: string;
//     data: {
//       recipient: string;
//       amount: number;
//     };
//   };
// }

const apiKeyPath = path.join(process.cwd(), 'src/lib/coinbase.service/cdp_api_key.json');
// const cb = Coinbase.configureFromJson({ 
//   filePath: apiKeyPath, 
//   useServerSigner: true 
// });

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Parse request body and validate in one step
    const { asset, data } = await req.json();
    const { recipient, amount } = data;

    if (!asset || !data || !recipient || !amount) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Find user first
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check wallet exists
    if (!user.wallet?.id) {
      return NextResponse.json(
        { error: "Wallet not found" },
        { status: 404 }
      );
    }
    let destination = await UserModel.findOne({ email: recipient });
    
    const wallet = await Wallet.fetch(user.wallet.id as string);
    // Then fetch wallet using client
    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet not found" },
        { status: 404 }
      );
    }
    // Asset validation and balance check
    if (asset === Coinbase.assets.Usdc) {
      const balance = await wallet.getBalance(asset);
      if (balance.lessThan(amount)) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Unsupported asset" },
        { status: 400 }
      );
    }
    const transfer = await (await wallet.createTransfer({
      amount: amount,
      assetId: asset,
      destination: destination && destination.wallet?.address
        ? destination.wallet.address
        : recipient,
      gasless: asset === Coinbase.assets.Usdc,
    })).wait({ timeoutSeconds: 30 });

    return NextResponse.json({
      transactionLink: transfer.getTransactionLink(),
      status: transfer.getStatus()
    });

  } catch (error) {
    console.error("[api/wallet/transfer-asset] Transfer Failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}