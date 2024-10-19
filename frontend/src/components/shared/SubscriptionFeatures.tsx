"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { CARDIMAGE1, CARDIMAGE2, CARDIMAGE3, CARDIMAGE4, CARDIMAGE5 } from '@/public';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: any;
  bgColor: string;
  gridArea: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, bgColor, gridArea }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${gridArea} ${bgColor} rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between h-full border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-sm mb-4 opacity-90">{description}</p>
      </div>
      <motion.div 
        className="mt-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={120}
          height={120}
          className="w-56 h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

const SubscriptionFeatures = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 ">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 text-center leading-tight font-caveat"
      >
        Transform the way you
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          manage subscriptions
        </span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        <FeatureCard
          title="Family mode & Gift subscriptions"
          description="Parents can easily manage kids' subscriptions, top up wallets, and gift personalized subscriptions."
          imageUrl={CARDIMAGE1}
          bgColor="bg-gradient-1"
          gridArea="col-span-1 md:col-span-2 lg:col-span-4 row-span-2"
        />
        <FeatureCard
          title="Streamlined Management"
          description="Effortlessly track, renew, and manage subscriptions with one unified platform."
          imageUrl={CARDIMAGE2}
          bgColor="bg-gradient-2"
          gridArea="col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
        />
        <FeatureCard
          title="Earn rewards"
          description="Unlock rewards for every subscription managed effortlessly through our platform."
          imageUrl={CARDIMAGE3}
          bgColor="bg-gradient-3"
          gridArea="col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
        />
        <FeatureCard
          title="No compatible card? No problem!"
          description="Top up wallet via Debit cards, gift cards, or net banking for seamless subscriptions."
          imageUrl={CARDIMAGE4}
          bgColor="bg-gradient-4"
          gridArea="col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
        />
        <FeatureCard
          title="Your Data, Your Control"
          description="Your data is yours alone, stored on secure blockchain, ensuring complete ownership and control."
          imageUrl={CARDIMAGE5}
          bgColor="bg-gradient-5"
          gridArea="col-span-1 md:col-span-1 lg:col-span-2 row-span-1"
        />
      </div>
    </div>
  );
};

export default SubscriptionFeatures;