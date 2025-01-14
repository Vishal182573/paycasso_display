"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PHONE } from '@/public';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AboutSection = () => {
  // Animation variants for the phone image
  const phoneVariants = {
    initial: { opacity: 0, x: -20, rotateY: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for the text content
  const textVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for individual text elements
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const accordionItems = [
    {
      value: "item-1",
      trigger: "How Paycasso works?",
      content: "Paycasso simplifies global subscription payments by converting your fiat currency to USDC stablecoin. Fund your wallet, manage transactions, and pay securely—all in one streamlined platform."
    },
    {
      value: "item-2",
      trigger: "Paycasso's Advantages",
      content: "With Paycasso, enjoy blockchain security, transparent pricing, and smooth payments while earning rewards on spending. Skip card requirements and access your favorite subscriptions effortlessly."
    },
    {
      value: "item-3",
      trigger: "Vision and Mission of Paycasso",
      content: "Democratize subscription access through crypto, making global digital services available to all. Building a borderless digital ecosystem where everyone can access subscription services without geographical or socioeconomic barriers."
    }
  ];

  return (
    <div className="bg-black w-full flex flex-col lg:flex-row items-center justify-center min-h-screen text-white">
      <div className="px-6 lg:px-24 py-12 gap-12 max-w-7xl flex flex-col lg:flex-row items-center justify-between font-semibold">
        <motion.div
          className="lg:w-1/3"
          variants={phoneVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Image
            src={PHONE}
            alt="Phone mockup"
            className="w-96 mx-auto"
            priority
          />
        </motion.div>
        
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="lg:w-1/2 space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h2 
              className="text-sm uppercase tracking-wider font-semibold"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              About Us
            </motion.h2>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              Shaping the Future of Finance Together
            </motion.h1>
            <motion.p 
              className="text-gray-400"
              variants={itemVariants}
            >
              Revolutionizing subscription management with blockchain-powered, user-friendly financial solutions.
            </motion.p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item) => (
              <AccordionItem 
                key={item.value} 
                value={item.value}
                className="border-t border-gray-800 px-0 "
              >
                <AccordionTrigger className="hover:bg-gray-900 px-4 py-4 text-left">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-400">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;