"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BAINSKIANKH, BOOKSTACK, DASHBOARD, HATHSIKKA } from '@/public';
interface FeatureProps {
  icon: any;
  title: string;
  description: string;
}
const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start text-start space-x-6"
    >
      <div className="w-14 h-14 rounded-full bg-[#1E1E1E] flex items-center justify-center mb-6">
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <div className='flex flex-col'>
        <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-300 text-md leading-relaxed ">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: BOOKSTACK,
      title: 'Cutting-Edge Technology',
      description: 'Fast, secure, and transparent subscription management powered by blockchain.'
    },
    {
      icon: HATHSIKKA,
      title: 'User Empowerment',
      description: 'Take full control of subscriptions with intuitive tools and a tailored platform.'
    },
    {
      icon: BAINSKIANKH,
      title: 'Transparent and Secure',
      description: 'Detailed transactions history with top-tier security for peace of mind.'
    }
  ];
  return (
    <div className="bg-black min-h-screen flex items-start py-20 px-8 w-full">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            <div>
              <h2 className="text-white uppercase tracking-wide mb-4">Why Choose Us</h2>
              <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                Transform the way you manage subscriptions
              </h1>
            </div>
            <div className="grid gap-12">
              {features.map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src={DASHBOARD}
              alt="Dashboard Preview"
              width={500}
              height={700}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;