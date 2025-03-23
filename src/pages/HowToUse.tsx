
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneCall, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowToUse = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Made these steps nice and clear - might add more detail later
  const methods = [
    {
      icon: <PhoneCall className="h-10 w-10 text-[#6a994e]" />,
      title: 'Make a Phone Call',
      description: 'Call our service from any phone, no smartphone or internet required. Available in multiple languages.',
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-[#6a994e]" />,
      title: 'Explain Your Situation',
      description: 'Tell our AI assistant about your work situation and any potential labor law violations in your preferred language.',
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-[#6a994e]" />,
      title: 'Get Expert Guidance',
      description: 'Receive clear information about your rights and practical guidance on the next steps to take.',
    },
    {
      icon: <FileText className="h-10 w-10 text-[#6a994e]" />,
      title: 'Receive Documentation',
      description: 'Get a detailed summary of your case and recommended actions via SMS or email, making it easier to seek further help.',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our service is designed to be simple and accessible, requiring only a phone to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {methods.map((method, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-full">
              <div className="mb-4 bg-[#f0f7e3] p-4 rounded-full">{method.icon}</div>
              <h2 className="text-xl font-semibold mb-3">{method.title}</h2>
              <p className="text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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
