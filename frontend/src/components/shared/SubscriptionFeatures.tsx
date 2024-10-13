"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  bgColor: string;
  textColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, direction, bgColor, textColor }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card className={`overflow-hidden ${bgColor} hover:shadow-lg transition-shadow duration-300`}>
        <CardHeader>
          <CardTitle className={`${textColor} text-lg font-bold`}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${textColor} mb-4`}>{description}</p>
          <motion.div
            className="relative h-32 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SubscriptionFeatures: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        Transform the<br />way you manage<br />subscriptions.
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
        <FeatureCard
          title="Family mode & Gift subscriptions"
          description="Parents can easily manage kids' subscriptions, top up wallets, and gift personalized subscriptions."
          imageUrl="/images/family.png"
          direction="left"
          bgColor="bg-gradient-to-tr from-[#241919] to-[#340054]"
          textColor="text-white"
        />
        <FeatureCard
          title="Streamlined Subscription Management"
          description="Effortlessly track, renew, and manage subscriptions with one unified platform."
          imageUrl="/images/management.png"
          direction="top"
          bgColor="bg-gradient-to-bl from-[#070A4E] to-[#2082B9]"
          textColor="text-white"
        />
        <FeatureCard
          title="Earn rewards"
          description="Unlock rewards for every subscription managed effortlessly through our platform."
          imageUrl="/images/rewards.png"
          direction="right"
          bgColor="bg-gradient-to-br from-[#070A4E] to-[#2082B9]"
          textColor="text-white"
        />
        <FeatureCard
          title="Don't have compatible cards to subscribe? Don't worry!"
          description="No compatible card? No worries! Top up wallet via Debit cards, gift cards, or net banking"
          imageUrl="/images/cards.png"
          direction="left"
          bgColor="bg-purple-800"
          textColor="text-white"
        />
        <FeatureCard
          title="Your Data Our responsibility"
          description="Your data is yours alone, stored on secure blockchain, ensuring complete ownership and control."
          imageUrl="/images/security.png"
          direction="bottom"
          bgColor="bg-blue-800"
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default SubscriptionFeatures;