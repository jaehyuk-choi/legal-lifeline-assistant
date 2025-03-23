
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateCall = async () => {
    setIsLoading(true);
    
    try {
      // Replace with your actual API call to /initiate_call on your Flask backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Call initiated",
        description: "You will receive a call shortly to the registered number.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem initiating your call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <BackgroundGradient />
      <Header />
      <main>
        <Hero onInitiateCall={handleInitiateCall} />
        <HowItWorks />
        <CallToAction />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
