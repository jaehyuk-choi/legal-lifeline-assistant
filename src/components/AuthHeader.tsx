
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AuthHeader: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t } = useLanguage();
  
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-transparent z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/99788104-fd74-4915-a14c-f0e675de1499.png" 
            alt="FairVio Logo" 
            className="h-16 md:h-20 mr-2" 
          />
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          {isHomePage ? (
            <>
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{t('button.chatNow')}</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-in">{t('button.signIn')}</Link>
              </Button>
              <Button asChild className="bg-[#6a994e] hover:bg-[#5a8c3e]">
                <Link to="/sign-up">{t('button.signUp')}</Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/">{t('nav.home')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
