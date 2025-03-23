
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issues: IssueOption[] = [
    {
      id: 'wage-theft',
      title: '임금 체불',
      description: '일한 만큼 급여를 받지 못했거나, 초과근무에 대한 급여를 받지 못했습니다.'
    },
    {
      id: 'unsafe-conditions',
      title: '안전하지 않은 근무 환경',
      description: '작업 환경이 위험하거나 건강에 해롭습니다.'
    },
    {
      id: 'discrimination',
      title: '차별 또는 괴롭힘',
      description: '인종, 성별, 국적 등을 이유로 차별이나 괴롭힘을 당했습니다.'
    },
    {
      id: 'wrongful-termination',
      title: '부당 해고',
      description: '정당한 이유 없이 해고되었습니다.'
    },
    {
      id: 'hour-violation',
      title: '근무시간 위반',
      description: '법적으로 허용된 시간 이상으로 일하게 되거나, 휴식 시간을 제공받지 못했습니다.'
    },
    {
      id: 'retaliation',
      title: '보복 행위',
      description: '권리를 주장하거나 불만을 제기한 후 불이익을 당했습니다.'
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
        title: "선택된 항목이 없습니다",
        description: "최소 하나 이상의 문제를 선택해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 실제 구현 시에는 여기에 API 호출 코드가 들어갑니다
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "보고서가 제출되었습니다",
        description: "귀하의 상황을 검토한 후 연락드리겠습니다.",
      });
      
      // 제출 후 채팅 페이지로 이동
      navigate('/chat');
    } catch (error) {
      toast({
        title: "제출 실패",
        description: "보고서 제출 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">법적 문제 보고하기</h1>
          <p className="text-muted-foreground mt-2">
            귀하가 경험하고 있는 직장 내 문제를 선택해주세요. 다음 단계에서 더 자세한 내용을 물어볼 것입니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {issues.map(issue => (
            <Card 
              key={issue.id} 
              className={`cursor-pointer transition-all ${
                selectedIssues.includes(issue.id) 
                  ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                  : 'hover:border-primary/50'
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
            선택한 항목: <strong>{selectedIssues.length}</strong>
          </p>
          
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedIssues.length === 0}
              className="w-full"
            >
              {isSubmitting ? "제출 중..." : "문제 보고하기"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              AI 상담사와 채팅하기
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            ℹ️ 이 보고서는 법적 조언이 아니며, 귀하의 상황을 더 잘 이해하기 위한 첫 단계입니다.
            더 자세한 대화는 채팅 또는 전화 상담으로 진행됩니다.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
