
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, AlertTriangle, Scale, User, ArrowRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data for lawyer recommendations
const RECOMMENDED_LAWYERS = [
  { id: 1, name: "Sarah Johnson", specialization: "Employment Law", yearsExperience: 12, rating: 4.9 },
  { id: 2, name: "Michael Chen", specialization: "Civil Rights", yearsExperience: 8, rating: 4.7 },
  { id: 3, name: "Priya Patel", specialization: "Labor Disputes", yearsExperience: 15, rating: 4.8 }
];

// Mock NGOs that might help
const RECOMMENDED_NGOS = [
  { id: 1, name: "Workers Rights Coalition", focus: "Labor Rights", established: 1992 },
  { id: 2, name: "Equal Justice Initiative", focus: "Civil Rights", established: 1989 }
];

const ReportConfirmation = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [callSummary, setCallSummary] = useState<string>('');
  const [severityScore, setSeverityScore] = useState<number>(0);
  const [reportId, setReportId] = useState<string>('');
  const [issueType, setIssueType] = useState<string>('');
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState<boolean>(false);
  
  useEffect(() => {
    // For call summary display (from Call page)
    const summaryFromState = location.state?.summary;
    const fromCallPage = location.state?.fromCall === true;
    
    if (summaryFromState && fromCallPage) {
      setCallSummary(summaryFromState);
    }
    
    // For report completion and analysis
    const reportComplete = location.state?.reportComplete === true;
    if (reportComplete) {
      setIsReportSubmitted(true);
      setSeverityScore(location.state?.severity || 65); // Default to 65 if not provided
      setReportId(location.state?.reportId || 'unknown');
      setIssueType(location.state?.issueType || 'Workplace Issue');
      setShowRecommendations(true);
    }
  }, [location]);

  const handleContinue = () => {
    navigate('/report-issue', { state: { summary: callSummary } });
  };
  
  const handleViewReports = () => {
    navigate('/my-reports');
  };

  const getSeverityLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "bg-green-500" };
    if (score < 70) return { level: "Moderate", color: "bg-yellow-500" };
    return { level: "Severe", color: "bg-red-500" };
  };

  const severity = getSeverityLevel(severityScore);

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 w-full">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {callSummary ? t('reportConfirmation.callSummary') : 
               isReportSubmitted ? 'Report Analysis' : 
               t('reportConfirmation.reportSubmitted')}
            </h1>
            <p className="text-gray-600">
              {callSummary 
                ? t('reportConfirmation.callSummaryCreated') 
                : isReportSubmitted
                ? `We've analyzed your report #${reportId.substring(0, 6)}`
                : t('reportConfirmation.reportReceived')}
            </p>
          </div>
          
          {callSummary ? (
            <div className="mb-6 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
              <p className="text-sm">{callSummary}</p>
            </div>
          ) : isReportSubmitted ? (
            <div className="space-y-6 mb-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Case Severity Analysis</h2>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{Math.round(severityScore)}</span>
                  <span className="text-gray-500">/100</span>
                </div>
                <Progress value={severityScore} className={`h-2 ${severity.color}`} />
                <p className="mt-2 text-sm font-medium">{severity.level} Severity</p>
              </div>
              
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-3">Our Recommendation</h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">
                    {severityScore > 50 
                      ? "Based on our analysis, we recommend legal representation." 
                      : "Based on our analysis, NGO support may be sufficient."}
                  </p>
                </div>
              </div>
              
              {severityScore > 50 ? (
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Recommended Lawyers
                  </h3>
                  <div className="space-y-2">
                    {RECOMMENDED_LAWYERS.slice(0, 2).map(lawyer => (
                      <Card key={lawyer.id} className="bg-white">
                        <CardContent className="p-3">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{lawyer.name}</p>
                              <p className="text-xs text-gray-500">{lawyer.specialization} • {lawyer.yearsExperience} years</p>
                            </div>
                            <div className="text-amber-500 text-sm font-medium">
                              ★ {lawyer.rating}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View More Lawyers <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Scale className="h-4 w-4" />
                    Recommended NGOs
                  </h3>
                  <div className="space-y-2">
                    {RECOMMENDED_NGOS.map(ngo => (
                      <Card key={ngo.id} className="bg-white">
                        <CardContent className="p-3">
                          <div>
                            <p className="font-medium">{ngo.name}</p>
                            <p className="text-xs text-gray-500">{ngo.focus} • Est. {ngo.established}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border rounded-md p-3 bg-amber-50 border-amber-200">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Important Note</p>
                    <p className="text-xs text-amber-700">
                      This analysis is provided as guidance only and does not constitute legal advice.
                    </p>
                  </div>
                </div>
              </div>
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
              variant={callSummary || isReportSubmitted ? "outline" : "default"} 
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
