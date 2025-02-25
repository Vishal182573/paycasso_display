/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { UserButton, useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

interface WalletInfo {
  address: string;
  balance: string;
  email?: string;
}

const NavbarUser = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchWalletInfo();
    }
  }, [isLoaded, isSignedIn]);

  const fetchWalletInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/wallet/user");
      if (!response.ok) {
        throw new Error("Failed to fetch wallet information");
      }
      const data = await response.json();
      setWalletInfo(data);
    } catch (error) {
      console.error("Error fetching wallet info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>;
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal" >
        <button className="bg-gray-700 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors font-bold border-white">
          Sign In
        </button>
      </SignInButton>
    );
  }

  return (
    <div className="flex items-center">
      {isLoading ? (
        <RefreshCw className="animate-spin text-white mr-2" size={16} />
      ) : (
        walletInfo && (
          <div className="mr-3 text-right hidden md:block">
            <p className="text-white text-sm">{walletInfo.email}</p>
            <p className="text-gray-300 text-xs">
              Balance: {walletInfo.balance} USDC
            </p>
          </div>
        )
      )}
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "h-8 w-8"
          }
        }}
      />
    </div>
  );
};

export default NavbarUser;