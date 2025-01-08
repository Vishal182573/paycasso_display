"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { CARDIMAGE1, CARDIMAGE2, CARDIMAGE3, CARDIMAGE4, CARDIMAGE5, CARDIMAGE6 } from '@/public';

interface ServiceGridProps {
  className?: string;
  children?: React.ReactNode;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ className, children }) => {
  return (
    <motion.div 
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-8", className)}
      initial={{ rotateX: 45, scale: 0.9 }}
      whileInView={{ rotateX: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {children}
    </motion.div>
  );
};

interface ServiceItemProps {
  title: string;
  description: string;
  icon: any;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -180 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateZ: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      className="flex flex-col items-center text-center p-6 rounded-lg backdrop-blur-sm bg-gray-900/30"
    >
      <motion.div 
        className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-6"
        whileHover={{ 
          rotate: 360,
          scale: 1.2,
          transition: { duration: 0.6 }
        }}
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(255, 255, 255, 0.2)",
            "0 0 0 10px rgba(255, 255, 255, 0)",
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <motion.div
          whileHover={{ rotate: -360 }}
          transition={{ duration: 0.6 }}
        >
          <Image src={icon} alt="images" className="w-8 h-8"/>
        </motion.div>
      </motion.div>
      <motion.h3 
        className="text-2xl font-bold text-white mb-4"
        whileHover={{
          scale: 1.1,
          color: ["#fff", "#64f4d9", "#fff"],
          transition: { duration: 0.3 }
        }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.3 + 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Smart Contract",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE1
    },
    {
      title: "Liquidity Provision",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE2
    },
    {
      title: "Decentralized Identity",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE3
    },
    {
      title: "Staking and Governance",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE4
    },
    {
      title: "Decentralized Oracle",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE5
    },
    {
      title: "Security Audits",
      description: "Fermentum leo fermentum molestie vulputate augue faucibus. Dui volutpat sem facilisi et arcu risus cursus dui.",
      icon: CARDIMAGE6
    }
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto mt-24">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-gray-400 mb-4 font-semibold"
          >
            OUR SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <motion.span
              initial={{ display: "inline-block" }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              Ignite your growth: Tailored Solutions
            </motion.span>
            <br />
            <motion.span
              initial={{ display: "inline-block" }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              for Businesses
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Id eleifend quis urna tellus tempor facilisis at semper ac. Interdum tortor ut ac ullamcorper ac et facilisis.
          </motion.p>
        </div>

        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </ServiceGrid>
      </div>
    </div>
  );
};

export default ServicesSection;