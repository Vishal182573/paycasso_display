"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { PHONE } from '@/public';

const PaycassoIntro = () => {
  const handleJoinNow = () => {
    console.log("Join Now clicked!");
    // Add your join now logic here
  };

  return (
    <div className="text-white min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-48 py-12 lg:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full space-y-6 mb-12 lg:mb-0"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl lg:text-2xl font-semibold text-gray-300"
        >
          Introducing Paycasso
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl lg:text-6xl font-extrabold leading-tight"
        >
          Make paying
          <br />
          Easier with wallet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg lg:text-xl text-gray-300"
        >
          Manage all your subscriptions from your fingertips
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            onClick={handleJoinNow}
            className="bg-[#5d00ff] hover:bg-[#4b00cc] text-white font-semibold py-4 px-6 lg:p-6 rounded-lg text-base lg:text-lg transition-colors duration-300"
          >
            Join Now
          </Button>
        </motion.div>
      </motion.div>
      {/* Animate the image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="w-full lg:w-auto flex justify-center lg:justify-start"
      >
        <Image 
          src={PHONE} 
          alt='phone logo' 
          width={200} 
          height={1000} 
          className='w-64 lg:w-80'
        />
      </motion.div>
    </div>
  );
};

export default PaycassoIntro;