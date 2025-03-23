
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
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateCall = async () => {
    setIsLoading(true);
    
    try {
      // Call our Supabase edge function instead of Flask backend
      const { data, error } = await supabase.functions.invoke('twilio-call', {
        body: {
          timestamp: new Date().toISOString(),
        }
      });
      
      if (error) {
        console.error('Error initiating call:', error);
        throw error;
      }
      
      toast({
        title: "Call initiated",
        description: "You will receive a call shortly to the registered number.",
      });
      
      // Navigate to call page
      navigate('/call');
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
