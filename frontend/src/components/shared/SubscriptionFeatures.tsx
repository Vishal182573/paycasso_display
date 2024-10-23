"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { CARDIMAGE1, CARDIMAGE2, CARDIMAGE3, CARDIMAGE4, CARDIMAGE5 } from '@/public';
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from '../ui/text-generate-effect';

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}>
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  imageUrl: any;
  bgColor: string;
  index:number;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  imageUrl,
  bgColor,
  index
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-700",
        className
      )}
    >
      <div className={`${bgColor} absolute inset-0 transition-all duration-300`} />
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <TextGenerateEffect words={description}/>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4"
        >
          {
            index==0?<Image
            src={imageUrl}
            alt={title}
            width={120}
            height={120}
            className="w-96 h-auto object-contain transform transition-transform group-hover:scale-105"
          />:<Image
          src={imageUrl}
          alt={title}
          width={120}
          height={120}
          className="w-40 h-auto object-contain transform transition-transform group-hover:scale-105"
        />
          }
          
        </motion.div>
      </div>
    </motion.div>
  );
};

const SubscriptionFeatures = () => {
  const features = [
    {
      title: "Family Mode & Gift Subscriptions: Elevating Financial Freedom for Families",
      description: "At Paycasso, we make it easy for families to manage subscriptions and gift personalized plans. With our Family Mode, parents can oversee all their kids' subscriptions from one place. They can easily top up wallets, set spending limits, and manage what their children are subscribed to. This ensures kids can enjoy their services safely, while parents stay in control. Our Gift Subscriptions feature lets you give personalized subscription plans to loved ones for birthdays or special occasions. You can choose from a variety of services tailored to their interests and send gifts instantly or schedule them for later. Paycasso helps families manage finances simply and securely, making gifting and subscription control easier than ever.",
      imageUrl: CARDIMAGE1,
      bgColor: "bg-gradient-1",
      className: "md:col-span-2 lg:col-span-2 md:row-span-2"
    },
    {
      title: "Streamlined Management",
      description: "Effortlessly track, renew, and manage subscriptions with one unified platform.",
      imageUrl: CARDIMAGE2,
      bgColor: "bg-gradient-2"
    },
    {
      title: "Earn rewards",
      description: "Unlock rewards for every subscription managed effortlessly through our platform.",
      imageUrl: CARDIMAGE3,
      bgColor: "bg-gradient-3"
    },
    {
      title: "No compatible card? No problem!",
      description: "Top up wallet via Debit cards, gift cards, or net banking for seamless subscriptions.",
      imageUrl: CARDIMAGE4,
      bgColor: "bg-gradient-4",
      className: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Your Data, Your Control",
      description: "Your data is 100% yours, securely stored on the blockchain, giving you full ownership and control. With Paycasso, your privacy is protected, ensuring that only you can access and manage your personal information.",
      imageUrl: CARDIMAGE5,
      bgColor: "bg-gradient-5",
      className: "md:col-span-3 lg:col-span-4"
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
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
      
      <BentoGrid className="max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <BentoGridItem
            key={i}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            bgColor={feature.bgColor}
            className={feature.className}
            index={i}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default SubscriptionFeatures;