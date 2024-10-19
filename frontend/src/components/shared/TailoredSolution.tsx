"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CARDIMAGE1, CARDIMAGE2, CARDIMAGE3, SECURITY } from '@/public';

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: any;
  bgcolor: string;
  accentColor: string;
}

const cardsData: CardData[] = [
  {
    title: "You strive for the best we handle the rest",
    subtitle: "Effortless Growth",
    description: "Boost your brand effortlessly! Simplify subscriptions, enhance loyalty, and unlock revenue with our seamless integration. Join us and elevate your growth today!",
    imageUrl: CARDIMAGE1,
    bgcolor: "bg-[#0F172A]",
    accentColor: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "Revolutionize User Engagement",
    subtitle: "Marketplace Connect",
    description: "Still using emails for updates in 2024? Upgrade to your personalized marketplace for tailored notifications and instant updates on your latest offerings!",
    imageUrl: SECURITY,
    bgcolor: "bg-[#1E1B4B]",
    accentColor: "from-blue-500 to-cyan-500"
  },
  {
    title: "Unlock revenue growth with User Privacy",
    subtitle: "Privacy focused growth",
    description: "Effortlessly manage premium subscriptions with our user-friendly dashboard. Track performance, optimize operations, and enhance revenue—all while maintaining user privacy and trust.",
    imageUrl: CARDIMAGE3,
    bgcolor: "bg-[#0F2942]",
    accentColor: "from-emerald-500 to-teal-500"
  },
  {
    title: "Make invoices anytime,anywhere",
    subtitle: "Marketplace Connect",
    description: "Create invoices in one click and manage subscription inflows effortlessly. Generate subscription reports weekly, monthly, quarterly, or annually with ease.",
    imageUrl: CARDIMAGE2,
    bgcolor: "bg-[#1F1720]",
    accentColor: "from-rose-500 to-pink-500"
  },
];

const Card: React.FC<CardData & { index: number }> = ({ 
  title, 
  subtitle, 
  description, 
  imageUrl, 
  index, 
  bgcolor,
  accentColor 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden mb-8 sm:mb-12 ${bgcolor} border border-gray-800 hover:border-gray-700 transition-all duration-300 group`}
    >
      <div className={`w-full md:w-1/2 p-6 sm:p-8 md:p-12 ${isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className={`bg-gradient-to-r ${accentColor} p-[1px] rounded-full w-fit`}>
            <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-900 bg-clip-text bg-gradient-to-r ${accentColor} text-xs sm:text-sm font-semibold`}>
              {subtitle}
            </span>
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.6 }}
        className={`w-full md:w-1/2 h-60 sm:h-72 md:h-[400px] relative ${isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        <div className={`absolute inset-0 bg-gradient-to-r ${accentColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
};

const TailoredSolutions: React.FC = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6 px-4"
      >
        <div className="space-y-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-base sm:text-lg font-semibold">
            Transform Your Business
          </span>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-caveat">
            Ignite Your Growth: Tailored Solutions for Businesses
          </h1>
        </div>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Discover powerful tools and solutions designed to elevate your business to new heights
        </p>
      </motion.div>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 lg:px-24">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TailoredSolutions;