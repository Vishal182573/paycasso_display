import PaycassoSignup from '@/components/shared/Contact';
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

export default function Layout() {
  return (
    <section>
        {/* <FollowerPointerCard title=""> */}
          <Navbar />
      <main className="bg-gradient-dark w-screen flex flex-col justify-center items-center">
        {/* Wrap the Navbar with FollowerPointerCard */}
        {/* Wrap PaycassoIntro with FollowerPointerCard */}
          <PaycassoIntro />

        {/* Other content without the pointer */}
        <ImageGroup />
        <WhyPaycasso />
        <Timeline />
        <SubscriptionFeatures />
        <TailoredSolutions />

        <PaycassoSignup />
        {/* <GradientButton /> */}
      </main>
      <Footer />
        {/* </FollowerPointerCard> */}
    </section>
  );
}
