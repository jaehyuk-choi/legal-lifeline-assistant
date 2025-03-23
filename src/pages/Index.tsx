
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
      // Make API call to your Flask backend
      const response = await fetch('http://localhost:5000/initiate_call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add any data you need to send to your Flask backend
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to initiate call');
      }
      
      toast({
        title: "Call initiated",
        description: "You will receive a call shortly to the registered number.",
      });
    } catch (error) {
      console.error('Error initiating call:', error);
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
