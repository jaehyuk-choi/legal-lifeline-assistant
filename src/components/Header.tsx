
import React, { useEffect, useState } from 'react';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "py-2 glass shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-display font-semibold text-lg sm:text-xl">LegalLifeline</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
                Demo
              </a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
                FAQ
              </a>
            </nav>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
