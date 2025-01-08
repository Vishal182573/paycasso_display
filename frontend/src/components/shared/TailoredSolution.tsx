"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BITCOIN, CENTERETHERBG, CENTERETHERIUM, ETHERIUM, SOLANA, TETHER } from '@/public';

const WalletVision = () => {
  return (
    <div className="min-h-screen w-full bg-black pt-48 px-4 relative">
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Header Text */}
        <div className="mb-16 space-y-4">
          <h2 className="text-gray-400 text-lg uppercase tracking-wider">
            OUR VISION
          </h2>
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            One wallet for
            <br />
            all your subscriptions
          </h1>
        </div>

        {/* Central Logo Container */}
        <div className="relative w-full max-w-xl mx-auto aspect-square">
          {/* Floating Currency Icons */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-[80px] left-[-80px] transform -translate-x-1/2"
          >
            <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center">
              <Image
                src={BITCOIN}
                alt="Bitcoin"
                width={80}
                height={80}
                className="text-white"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              transition: {
                duration: 4,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute  top-[40px] right-[-80px]"
          >
            <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center">
              <Image
                src={TETHER}
                alt="tether"
                width={80}
                height={80}
                className="text-white"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 4,
                delay: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-1/2 left-[-120px] transform -translate-x-1/2"
          >
            <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center">
              <Image
                src={ETHERIUM}
                alt="etherium"
                width={80}
                height={80}
                className="text-white"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              transition: {
                duration: 4,
                delay: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute top-1/2 right-[-80px]"
          >
            <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center">
              <Image
                src={SOLANA}
                alt="Bitcoin"
                width={80}
                height={80}
                className="text-white"
              />
            </div>
          </motion.div>

          <motion.div className="absolute inset-0 m-auto w-96 h-96 flex items-center justify-center animate-pulse ease-in-out " 
                >
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={CENTERETHERBG}
                alt="Ethereum Background"
                layout="fill"
                objectFit="contain"
                className="z-0"
              />
              {/* Foreground Logo */}
              <Image
                src={CENTERETHERIUM}
                alt="Ethereum Logo"
                layout="fill"
                objectFit="contain"
                className="z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalletVision;