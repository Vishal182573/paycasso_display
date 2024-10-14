"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { CARD, DOLLAR, GIFT, LOCK } from '@/public';

interface FeatureProps {
  icon: any;
  title: string;
  description: string;
  color: string;
  underlineColor: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, color, underlineColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      className="flex flex-col items-start text-start max-w-xs mx-auto"
    >
      <motion.div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-10`}
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image src={icon} alt={title} width={20} height={20} />
      </motion.div>
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <div className={`w-32 h-[1px] mb-4`} style={{ backgroundColor: underlineColor }}></div>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const WhyPaycasso: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: LOCK,
      title: "Always Protected",
      description: "Concerned about sharing your card for every subscription? With us, your data stays yours, secured by decentralized system",
      color: "#C7F47E",
      underlineColor: "#4B9EFF",
    },
    {
      icon: DOLLAR,
      title: "No Hidden Fees",
      description: "No hidden fees, no surprises. What you see is what you pay — always transparent, always straightforward.",
      color: "#FF87F1",
      underlineColor: "#FF4DCD",
    },
    {
      icon: CARD,
      title: "Frictionless Payment",
      description: "Skip OTP hassles—just tap our partner's checkout and confirm your payment securely with your PIN or fingerprint in our app",
      color: "#FFA756",
      underlineColor: "#FF7629",
    },
    {
      icon: GIFT,
      title: "Earn While You Spend",
      description: "Every payment brings rewards. Earn loyalty points that grow with every transaction, giving you more value each time you pay",
      color: "#699FF0",
      underlineColor: "#3D7DD9",
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-[#FFA756] text-2xl font-semibold mb-4">WHY PAYCASSO?</h2>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          Make the payment<br />in one click
        </h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default WhyPaycasso;
