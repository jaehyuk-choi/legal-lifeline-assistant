
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { useLanguage } from '@/context/LanguageContext';

const ReportConfirmation = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [callSummary, setCallSummary] = useState<string>('');
  
  useEffect(() => {
    // First try to get the summary from router state - way cleaner this way
    const summaryFromState = location.state?.summary;
    
    if (summaryFromState) {
      setCallSummary(summaryFromState);
    } else {
      // Fallback to sessionStorage if not in router state
      // This happens if user refreshes or navigates directly - had to add this workaround
      const storedSummary = sessionStorage.getItem('callSummary');
      if (storedSummary) {
        setCallSummary(storedSummary);
      }
    }
  }, [location]);

  const handleContinue = () => {
    // Pass the summary to the report creation page
    navigate('/report-issue', { state: { summary: callSummary } });
  };
  
  const handleViewReports = () => {
    // Let's go see their reports instead
    navigate('/my-reports');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 w-full">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Call Summary</h1>
            <p className="text-gray-600">
              We've created a summary of your conversation with our legal assistant.
            </p>
          </div>
          
          {callSummary ? (
            <div className="mb-6 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
              <p className="text-sm">{callSummary}</p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">No call summary available</p>
            </div>
          )}
          
          <div className="space-y-4">
            <Button 
              onClick={handleContinue}
              className="w-full flex justify-center items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Create Report Based on Summary
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleViewReports}
              className="w-full"
            >
              View My Reports
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportConfirmation;
