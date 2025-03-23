
import React from 'react';
import { ListChecks, ClipboardEdit, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import BackgroundGradient from '@/components/BackgroundGradient';

const HowItWorksReport = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const steps = [
    {
      icon: ListChecks,
      title: t('howItWorks.report.step1.title'),
      description: t('howItWorks.report.step1.description'),
    },
    {
      icon: ClipboardEdit,
      title: t('howItWorks.report.step2.title'),
      description: t('howItWorks.report.step2.description'),
    },
    {
      icon: Upload,
      title: t('howItWorks.report.step3.title'),
      description: t('howItWorks.report.step3.description'),
    },
    {
      icon: Search,
      title: t('howItWorks.report.step4.title'),
      description: t('howItWorks.report.step4.description'),
    },
  ];

  const otherMethods = [
    {
      title: t('howItWorks.phone.title'),
      description: t('howItWorks.phone.subtitle'),
      buttonText: t('button.learnMore'),
      route: '/how-it-works/phone',
    },
    {
      title: t('howItWorks.chat.title'),
      description: t('howItWorks.chat.subtitle'),
      buttonText: t('button.learnMore'),
      route: '/how-it-works/chat',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <BackgroundGradient />
      <Header />
      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">{t('howItWorks.report.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.report.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="glass-card p-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/report-issue')}
            >
              {t('howItWorks.report.getStarted')}
            </Button>
          </div>

          <div className="border-t pt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              {t('howItWorks.otherMethods')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {otherMethods.map((method, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(method.route)}
                  >
                    {method.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksReport;
