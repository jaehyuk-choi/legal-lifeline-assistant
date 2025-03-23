
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface IssueOption {
  id: string;
  title: string;
  description: string;
}

const formSchema = z.object({
  when: z.string().min(1, { message: "Please provide the date/time of the incident" }),
  where: z.string().min(1, { message: "Please provide the location of the incident" }),
  who: z.string().min(1, { message: "Please provide information about who was involved" }),
  what: z.string().min(10, { message: "Please provide at least 10 characters describing what happened" }),
  evidenceDescription: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ReportDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeIssueIndex, setActiveIssueIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File[] }>({});

  // Get selected issues from navigation state
  const selectedIssues = location.state?.selectedIssues as IssueOption[] || [];

  // Redirect if no issues were selected
  if (selectedIssues.length === 0) {
    navigate('/report-issue');
    return null;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      when: '',
      where: '',
      who: '',
      what: '',
      evidenceDescription: ''
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, issueId: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(prev => ({
        ...prev,
        [issueId]: [...(prev[issueId] || []), ...Array.from(e.target.files || [])]
      }));
    }
  };

  const removeFile = (issueId: string, index: number) => {
    setSelectedFiles(prev => ({
      ...prev,
      [issueId]: prev[issueId].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your report.",
        variant: "destructive"
      });
      navigate('/sign-in', { state: { returnUrl: location.pathname } });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const currentIssue = selectedIssues[activeIssueIndex];
      
      // Save issue details to Supabase
      const { data: reportData, error: reportError } = await supabase
        .from('issue_reports')
        .insert({
          user_id: user.id,
          issue_type: currentIssue.id,
          issue_title: currentIssue.title,
          incident_date: values.when,
          incident_location: values.where,
          involved_parties: values.who,
          description: values.what,
          evidence_description: values.evidenceDescription || null,
          status: 'pending_review',
          created_at: new Date().toISOString()
        })
        .select();
      
      if (reportError) throw reportError;
      
      // Upload evidence files if any
      const files = selectedFiles[currentIssue.id] || [];
      if (files.length > 0 && reportData?.[0]?.id) {
        const reportId = reportData[0].id;
        
        for (const file of files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${reportId}/${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('evidence')
            .upload(fileName, file);
            
          if (uploadError) throw uploadError;
        }
      }

      // Check if this is the last issue to report
      if (activeIssueIndex < selectedIssues.length - 1) {
        // Move to the next issue
        setActiveIssueIndex(activeIssueIndex + 1);
        form.reset();
      } else {
        // All issues reported, navigate to confirmation page
        toast({
          title: "Report Submitted Successfully",
          description: "We've received your report and will review it shortly.",
        });
        navigate('/report-confirmation');
      }
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentIssue = selectedIssues[activeIssueIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Report Details</h1>
            <p className="text-muted-foreground mt-2">
              Please provide specific details about the incident(s) you experienced.
              {selectedIssues.length > 1 && ` (Issue ${activeIssueIndex + 1} of ${selectedIssues.length})`}
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{currentIssue.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="when"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When did this happen?</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="e.g., June 15, 2023, around 2 PM" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide the date and approximate time of the incident
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="where"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where did this happen?</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="e.g., Company name, address, or specific location" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide the location where the incident occurred
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="who"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who was involved?</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="e.g., Supervisor name, coworkers, or company representatives" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide names or positions of people involved
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="what"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What happened?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe in detail what happened..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of the incident
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <Label>Evidence (Optional)</Label>
                    <div className="grid gap-2">
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e, currentIssue.id)}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload photos, documents, or other evidence related to this incident
                      </p>
                    </div>
                    
                    {selectedFiles[currentIssue.id]?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold mb-1">Selected Files:</p>
                        <ul className="text-sm space-y-1">
                          {selectedFiles[currentIssue.id]?.map((file, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span className="truncate max-w-[300px]">{file.name}</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeFile(currentIssue.id, index)}
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="evidenceDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Evidence Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe the evidence you're providing..." 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/report-issue')}
                    >
                      Back
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Submitting..." 
                        : activeIssueIndex < selectedIssues.length - 1 
                          ? "Save & Continue to Next Issue" 
                          : "Submit Report"
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportDetails;
