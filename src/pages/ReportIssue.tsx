
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface IssueOption {
  id: string;
  title: string;
  description: string;
}

const ReportIssue: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  // Define issue options with translations
  const getIssueOptions = (): IssueOption[] => {
    return [
      {
        id: 'wage-theft',
        title: t('reportCategories.wageTheft.title'),
        description: t('reportCategories.wageTheft.description')
      },
      {
        id: 'unsafe-conditions',
        title: t('reportCategories.unsafeConditions.title'),
        description: t('reportCategories.unsafeConditions.description')
      },
      {
        id: 'discrimination',
        title: t('reportCategories.discrimination.title'),
        description: t('reportCategories.discrimination.description')
      },
      {
        id: 'wrongful-termination',
        title: t('reportCategories.wrongfulTermination.title'),
        description: t('reportCategories.wrongfulTermination.description')
      },
      {
        id: 'hour-violation',
        title: t('reportCategories.hourViolation.title'),
        description: t('reportCategories.hourViolation.description')
      },
      {
        id: 'retaliation',
        title: t('reportCategories.retaliation.title'),
        description: t('reportCategories.retaliation.description')
      },
      {
        id: 'benefits-denial',
        title: t('reportCategories.benefitsDenial.title'),
        description: t('reportCategories.benefitsDenial.description')
      },
      {
        id: 'immigration-threat',
        title: t('reportCategories.immigrationThreat.title'),
        description: t('reportCategories.immigrationThreat.description')
      },
      {
        id: 'other',
        title: t('reportCategories.other.title'),
        description: t('reportCategories.other.description')
      }
    ];
  };

  const issues = getIssueOptions();

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSubmit = async () => {
    if (selectedIssues.length === 0) {
      toast({
        title: t('reportIssue.noIssuesError'),
        description: t('reportIssue.selectAtLeastOne'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would save the selected issues to the database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the detailed report form with the selected issues and anonymity preference
      navigate('/report-details', { 
        state: { 
          selectedIssues: selectedIssues.map(id => issues.find(issue => issue.id === id)),
          isAnonymous: isAnonymous
        } 
      });
    } catch (error) {
      toast({
        title: t('reportIssue.submissionFailed'),
        description: t('reportIssue.errorTryAgain'),
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {t('reportIssue.title')}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            {t('reportIssue.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {issues.map(issue => (
            <Card 
              key={issue.id} 
              className={`cursor-pointer transition-all ${
                selectedIssues.includes(issue.id) 
                  ? 'border-[#6a994e] ring-2 ring-[#6a994e] ring-opacity-50' 
                  : 'hover:border-[#6a994e]/50'
              }`}
              onClick={() => handleIssueToggle(issue.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedIssues.includes(issue.id)}
                    onCheckedChange={() => handleIssueToggle(issue.id)}
                    id={`checkbox-${issue.id}`}
                  />
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{issue.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {t('reportIssue.selectedIssues')}: <strong>{selectedIssues.length}</strong>
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <div>
              <label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                {t('reportIssue.anonymousReport')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('reportIssue.anonymousDescription')}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedIssues.length === 0}
              className="w-full bg-[#6a994e] hover:bg-[#5a8c3e]"
            >
              {isSubmitting 
                ? t('reportIssue.processing')
                : t('reportIssue.continueToDetails')}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              {t('reportIssue.chatWithAI')}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            ℹ️ {t('reportIssue.confidentialNote')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
