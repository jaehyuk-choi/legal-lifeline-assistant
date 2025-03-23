
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Github, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useLanguage();
  
  return (
    <footer className={cn("py-12 bg-secondary/50", className)}>
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold">LegalLifeline</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.terms')}
            </Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.contact')}
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Legal Lifeline. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Created for hackathon with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
