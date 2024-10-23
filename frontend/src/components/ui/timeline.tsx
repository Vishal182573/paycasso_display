"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CASH, PLAYSTORE, TROPHY, WALLET } from "@/public";

const steps = [
  { icon: PLAYSTORE, title: "Signup on Paycasso", color: "#B83030" },
  { icon: WALLET, title: "Top-up your wallet", color: "#C7F47E" },
  { icon: CASH, title: "Make a payment", color: "#699FF0" },
  { icon: TROPHY, title: "Earn Rewards", color: "#FFA756" },
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
    <div className="w-full min-h-screen font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold text-white mb-12 text-center font-caveat"
        >
          How it works?
        </motion.h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div 
                className="h-16 w-16 absolute left-3 md:left-3 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: step.color }}
              >
                <Image src={step.icon} alt={step.title} className="w-8 h-8" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-24 md:text-3xl font-bold text-white">
                {step.title}
              </h3>
            </div>

            <div className="relative pl-24 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {step.title}
              </h3>
              <Card className="bg-opacity-10 backdrop-blur-lg bg-white border-none">
                <CardContent className="p-6">
                  <p className="text-white opacity-80">
                    {getStepDescription(index)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to provide step descriptions
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