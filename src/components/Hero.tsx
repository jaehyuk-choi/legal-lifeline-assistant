
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onInitiateCall: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ onInitiateCall, className }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className={cn("pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 glass px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Supporting Workers' Rights</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-down">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6 animate-fade-up">
            <Button 
              size="lg" 
              variant="green" 
              onClick={() => navigate('/how-to-use')}
              className="w-full md:w-auto"
            >
              {t('button.learnHow')}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>{t('cta.choose')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#f0f7e3] rounded-full opacity-20" />
    </section>
  );
};

export default Hero;
