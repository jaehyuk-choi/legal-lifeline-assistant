
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is this service really free?",
    answer: "Yes, our legal assistance service is completely free to use. It's designed to help immigrant workers understand their rights and navigate labor law violations without any financial burden."
  },
  {
    question: "What languages are supported?",
    answer: "Currently, our service supports English, Spanish, French, Chinese, and Korean. We're working to add more languages in the future to better serve diverse immigrant communities."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. We take your privacy very seriously. All conversations are confidential, and personal information is never shared with third parties without your explicit consent."
  },
  {
    question: "What types of labor issues can this help with?",
    answer: "Our service can help with various labor issues including wage theft, workplace safety violations, discrimination, harassment, wrongful termination, and questions about workers' rights and benefits."
  },
  {
    question: "Do I need legal documentation to use this service?",
    answer: "No, our service is available to all workers regardless of immigration status. We do not ask about or require any documentation to provide assistance."
  },
  {
    question: "Will this connect me with a human lawyer?",
    answer: "This service provides AI-powered legal information and guidance. While it doesn't connect you directly with a human lawyer, it can help you understand when you might need one and can provide referrals to legal aid organizations."
  }
];

interface FAQProps {
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ className }) => {
  return (
    <section id="faq" className={cn("section-padding", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our legal assistance service.
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
          <h3 className="text-xl font-semibold mb-4">Legal Disclaimer</h3>
          <p className="text-muted-foreground mb-4">
            This service provides general legal information and guidance but does not constitute legal advice. The information provided is not a substitute for consultation with a qualified attorney.
          </p>
          <p className="text-muted-foreground">
            Our AI assistant is designed to help you understand your rights and options, but specific legal situations may require professional legal counsel. If you need specific legal advice, please consult with a qualified attorney or legal aid organization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
