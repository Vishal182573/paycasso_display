/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ChevronRight, RefreshCw, AlertCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";

interface WalletInfo {
  wallet: {
    address: string;
    usdcBalance: string;
  }
  email?: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

interface Transfer {
    id: string;
    destinationAddress: string;
    destinationUser: {
        wallet: {
            rewards: {
                amount: number;
                lastUpdated: string;
                _id: string;
                usdBalance: number;
                address: string;
            };
            _id: string;
            userId: string;
            name: string;
            email: string;
            imageUrl: string;
            faucet: {
                amount: number;
                _id: string;
                __v: number;
                assetId: string;
            };
        };
    };
    amount:number;
    transactionLink: string;
    status: string;
}


const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12 px-4">
      <div className="relative flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: currentStep >= index + 1 ? 1 : 0.8,
                opacity: currentStep >= index + 1 ? 1 : 0.5,
                backgroundColor: currentStep >= index + 1 ? "#6c5ce7" : "#e2e8f0"
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10"
            >
              {currentStep > index + 1 ? <Check size={20} /> : index + 1}
            </motion.div>
            {index < totalSteps - 1 && (
              <div
                className={`absolute h-1 top-5 z-0 ${index < Math.max(1, currentStep - 1)
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                  }`}
                style={{
                  left: `calc(${(index * 100) / (totalSteps - 1)}% + 2rem)`,
                  right: `calc(${100 - ((index + 1) * 100) / (totalSteps - 1)}% + 2rem)`
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [faucetStatus, setFaucetStatus] = useState<string>("");
  const [faucetError, setFaucetError] = useState<string>("");
  const [verificationOtp, setVerificationOtp] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
  });
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [showHistory, setShowHistory] = useState(false);


  useEffect(() => {
    if (isLoaded && !isSignedIn && currentStep > 1) {
      router.push("/sign-in?redirect_url=/howItWorks");
    } else if (isLoaded && isSignedIn && currentStep === 1) {
      // Auto-advance to step 2 if already signed in
      setCurrentStep(2);
      fetchWalletInfo();
    }
  }, [isLoaded, isSignedIn, router, currentStep]);

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
    if(walletInfo?.wallet.usdcBalance!="0"){
      setCurrentStep(3);
    }
  }, [walletInfo]);

  const copyToClipboard = () => {
    if (walletInfo?.wallet?.address) {
      navigator.clipboard.writeText(walletInfo.wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openCircleFaucet = () => {
    window.open('https://faucet.circle.com/', '_blank');
  };

  // const requestTestTokens = async () => {
  //   if (!walletInfo?.wallet.address) return;
  //   try {
  //     setIsLoading(true);
  //     setFaucetError("");

  //     const response = await fetch("/api/getToken", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         walletAddress: walletInfo.wallet.address
  //       })
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || "Failed to request tokens");
  //     }

  //     setFaucetStatus(`Successfully requested 10 USDC`);
  //     setCurrentStep(3);
  //   } catch (error) {
  //     console.error("Error requesting test tokens:", error);
  //     setFaucetError(error instanceof Error ? error.message : "Failed to request test tokens");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const initiateTestPayment = () => {
    // Open a new window for test payment
    window.open("/test-paycasso", "PaycassoCheckout", "width=800,height=600");

    // Move to the final step
    setCurrentStep(4);
  };

    const fetchTransfers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/wallet/transfers", {
              method: 'GET',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch transfers");
            }
            const data = await response.json();
            setTransfers(data);
        } catch (error) {
            console.error("Error fetching transfers:", error);
            setError("Failed to load transaction history.");
        } finally {
            setIsLoading(false);
        }
    };

  const verifyOtp = () => {
    // Simulate OTP verification
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (verificationOtp.length === 6) {
        setPaymentSuccess(true);
        setStatus("Payment successfully verified!");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1500);
  }; // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Step 1: Sign In</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Sign in or create an account to get started with your Paycasso wallet
            </p>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors"
              onClick={() => router.push("/sign")}
            > */}
            <SignInButton mode="modal" >
  <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors">
    Sign In
  </button>
</SignInButton>
            {/* </motion.button> */}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Step 2: Get Test USDC</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Request test USDC tokens to try out the Paycasso wallet features
            </p>
            {walletInfo ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8">
                <h3 className="text-lg font-semibold mb-4">Your Wallet Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-medium truncate">{walletInfo.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Wallet Address:</span>
                    <div className="flex items-center">
                      <p className="font-medium text-sm truncate mr-2">{walletInfo.wallet.address}</p>
                      <button
                        onClick={copyToClipboard}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        title="Copy wallet address"
                      >
                        {copied ? (
                          <span className="text-green-600 text-xs font-medium">Copied!</span>
                        ) : (
                          <Copy size={16} className="text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Balance:</span>
                    <p className="font-medium">{walletInfo.wallet.usdcBalance} USDC</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8 flex justify-center">
                <RefreshCw className="animate-spin text-indigo-600" />
              </div>
            )}

            {/* Info message about Circle faucet */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded w-full max-w-md mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    You can also get test USDC directly from Circle faucet. Copy your wallet address and paste it on the Circle website.
                  </p>

                </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors flex items-center"
                    onClick={openCircleFaucet}
                    disabled={isLoading || !walletInfo}
                  >
                    Open Circle Faucet <ExternalLink size={14} className="ml-1" />
                  </motion.button>
              </div>
            </div>

            {faucetStatus && (
              <div className="bg-green-100 text-green-700 p-4 rounded-md w-full max-w-md mb-4">
                {faucetStatus}
              </div>
            )}
            {faucetError && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md w-full max-w-md mb-4">
                {faucetError}
              </div>
            )}


          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Step 3: Test Paycasso Checkout</h2>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8">
              <h3 className="text-xl font-semibold">Test the Checkout</h3>
              <p className="text-gray-600 my-4">
                Test the Checkout by clicking the PAY WITH Paycasso button.
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li className="text-gray-700">This initiates a $1.00 payment.</li>
                <li className="text-gray-700">
                  Provide your phone number, email address, select your preferred payment method and
                  complete the payment.
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 text-white py-3 rounded-md font-medium flex items-center justify-center"
                onClick={initiateTestPayment}
              >
                Test Paycasso by sending 1 USDC to us
              </motion.button>
            </div>
          </div>
        );

      case 4:
          return (
              <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-6">Step 4: View Transfers</h2>
                  <div className="flex flex-col items-center justify-center">
                      <motion.div
                          className="text-green-600 rounded-full bg-green-100 p-3 mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                      >
                          <Check size={48} />
                      </motion.div>
                      <p className="text-gray-600 mb-8 text-center max-w-md">
                          Check Status of your transaction
                      </p>
                      <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-colors mb-4"
                          onClick={() => {
                              fetchTransfers();
                              setShowHistory(true);
                          }}
                          disabled={isLoading}
                      >
                          {isLoading ? (
                              <RefreshCw className="animate-spin" size={20} />
                          ) : (
                              "Show Transaction History"
                          )}
                      </motion.button>

                      {showHistory && (
                          <div className="w-full max-w-3xl">
                              <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                              {transfers.length > 0 ? (
                                  <div className="overflow-x-auto">
                                      <table className="min-w-full bg-white rounded-lg shadow-md">
                                          <thead className="bg-gray-50">
                                              <tr>
                                                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      ID
                                                  </th>
                                                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Destination
                                                  </th>
                                                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Amount
                                                  </th>
                                                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Status
                                                  </th>
                                                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Link
                                                  </th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {transfers.map((transfer, index) => (
                                                  <tr key={transfer.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{transfer.id}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{transfer.destinationAddress}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{transfer.amount}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{transfer.status}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                                                          <a href={transfer.transactionLink} target="_blank" rel="noopener noreferrer">
                                                              View on Explorer
                                                          </a>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </table>
                                  </div>
                              ) : (
                                  <p>No transactions found.</p>
                              )}
                          </div>
                      )}
                  </div>
              </div>
          );

      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">How It Works</h1>

          <StepIndicator currentStep={currentStep} totalSteps={4} />

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-12">
            {renderStep()}
          </div>

          {currentStep > 1 && currentStep < 4 && (
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-indigo-600 font-medium flex items-center hover:underline"
              >
                <ChevronRight className="rotate-180 mr-1" size={18} />
                Previous Step
              </button>

              {currentStep < 3 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="text-indigo-600 font-medium flex items-center hover:underline"
                  disabled={currentStep === 2 && !faucetStatus}
                >
                  Next Step
                  <ChevronRight className="ml-1" size={18} />
                </button>
              )}
            </div>
          )}
             {currentStep === 4 && (
                <div className="flex justify-start">
                    <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-indigo-600 font-medium flex items-center hover:underline"
                    >
                        <ChevronRight className="rotate-180 mr-1" size={18} />
                        Previous Step
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
