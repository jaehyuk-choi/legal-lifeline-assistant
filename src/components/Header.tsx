
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { MessageCircle, LogOut, User, FileText, List } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <Button variant="outline" asChild className="rounded-full">
              <Link to="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>{t('button.chatNow')}</span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="rounded-full">
              <Link to="/report-issue">
                <FileText className="mr-2 h-4 w-4" />
                <span>{t('button.reportIssue')}</span>
              </Link>
            </Button>
            
            {user && (
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/my-reports">
                  <List className="mr-2 h-4 w-4" />
                  <span>{t('myReports.title')}</span>
                </Link>
              </Button>
            )}
            
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('button.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/sign-in">{t('button.signIn')}</Link>
                </Button>
                <Button asChild className="bg-[#6a994e] hover:bg-[#5a8c3e]">
                  <Link to="/sign-up">{t('button.signUp')}</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu toggle for small screens */}
          <div className="sm:hidden">
            {user ? (
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/sign-in">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
