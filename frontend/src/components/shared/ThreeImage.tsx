"use client"
import React, { useId, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { OPENBOX1, OPENBOX2, OPENBOX3, PHONE } from '@/public';
import { ChevronRight, X } from 'lucide-react';

interface Card {
  title: string;
  description: string;
  content: string;
  ctaText: string;
  ctaLink: string;
  src: any;
}

const AboutSection: React.FC = () => {
  const [active, setActive] = React.useState<Card | null>(null);
  const id = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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

  const cards: Card[] = [
    {
      title: "How Paycasso works?",
      description: "Learn about our payment process",
      content: "Paycasso simplifies global subscription payments by converting your fiat currency to USDC stablecoin. Fund your wallet, manage transactions, and pay securely—all in one streamlined platform.",
      ctaText: "Learn More",
      ctaLink: "#",
      src: OPENBOX1
    },
    {
      title: "Paycasso's Advantages",
      description: "Discover our unique benefits",
      content: "With Paycasso, enjoy blockchain security, transparent pricing, and smooth payments while earning rewards on spending. Skip card requirements and access your favorite subscriptions effortlessly.",
      ctaText: "Explore",
      ctaLink: "#",
      src: OPENBOX2
    },
    {
      title: "Vision and Mission",
      description: "Our purpose and goals",
      content: "Democratize subscription access through crypto, making global digital services available to all. Building a borderless digital ecosystem where everyone can access subscription services without geographical or socioeconomic barriers.",
      ctaText: "Read More",
      ctaLink: "#",
      src: OPENBOX3
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

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 h-full w-full z-10"
                onClick={() => setActive(null)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active ? (
              <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                <motion.div
                  ref={modalRef}
                  layoutId={`card-${active.title}-${id}`}
                  className="w-full max-w-[500px] h-fit max-h-[90vh] flex flex-col bg-gray-900 sm:rounded-3xl overflow-hidden relative"
                >
                  <button 
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 z-50 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <Image
                      width={400}
                      height={300}
                      src={active.src}
                      alt={active.title}
                      className="w-full h-48 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                    />
                  </motion.div>

                  <div className="p-6 overflow-y-auto">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl font-bold mb-3"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-400 mb-4 text-lg"
                    >
                      {active.description}
                    </motion.p>
                    <motion.p className="text-gray-300 leading-relaxed">
                      {active.content}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          <ul className="space-y-4">
            {cards.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.title}
                onClick={() => setActive(card)}
                className="p-5 hover:bg-gray-900 rounded-xl cursor-pointer transition-colors border border-gray-800 group flex items-center justify-between"
              >
                <div>
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-lg mb-1 group-hover:text-blue-400 transition-colors"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-400"
                  >
                    {card.description}
                  </motion.p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1 duration-200" />
              </motion.div>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;