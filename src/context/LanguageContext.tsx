
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type LanguageCode = 'en' | 'es' | 'fr' | 'zh' | 'ko';

// Translations interface
interface Translations {
  [key: string]: {
    [key in LanguageCode]: string;
  };
}

// Example translations
const translations: Translations = {
  // Home page
  'hero.title': {
    en: 'Legal Assistance By Voice, Accessible To All',
    es: 'Asistencia Legal Por Voz, Accesible Para Todos',
    fr: 'Assistance Juridique Par Voix, Accessible à Tous',
    zh: '语音法律援助，人人可及',
    ko: '모두가 이용할 수 있는 음성 법률 지원',
  },
  'hero.subtitle': {
    en: 'A free voice-based legal assistant that helps workers understand their rights and take action against workplace violations.',
    es: 'Un asistente legal gratuito basado en voz que ayuda a los trabajadores a entender sus derechos y tomar medidas contra las violaciones en el lugar de trabajo.',
    fr: 'Un assistant juridique gratuit basé sur la voix qui aide les travailleurs à comprendre leurs droits et à agir contre les violations sur le lieu de travail.',
    zh: '一个免费的基于语音的法律助手，帮助工人了解自己的权利并对工作场所的违法行为采取行动。',
    ko: '무료 음성 기반 법률 도우미로 근로자가 자신의 권리를 이해하고 직장 내 위반에 대해 조치를 취하도록 도와줍니다.',
  },
  'cta.choose': {
    en: 'Choose how you want to connect with us - all services are free and confidential',
    es: 'Elija cómo desea conectarse con nosotros - todos los servicios son gratuitos y confidenciales',
    fr: 'Choisissez comment vous souhaitez vous connecter avec nous - tous les services sont gratuits et confidentiels',
    zh: '选择您想与我们联系的方式 - 所有服务均免费且保密',
    ko: '당신이 우리와 연결하고 싶은 방법을 선택하세요 - 모든 서비스는 무료이며 기밀입니다',
  },
  'button.startCall': {
    en: 'Start a Call',
    es: 'Iniciar una Llamada',
    fr: 'Démarrer un Appel',
    zh: '开始通话',
    ko: '통화 시작',
  },
  'button.chatNow': {
    en: 'Chat Now',
    es: 'Chatear Ahora',
    fr: 'Discuter Maintenant',
    zh: '立即聊天',
    ko: '지금 채팅',
  },
  'button.reportIssue': {
    en: 'Report Issue',
    es: 'Reportar Problema',
    fr: 'Signaler un Problème',
    zh: '报告问题',
    ko: '문제 신고',
  },
  'button.learnHow': {
    en: 'Learn How It Works',
    es: 'Aprenda Cómo Funciona',
    fr: 'Découvrez Comment Ça Marche',
    zh: '了解工作原理',
    ko: '작동 방식 알아보기',
  },
  'button.signIn': {
    en: 'Sign In',
    es: 'Iniciar Sesión',
    fr: 'Se Connecter',
    zh: '登录',
    ko: '로그인',
  },
  'button.signUp': {
    en: 'Sign Up',
    es: 'Registrarse',
    fr: 'S\'inscrire',
    zh: '注册',
    ko: '회원가입',
  },
  'button.signOut': {
    en: 'Sign Out',
    es: 'Cerrar Sesión',
    fr: 'Se Déconnecter',
    zh: '登出',
    ko: '로그아웃',
  },
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    zh: '首页',
    ko: '홈',
  },

  // Report Issue page
  'reportIssue.title': {
    en: 'Report a Workplace Issue',
    es: 'Reportar un Problema en el Lugar de Trabajo',
    fr: 'Signaler un Problème sur le Lieu de Travail',
    zh: '报告工作场所问题',
    ko: '직장 문제 신고',
  },
  'reportIssue.subtitle': {
    en: 'Select the issues you\'ve experienced at your workplace. In the next step, we\'ll ask for more details.',
    es: 'Seleccione los problemas que ha experimentado en su lugar de trabajo. En el siguiente paso, le pediremos más detalles.',
    fr: 'Sélectionnez les problèmes que vous avez rencontrés sur votre lieu de travail. À l\'étape suivante, nous vous demanderons plus de détails.',
    zh: '选择您在工作场所遇到的问题。在下一步中，我们将询问更多详细信息。',
    ko: '직장에서 경험한 문제를 선택하세요. 다음 단계에서 더 자세한 정보를 요청할 것입니다.',
  },
  'reportIssue.selectedIssues': {
    en: 'Selected issues',
    es: 'Problemas seleccionados',
    fr: 'Problèmes sélectionnés',
    zh: '已选择的问题',
    ko: '선택된 문제',
  },
  'reportIssue.continueToDetails': {
    en: 'Continue to Details',
    es: 'Continuar a Detalles',
    fr: 'Continuer vers les Détails',
    zh: '继续填写详细信息',
    ko: '세부 정보로 계속',
  },
  'reportIssue.chatWithAI': {
    en: 'Chat with AI Assistant',
    es: 'Chatear con Asistente de IA',
    fr: 'Discuter avec l\'Assistant IA',
    zh: '与AI助手聊天',
    ko: 'AI 도우미와 채팅',
  },
  'reportIssue.note': {
    en: 'This report is not legal advice, but the first step in understanding your situation. Further conversation will be conducted via chat or phone consultation.',
    es: 'Este informe no es un consejo legal, sino el primer paso para comprender su situación. La conversación adicional se realizará a través de chat o consulta telefónica.',
    fr: 'Ce rapport n\'est pas un avis juridique, mais la première étape pour comprendre votre situation. La conversation ultérieure sera menée par chat ou consultation téléphonique.',
    zh: '此报告不是法律建议，而是了解您情况的第一步。进一步的对话将通过聊天或电话咨询进行。',
    ko: '이 보고서는 법률 조언이 아니라 귀하의 상황을 이해하는 첫 번째 단계입니다. 추가 대화는 채팅이나 전화 상담을 통해 진행됩니다.',
  },
  
  // Report Details page
  'reportDetails.title': {
    en: 'Report Details',
    es: 'Detalles del Informe',
    fr: 'Détails du Rapport',
    zh: '报告详情',
    ko: '보고서 세부 정보',
  },
  'reportDetails.subtitle': {
    en: 'Please provide specific details about the incident(s) you experienced.',
    es: 'Por favor proporcione detalles específicos sobre el/los incidente(s) que experimentó.',
    fr: 'Veuillez fournir des détails spécifiques sur le(s) incident(s) que vous avez vécu(s).',
    zh: '请提供您经历的事件的具体细节。',
    ko: '경험하신 사건에 대한 구체적인 세부 정보를 제공해 주세요.',
  },
  'reportDetails.issueOf': {
    en: 'Issue',
    es: 'Problema',
    fr: 'Problème',
    zh: '问题',
    ko: '문제',
  },
  'reportDetails.when': {
    en: 'When did this happen?',
    es: '¿Cuándo sucedió esto?',
    fr: 'Quand est-ce arrivé?',
    zh: '这是什么时候发生的？',
    ko: '이 일은 언제 일어났나요?',
  },
  'reportDetails.whenDescription': {
    en: 'Provide the date and approximate time of the incident',
    es: 'Proporcione la fecha y hora aproximada del incidente',
    fr: 'Indiquez la date et l\'heure approximative de l\'incident',
    zh: '提供事件的日期和大致时间',
    ko: '사건 발생 날짜와 대략적인 시간을 알려주세요',
  },
  'reportDetails.where': {
    en: 'Where did this happen?',
    es: '¿Dónde sucedió esto?',
    fr: 'Où est-ce arrivé?',
    zh: '这是在哪里发生的？',
    ko: '이 일은 어디서 일어났나요?',
  },
  'reportDetails.whereDescription': {
    en: 'Provide the location where the incident occurred',
    es: 'Proporcione el lugar donde ocurrió el incidente',
    fr: 'Indiquez le lieu où l\'incident s\'est produit',
    zh: '提供事件发生的地点',
    ko: '사건이 발생한 장소를 알려주세요',
  },
  'reportDetails.who': {
    en: 'Who was involved?',
    es: '¿Quién estuvo involucrado?',
    fr: 'Qui était impliqué?',
    zh: '谁参与其中？',
    ko: '누가 관련되어 있었나요?',
  },
  'reportDetails.whoDescription': {
    en: 'Provide names or positions of people involved',
    es: 'Proporcione nombres o cargos de las personas involucradas',
    fr: 'Indiquez les noms ou les postes des personnes impliquées',
    zh: '提供相关人员的姓名或职位',
    ko: '관련된 사람들의 이름이나 직위를 제공하세요',
  },
  'reportDetails.what': {
    en: 'What happened?',
    es: '¿Qué pasó?',
    fr: 'Que s\'est-il passé?',
    zh: '发生了什么？',
    ko: '무슨 일이 있었나요?',
  },
  'reportDetails.whatDescription': {
    en: 'Provide a detailed description of the incident',
    es: 'Proporcione una descripción detallada del incidente',
    fr: 'Fournissez une description détaillée de l\'incident',
    zh: '提供事件的详细描述',
    ko: '사건에 대한 자세한 설명을 제공하세요',
  },
  'reportDetails.evidence': {
    en: 'Evidence (Optional)',
    es: 'Evidencia (Opcional)',
    fr: 'Preuve (Facultatif)',
    zh: '证据（可选）',
    ko: '증거 (선택 사항)',
  },
  'reportDetails.evidenceUpload': {
    en: 'Upload photos, documents, or other evidence related to this incident',
    es: 'Suba fotos, documentos u otras pruebas relacionadas con este incidente',
    fr: 'Téléchargez des photos, des documents ou d\'autres preuves liées à cet incident',
    zh: '上传与此事件相关的照片、文件或其他证据',
    ko: '이 사건과 관련된 사진, 문서 또는 기타 증거를 업로드하세요',
  },
  'reportDetails.selectedFiles': {
    en: 'Selected Files:',
    es: 'Archivos Seleccionados:',
    fr: 'Fichiers Sélectionnés:',
    zh: '已选择的文件：',
    ko: '선택된 파일:',
  },
  'reportDetails.remove': {
    en: 'Remove',
    es: 'Eliminar',
    fr: 'Supprimer',
    zh: '删除',
    ko: '제거',
  },
  'reportDetails.evidenceDescription': {
    en: 'Evidence Description',
    es: 'Descripción de la Evidencia',
    fr: 'Description de la Preuve',
    zh: '证据描述',
    ko: '증거 설명',
  },
  'reportDetails.back': {
    en: 'Back',
    es: 'Atrás',
    fr: 'Retour',
    zh: '返回',
    ko: '뒤로',
  },
  'reportDetails.submit': {
    en: 'Submit Report',
    es: 'Enviar Informe',
    fr: 'Soumettre le Rapport',
    zh: '提交报告',
    ko: '보고서 제출',
  },
  'reportDetails.nextIssue': {
    en: 'Save & Continue to Next Issue',
    es: 'Guardar y Continuar al Siguiente Problema',
    fr: 'Enregistrer et Continuer au Problème Suivant',
    zh: '保存并继续下一个问题',
    ko: '저장하고 다음 문제로 계속',
  },
  'reportDetails.unsavedChanges': {
    en: 'Unsaved Changes',
    es: 'Cambios No Guardados',
    fr: 'Changements Non Enregistrés',
    zh: '未保存的更改',
    ko: '저장되지 않은 변경 사항',
  },
  'reportDetails.wantToSave': {
    en: 'You have unsaved changes. Would you like to save your progress before leaving?',
    es: 'Tiene cambios no guardados. ¿Le gustaría guardar su progreso antes de salir?',
    fr: 'Vous avez des modifications non enregistrées. Voulez-vous sauvegarder votre progression avant de partir?',
    zh: '您有未保存的更改。是否要在离开前保存进度？',
    ko: '저장되지 않은 변경 사항이 있습니다. 떠나기 전에 진행 상황을 저장하시겠습니까?',
  },
  'reportDetails.cancel': {
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    zh: '取消',
    ko: '취소',
  },
  // Removed duplicate 'reportDetails.saveProgress'
  'reportDetails.leaveWithoutSaving': {
    en: 'Leave Without Saving',
    es: 'Salir Sin Guardar',
    fr: 'Quitter Sans Sauvegarder',
    zh: '不保存离开',
    ko: '저장하지 않고 나가기',
  },
  
  // Status translations for MyReports
  'status.pending_review': {
    en: 'Pending Review',
    es: 'Revisión Pendiente',
    fr: 'En Attente de Révision',
    zh: '等待审核',
    ko: '검토 대기 중',
  },
  'status.submitted': {
    en: 'Submitted',
    es: 'Enviado',
    fr: 'Soumis',
    zh: '已提交',
    ko: '제출됨',
  },
  'status.in_progress': {
    en: 'In Progress',
    es: 'En Progreso',
    fr: 'En Cours',
    zh: '处理中',
    ko: '진행 중',
  },
  'status.reviewed': {
    en: 'Reviewed',
    es: 'Revisado',
    fr: 'Examiné',
    zh: '已审核',
    ko: '검토됨',
  },
  'status.decision_made': {
    en: 'Decision Made',
    es: 'Decisión Tomada',
    fr: 'Décision Prise',
    zh: '已做决定',
    ko: '결정됨',
  },
  
  // How It Works section
  'howItWorks.title': {
    en: 'How It Works',
    es: 'Cómo Funciona',
    fr: 'Comment Ça Marche',
    zh: '工作原理',
    ko: '작동 방식',
  },
  'howItWorks.subtitle': {
    en: 'Our service is designed to be simple and accessible, requiring only a phone to get started.',
    es: 'Nuestro servicio está diseñado para ser simple y accesible, requiriendo solo un teléfono para comenzar.',
    fr: 'Notre service est conçu pour être simple et accessible, nécessitant seulement un téléphone pour commencer.',
    zh: '我们的服务设计简单易用，只需一部电话即可开始。',
    ko: '우리 서비스는 간단하고 접근하기 쉽게 설계되었으며, 시작하기 위해 전화만 있으면 됩니다.',
  },
  'step1.title': {
    en: 'Make a Phone Call',
    es: 'Hacer una Llamada Telefónica',
    fr: 'Passer un Appel Téléphonique',
    zh: '拨打电话',
    ko: '전화 걸기',
  },
  'step1.description': {
    en: 'Call our service from any phone, no smartphone or internet required. Available in English, Spanish, French, Chinese, and Korean.',
    es: 'Llame a nuestro servicio desde cualquier teléfono, no se requiere smartphone o internet. Disponible en inglés, español, francés, chino y coreano.',
    fr: 'Appelez notre service depuis n\'importe quel téléphone, pas besoin de smartphone ou d\'internet. Disponible en anglais, espagnol, français, chinois et coréen.',
    zh: '从任何电话拨打我们的服务，无需智能手机或互联网。提供英语、西班牙语、法语、中文和韩语服务。',
    ko: '어떤 전화에서든 저희 서비스에 전화하세요, 스마트폰이나 인터넷이 필요하지 않습니다. 영어, 스페인어, 프랑스어, 중국어, 한국어로 이용 가능합니다.',
  },
  'step2.title': {
    en: 'Explain Your Situation',
    es: 'Explique Su Situación',
    fr: 'Expliquez Votre Situation',
    zh: '解释您的情况',
    ko: '상황 설명하기',
  },
  'step2.description': {
    en: 'Tell our AI assistant about your work situation and any potential labor law violations in your preferred language.',
    es: 'Cuéntele a nuestro asistente de IA sobre su situación laboral y cualquier posible violación de la ley laboral en su idioma preferido.',
    fr: 'Expliquez à notre assistant IA votre situation professionnelle et toute violation potentielle du droit du travail dans la langue de votre choix.',
    zh: '用您喜欢的语言向我们的AI助手讲述您的工作情况和任何潜在的劳动法违规行为。',
    ko: '선호하는 언어로 우리의 AI 도우미에게 근무 상황과 잠재적인 노동법 위반에 대해 알려주세요.',
  },
  'step3.title': {
    en: 'Get Expert Guidance',
    es: 'Obtenga Orientación Experta',
    fr: 'Obtenez des Conseils d\'Expert',
    zh: '获取专家指导',
    ko: '전문가 안내 받기',
  },
  'step3.description': {
    en: 'Receive clear information about your rights and practical guidance on the next steps to take.',
    es: 'Reciba información clara sobre sus derechos y orientación práctica sobre los próximos pasos a seguir.',
    fr: 'Recevez des informations claires sur vos droits et des conseils pratiques sur les prochaines étapes à suivre.',
    zh: '获取关于您权利的清晰信息以及关于下一步行动的实用指导。',
    ko: '귀하의 권리에 대한 명확한 정보와 다음 단계에 대한 실용적인 지침을 받으세요.',
  },
  'step4.title': {
    en: 'Receive Documentation',
    es: 'Recibir Documentación',
    fr: 'Recevoir la Documentation',
    zh: '接收文档',
    ko: '문서 받기',
  },
  'step4.description': {
    en: 'Get a detailed summary of your case and recommended actions via SMS or email, making it easier to seek further help.',
    es: 'Obtenga un resumen detallado de su caso y las acciones recomendadas por SMS o correo electrónico, facilitando la búsqueda de ayuda adicional.',
    fr: 'Obtenez un résumé détaillé de votre cas et des actions recommandées par SMS ou e-mail, ce qui facilite la recherche d\'une aide supplémentaire.',
    zh: '通过短信或电子邮件获取案件的详细摘要和建议的行动，使寻求进一步帮助变得更容易。',
    ko: 'SMS 또는 이메일을 통해 사례에 대한 상세한 요약과 권장 조치를 받아 추가 도움을 구하기 쉽게 하세요.',
  },
  // MyReports page
  'myReports.title': {
    en: 'My Reports',
    es: 'Mis Informes',
    fr: 'Mes Rapports',
    zh: '我的报告',
    ko: '내 보고서',
  },
  'myReports.subtitle': {
    en: 'Track the status of all your submitted workplace issue reports',
    es: 'Siga el estado de todos sus informes de problemas en el lugar de trabajo presentados',
    fr: 'Suivez l\'état de tous vos rapports de problèmes sur le lieu de travail soumis',
    zh: '跟踪您提交的所有工作场所问题报告的状态',
    ko: '제출한 모든 직장 문제 보고서의 상태를 추적하세요',
  },
  // CTA section
  'cta.ready': {
    en: 'Ready to Try the Legal Assistant?',
    es: '¿Listo para probar el Asistente Legal?',
    fr: 'Prêt à essayer l\'Assistant Juridique?',
    zh: '准备好尝试法律助手了吗？',
    ko: '법률 도우미를 사용해 보시겠습니까?',
  },
  'cta.free': {
    en: 'Our service is free, confidential, and available in multiple languages.',
    es: 'Nuestro servicio es gratuito, confidencial y está disponible en varios idiomas.',
    fr: 'Notre service est gratuit, confidentiel et disponible en plusieurs langues.',
    zh: '我们的服务是免费的、保密的，并且提供多种语言。',
    ko: '저희 서비스는 무료이며, 기밀이고, 여러 언어로 제공됩니다.',
  },
  // Add more translations as needed
  // Added missing translation for saveProgress
  'reportDetails.saveProgress': {
    en: 'Save Progress',
    es: 'Guardar Progreso',
    fr: 'Sauvegarder la Progression',
    zh: '保存进度',
    ko: '진행 상황 저장',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode;
    if (savedLanguage && ['en', 'es', 'fr', 'zh', 'ko'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
