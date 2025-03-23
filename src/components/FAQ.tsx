
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface FAQProps {
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ className }) => {
  const { t } = useLanguage();
  
  const faqItems = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6')
    }
  ];

  return (
    <section id="faq" className={cn("section-padding", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('faq.title')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card mb-4 px-6">
                <AccordionTrigger className="text-lg font-medium py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="max-w-3xl mx-auto mt-12 glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">{t('legal.disclaimer')}</h3>
          <p className="text-muted-foreground mb-4">
            {t('legal.disclaimer.text1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.disclaimer.text2')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
