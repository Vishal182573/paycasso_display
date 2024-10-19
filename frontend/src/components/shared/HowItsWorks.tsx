"use client";
import React, { useEffect, useRef, RefObject } from "react";
import { motion, useInView, useAnimation, AnimationControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ARROW, CASH, PLAYSTORE, TROPHY, WALLET } from "@/public";
import Image, { StaticImageData } from "next/image";

type Step = {
  icon: StaticImageData;
  title: string;
  color: string;
};

type StepCardProps = Step & {
  index: number;
  isLast: boolean;
};

const steps: Step[] = [
  { icon: PLAYSTORE, title: "Signup on Paycasso", color: "#B83030" },
  { icon: WALLET, title: "Top-up your wallet", color: "#C7F47E" },
  { icon: CASH, title: "Make a payment", color: "#699FF0" },
  { icon: TROPHY, title: "Earn Rewards", color: "#FFA756" },
];

const StepCard: React.FC<StepCardProps> = ({ icon, title, color, index, isLast }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref as RefObject<Element>, { once: false, amount: 0.5 });
  const controls: AnimationControls = useAnimation();

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
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
      }}
      className="flex space-x-5 justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <Card
          className="w-20 h-20 border-none shadow-lg rounded-2xl overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <CardContent className="p-0 flex items-center justify-center h-full">
            <Image src={icon} alt="icon" className="w-8" />
          </CardContent>
        </Card>
        <p className="mt-4 text-white text-center text-sm">{title}</p>
      </div>
      {!isLast && (
        <div className="hidden md:block w-full mt-4">
          <Image src={ARROW} alt="arrow" className="w-36 h-2 mb-16" />
        </div>
      )}
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold text-white mb-12 text-center font-caveat"
      >
        How it works?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 w-full max-w-6xl">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <StepCard
              icon={step.icon}
              title={step.title}
              color={step.color}
              index={index}
              isLast={index === steps.length - 1}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
