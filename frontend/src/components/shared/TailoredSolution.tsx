"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CARDIMAGE1, CARDIMAGE2, CARDIMAGE3 } from '@/public';

// Define the structure for our card data
interface CardData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: any;
}

// Sample data array
const cardsData: CardData[] = [
  {
    title: "You strive for the best we handle the rest",
    subtitle: "Effortless Growth",
    description: "Boost your brand effortlessly! Simplify subscriptions, enhance loyalty, and unlock revenue with our seamless integration. Join us and elevate your growth today!",
    imageUrl: {CARDIMAGE1} 
  },
  {
    title: "You strive for the best we handle the rest",
    subtitle: "Effortless Growth",
    description: "Boost your brand effortlessly! Simplify subscriptions, enhance loyalty, and unlock revenue with our seamless integration. Join us and elevate your growth today!",
    imageUrl: {CARDIMAGE2} 
  },
  {
    title: "You strive for the best we handle the rest",
    subtitle: "Effortless Growth",
    description: "Boost your brand effortlessly! Simplify subscriptions, enhance loyalty, and unlock revenue with our seamless integration. Join us and elevate your growth today!",
    imageUrl: {CARDIMAGE3} 
  },
];

const Card: React.FC<CardData & { index: number }> = ({ title, subtitle, description, imageUrl, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-center bg-gray-900 rounded-lg overflow-hidden mb-8 bg-gradient-1"
    >
      <div className={`w-full md:w-1/2 p-8 ${isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-yellow-400 text-sm font-semibold"
        >
          {subtitle}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white text-3xl font-bold mt-2 mb-4"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400"
        >
          {description}
        </motion.p>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className={`w-full md:w-1/2 h-64 ${isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}
      >
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className='w-24'
        />
      </motion.div>
    </motion.div>
  );
};

const TailoredSolutions: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-4xl font-bold text-center mb-12"
      >
        Ignite Your Growth: Tailored Solutions for Businesses
      </motion.h1>
      <div className="max-w-6xl mx-auto">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TailoredSolutions;