/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

interface WalletInfo {
    wallet: {
      address: string;
      usdcBalance: string;
    }
    email?: string;
}

const PaymentPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

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
      setError("Failed to load wallet information");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
        fetchWalletInfo();
    }, []);

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: walletInfo?.email }),
      });
      if (response.ok) {
        setIsEmailSent(true);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email');
    }
  };

  const verifyOtp = async () => {
    if (!walletInfo?.email || !otp) {
      setError('Email and OTP are required');
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await fetch(`/api/sendEmail?email=${encodeURIComponent(walletInfo.email)}&code=${encodeURIComponent(otp)}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify OTP');
      }
  
      const result = await response.json();
      setIsVerified(true);
      setStatus('OTP verified successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setError('');

    try {
      setIsLoading(true);
      const response = await fetch('/api/wallet/transfer-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset: 'usdc',
          data: {
            recipient: '0x4Ce9d4bD9AAB93751d187F4058c3434c57D917a7',
            amount: 1,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Transfer failed');
      }

      setStatus(`Transfer successful! Status: ${result.status}`);
      // Close the window after successful payment
      window.close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paycasso Payment</h1>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Subscribe to Paycasso</h2>
          <p className="mb-4">Pay $1 worth of USDC for Paycasso subscription</p>
          
          {!isEmailSent && (
            <div className="mb-4 flex justify-center items-center">
              <button
                onClick={sendEmail}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Pay 1$
              </button>
            </div>
          )}

          {isEmailSent && !isVerified && (
            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={verifyOtp}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Verify OTP
              </button>
            </div>
          )}

          {isVerified && (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {isLoading ? 'Processing...' : 'Pay $1 USDC'}
            </button>
          )}

          {status && <p className="mt-4 text-green-600">{status}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
