"use client"
import React, { useState } from 'react'
import { motion} from 'framer-motion'
import Image from 'next/image'
import { PHONE } from '@/public'
import { ArrowRight } from 'lucide-react'

const AboutSection = () => {
  const [hoveredButton, setHoveredButton] = useState<any>()

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
  }

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
  }

  // Animation variants for individual text elements
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  // Button hover animation variants
  const buttonVariants = {
    initial: { backgroundColor: "rgba(0,0,0,0)" },
    hover: { 
      backgroundColor: "rgba(17,24,39,1)",
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className='bg-black w-full flex flex-col lg:flex-row items-center justify-center min-h-screen text-white'>
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
              Id eleifend quis urna tellus tempor facilisis at semper ac.
              Interdum tortor ut ac ullamcorper ac et facilisis.
            </motion.p>
          </motion.div>

          <motion.div className="space-y-4">
            {[
              "Vision and Mission of Paycasso",
              "Paycasso's Advantages",
              "How Paycasso works?"
            ].map((item, index) => (
              <motion.button
                key={index}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className="w-full flex items-center justify-between p-4 border-t border-gray-800 transition-colors"
                onHoverStart={() => setHoveredButton(index)}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <span>{item}</span>
                <motion.div
                  animate={{
                    x: hoveredButton === index ? 5 : 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ArrowRight size={20} className="text-gray-400" />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection