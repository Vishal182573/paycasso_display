"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CASH, PLAYSTORE, TROPHY, WALLET } from "@/public";

const steps = [
  { icon: PLAYSTORE, title: "Signup on Paycasso", color: "#1A1A1A" },
  { icon: WALLET, title: "Top-up your wallet", color: "#1A1A1A" },
  { icon: CASH, title: "Make a payment", color: "#1A1A1A" },
  { icon: TROPHY, title: "Earn Rewards", color: "#1A1A1A" },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full min-h-screen bg-black font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 md:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white text-center bg-clip-text"
        >
          How it works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mt-4 text-lg max-w-2xl mx-auto"
        >
          Get started with Paycasso in four simple steps
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-32">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-start pt-14 md:pt-28 md:gap-8"
          >
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-16 w-16 absolute left-3 md:left-3 rounded-2xl flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg backdrop-blur-lg z-40"
              >
                <Image src={step.icon} alt={step.title} className="w-8 h-8" />
              </motion.div>
              <h3 className="hidden md:block text-xl md:text-2xl lg:text-3xl md:pl-24 font-bold text-white">
                {step.title}
              </h3>
            </div>

            <div className="relative pl-24 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {step.title}
              </h3>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <p className="text-white opacity-90 font-medium text-lg leading-relaxed">
                      {getStepDescription(index)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-gray-600 via-gray-500 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

const getStepDescription = (index: number) => {
  const descriptions = [
    "Create your account on Paycasso in just a few simple steps. Get started with our secure and user-friendly platform.",
    "Add funds to your Paycasso wallet using your preferred payment method. Your money is safe and ready to use.",
    "Use your wallet balance to make quick and secure payments. Send money to friends or pay for services instantly.",
    "Earn exciting rewards and cashback on every transaction. The more you use Paycasso, the more you earn!"
  ];
  return descriptions[index];
};

export default Timeline;