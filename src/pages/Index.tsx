
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateCall = async () => {
    setIsLoading(true);
    
    try {
      // Gotta call my Flask backend here
      const response = await fetch('http://localhost:5000/initiate_call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Just sending the timestamp for now, might need more data later
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Call initiation failed');
      }
      
      toast({
        title: "Call initiated",
        description: "You'll get a call shortly on your number.",
      });
    } catch (error) {
      console.error('Darn, call initiation failed:', error);
      toast({
        title: "Error",
        description: "Something went wrong with your call. Try again?",
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
