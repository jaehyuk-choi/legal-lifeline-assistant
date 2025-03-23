
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
import { ArrowLeft, Save } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from '@/context/LanguageContext';

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

const placeholderTranslations = {
  when: {
    en: "e.g., June 15, 2023, around 2 PM",
    es: "ej., 15 de junio de 2023, alrededor de las 2 p.m.",
    fr: "ex., 15 juin 2023, vers 14h",
    zh: "例如，2023年6月15日，下午2点左右",
    ko: "예: 2023년 6월 15일, 오후 2시경",
    hi: "उदा., 15 जून, 2023, लगभग दोपहर 2 बजे"
  },
  where: {
    en: "e.g., Company name, address, or specific location",
    es: "ej., Nombre de la empresa, dirección o ubicación específica",
    fr: "ex., Nom de l'entreprise, adresse ou emplacement spécifique",
    zh: "例如，公司名称、地址或特定位置",
    ko: "예: 회사 이름, 주소 또는 특정 위치",
    hi: "उदा., कंपनी का नाम, पता, या विशिष्ट स्थान"
  },
  who: {
    en: "e.g., Supervisor name, coworkers, or company representatives",
    es: "ej., Nombre del supervisor, compañeros de trabajo o representantes de la empresa",
    fr: "ex., Nom du superviseur, collègues ou représentants de l'entreprise",
    zh: "例如，主管姓名、同事或公司代表",
    ko: "예: 관리자 이름, 동료 또는 회사 대표",
    hi: "उदा., पर्यवेक्षक का नाम, सहकर्मी, या कंपनी के प्रतिनिधि"
  },
  what: {
    en: "Please describe in detail what happened...",
    es: "Por favor describa en detalle lo que sucedió...",
    fr: "Veuillez décrire en détail ce qui s'est passé...",
    zh: "请详细描述发生了什么...",
    ko: "발생한 일에 대해 자세히 설명해 주세요...",
    hi: "कृपया विस्तार से बताएं कि क्या हुआ था..."
  },
  evidence: {
    en: "Briefly describe the evidence you're providing...",
    es: "Describa brevemente la evidencia que está proporcionando...",
    fr: "Décrivez brièvement les preuves que vous fournissez...",
    zh: "简要描述您提供的证据...",
    ko: "제공하는 증거에 대해 간략하게 설명해 주세요...",
    hi: "आप जो सबूत प्रदान कर रहे हैं उसका संक्षेप में वर्णन करें..."
  }
};

const ReportDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [activeIssueIndex, setActiveIssueIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File[] }>({});
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [savedForms, setSavedForms] = useState<{ [key: string]: FormValues }>({});

  const selectedIssues = location.state?.selectedIssues as IssueOption[] || [];

  if (selectedIssues.length === 0) {
    navigate('/report-issue');
    return null;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      when: savedForms[selectedIssues[activeIssueIndex]?.id]?.when || '',
      where: savedForms[selectedIssues[activeIssueIndex]?.id]?.where || '',
      who: savedForms[selectedIssues[activeIssueIndex]?.id]?.who || '',
      what: savedForms[selectedIssues[activeIssueIndex]?.id]?.what || '',
      evidenceDescription: savedForms[selectedIssues[activeIssueIndex]?.id]?.evidenceDescription || ''
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
  
  const handleSaveForm = async () => {
    const values = form.getValues();
    
    setIsSaving(true);
    try {
      setSavedForms(prev => ({
        ...prev,
        [selectedIssues[activeIssueIndex].id]: values
      }));
      
      toast({
        title: "Progress saved",
        description: "Your report information has been saved.",
      });
    } catch (error) {
      console.error('Error saving form:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your progress.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackClick = () => {
    if (form.formState.isDirty) {
      setShowExitAlert(true);
    } else {
      navigate('/report-issue');
    }
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
      
      setSavedForms(prev => ({
        ...prev,
        [currentIssue.id]: values
      }));
      
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
          status: 'submitted',
          created_at: new Date().toISOString()
        })
        .select();
      
      if (reportError) throw reportError;
      
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

      if (activeIssueIndex < selectedIssues.length - 1) {
        setActiveIssueIndex(activeIssueIndex + 1);
        form.reset({
          when: savedForms[selectedIssues[activeIssueIndex + 1]?.id]?.when || '',
          where: savedForms[selectedIssues[activeIssueIndex + 1]?.id]?.where || '',
          who: savedForms[selectedIssues[activeIssueIndex + 1]?.id]?.who || '',
          what: savedForms[selectedIssues[activeIssueIndex + 1]?.id]?.what || '',
          evidenceDescription: savedForms[selectedIssues[activeIssueIndex + 1]?.id]?.evidenceDescription || ''
        });
      } else {
        toast({
          title: "Report Submitted Successfully",
          description: "We've received your report and will review it shortly.",
        });
        // 통화 요약 정보 삭제
        sessionStorage.removeItem('callSummary');
        navigate('/my-reports');
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
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBackClick}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">{t('reportDetails.title')}</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              {t('reportDetails.subtitle')}
              {selectedIssues.length > 1 && ` (${t('reportDetails.issueOf')} ${activeIssueIndex + 1} ${t('of')} ${selectedIssues.length})`}
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{currentIssue.title}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveForm}
                  disabled={isSaving || !form.formState.isDirty}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {t('reportDetails.saveProgress')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="when"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('reportDetails.when')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder={placeholderTranslations.when[language]} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {t('reportDetails.whenDescription')}
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
                        <FormLabel>{t('reportDetails.where')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder={placeholderTranslations.where[language]} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {t('reportDetails.whereDescription')}
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
                        <FormLabel>{t('reportDetails.who')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder={placeholderTranslations.who[language]} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {t('reportDetails.whoDescription')}
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
                        <FormLabel>{t('reportDetails.what')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={placeholderTranslations.what[language]} 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {t('reportDetails.whatDescription')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <Label>{t('reportDetails.evidence')}</Label>
                    <div className="grid gap-2">
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e, currentIssue.id)}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('reportDetails.evidenceUpload')}
                      </p>
                    </div>
                    
                    {selectedFiles[currentIssue.id]?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold mb-1">{t('reportDetails.selectedFiles')}</p>
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
                                {t('reportDetails.remove')}
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
                          <FormLabel>{t('reportDetails.evidenceDescription')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={placeholderTranslations.evidence[language]} 
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
                      onClick={handleBackClick}
                    >
                      {t('reportDetails.back')}
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#6a994e] hover:bg-[#5a8c3e]"
                    >
                      {isSubmitting 
                        ? t('reportDetails.processing') 
                        : activeIssueIndex < selectedIssues.length - 1 
                          ? t('reportDetails.nextIssue') 
                          : t('reportDetails.submit')
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('reportDetails.unsavedChanges')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('reportDetails.wantToSave')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('reportDetails.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveForm}>{t('reportDetails.saveProgress')}</AlertDialogAction>
            <AlertDialogAction onClick={() => navigate('/report-issue')}>
              {t('reportDetails.leaveWithoutSaving')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReportDetails;
