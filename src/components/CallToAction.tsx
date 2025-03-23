
import React, { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface CallToActionProps {
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInitiateCall = async () => {
    setIsLoading(true);
    
    try {
      // This would be replaced with your actual API call
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
    <section className={cn("section-padding bg-primary text-primary-foreground", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Try the Legal Assistant?
          </h2>
          <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
            Our service is free, confidential, and available in multiple languages.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleInitiateCall}
            disabled={isLoading}
            className="bg-white text-primary hover:bg-white/90"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Phone className="mr-2 h-4 w-4" />
            )}
            <span>Initiate a Test Call</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
