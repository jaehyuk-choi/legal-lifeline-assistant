
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
    // 리포트 확인 페이지에서는 필요한 경우에만 요약 정보를 표시
    // 통화 관련 페이지에서 직접 왔을 때만 통화 요약을 표시
    const summaryFromState = location.state?.summary;
    const fromCallPage = location.state?.fromCall === true;
    
    if (summaryFromState && fromCallPage) {
      setCallSummary(summaryFromState);
    }
  }, [location]);

  const handleContinue = () => {
    navigate('/report-issue', { state: { summary: callSummary } });
  };
  
  const handleViewReports = () => {
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
            <h1 className="text-2xl font-bold mb-2">{callSummary ? t('reportConfirmation.callSummary') : t('reportConfirmation.reportSubmitted')}</h1>
            <p className="text-gray-600">
              {callSummary 
                ? t('reportConfirmation.callSummaryCreated') 
                : t('reportConfirmation.reportReceived')}
            </p>
          </div>
          
          {callSummary ? (
            <div className="mb-6 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
              <p className="text-sm">{callSummary}</p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-700">{t('reportConfirmation.thankYou')}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {callSummary ? (
              <Button 
                onClick={handleContinue}
                className="w-full flex justify-center items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {t('reportConfirmation.createReport')}
              </Button>
            ) : null}
            
            <Button 
              variant={callSummary ? "outline" : "default"} 
              onClick={handleViewReports}
              className="w-full"
            >
              {t('reportConfirmation.viewReports')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportConfirmation;
