
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
      title: 'Wage Theft',
      description: 'Not being paid for hours worked or overtime, or being paid less than minimum wage.'
    },
    {
      id: 'unsafe-conditions',
      title: 'Unsafe Working Conditions',
      description: 'Working environment that is dangerous or harmful to health.'
    },
    {
      id: 'discrimination',
      title: 'Discrimination or Harassment',
      description: 'Being treated unfairly or harassed due to race, gender, nationality, etc.'
    },
    {
      id: 'wrongful-termination',
      title: 'Wrongful Termination',
      description: 'Being fired without proper cause or due process.'
    },
    {
      id: 'hour-violation',
      title: 'Hour Violations',
      description: 'Being forced to work more than legally allowed hours or not given breaks.'
    },
    {
      id: 'retaliation',
      title: 'Retaliation',
      description: 'Facing negative consequences after reporting issues or exercising your rights.'
    },
    {
      id: 'benefits-denial',
      title: 'Benefits Denial',
      description: 'Being unfairly denied benefits you are entitled to, such as healthcare or paid leave.'
    },
    {
      id: 'other',
      title: 'Other Issues',
      description: 'Any other workplace violations not listed above.'
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
        title: "No issues selected",
        description: "Please select at least one issue to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would save the selected issues to the database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the detailed report form with the selected issues
      navigate('/report-details', { 
        state: { 
          selectedIssues: selectedIssues.map(id => issues.find(issue => issue.id === id))
        } 
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
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
          <h1 className="text-2xl font-bold">Report a Workplace Issue</h1>
          <p className="text-muted-foreground mt-2">
            Select the issues you've experienced at your workplace. In the next step, we'll ask for more details.
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
            Selected issues: <strong>{selectedIssues.length}</strong>
          </p>
          
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedIssues.length === 0}
              className="w-full"
            >
              {isSubmitting ? "Processing..." : "Continue to Details"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              Chat with AI Assistant
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            ℹ️ This report is not legal advice, but the first step in understanding your situation.
            Further conversation will be conducted via chat or phone consultation.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
