
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-transparent z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-lg md:text-xl">FairVio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <Button variant="outline" asChild className="rounded-full">
              <Link to="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>채팅 상담</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/sign-in">로그인</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
