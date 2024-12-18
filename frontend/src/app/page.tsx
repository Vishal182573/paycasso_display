import PaycassoSignup from '@/components/shared/Contact';
import GradientButton from '@/components/shared/ExploreButton';
import WhyPaycasso from '@/components/shared/Feature';
import Footer from '@/components/shared/Footer';
import PaycassoIntro from '@/components/shared/HeroSection';
// import HowItWorks from '@/components/shared/HowItsWorks';
import Navbar from '@/components/shared/Navbar';
import SubscriptionFeatures from '@/components/shared/SubscriptionFeatures';
import TailoredSolutions from '@/components/shared/TailoredSolution';
import ImageGroup from '@/components/shared/ThreeImage';
// import { FollowerPointerCard } from '@/components/ui/following-pointer';
import Timeline from '@/components/ui/timeline';
import { SECURITY } from '@/public';
import Image from 'next/image';

export default function Layout() {
  return (
    <section>
        {/* <FollowerPointerCard title=""> */}
      <main className="bg-gradient-dark w-screen flex flex-col justify-center items-center">
        {/* Wrap the Navbar with FollowerPointerCard */}
          <Navbar />
        {/* Wrap PaycassoIntro with FollowerPointerCard */}
          <PaycassoIntro />

        {/* Other content without the pointer */}
        <Timeline />
        <ImageGroup />
        <WhyPaycasso />
        <SubscriptionFeatures />
        <TailoredSolutions />
        
        <div className="flex flex-col space-y-4 justify-center items-center p-7">
          <div className="text-white text-xl lg:text-4xl font-bold text-center font-caveat">
            If Spending is an <span className="text-blue-700">art</span> then we are <span className="text-blue-700">Paycasso</span> of it
          </div>
          <Image src={SECURITY} alt="SECURITY" className="w-56 lg:w-96" />
        </div>

        <PaycassoSignup />
        <GradientButton />
      </main>
      <Footer />
        {/* </FollowerPointerCard> */}
    </section>
  );
}
