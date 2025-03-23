
import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  onInitiateCall: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ onInitiateCall, className }) => {
  return (
    <section className={cn("pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 glass px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Supporting Immigrant Workers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-down">
            Legal Assistance By Voice,{" "}
            <span className="text-primary">Accessible To All</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up">
            A free voice-based legal assistant that helps immigrant workers understand their rights and take action against labor law violations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
            <Button size="lg" onClick={onInitiateCall} className="group">
              <Phone className="mr-2 h-4 w-4" />
              <span>Try a Test Call</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent rounded-full opacity-20" />
    </section>
  );
};

export default Hero;
