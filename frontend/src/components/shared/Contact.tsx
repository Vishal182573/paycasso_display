"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '../ui/button';
import { WOODENBG } from '@/public';

const PaycassoSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('/api/email', { email });

      if (response.status === 201) {
        setSuccessMessage('Email submitted successfully! You are on the waitlist.');
        setEmail('');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to submit email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnterpriseSignup = () => {
    console.log('Enterprise signup clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black w-full" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-5xl font-bold text-white text-center mb-16">
          Ready to join the revolution?
        </h1>
        <div className="flex flex-col md:flex-row gap-28">
          {/* User Signup Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-96 h-96 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={WOODENBG}
                alt="User background"
                layout="fill"
                objectFit="cover"
                // className="opacity-30"
                priority
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl text-center font-bold text-white mb-4">For Users</h2>
              <p className="text-gray-200 text-sm mb-8 text-center">
                Almost there! We are perfecting your experience—launching soon!
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-full bg-[#282c33] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-gray-500 font-semibold text-sm backdrop-blur-sm"
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="w-1/2 text-white bg-black/50 border-white font-semibold py-4 rounded-full transition duration-300 backdrop-blur-sm"
                  disabled={isSubmitting}
                >
                  Join the waitlist
                </Button>
              </form>
              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
          </motion.div>

          {/* Enterprise Signup Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full md:w-96 h-96 rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={WOODENBG}
                alt="Enterprise background"
                layout="fill"
                objectFit="cover"
                // className="opacity-30"
                priority
              />
            </div>
            <div className="relative z-10 flex  flex-col  justify-center items-center">
              <h2 className="text-2xl text-center font-bold text-white mb-4">For Enterprises</h2>
              <p className="text-gray-200 text-sm mb-8 text-center">
                Embrace the future of subscription payments Partner with us today!
              </p>
              <input
                type="email"
                placeholder="Enter your Email..."
                className="w-full p-3 rounded-full bg-[#282c33] text-white placeholder-gray-400 font-semibold text-sm border-none focus:ring-2 focus:ring-gray-500 mb-6 backdrop-blur-sm"
              />
              <Button
                variant="outline"
                onClick={handleEnterpriseSignup}
                className="w-1/2 text-white bg-black/50 font-semibold py-4 rounded-full transition duration-300 backdrop-blur-sm"
              >
                Join the waitlist
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaycassoSignup;