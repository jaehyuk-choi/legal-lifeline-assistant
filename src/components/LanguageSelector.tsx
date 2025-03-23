
import React from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLanguage, type LanguageCode } from '@/context/LanguageContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'hi', name: 'हिन्दी' },
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  
  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("flex items-center gap-1 text-sm font-medium bg-accent/50 border-[#6a994e]/20 hover:bg-[#f2fce2]/70", className)}
        >
          <Globe className="h-4 w-4" />
          <span>{selectedLanguage.name}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelectLanguage(lang.code as LanguageCode)}
            className="flex items-center justify-between"
          >
            <span>{lang.name}</span>
            {lang.code === language && (
              <Check className="h-4 w-4 text-[#6a994e]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
