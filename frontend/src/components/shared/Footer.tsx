import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { APPSOTRE, INSTAGRAM, PLAYSTORE, WOODENBG, YOUTUBE } from '@/public';

const Footer = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={WOODENBG} // Replace with your actual image path
          alt="Footer background"
          fill
          className="object-cover"
          priority={false}
          quality={85}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#0F111A] bg-opacity-90" />
      </div>

      {/* Footer Content */}
      <footer className="relative text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Paycasso</h2>
              <div className="space-y-1">
                <h3 className="text-lg font-normal">Where</h3>
                <h3 className="text-lg font-normal">Convenience</h3>
                <h3 className="text-lg font-normal">Meets Security.</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm">Download the app today</p>
                <div className="flex space-x-4">
                  <Link href="#" className="w-10 h-10">
                    <Image 
                      src={PLAYSTORE}
                      alt="Google Play" 
                      width={24} 
                      height={24}
                      className="object-contain"
                    />
                  </Link>
                  <Link href="#" className="w-10 h-10">
                    <Image 
                      src={APPSOTRE}
                      alt="App Store" 
                      width={24} 
                      height={24}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <Link href="/" className="block text-white hover:text-gray-300">
                Home
              </Link>
              <Link href="/about-wallet" className="block text-white hover:text-gray-300">
                About wallet
              </Link>
              <Link href="/how-it-works" className="block text-white hover:text-gray-300">
                How it works?
              </Link>
              <Link href="/docs" className="block text-white hover:text-gray-300">
                Documentation for developers
              </Link>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <Link href="/faq" className="block font-medium">
                FAQ
              </Link>
              <div className="space-y-2">
                <p className="text-sm">Contact us:</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400">Integration related queries:</p>
                    <Link 
                      href="mailto:info.paycasso@gmail.com" 
                      className="text-sm block hover:text-gray-300"
                    >
                      info.paycasso@gmail.com
                    </Link>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Business related queries:</p>
                    <Link 
                      href="mailto:business.paycasso@gmail.com" 
                      className="text-sm block hover:text-gray-300"
                    >
                      business.paycasso@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-medium">Follow us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:opacity-80">
                  <Image 
                    src={INSTAGRAM} 
                    alt="Instagram" 
                    width={24} 
                    height={24}
                  />
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <Image 
                    src={YOUTUBE}
                    alt="YouTube" 
                    width={24} 
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024, Paycasso Pvt Limited
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-use" 
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Terms of use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;