"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GradientButton = () => {
  return (
    <motion.button
      className="overflow-hidden rounded-full bg-gradient-8 text-white px-6 py-3 font-semibold flex justify-center items-center space-x-3 mb-8"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">See you on the <span className='text-blue-500'>other side!!</span></span>
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-indigo-600"
        initial={{ x: '100%' }}
        whileHover={{ x: 0 }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      />
      <span className="rounded-2xl flex justify-between items-center space-x-2 bg-white text-black text-sm px-3 py-1">
      Explore Now
        <ArrowRight className='w-5'/>
      </span>
    </motion.button>
  );
};

export default GradientButton;