
import React from 'react';
import { PhoneCall, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Step {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  route: string;
}

const steps: Step[] = [
  {
    icon: PhoneCall,
    titleKey: "step1.title",
    descriptionKey: "step1.description",
    route: "/how-it-works/phone"
  },
  {
    icon: MessageSquare,
    titleKey: "step2.title",
    descriptionKey: "step2.description",
    route: "/how-it-works/chat"
  },
  {
    icon: FileText,
    titleKey: "step4.title",
    descriptionKey: "step4.description",
    route: "/how-it-works/report"
  }
];

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section id="how-it-works" className={cn("section-padding relative", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 flex flex-col items-center text-center group relative cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate(step.route)}
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(step.titleKey)}</h3>
              <p className="text-muted-foreground mb-4">{t(step.descriptionKey)}</p>
              <Button variant="outline" size="sm">
                {t('button.learnMore')}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-accent/10 rounded-lg max-w-3xl mx-auto text-center">
          <h3 className="font-medium text-lg mb-2">{t('howItWorks.commitment.title')}</h3>
          <p>{t('howItWorks.commitment.description')}</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
