
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, AlertCircle, Clock, CheckCircle, FileCheck, ArrowLeft, Loader2 } from 'lucide-react';

interface Report {
  id: string;
  issue_title: string;
  issue_type: string;
  status: string;
  created_at: string;
  violation_probability: number | null;
  incident_date: string;
  incident_location: string;
}

const statusColors = {
  'submitted': 'bg-blue-100 text-blue-800',
  'in_progress': 'bg-yellow-100 text-yellow-800',
  'reviewed': 'bg-purple-100 text-purple-800',
  'decision_made': 'bg-green-100 text-green-800',
};

const statusIcons = {
  'submitted': <FileText className="h-4 w-4" />,
  'in_progress': <Clock className="h-4 w-4" />,
  'reviewed': <CheckCircle className="h-4 w-4" />,
  'decision_made': <FileCheck className="h-4 w-4" />,
};

const statusLabels = {
  'submitted': 'Submitted',
  'in_progress': 'In Progress',
  'reviewed': 'Reviewed',
  'decision_made': 'Decision Made',
};

const progressValues = {
  'submitted': 25,
  'in_progress': 50,
  'reviewed': 75,
  'decision_made': 100,
};

const MyReports: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in', { state: { returnUrl: '/my-reports' } });
      return;
    }

    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('issue_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setReports(data || []);
      } catch (error: any) {
        console.error('Error fetching reports:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch your reports. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [user, navigate, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <BackgroundGradient />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading your reports...</p>
          </div>
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
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">My Reports</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Track the status of all your submitted workplace issue reports
            </p>
          </div>
          
          {reports.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Reports Found</h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You haven't submitted any workplace issue reports yet. 
                  Report an issue to get legal assistance and support.
                </p>
                <Button onClick={() => navigate('/report-issue')}>
                  Report an Issue
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <div className="bg-muted px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={statusColors[report.status as keyof typeof statusColors]}
                      >
                        <span className="flex items-center gap-1">
                          {statusIcons[report.status as keyof typeof statusIcons]}
                          {statusLabels[report.status as keyof typeof statusLabels]}
                        </span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Submitted on {formatDate(report.created_at)}
                      </span>
                    </div>
                    <Badge variant="outline" className="font-normal">
                      ID: {report.id.split('-')[0]}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{report.issue_title}</CardTitle>
                    <CardDescription>
                      Incident occurred on {report.incident_date} at {report.incident_location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Status: {statusLabels[report.status as keyof typeof statusLabels]}</span>
                          <span>{progressValues[report.status as keyof typeof progressValues]}%</span>
                        </div>
                        <Progress value={progressValues[report.status as keyof typeof progressValues]} className="h-2" />
                      </div>
                      
                      {report.violation_probability !== null && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-amber-800">
                            <AlertCircle className="h-4 w-4" />
                            <span className="font-medium">
                              Violation Probability: {Math.round(report.violation_probability * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end gap-3 pt-0">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/chat`)} // In production, this could pass context to the chat
                    >
                      Discuss This Case
                    </Button>
                    <Button onClick={() => navigate(`/report-confirmation`)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyReports;
