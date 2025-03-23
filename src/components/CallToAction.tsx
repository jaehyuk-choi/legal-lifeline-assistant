
import React, { useState } from 'react';
import { Phone, MessageCircle, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

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
        title: t('toast.callInitiated'),
        description: t('toast.callDescription'),
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        title: t('toast.error'),
        description: t('toast.callError'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn("section-padding bg-gradient-to-br from-[#f2fce2] to-[#fef7cd] text-foreground", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.ready')}
          </h2>
          <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
            {t('cta.free')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <Button 
              size="lg" 
              variant="default" 
              onClick={handleInitiateCall}
              disabled={isLoading}
              className="bg-[#6a994e] hover:bg-[#5a8c3e] flex items-center justify-center w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Phone className="mr-2 h-4 w-4" />
              )}
              <span>{t('button.startCall')}</span>
            </Button>
            
            <Button
              size="lg"
              variant="default"
              asChild
              className="bg-[#6a994e] hover:bg-[#5a8c3e] flex items-center justify-center w-full sm:w-auto"
            >
              <Link to="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>챗봇과 대화하기</span>
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="default"
              asChild
              className="bg-[#6a994e] hover:bg-[#5a8c3e] flex items-center justify-center w-full sm:w-auto"
            >
              <Link to="/report-issue">
                <FileText className="mr-2 h-4 w-4" />
                <span>보고서 작성하기</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
