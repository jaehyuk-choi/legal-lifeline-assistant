
import React from 'react';
import { PhoneCall, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: PhoneCall,
    title: "Make a Phone Call",
    description: "Call our service from any phone, no smartphone or internet required. Available in English, Spanish, French, Chinese, and Korean."
  },
  {
    icon: MessageSquare,
    title: "Explain Your Situation",
    description: "Tell our AI assistant about your work situation and any potential labor law violations in your preferred language."
  },
  {
    icon: CheckCircle,
    title: "Get Expert Guidance",
    description: "Receive clear information about your rights and practical guidance on the next steps to take."
  },
  {
    icon: FileText,
    title: "Receive Documentation",
    description: "Get a detailed summary of your case and recommended actions via SMS or email, making it easier to seek further help."
  }
];

interface HowItWorksProps {
  className?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  return (
    <section id="how-it-works" className={cn("section-padding relative", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our service is designed to be simple and accessible, requiring only a phone to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-6 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="hidden md:block absolute top-1/2 right-0 h-[2px] w-[calc(50%-3rem)] bg-border translate-x-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
