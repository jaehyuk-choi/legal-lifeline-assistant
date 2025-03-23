
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
  const { t, currentLanguage } = useLanguage();

  // Define issue options with direct text instead of translation keys
  const issues: IssueOption[] = [
    {
      id: 'wage-theft',
      title: currentLanguage === 'ko' ? '임금 갈취' : 'Wage Theft',
      description: currentLanguage === 'ko' 
        ? '미지급 임금, 최저임금 위반, 초과근무 수당 미지급 등' 
        : 'Unpaid wages, minimum wage violations, or unpaid overtime'
    },
    {
      id: 'unsafe-conditions',
      title: currentLanguage === 'ko' ? '불안전한 작업 환경' : 'Unsafe Working Conditions',
      description: currentLanguage === 'ko' 
        ? '위험한 작업 환경, 안전 장비 부족, 건강 위험 요소' 
        : 'Dangerous working environment, lack of safety equipment, or health hazards'
    },
    {
      id: 'discrimination',
      title: currentLanguage === 'ko' ? '차별' : 'Discrimination',
      description: currentLanguage === 'ko' 
        ? '인종, 성별, 종교, 국적, 장애 또는 다른 보호된 특성에 기반한 차별' 
        : 'Discrimination based on race, gender, religion, national origin, disability, or other protected characteristics'
    },
    {
      id: 'wrongful-termination',
      title: currentLanguage === 'ko' ? '부당 해고' : 'Wrongful Termination',
      description: currentLanguage === 'ko' 
        ? '불법적인 이유로 해고되거나 계약 위반으로 해고된 경우' 
        : 'Being fired for an illegal reason or in violation of an employment contract'
    },
    {
      id: 'hour-violation',
      title: currentLanguage === 'ko' ? '근무 시간 위반' : 'Hour Violations',
      description: currentLanguage === 'ko' 
        ? '휴식 시간 미제공, 초과 근무 강요, 불법적인 교대 패턴' 
        : 'Denial of breaks, forced overtime, or illegal shift patterns'
    },
    {
      id: 'retaliation',
      title: currentLanguage === 'ko' ? '보복' : 'Retaliation',
      description: currentLanguage === 'ko' 
        ? '합법적인 권리 행사에 대한 고용주의 보복 행위' 
        : 'Employer retaliation for exercising your legal rights'
    },
    {
      id: 'benefits-denial',
      title: currentLanguage === 'ko' ? '복지 혜택 거부' : 'Benefits Denial',
      description: currentLanguage === 'ko' 
        ? '약속된 건강 보험, 퇴직금, 또는 다른 혜택의 부당한 거부' 
        : 'Wrongful denial of promised health insurance, retirement, or other benefits'
    },
    {
      id: 'immigration-threat',
      title: currentLanguage === 'ko' ? '이민 신분 위협' : 'Immigration Status Threats',
      description: currentLanguage === 'ko' 
        ? '이민 신분이나 체류 자격을 이용한 고용주의 위협이나 협박' 
        : 'Employer threats or intimidation related to immigration status'
    },
    {
      id: 'other',
      title: currentLanguage === 'ko' ? '기타 문제' : 'Other Issues',
      description: currentLanguage === 'ko' 
        ? '위에 나열되지 않은 직장 관련 문제' 
        : 'Workplace issues not listed above'
    }
  ];

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
              {currentLanguage === 'ko' ? '직장 문제 신고하기' : 'Report a Workplace Issue'}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            {currentLanguage === 'ko' 
              ? '직장에서 경험한 문제를 선택하세요. 다음 단계에서 더 자세한 정보를 요청할 것입니다.' 
              : 'Select the issues you\'ve experienced at your workplace. In the next step, we\'ll ask for more details.'}
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
            {currentLanguage === 'ko' ? '선택한 문제:' : 'Selected issues:'} <strong>{selectedIssues.length}</strong>
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <div>
              <label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                {currentLanguage === 'ko' ? '익명으로 신고하기' : 'Report anonymously'}
              </label>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'ko' 
                  ? '익명 신고는 개인 정보 없이 처리됩니다.' 
                  : 'Anonymous reports will be processed without your personal information.'}
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
                ? (currentLanguage === 'ko' ? '처리 중...' : 'Processing...') 
                : (currentLanguage === 'ko' ? '상세 정보 입력으로 계속' : 'Continue to Details')}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              {currentLanguage === 'ko' ? 'AI와 채팅하기' : 'Chat with AI'}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            ℹ️ {currentLanguage === 'ko' 
              ? '모든 신고는 기밀로 처리되며 법적 지원을 위해 검토됩니다.' 
              : 'All reports are confidential and will be reviewed for legal assistance.'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
