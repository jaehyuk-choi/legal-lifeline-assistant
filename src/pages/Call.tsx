
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const Call = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [callSummary, setCallSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Start call when page loads
  useEffect(() => {
    initiateCall();
    
    // Mock call status changes for testing
    // In production this would hook into the actual call API
    const connectingTimeout = setTimeout(() => {
      setCallStatus('active');
      
      // Start my call timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }, 2000);
    
    return () => clearTimeout(connectingTimeout);
  }, []);

  const initiateCall = async () => {
    setIsLoading(true);
    
    try {
      // Call my edge function that connects to Twilio
      const { data, error } = await supabase.functions.invoke('twilio-call', {
        body: {
          source: 'call-page',
          timestamp: new Date().toISOString(),
        }
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Call Initiated",
        description: "You'll be connected to a legal assistant soon.",
      });
    } catch (error) {
      console.error('Call initiation failed:', error);
      toast({
        title: "Error",
        description: "Couldn't start the call. Try again?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    generateCallSummary();
  };

  const generateCallSummary = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an edge function for a real summary
      // Just simulating it for now with a timeout and mock data
      setTimeout(() => {
        const summary = "Your call with our legal assistant has been summarized. The main topics discussed were workplace safety concerns and potential violations of labor regulations. We recommend documenting the issues you mentioned and considering filing a formal complaint with your local labor department.";
        setCallSummary(summary);
        setShowSummary(true);
        setIsLoading(false);
        
        // Store the summary in sessionStorage so other pages can use it
        sessionStorage.setItem('callSummary', summary);
      }, 2000);
    } catch (error) {
      console.error('Summary generation failed:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Couldn't generate your call summary. Try again?",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCreateReport = () => {
    // Make sure the summary is saved before navigating
    if (callSummary) {
      sessionStorage.setItem('callSummary', callSummary);
      navigate('/report-confirmation', { state: { summary: callSummary } });
    } else {
      toast({
        title: "Error",
        description: "No summary available. Try again?",
        variant: "destructive",
      });
    }
  };

  const handleContinueChat = () => {
    // Pass the summary to the chat page
    if (callSummary) {
      sessionStorage.setItem('callSummary', callSummary);
      navigate('/chat', { state: { summary: callSummary } });
    } else {
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 w-full text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {callStatus === 'connecting' ? 'Connecting Call...' :
               callStatus === 'active' ? 'Call in Progress' :
               'Call Ended'}
            </h1>
            
            {callStatus === 'connecting' && (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="animate-pulse rounded-full bg-primary/20 p-8">
                  <Phone className="h-12 w-12 text-primary animate-bounce" />
                </div>
                <p className="text-lg">Hang tight while we connect your call...</p>
              </div>
            )}
            
            {callStatus === 'active' && (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-green-100 p-8">
                  <Phone className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-lg">You're connected with our legal assistant</p>
                <p className="text-xl font-mono">{formatTime(callDuration)}</p>
              </div>
            )}
            
            {callStatus === 'ended' && !showSummary && (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-gray-100 p-8">
                  <Phone className="h-12 w-12 text-gray-600" />
                </div>
                <p className="text-lg">Your call has ended</p>
                <p className="text-gray-500">Generating your call summary...</p>
                <div className="flex items-center justify-center">
                  <div className="dot-flashing"></div>
                </div>
              </div>
            )}
          </div>
          
          {callStatus === 'active' && (
            <Button 
              onClick={handleEndCall}
              variant="destructive"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              End Call
            </Button>
          )}
          
          {callStatus === 'ended' && !showSummary && (
            <Button 
              variant="default"
              size="lg"
              className="w-full"
              disabled
            >
              Preparing Summary...
            </Button>
          )}
        </div>
      </main>

      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Summary</DialogTitle>
            <DialogDescription>
              Here's a summary of your call with our legal assistant.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
            <p>{callSummary}</p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleContinueChat}
              className="sm:w-auto w-full"
            >
              Continue via Chat
            </Button>
            <Button
              onClick={handleCreateReport}
              className="sm:w-auto w-full"
            >
              Create Report from Summary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Call;
