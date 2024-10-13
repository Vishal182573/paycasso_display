import WhyPaycasso from '@/components/shared/Feature';
import PaycassoIntro from '@/components/shared/HeroSection';
import HowItWorks from '@/components/shared/HowItsWorks';
import Navbar from '@/components/shared/Navbar';
import SubscriptionFeatures from '@/components/shared/SubscriptionFeatures';
import ImageGroup from '@/components/shared/ThreeImage';

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleSignup = () => {
    // Add your signup logic here
    console.log('Signup clicked');
  };

  return (
    <main className='bg-gradient-dark w-screen '>
      <Navbar />
      <PaycassoIntro/>
      <HowItWorks/>
      <ImageGroup/>
      <WhyPaycasso/>
      <SubscriptionFeatures/>
    </main>
  );
}