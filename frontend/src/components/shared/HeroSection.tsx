"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

const HeroSection = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // const buttonVariants = {
  //   hover: {
  //     scale: 1.05,
  //     transition: {
  //       duration: 0.2
  //     }
  //   }
  // };

  // const fadeInUp = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.6 }
  // };

  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  return (
    <div className="bg-black text-white min-h-screen  w-full flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl space-y-8"
      >
        <div className="text-sm uppercase tracking-wider mb-4">
          Decentralized Finance
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-serif mb-12">
          The future of<br />money we build together
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-white hover:text-white px-8 py-2 rounded-full border-white"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white  px-8 py-2 rounded-full bg-black"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
      <motion.div 
        className="absolute bottom-8 cursor-pointer"
        onClick={scrollToNext}
        animate={bounceAnimation}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-light">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection