
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneCall, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowToUse = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const methods = [
    {
      icon: <PhoneCall className="h-10 w-10 text-[#6a994e]" />,
      title: 'step1.title',
      description: 'step1.description',
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-[#6a994e]" />,
      title: 'step2.title',
      description: 'step2.description',
    },
    {
      icon: <FileText className="h-10 w-10 text-[#6a994e]" />,
      title: 'step4.title',
      description: 'step4.description',
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('howItWorks.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {methods.map((method, index) => (
            <div key={index} className="glass-card p-6 rounded-lg flex flex-col items-center text-center h-full">
              <div className="mb-4">{method.icon}</div>
              <h2 className="text-xl font-semibold mb-3">{t(method.title)}</h2>
              <p className="text-muted-foreground">{t(method.description)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            {t('reportDetails.back')}
          </Button>
          
          <Button 
            variant="green" 
            onClick={() => navigate('/report-issue')}
          >
            {t('button.reportIssue')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
