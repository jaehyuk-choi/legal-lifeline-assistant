
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const AuthHeader: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-transparent z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-lg md:text-xl">FairVio</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          {isHomePage ? (
            <>
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">채팅 상담</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-in">로그인</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">회원가입</Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/">홈</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
