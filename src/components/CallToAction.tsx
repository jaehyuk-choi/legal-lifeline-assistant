
import React, { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface CallToActionProps {
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInitiateCall = async () => {
    setIsLoading(true);
    
    try {
      // Call our edge function that connects to the Flask backend
      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: {
          source: 'call-to-action',
          timestamp: new Date().toISOString(),
        }
      });

      if (error) {
        throw error;
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
    <section className={cn("section-padding bg-gradient-to-br from-[#F2FCE2] to-[#FEF7CD] text-foreground", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
            {t('cta.free')}
          </p>
          <Button 
            size="lg" 
            variant="default" 
            onClick={handleInitiateCall}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Phone className="mr-2 h-4 w-4" />
            )}
            <span>{t('button.startCall')}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
