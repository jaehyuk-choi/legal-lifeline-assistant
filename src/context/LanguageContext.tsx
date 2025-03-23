
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
  // Add more translations as needed
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
