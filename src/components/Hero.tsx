
import React from 'react';
import { ArrowRight, Phone, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onInitiateCall: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ onInitiateCall, className }) => {
  const { t } = useLanguage();
  
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              <Button 
                size="lg" 
                onClick={onInitiateCall} 
                className="w-full bg-[#6a994e] hover:bg-[#5a8c3e] group flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                <span>{t('button.startCall')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                asChild
                className="w-full bg-[#6a994e] hover:bg-[#5a8c3e] group flex items-center justify-center"
              >
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>{t('button.chatNow')}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                asChild
                className="w-full bg-[#6a994e] hover:bg-[#5a8c3e] group flex items-center justify-center"
              >
                <Link to="/report-issue">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{t('button.reportIssue')}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>{t('cta.choose')}</p>
            </div>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="mt-4"
            >
              <a href="#how-it-works">{t('button.learnHow')}</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#f0f7e3] rounded-full opacity-20" />
    </section>
  );
};

export default Hero;
