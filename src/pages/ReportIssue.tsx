
import React, { useState, useEffect } from 'react';
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

// Add translations for report categories for languages that don't have them yet
const categoryTranslations = {
  'wageTheft': {
    en: {
      title: 'Wage Theft',
      description: 'Not receiving full pay, unpaid overtime, or working off the clock'
    },
    es: {
      title: 'Robo de Salario',
      description: 'No recibir pago completo, horas extras no pagadas o trabajar fuera del horario registrado'
    },
    fr: {
      title: 'Vol de Salaire',
      description: 'Ne pas recevoir de salaire complet, heures supplémentaires non payées ou travailler sans être rémunéré'
    },
    zh: {
      title: '工资盗窃',
      description: '没有收到全额工资，无薪加班，或下班后工作'
    },
    ko: {
      title: '임금 도둑',
      description: '전액을 받지 못하거나, 초과 근무 수당 미지급, 또는 기록되지 않은 근무'
    },
    hi: {
      title: 'वेतन चोरी',
      description: 'पूर्ण भुगतान न मिलना, अवैतनिक ओवरटाइम, या घड़ी के बाहर काम करना'
    }
  },
  'unsafeConditions': {
    en: {
      title: 'Unsafe Working Conditions',
      description: 'Hazardous environments, lack of safety equipment, or dangerous procedures'
    },
    es: {
      title: 'Condiciones de Trabajo Inseguras',
      description: 'Ambientes peligrosos, falta de equipo de seguridad o procedimientos peligrosos'
    },
    fr: {
      title: 'Conditions de Travail Dangereuses',
      description: 'Environnements dangereux, manque d\'équipement de sécurité ou procédures dangereuses'
    },
    zh: {
      title: '不安全的工作条件',
      description: '危险环境，缺乏安全设备，或危险程序'
    },
    ko: {
      title: '불안전한 작업 조건',
      description: '위험한 환경, 안전 장비 부족 또는 위험한 절차'
    },
    hi: {
      title: 'असुरक्षित कार्य स्थितियां',
      description: 'खतरनाक वातावरण, सुरक्षा उपकरणों की कमी, या खतरनाक प्रक्रियाएं'
    }
  },
  'discrimination': {
    en: {
      title: 'Discrimination',
      description: 'Unfair treatment based on protected characteristics like race, gender, or age'
    },
    es: {
      title: 'Discriminación',
      description: 'Trato injusto basado en características protegidas como raza, género o edad'
    },
    fr: {
      title: 'Discrimination',
      description: 'Traitement injuste basé sur des caractéristiques protégées comme la race, le genre ou l\'âge'
    },
    zh: {
      title: '歧视',
      description: '基于受保护特征如种族、性别或年龄的不公平待遇'
    },
    ko: {
      title: '차별',
      description: '인종, 성별, 나이 등 보호되는 특성에 기반한 불공정한 대우'
    },
    hi: {
      title: 'भेदभाव',
      description: 'जाति, लिंग या उम्र जैसी संरक्षित विशेषताओं के आधार पर अनुचित व्यवहार'
    }
  },
  'wrongfulTermination': {
    en: {
      title: 'Wrongful Termination',
      description: 'Being fired for illegal reasons or in violation of employment contract'
    },
    es: {
      title: 'Despido Injustificado',
      description: 'Ser despedido por razones ilegales o en violación del contrato de trabajo'
    },
    fr: {
      title: 'Licenciement Abusif',
      description: 'Être licencié pour des raisons illégales ou en violation du contrat de travail'
    },
    zh: {
      title: '不当解雇',
      description: '因非法原因或违反雇佣合同而被解雇'
    },
    ko: {
      title: '부당 해고',
      description: '불법적인 이유로 또는 고용 계약을 위반하여 해고됨'
    },
    hi: {
      title: 'अनुचित बर्खास्तगी',
      description: 'गैरकानूनी कारणों या रोजगार अनुबंध के उल्लंघन में निकाला जाना'
    }
  },
  'hourViolation': {
    en: {
      title: 'Hour and Break Violations',
      description: 'Not receiving legally required breaks or working excessive hours'
    },
    es: {
      title: 'Violaciones de Horas y Descansos',
      description: 'No recibir los descansos legalmente requeridos o trabajar horas excesivas'
    },
    fr: {
      title: 'Violations d\'Heures et de Pauses',
      description: 'Ne pas recevoir les pauses légalement requises ou travailler des heures excessives'
    },
    zh: {
      title: '工时和休息违规',
      description: '未获得法律要求的休息时间或工作时间过长'
    },
    ko: {
      title: '시간 및 휴식 위반',
      description: '법적으로 요구되는 휴식을 받지 못하거나 과도한 시간 근무'
    },
    hi: {
      title: 'घंटे और ब्रेक उल्लंघन',
      description: 'कानूनी रूप से आवश्यक ब्रेक न मिलना या अत्यधिक घंटे काम करना'
    }
  },
  'retaliation': {
    en: {
      title: 'Retaliation',
      description: 'Facing negative consequences for reporting issues or exercising legal rights'
    },
    es: {
      title: 'Represalias',
      description: 'Enfrentar consecuencias negativas por reportar problemas o ejercer derechos legales'
    },
    fr: {
      title: 'Représailles',
      description: 'Faire face à des conséquences négatives pour avoir signalé des problèmes ou exercé des droits légaux'
    },
    zh: {
      title: '报复',
      description: '因举报问题或行使合法权利而面临负面后果'
    },
    ko: {
      title: '보복',
      description: '문제 보고 또는 법적 권리 행사로 인한 부정적 결과 직면'
    },
    hi: {
      title: 'प्रतिशोध',
      description: 'मुद्दों की रिपोर्ट करने या कानूनी अधिकारों का प्रयोग करने के लिए नकारात्मक परिणामों का सामना करना'
    }
  },
  'benefitsDenial': {
    en: {
      title: 'Benefits Denial',
      description: 'Being improperly denied benefits like health insurance, PTO, or sick leave'
    },
    es: {
      title: 'Negación de Beneficios',
      description: 'Ser denegado incorrectamente de beneficios como seguro médico, tiempo libre pagado o licencia por enfermedad'
    },
    fr: {
      title: 'Refus d\'Avantages',
      description: 'Se voir refuser à tort des avantages comme l\'assurance maladie, les congés payés ou les congés maladie'
    },
    zh: {
      title: '福利拒绝',
      description: '被不当拒绝健康保险、带薪休假或病假等福利'
    },
    ko: {
      title: '복리후생 거부',
      description: '건강 보험, 유급 휴가 또는 병가와 같은 혜택을 부적절하게 거부당함'
    },
    hi: {
      title: 'लाभ अस्वीकृति',
      description: 'स्वास्थ्य बीमा, पीटीओ, या बीमारी की छुट्टी जैसे लाभों से अनुचित रूप से वंचित किया जाना'
    }
  },
  'immigrationThreat': {
    en: {
      title: 'Immigration-Related Threats',
      description: 'Threats regarding immigration status or document retention'
    },
    es: {
      title: 'Amenazas Relacionadas con Inmigración',
      description: 'Amenazas relacionadas con el estatus migratorio o la retención de documentos'
    },
    fr: {
      title: 'Menaces Liées à l\'Immigration',
      description: 'Menaces concernant le statut d\'immigration ou la rétention de documents'
    },
    zh: {
      title: '与移民相关的威胁',
      description: '关于移民身份或文件保留的威胁'
    },
    ko: {
      title: '이민 관련 위협',
      description: '이민 상태나 서류 보유에 관한 위협'
    },
    hi: {
      title: 'आव्रजन संबंधी धमकियां',
      description: 'आव्रजन स्थिति या दस्तावेज प्रतिधारण के संबंध में धमकियां'
    }
  },
  'other': {
    en: {
      title: 'Other Workplace Issue',
      description: 'Any other workplace violations not listed above'
    },
    es: {
      title: 'Otro Problema en el Lugar de Trabajo',
      description: 'Cualquier otra violación en el lugar de trabajo no mencionada anteriormente'
    },
    fr: {
      title: 'Autre Problème sur le Lieu de Travail',
      description: 'Toute autre violation sur le lieu de travail non listée ci-dessus'
    },
    zh: {
      title: '其他工作场所问题',
      description: '上面未列出的任何其他工作场所违规行为'
    },
    ko: {
      title: '기타 직장 문제',
      description: '위에 나열되지 않은 기타 직장 위반 사항'
    },
    hi: {
      title: 'अन्य कार्यस्थल समस्या',
      description: 'ऊपर सूचीबद्ध नहीं किया गया कोई अन्य कार्यस्थल उल्लंघन'
    }
  }
};

// Additional translations for UI elements
const uiTranslations = {
  'selectedIssues': {
    en: 'Selected issues',
    es: 'Problemas seleccionados',
    fr: 'Problèmes sélectionnés',
    zh: '已选择的问题',
    ko: '선택된 문제',
    hi: 'चयनित समस्याएं'
  },
  'anonymousReport': {
    en: 'Make this report anonymous',
    es: 'Hacer este informe anónimo',
    fr: 'Rendre ce rapport anonyme',
    zh: '匿名提交此报告',
    ko: '이 보고서를 익명으로 작성',
    hi: 'इस रिपोर्ट को अनाम बनाएं'
  },
  'anonymousDescription': {
    en: 'Your identity will be kept confidential, but we can still contact you about this report',
    es: 'Su identidad se mantendrá confidencial, pero aún podemos contactarlo sobre este informe',
    fr: 'Votre identité restera confidentielle, mais nous pourrons toujours vous contacter à propos de ce rapport',
    zh: '您的身份将保密，但我们仍可以就此报告与您联系',
    ko: '귀하의 신원은 기밀로 유지되지만, 이 보고서에 대해 여전히 연락할 수 있습니다',
    hi: 'आपकी पहचान गोपनीय रखी जाएगी, लेकिन हम अभी भी इस रिपोर्ट के बारे में आपसे संपर्क कर सकते हैं'
  },
  'confidentialNote': {
    en: 'All reports are confidential. We encrypt your data and never share your identity without your permission.',
    es: 'Todos los informes son confidenciales. Ciframos sus datos y nunca compartimos su identidad sin su permiso.',
    fr: 'Tous les rapports sont confidentiels. Nous chiffrons vos données et ne partageons jamais votre identité sans votre permission.',
    zh: '所有报告都是保密的。我们加密您的数据，未经您的许可绝不分享您的身份。',
    ko: '모든 보고서는 기밀입니다. 우리는 귀하의 데이터를 암호화하고 귀하의 허락 없이 신원을 공유하지 않습니다.',
    hi: 'सभी रिपोर्ट गोपनीय हैं। हम आपके डेटा को एन्क्रिप्ट करते हैं और आपकी अनुमति के बिना आपकी पहचान कभी साझा नहीं करते हैं।'
  },
  'noIssuesError': {
    en: 'No issues selected',
    es: 'No hay problemas seleccionados',
    fr: 'Aucun problème sélectionné',
    zh: '未选择任何问题',
    ko: '선택된 문제 없음',
    hi: 'कोई समस्या चयनित नहीं है'
  },
  'selectAtLeastOne': {
    en: 'Please select at least one issue to continue',
    es: 'Por favor seleccione al menos un problema para continuar',
    fr: 'Veuillez sélectionner au moins un problème pour continuer',
    zh: '请至少选择一个问题以继续',
    ko: '계속하려면 적어도 하나의 문제를 선택하세요',
    hi: 'जारी रखने के लिए कृपया कम से कम एक समस्या का चयन करें'
  },
  'processing': {
    en: 'Processing...',
    es: 'Procesando...',
    fr: 'Traitement...',
    zh: '处理中...',
    ko: '처리 중...',
    hi: 'प्रोसेसिंग...'
  }
};

const ReportIssue: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  // Helper function to get translated UI text
  const getUiText = (key: string): string => {
    if (uiTranslations[key] && uiTranslations[key][language]) {
      return uiTranslations[key][language];
    }
    // Fallback to English if translation not found
    return uiTranslations[key]?.en || key;
  };

  // Define issue options with translations
  const getIssueOptions = (): IssueOption[] => {
    return [
      {
        id: 'wage-theft',
        title: categoryTranslations.wageTheft[language]?.title || categoryTranslations.wageTheft.en.title,
        description: categoryTranslations.wageTheft[language]?.description || categoryTranslations.wageTheft.en.description
      },
      {
        id: 'unsafe-conditions',
        title: categoryTranslations.unsafeConditions[language]?.title || categoryTranslations.unsafeConditions.en.title,
        description: categoryTranslations.unsafeConditions[language]?.description || categoryTranslations.unsafeConditions.en.description
      },
      {
        id: 'discrimination',
        title: categoryTranslations.discrimination[language]?.title || categoryTranslations.discrimination.en.title,
        description: categoryTranslations.discrimination[language]?.description || categoryTranslations.discrimination.en.description
      },
      {
        id: 'wrongful-termination',
        title: categoryTranslations.wrongfulTermination[language]?.title || categoryTranslations.wrongfulTermination.en.title,
        description: categoryTranslations.wrongfulTermination[language]?.description || categoryTranslations.wrongfulTermination.en.description
      },
      {
        id: 'hour-violation',
        title: categoryTranslations.hourViolation[language]?.title || categoryTranslations.hourViolation.en.title,
        description: categoryTranslations.hourViolation[language]?.description || categoryTranslations.hourViolation.en.description
      },
      {
        id: 'retaliation',
        title: categoryTranslations.retaliation[language]?.title || categoryTranslations.retaliation.en.title,
        description: categoryTranslations.retaliation[language]?.description || categoryTranslations.retaliation.en.description
      },
      {
        id: 'benefits-denial',
        title: categoryTranslations.benefitsDenial[language]?.title || categoryTranslations.benefitsDenial.en.title,
        description: categoryTranslations.benefitsDenial[language]?.description || categoryTranslations.benefitsDenial.en.description
      },
      {
        id: 'immigration-threat',
        title: categoryTranslations.immigrationThreat[language]?.title || categoryTranslations.immigrationThreat.en.title,
        description: categoryTranslations.immigrationThreat[language]?.description || categoryTranslations.immigrationThreat.en.description
      },
      {
        id: 'other',
        title: categoryTranslations.other[language]?.title || categoryTranslations.other.en.title,
        description: categoryTranslations.other[language]?.description || categoryTranslations.other.en.description
      }
    ];
  };

  const issues = getIssueOptions();

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
        title: getUiText('noIssuesError'),
        description: getUiText('selectAtLeastOne'),
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
        title: "Error",
        description: "Failed to submit the report. Please try again.",
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
              {uiTranslations.reportIssue?.title?.[language] || "Report a Workplace Issue"}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            {uiTranslations.reportIssue?.subtitle?.[language] || "Select the issues you've experienced at your workplace. In the next step, we'll ask for more details."}
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
            {getUiText('selectedIssues')}: <strong>{selectedIssues.length}</strong>
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <div>
              <label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
                {getUiText('anonymousReport')}
              </label>
              <p className="text-xs text-muted-foreground">
                {getUiText('anonymousDescription')}
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
                ? getUiText('processing')
                : uiTranslations.reportDetails?.continueToDetails?.[language] || "Continue to Details"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              {uiTranslations.reportIssue?.chatWithAI?.[language] || "Chat with AI Assistant"}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            ℹ️ {getUiText('confidentialNote')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;
