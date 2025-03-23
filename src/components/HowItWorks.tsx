
import React from 'react';
import { PhoneCall, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface Step {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

const steps: Step[] = [
  {
    icon: PhoneCall,
    titleKey: "step1.title",
    descriptionKey: "step1.description"
  },
  {
    icon: MessageSquare,
    titleKey: "step2.title",
    descriptionKey: "step2.description"
  },
  {
    icon: CheckCircle,
    titleKey: "step3.title",
    descriptionKey: "step3.description"
  },
  {
    icon: FileText,
    titleKey: "step4.title",
    descriptionKey: "step4.description"
  }
];

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  const { t } = useLanguage();
  
  return (
    <section id="how-it-works" className={cn("section-padding relative", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-6 flex flex-col items-center text-center group relative">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(step.titleKey)}</h3>
              <p className="text-muted-foreground">{t(step.descriptionKey)}</p>
              
              {/* Progress line between steps (only visible on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-[2px] bg-border" style={{ width: 'calc(50%)' }}>
                  <div className="absolute right-0 h-3 w-3 bg-primary rounded-full -top-[5px] -right-[5px]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-accent/10 rounded-lg max-w-3xl mx-auto text-center">
          <h3 className="font-medium text-lg mb-2">Our Commitment to You</h3>
          <p>We're dedicated to protecting workers' rights. Our services are completely free of charge, confidential, and available in multiple languages to help you navigate workplace issues with confidence.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
