import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-1 text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Paycasso</h2>
            <h3 className="text-xl font-semibold mb-2">Where</h3>
            <h3 className="text-xl font-semibold mb-2">Convenience</h3>
            <h3 className="text-xl font-semibold mb-4">Meets Security.</h3>
            <p className="mb-4">Download the app today</p>
            <div className="flex space-x-4">
              <Link href="#" className="w-8 h-8">
                <Image src="/api/placeholder/32/32" alt="Google Play" width={32} height={32} />
              </Link>
              <Link href="#" className="w-8 h-8">
                <Image src="/api/placeholder/32/32" alt="App Store" width={32} height={32} />
              </Link>
            </div>
          </div>
          <div>
            <Link href="/" className="block mb-2 hover:underline">Home</Link>
            <Link href="/about-wallet" className="block mb-2 hover:underline">About wallet</Link>
            <Link href="/how-it-works" className="block mb-2 hover:underline">How it works?</Link>
            <Link href="/docs" className="block mb-2 hover:underline">Documentation for developers</Link>
          </div>
          <div>
            <Link href="/faq" className="block mb-4 hover:underline">FAQ</Link>
            <h4 className="font-semibold mb-2">Contact us:</h4>
            <p className="text-sm mb-2">Integration related queries:</p>
            <Link href="mailto:info.paycasso@gmail.com" className="text-sm block mb-4 hover:underline">info.paycasso@gmail.com</Link>
            <p className="text-sm mb-2">Business related queries:</p>
            <Link href="mailto:business.paycasso@gmail.com" className="text-sm block mb-4 hover:underline">business.paycasso@gmail.com</Link>
            <div className="flex items-center mt-4">
              <p className="mr-4">Follow us</p>
              <Link href="#" className="mr-2">
                <Image src="/api/placeholder/24/24" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="#">
                <Image src="/api/placeholder/24/24" alt="YouTube" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; 2024, Paycasso Pvt Limited</p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-sm hover:underline">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;