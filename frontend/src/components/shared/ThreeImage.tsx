"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { PHONE } from '@/public'; // Assuming PHONE is correctly imported

interface FocusableImageProps {
  src: any;
  alt: string;
  widthClass: string;
}

const FocusableImage: React.FC<FocusableImageProps> = ({ src, alt, widthClass }) => {
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
      tabIndex={0}  // Makes the div focusable
      whileHover={{ opacity: 1, scale: 1.05 }}  // Animation on hover
      whileFocus={{ opacity: 1, scale: 1.05 }}  // Animation on focus
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0.5, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="outline-none"  // Removes focus outline
    >
      <Image src={src} alt={alt} className={widthClass} />
    </motion.div>
  );
};

const ImageGroup = () => {
  return (
    <div className='flex space-x-12 w-full justify-between items-center px-48'>
      <FocusableImage src={PHONE} alt='phone' widthClass='w-72' />
      <FocusableImage src={PHONE} alt='phone' widthClass='w-80' />
      <FocusableImage src={PHONE} alt='phone' widthClass='w-72' />
    </div>
  );
};

export default ImageGroup;
