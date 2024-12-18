"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

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
        setEmail(''); // Clear the input field
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to submit email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnterpriseSignup = () => {
    console.log('Enterprise signup clicked');
    // Additional enterprise signup logic can go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" id='contact'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-lg overflow-hidden"
      >
        <h1 className="text-3xl font-bold text-white text-center py-6 font-caveat">
          Ready to start with Paycasso?
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-28 space-y-8 md:space-y-0">
          {/* User Signup Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-1/2 px-14 bg-opacity-20 bg-gradient-6 rounded-2xl md:h-[50vh] flex flex-col justify-between items-center pb-16 pt-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">For Users</h2>
            <p className="text-indigo-200 mb-4">
              We are working hard to deliver the best experience for you. Our software launch is just around the corner!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-3xl bg-gradient-7 text-white placeholder-indigo-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-2xl transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Join the waitlist'}
              </button>
            </form>
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </motion.div>

          {/* Enterprise Signup Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full md:w-1/2 bg-opacity-30 bg-gradient-6 rounded-2xl md:h-[50vh] flex flex-col justify-between items-center pb-16 pt-8 px-14"
          >
            <h2 className="text-3xl font-bold text-white mb-4">For Enterprises</h2>
            <p className="text-indigo-200 mb-4">
              Embrace the future of subscription payments—Partner with us today!
            </p>
            <button
              onClick={handleEnterpriseSignup}
              className="w-full bg-gradient-7 hover:bg-gradient-5 text-white font-semibold py-2 rounded-2xl transition duration-300 mb-4"
            >
              Signup Now
            </button>
            <div className="text-indigo-200">
              <p className="mb-2">Have queries?</p>
              <p>Contact Us:</p>
              <p>info.paycasso@gmail.com</p>
              <p>+91 9876543210</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaycassoSignup;
