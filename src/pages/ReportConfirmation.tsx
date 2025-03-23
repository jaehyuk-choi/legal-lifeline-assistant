
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, FileText, Phone } from 'lucide-react';

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  description: string;
  rating: number;
  contact: string;
}

const ReportConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLegalViolation, setIsLegalViolation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    // Simulate checking the LLM analysis result
    // In a real implementation, this would be fetched from the backend
    const fetchAnalysisResults = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - in production this would come from the backend
        const mockViolationProbability = Math.random();
        setIsLegalViolation(mockViolationProbability > 0.2); // 80% chance of violation for demo purposes
        
        if (mockViolationProbability > 0.2) {
          // Mock lawyer data - would be real data in production
          setLawyers([
            {
              id: '1',
              name: 'Sarah Johnson',
              specialty: 'Labor Law, Wage Theft',
              description: 'Specializes in representing workers in wage theft and overtime cases with 15+ years of experience.',
              rating: 4.9,
              contact: 'sarah.johnson@legalaid.org'
            },
            {
              id: '2',
              name: 'Michael Rodriguez',
              specialty: 'Discrimination, Workplace Safety',
              description: 'Advocate for immigrant workers with particular expertise in unsafe working conditions and discrimination.',
              rating: 4.7,
              contact: 'mrodriguez@workerjustice.com'
            },
            {
              id: '3',
              name: 'Lisa Chen',
              specialty: 'Wrongful Termination, Retaliation',
              description: 'Focused on helping workers who have faced termination or retaliation after reporting workplace violations.',
              rating: 4.8,
              contact: 'lisa@workersrights.org'
            }
          ]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching analysis results:', error);
        setIsLoading(false);
      }
    };

    fetchAnalysisResults();
  }, [user, navigate]);

  const handleDownloadPdf = () => {
    // In a real implementation, this would download a generated PDF of the report
    alert('In a real implementation, this would download your report PDF');
  };

  const handleContactLawyer = (lawyer: Lawyer) => {
    // In a real implementation, this would initiate contact with the lawyer
    alert(`In a real implementation, this would connect you with ${lawyer.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <BackgroundGradient />
        <Header />
        
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Analyzing Your Report</CardTitle>
              <CardDescription>
                We're using AI to analyze the details of your situation.
                This may take a moment...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Report Submitted Successfully</CardTitle>
                  <CardDescription>
                    Thank you for reporting your workplace issue. We've received your information.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our AI system has analyzed your report and generated a summary.
              </p>
              
              {isLegalViolation ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Potential Legal Violation Detected</h3>
                  <p className="text-amber-700">
                    Based on our analysis, there is a high probability (>80%) that your situation 
                    may involve a legal violation of your workplace rights.
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Report Under Review</h3>
                  <p className="text-blue-700">
                    Based on our initial analysis, we need more information to determine if there's a legal violation. 
                    An advisor will review your case and contact you soon.
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Button onClick={handleDownloadPdf} className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Download Report PDF
                </Button>
                
                <Button variant="outline" onClick={() => navigate('/chat')} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Speak with an AI Advisor
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {isLegalViolation && (
            <div>
              <h2 className="text-xl font-bold mb-4">Recommended Legal Advisors</h2>
              <p className="text-muted-foreground mb-6">
                These legal professionals specialize in cases like yours and may be able to help.
                Many offer free initial consultations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {lawyers.map(lawyer => (
                  <Card key={lawyer.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                      <CardDescription>{lawyer.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{lawyer.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(lawyer.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm ml-1">{lawyer.rating.toFixed(1)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => handleContactLawyer(lawyer)} 
                        className="w-full"
                      >
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportConfirmation;
