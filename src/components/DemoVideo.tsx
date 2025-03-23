
import React from 'react';
import { cn } from '@/lib/utils';

interface DemoVideoProps {
  className?: string;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ className }) => {
  return (
    <section id="demo" className={cn("section-padding bg-accent/30", className)}>
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-lg text-muted-foreground">
            Watch this short demo to see how our legal assistant helps workers understand their rights.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video glass-card overflow-hidden">
            {/* Video placeholder - replace with actual video embed */}
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
              <div className="text-center">
                <p className="text-xl font-medium mb-2">Demo Video</p>
                <p className="text-muted-foreground">A video demonstration will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
