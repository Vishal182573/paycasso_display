"use client"
import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
// import Image from 'next/image';
// import { LOGO } from '@/public';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`${
        isActive ? 'text-white' : 'text-gray-400'
      } hover:text-white transition-colors text-sm`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const onContactClick = () => {
  const contactElement = document.getElementById('contact');
  if (contactElement) {
    contactElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest: number) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navVariants = {
    initial: {
      backgroundColor: 'rgba(0, 0, 0, 1)',
      backdropFilter: 'blur(0px)'
    },
    scrolled: {
      backdropFilter: 'blur(10px)'
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };

  const linksVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className="fixed z-50 top-0 w-full py-4 px-6 bg-black"
      initial="initial"
      animate={isScrolled ? 'scrolled' : 'initial'}
      variants={navVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-bold"
        >
          <Link href="/">
            <h1>Paycasso</h1>
          </Link>
        </motion.div>
          <motion.div
            className="flex gap-28 font-semibold text-sm"
            variants={linksVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-wallet">About wallet</NavLink>
            <NavLink href="/how-it-works">How it works?</NavLink>
            <NavLink href="/documentation">Documentation</NavLink>
          </motion.div>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-700 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors font-bold border-white"
            onClick={onContactClick}
            type="button"
          >
            Sign Up
          </motion.button>
        <div className="md:hidden"> 
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 bg-black bg-opacity-90 rounded-lg p-4"
        >
          <div className="flex flex-col gap-4">
            <NavLink href="/" onClick={toggleMobileMenu}>Home</NavLink>
            <NavLink href="/about-wallet" onClick={toggleMobileMenu}>About wallet</NavLink>
            <NavLink href="/how-it-works" onClick={toggleMobileMenu}>How it works?</NavLink>
            <NavLink href="/documentation" onClick={toggleMobileMenu}>Documentation</NavLink>
            <button
              className="bg-gradient-dark-tr text-white px-6 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors"
              onClick={() => {
                onContactClick();
                toggleMobileMenu();
              }}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;