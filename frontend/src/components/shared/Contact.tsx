"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaycassoSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted email:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-lg overflow-hidden"
      >
        <h1 className="text-3xl font-bold text-white text-center py-6">Ready to start with Paycasso?</h1>
        <div className="flex flex-col md:flex-row md:space-x-28 space-y-8 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-1/2 px-14 bg-opacity-20 bg-gradient-6 rounded-2xl md:h-[50vh] flex flex-col justify-between items-center pb-16 pt-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">For Users</h2>
            <p className="text-indigo-200 mb-4">
              "We're working hard to deliver the best experience for you. Our software launch is just around the corner!"
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
              >
                Join the waitlist
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full md:w-1/2 bg-opacity-30 bg-gradient-6 rounded-2xl md:h-[50vh] flex flex-col justify-between items-center pb-16 pt-8 px-14"
          >
            <h2 className="text-3xl font-bold text-white mb-4">For Enterprises</h2>
            <p className="text-indigo-200 mb-4">
              "Embrace the future of subscription payments—Partner with us today!"
            </p>
            <button
              onClick={() => console.log('Enterprise signup clicked')}
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