
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthHeader: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-transparent z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-lg md:text-xl">LegalAssistant</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          {isHomePage ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
