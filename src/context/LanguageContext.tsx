import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type LanguageCode = 'en' | 'es' | 'fr' | 'zh' | 'ko' | 'hi';

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
    hi: 'आवाज द्वारा कानूनी सहायता, सभी के लिए सुलभ',
  },
  'hero.subtitle': {
    en: 'A free voice-based legal assistant that helps workers understand their rights and take action against workplace violations.',
    es: 'Un asistente legal gratuito basado en voz que ayuda a los trabajadores a entender sus derechos y tomar medidas contra las violaciones en el lugar de trabajo.',
    fr: 'Un assistant juridique gratuit basé sur la voix qui aide les travailleurs à comprendre leurs droits et à agir contre les violations sur le lieu de travail.',
    zh: '一个免费的基于语音的法律助手，帮助工人了解自己的权利并对工作场所的违法行为采取行动。',
    ko: '무료 음성 기반 법률 도우미로 근로자가 자신의 권리를 이해하고 직장 내 위반에 대해 조치를 취하도록 도와줍니다.',
    hi: 'एक मुफ़्त आवाज-आधारित कानूनी सहायक जो श्रमिकों को अपने अधिकारों को समझने और कार्यस्थल उल्लंघनों के खिलाफ कार्रवाई करने में मदद करता है।',
  },
  'cta.choose': {
    en: 'Choose how you want to connect with us - all services are free and confidential',
    es: 'Elija cómo desea conectarse con nosotros - todos los servicios son gratuitos y confidenciales',
    fr: 'Choisissez comment vous souhaitez vous connecter avec nous - tous les services sont gratuits et confidentiels',
    zh: '选择您想与我们联系的方式 - 所有服务均免费且保密',
    ko: '당신이 우리와 연결하고 싶은 방법을 선택하세요 - 모든 서비스는 무료이며 기밀입니다',
    hi: 'चुनें कि आप हमसे कैसे जुड़ना चाहते हैं - सभी सेवाएँ मुफ़्त और गोपनीय हैं',
  },
  'button.startCall': {
    en: 'Start a Call',
    es: 'Iniciar una Llamada',
    fr: 'Démarrer un Appel',
    zh: '开始通话',
    ko: '통화 시작',
    hi: 'कॉल शुरू करें',
  },
  'button.chatNow': {
    en: 'Chat Now',
    es: 'Chatear Ahora',
    fr: 'Discuter Maintenant',
    zh: '立即聊天',
    ko: '지금 채팅',
    hi: 'अभी चैट करें',
  },
  'button.reportIssue': {
    en: 'Report Issue',
    es: 'Reportar Problema',
    fr: 'Signaler un Problème',
    zh: '报告问题',
    ko: '문제 신고',
    hi: 'समस्या की रिपोर्ट करें',
  },
  'button.learnHow': {
    en: 'Learn How It Works',
    es: 'Aprenda Cómo Funciona',
    fr: 'Découvrez Comment Ça Marche',
    zh: '了解工作原理',
    ko: '작동 방식 알아보기',
    hi: 'कैसे काम करता है जानें',
  },
  'button.signIn': {
    en: 'Sign In',
    es: 'Iniciar Sesión',
    fr: 'Se Connecter',
    zh: '登录',
    ko: '로그인',
    hi: 'साइन इन करें',
  },
  'button.signUp': {
    en: 'Sign Up',
    es: 'Registrarse',
    fr: 'S\'inscrire',
    zh: '注册',
    ko: '회원가입',
    hi: 'साइन अप करें',
  },
  'button.signOut': {
    en: 'Sign Out',
    es: 'Cerrar Sesión',
    fr: 'Se Déconnecter',
    zh: '登出',
    ko: '로그아웃',
    hi: 'साइन आउट करें',
  },
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    zh: '首页',
    ko: '홈',
    hi: 'होम',
  },

  // Report Issue page
  'reportIssue.title': {
    en: 'Report a Workplace Issue',
    es: 'Reportar un Problema en el Lugar de Trabajo',
    fr: 'Signaler un Problème sur le Lieu de Travail',
    zh: '报告工作场所问题',
    ko: '직장 문제 신고',
    hi: 'कार्यस्थल समस्या की रिपोर्ट करें',
  },
  'reportIssue.subtitle': {
    en: 'Select the issues you\'ve experienced at your workplace. In the next step, we\'ll ask for more details.',
    es: 'Seleccione los problemas que ha experimentado en su lugar de trabajo. En el siguiente paso, le pediremos más detalles.',
    fr: 'Sélectionnez les problèmes que vous avez rencontrés sur votre lieu de travail. À l\'étape suivante, nous vous demanderons plus de détails.',
    zh: '选择您在工作场所遇到的问题。在下一步中，我们将询问更多详细信息。',
    ko: '직장에서 경험한 문제를 선택하세요. 다음 단계에서 더 자세한 정보를 요청할 것입니다.',
    hi: 'अपने कार्यस्थल पर अनुभव की गई समस्याओं का चयन करें। अगले चरण में, हम आपसे अधिक विवरण पूछेंगे।',
  },
  'reportIssue.selectedIssues': {
    en: 'Selected issues',
    es: 'Problemas seleccionados',
    fr: 'Problèmes sélectionnés',
    zh: '已选择的问题',
    ko: '선택된 문제',
    hi: 'चयनित समस्याएं',
  },
  'reportIssue.continueToDetails': {
    en: 'Continue to Details',
    es: 'Continuar a Detalles',
    fr: 'Continuer vers les Détails',
    zh: '继续填写详细信息',
    ko: '세부 정보로 계속',
    hi: 'विवरण पर जारी रखें',
  },
  'reportIssue.chatWithAI': {
    en: 'Chat with AI Assistant',
    es: 'Chatear con Asistente de IA',
    fr: 'Discuter avec l\'Assistant IA',
    zh: '与AI助手聊天',
    ko: 'AI 도우미와 채팅',
    hi: 'AI सहायक से चैट करें',
  },
  'reportIssue.note': {
    en: 'This report is not legal advice, but the first step in understanding your situation. Further conversation will be conducted via chat or phone consultation.',
    es: 'Este informe no es un consejo legal, sino el primer paso para comprender su situación. La conversación adicional se realizará a través de chat o consulta telefónica.',
    fr: 'Ce rapport n\'est pas un avis juridique, mais la première étape pour comprendre votre situation. La conversation ultérieure sera menée par chat ou consultation téléphonique.',
    zh: '此报告不是法律建议，而是了解您情况的第一步。进一步的对话将通过聊天或电话咨询进行。',
    ko: '이 보고서는 법률 조언이 아니라 귀하의 상황을 이해하는 첫 번째 단계입니다. 추가 대화는 채팅이나 전화 상담을 통해 진행됩니다.',
    hi: 'यह रिपोर्ट कानूनी सलाह नहीं है, बल्कि आपकी स्थिति को समझने का पहला कदम है। अगले चरण में, हम आपसे अधिक विवरण पूछेंगे।',
  },
  'reportIssue.anonymous': {
    en: 'Make this report anonymous',
    es: 'Hacer este informe anónimo',
    fr: 'Rendre ce rapport anonyme',
    zh: '匿名提交此报告',
    ko: '이 보고서를 익명으로 작성',
    hi: 'इस रिपोर्ट को अनाम बनाएं',
  },
  'reportIssue.anonymousDescription': {
    en: 'Your identity will be kept confidential, but we can still contact you about this report',
    es: 'Su identidad se mantendrá confidencial, pero aún podemos contactarlo sobre este informe',
    fr: 'Votre identité restera confidentielle, mais nous pourrons toujours vous contacter à propos de ce rapport',
    zh: '您的身份将保密，但我们仍可以就此报告与您联系',
    ko: '귀하의 신원은 기밀로 유지되지만, 이 보고서에 대해 여전히 연락할 수 있습니다',
    hi: 'आपकी पहचान गोपनीय रखी जाएगी, लेकिन हम अभी भी इस रिपोर्ट के बारे में आपसे संपर्क कर सकते हैं',
  },
  
  // Report Details page
  'reportDetails.title': {
    en: 'Report Details',
    es: 'Detalles del Informe',
    fr: 'Détails du Rapport',
    zh: '报告详情',
    ko: '보고서 세부 정보',
    hi: 'रिपोर्ट विवरण',
  },
  'reportDetails.subtitle': {
    en: 'Please provide specific details about the incident(s) you experienced.',
    es: 'Por favor proporcione detalles específicos sobre el/los incidente(s) que experimentó.',
    fr: 'Veuillez fournir des détails spécifiques sur le(s) incident(s) que vous avez vécu(s).',
    zh: '请提供您经历的事件的具体细节。',
    ko: '경험하신 사건에 대한 구체적인 세부 정보를 제공해 주세요.',
    hi: 'कृपया अपने अनुभव किए गए घटना(ओं) के बारे में विशिष्ट विवरण प्रदान करें।',
  },
  'reportDetails.issueOf': {
    en: 'Issue',
    es: 'Problema',
    fr: 'Problème',
    zh: '问题',
    ko: '문제',
    hi: 'समस्या',
  },
  'reportDetails.when': {
    en: 'When did this happen?',
    es: '¿Cuándo sucedió esto?',
    fr: 'Quand est-ce arrivé?',
    zh: '这是什么时候发生的？',
    ko: '이 일은 언제 일어났나요?',
    hi: 'यह कब हुआ था?',
  },
  'reportDetails.whenDescription': {
    en: 'Provide the date and approximate time of the incident',
    es: 'Proporcione la fecha y hora aproximada del incidente',
    fr: 'Indiquez la date et l\'heure approximative de l\'incident',
    zh: '提供事件的日期和大致时间',
    ko: '사건 발생 날짜와 대략적인 시간을 알려주세요',
    hi: 'घटना की तारीख और अनुमानित समय प्रदान करें',
  },
  'reportDetails.where': {
    en: 'Where did this happen?',
    es: '¿Dónde sucedió esto?',
    fr: 'Où est-ce arrivé?',
    zh: '这是在哪里发生的？',
    ko: '이 일은 어디서 일어났나요?',
    hi: 'यह कहां हुआ था?',
  },
  'reportDetails.whereDescription': {
    en: 'Provide the location where the incident occurred',
    es: 'Proporcione el lugar donde ocurrió el incidente',
    fr: 'Indiquez le lieu où l\'incident s\'est produit',
    zh: '提供事件发生的地点',
    ko: '사건이 발생한 장소를 알려주세요',
    hi: 'घटना घटित होने का स्थान प्रदान करें',
  },
  'reportDetails.who': {
    en: 'Who was involved?',
    es: '¿Quién estuvo involucrado?',
    fr: 'Qui était impliqué?',
    zh: '谁参与其中？',
    ko: '누가 관련되어 있었나요?',
    hi: 'कौन शामिल था?',
  },
  'reportDetails.whoDescription': {
    en: 'Provide names or positions of people involved',
    es: 'Proporcione nombres o cargos de las personas involucradas',
    fr: 'Indiquez les noms ou les postes des personnes impliquées',
    zh: '提供相关人员的姓名或职位',
    ko: '관련된 사람들의 이름이나 직위를 제공하세요',
    hi: 'शामिल लोगों के नाम या पद प्रदान करें',
  },
  'reportDetails.what': {
    en: 'What happened?',
    es: '¿Qué pasó?',
    fr: 'Que s\'est-il passé?',
    zh: '发生了什么？',
    ko: '무슨 일이 있었나요?',
    hi: 'क्या हुआ था?',
  },
  'reportDetails.whatDescription': {
    en: 'Provide a detailed description of the incident',
    es: 'Proporcione una descripción detallada del incidente',
    fr: 'Fournissez une description détaillée de l\'incident',
    zh: '提供事件的详细描述',
    ko: '사건에 대한 자세한 설명을 제공하세요',
    hi: 'घटना का विस्तृत विवरण प्रदान करें',
  },
  'reportDetails.evidence': {
    en: 'Evidence (Optional)',
    es: 'Evidencia (Opcional)',
    fr: 'Preuve (Facultatif)',
    zh: '证据（可选）',
    ko: '증거 (선택 사항)',
    hi: 'सबूत (वैकल्पिक)',
  },
  'reportDetails.evidenceUpload': {
    en: 'Upload photos, documents, or other evidence related to this incident',
    es: 'Suba fotos, documentos u otras pruebas relacionadas con este incidente',
    fr: 'Téléchargez des photos, des documents ou d\'autres preuves liées à cet incident',
    zh: '上传与此事件相关的照片、文件或其他证据',
    ko: '이 사건과 관련된 사진、文档 또는 기타 증거를 업로드하세요',
    hi: 'इस घटना से संबंधित फोटो, दस्तावेज़, या अन्य सबूत अपलोड करें',
  },
  'reportDetails.selectedFiles': {
    en: 'Selected Files:',
    es: 'Archivos Seleccionados:',
    fr: 'Fichiers Sélectionnés:',
    zh: '已选择的文件：',
    ko: '선택된 파일:',
    hi: 'चयनित फ़ाइलें:',
  },
  'reportDetails.remove': {
    en: 'Remove',
    es: 'Eliminar',
    fr: 'Supprimer',
    zh: '删除',
    ko: '제거',
    hi: 'हटाएं',
  },
  'reportDetails.evidenceDescription': {
    en: 'Evidence Description',
    es: 'Descripción de la Evidencia',
    fr: 'Description de la Preuve',
    zh: '证据描述',
    ko: '증거 설명',
    hi: 'सबूत का विवरण',
  },
  'reportDetails.back': {
    en: 'Back',
    es: 'Atrás',
    fr: 'Retour',
    zh: '返回',
    ko: '뒤로',
    hi: 'वापस',
  },
  'reportDetails.submit': {
    en: 'Submit Report',
    es: 'Enviar Informe',
    fr: 'Soumettre le Rapport',
    zh: '提交报告',
    ko: '보고서 제출',
    hi: 'रिपोर्ट जमा करें',
  },
  'reportDetails.nextIssue': {
    en: 'Save & Continue to Next Issue',
    es: 'Guardar y Continuar al Siguiente Problema',
    fr: 'Enregistrer et Continuer au Problème Suivant',
    zh: '保存并继续下一个问题',
    ko: '저장하고 다음 문제로 계속',
    hi: 'सहेजें और अगली समस्या पर जारी रखें',
  },
  'reportDetails.unsavedChanges': {
    en: 'Unsaved Changes',
    es: 'Cambios No Guardados',
    fr: 'Changements Non Enregistrés',
    zh: '未保存的更改',
    ko: '저장되지 않은 변경 사항',
    hi: 'असुरक्षित परिवर्तन',
  },
  'reportDetails.wantToSave': {
    en: 'You have unsaved changes. Would you like to save your progress before leaving?',
    es: 'Tiene cambios no guardados. ¿Le gustaría guardar su progreso antes de salir?',
    fr: 'Vous avez des modifications non enregistrées. Voulez-vous sauvegarder votre progression avant de partir?',
    zh: '您有未保存的更改。是否要在离开前保存进度？',
    ko: '저장되지 않은 변경 사항이 있습니다. 떠나기 전에 진행 상황을 저장하시겠습니까?',
    hi: 'आपके पास असुरक्षित परिवर्तन हैं। क्या आप छोड़ने से पहले अपनी प्रगति को सहेजना चाहेंगे?',
  },
  'reportDetails.cancel': {
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    zh: '取消',
    ko: '취소',
    hi: 'रद्द करें',
  },
  'reportDetails.leaveWithoutSaving': {
    en: 'Leave Without Saving',
    es: 'Salir Sin Guardar',
    fr: 'Quitter Sans Sauvegarder',
    zh: '不保存离开',
    ko: '저장하지 않고 나가기',
    hi: 'बिना सहेजे छोड़ें',
  },
  
  // Status translations for MyReports
  'status.pending_review': {
    en: 'Pending Review',
    es: 'Revisión Pendiente',
    fr: 'En Attente de Révision',
    zh: '等待审核',
    ko: '검토 대기 중',
    hi: 'समीक्षा लंबित',
  },
  'status.submitted': {
    en: 'Submitted',
    es: 'Enviado',
    fr: 'Soumis',
    zh: '已提交',
    ko: '제출됨',
    hi: 'जमा किया गया',
  },
  'status.in_progress': {
    en: 'In Progress',
    es: 'En Progreso',
    fr: 'En Cours',
    zh: '处理中',
    ko: '진행 중',
    hi: 'प्रगति पर है',
  },
  'status.reviewed': {
    en: 'Reviewed',
    es: 'Revisado',
    fr: 'Examiné',
    zh: '已审核',
    ko: '검토됨',
    hi: 'समीक्षा की गई',
  },
  'status.decision_made': {
    en: 'Decision Made',
    es: 'Decisión Tomada',
    fr: 'Décision Prise',
    zh: '已做决定',
    ko: '결정됨',
    hi: 'निर्णय लिया गया',
  },
  
  // How It Works section
  'howItWorks.title': {
    en: 'How It Works',
    es: 'Cómo Funciona',
    fr: 'Comment Ça Marche',
    zh: '工作原理',
    ko: '작동 방식',
    hi: 'यह कैसे काम करता है',
  },
  'howItWorks.subtitle': {
    en: 'Our service is designed to be simple and accessible, requiring only a phone to get started.',
    es: 'Nuestro servicio está diseñado para ser simple y accesible, requiriendo solo un teléfono para comenzar.',
    fr: 'Notre service est conçu pour être simple et accessible, nécessitant seulement un téléphone pour commencer.',
    zh: '我们的服务设计简单易用，只需一部电话即可开始。',
    ko: '우리 서비스는 간단하고 접근하기 쉽게 설계되었으며, 시작하기 위해 전화만 있으면 됩니다.',
    hi: 'हमारी सेवा सरल और सुलभ होने के लिए डिज़ाइन की गई है, शुरू करने के लिए केवल एक फोन की आवश्यकता है।',
  },
  'step1.title': {
    en: 'Make a Phone Call',
    es: 'Hacer una Llamada Telefónica',
    fr: 'Passer un Appel Téléphonique',
    zh: '拨打电话',
    ko: '전화 걸기',
    hi: 'फोन कॉल करें',
  },
  'step1.description': {
    en: 'Call our service from any phone, no smartphone or internet required. Available in English, Spanish, French, Chinese, Korean, and Hindi.',
    es: 'Llame a nuestro servicio desde cualquier teléfono, no se requiere smartphone o internet. Disponible en inglés, español, francés, chino, coreano y hindi.',
    fr: 'Appelez notre service depuis n\'importe quel téléphone, pas besoin de smartphone ou d\'internet. Disponible en anglais, espagnol, français, chinois, coréen et hindi.',
    zh: '从任何电话拨打我们的服务，无需智能手机或互联网。提供英语、西班牙语、法语、中文、韩语和印地语服务。',
    ko: '어떤 전화에서든 저희 서비스에 전화하세요, 스마트폰이나 인터넷이 필요하지 않습니다. 영어, 스페인어, 프랑스어, 중국어, 한국어, 힌디어로 이용 가능합니다.',
    hi: 'किसी भी फोन से हमारी सेवा को कॉल करें, स्मार्टफोन या इंटरनेट की आवश्यकता नहीं है। अंग्रेजी, स्पेनिश, फ्रेंच, चीनी, कोरियाई, और हिंदी में उपलब्ध है।',
  },
  'step2.title': {
    en: 'Explain Your Situation',
    es: 'Explique Su Situación',
    fr: 'Expliquez Votre Situation',
    zh: '解释您的情况',
    ko: '상황 설명하기',
    hi: 'अपनी स्थिति समझाएं',
  },
  'step2.description': {
    en: 'Tell our AI assistant about your work situation and any potential labor law violations in your preferred language.',
    es: 'Cuéntele a nuestro asistente de IA sobre su situación laboral y cualquier posible violación de la ley laboral en su idioma preferido.',
    fr: 'Expliquez à notre assistant IA votre situation professionnelle et toute violation potentielle du droit du travail dans la langue de votre choix.',
    zh: '用您喜欢的语言向我们的AI助手讲述您的工作情况和任何潜在的劳动法违规行为。',
    ko: '선호하는 언어로 우리의 AI 도우미에게 근무 상황과 잠재적인 노동법 위반에 대해 알려주세요.',
    hi: 'अपनी पसंदीदा भाषा में हमारे AI सहायक को अपनी कार्य स्थिति और किसी भी संभावित श्रम कानून उल्लंघन के बारे में बताएं।',
  },
  'step3.title': {
    en: 'Get Expert Guidance',
    es: 'Obtenga Orientación Experta',
    fr: 'Obtenez des Conseils d\'Expert',
    zh: '获取专家指导',
    ko: '전문가 안내 받기',
    hi: 'विशेषज्ञ मार्गदर्शन प्राप्त करें',
  },
  'step3.description': {
    en: 'Receive clear information about your rights and practical guidance on the next steps to take.',
    es: 'Reciba información clara sobre sus derechos y orientación práctica sobre los próximos pasos a seguir.',
    fr: 'Recevez des informations claires sur vos droits et des conseils pratiques sur les prochaines étapes à suivre.',
    zh: '获取关于您权利的清晰信息以及关于下一步行动的实用指导。',
    ko: '귀하의 권리에 대한 명확한 정보와 다음 단계에 대한 실用的な 지침을 받으세요.',
    hi: 'अपने अधिकारों के बारे में स्पष्ट जानकारी और अगले कदमों पर व्यावहारिक मार्गदर्शन प्राप्त करें।',
  },
  'step4.title': {
    en: 'Receive Documentation',
    es: 'Recibir Documentación',
    fr: 'Recevoir la Documentation',
    zh: '接收文档',
    ko: '문서 받기',
    hi: 'दस्तावेज़ीकरण प्राप्त करें',
  },
  'step4.description': {
    en: 'Get a detailed summary of your case and recommended actions via SMS or email, making it easier to seek further help.',
    es: 'Obtenga un resumen detallado de su caso y las acciones recomendadas por SMS o correo electrónico, facilitando la búsqueda de ayuda adicional.',
    fr: 'Obtenez un résumé détaillé de votre cas et des actions recommandées par SMS ou e-mail, ce qui facilite la recherche d\'une aide supplémentaire.',
    zh: '通过短信或电子邮件获取案件的详细摘要和建议的行动，使寻求进一步帮助变得更容易。',
    ko: 'SMS 또는 이메일을 통해 사례에 대한 상세한 요약과 권장 조치를 받아 추가 도움을 구하기 쉽게 하세요.',
    hi: 'SMS या ईमेल के माध्यम से अपने मामले का विस्तृत सारांश और अनुशंसित कार्रवाई प्राप्त करें, जिससे आगे की मदद मांगना आसान हो जाए।',
  },
  // MyReports page
  'myReports.title': {
    en: 'My Reports',
    es: 'Mis Informes',
    fr: 'Mes Rapports',
    zh: '我的报告',
    ko: '내 보고서',
    hi: 'मेरी रिपोर्ट',
  },
  'myReports.subtitle': {
    en: 'Track the status of all your submitted workplace issue reports',
    es: 'Siga el estado de todos sus informes de problemas en el lugar de trabajo presentados',
    fr: 'Suivez l\'état de tous vos rapports de problèmes sur le lieu de travail soumis',
    zh: '跟踪您提交的所有工作场所问题报告的状态',
    ko: '제출한 모든 직장 문제 보고서의 상태를 추적하세요',
    hi: 'अपनी सभी जमा की गई कार्यस्थल समस्या रिपोर्ट की स्थिति का ट्रैक रखें',
  },
  // CTA section
  'cta.ready': {
    en: 'Ready to Try the Legal Assistant?',
    es: '¿Listo para probar el Asistente Legal?',
    fr: 'Prêt à essayer l\'Assistant Juridique?',
    zh: '准备好尝试法律助手了吗？',
    ko: '법률 도우미를 사용해 보시겠습니까?',
    hi: 'क्या आप कानूनी सहायक को आज़माने के लिए तैयार हैं?',
  },
  'cta.free': {
    en: 'Our service is free, confidential, and available in multiple languages.',
    es: 'Nuestro servicio es gratuito, confidencial y está disponible en varios idiomas.',
    fr: 'Notre service est gratuit, confidentiel et disponible en plusieurs langues.',
    zh: '我们的服务是免费的、保密的，并且提供多种语言。',
    ko: '저희 서비스는 무료이며, 기밀이고, 여러 언어로 제공됩니다.',
    hi: 'हमारी सेवा मुफ्त, गोपनीय और कई भाषाओं में उपलब्ध है।',
  },
  // FAQ section
  'faq.title': {
    en: 'Frequently Asked Questions',
    es: 'Preguntas Frecuentes',
    fr: 'Questions Fréquemment Posées',
    zh: '常见问题',
    ko: '자주 묻는 질문',
    hi: 'अक्सर पूछे जाने वाले प्रश्न',
  },
  'faq.subtitle': {
    en: 'Find answers to common questions about our legal assistance service.',
    es: 'Encuentre respuestas a preguntas comunes sobre nuestro servicio de asistencia legal.',
    fr: 'Trouvez des réponses aux questions courantes sur notre service d\'assistance juridique.',
    zh: '查找有关我们法律援助服务的常见问题的答案。',
    ko: '법률 지원 서비스에 관한 일반적인 질문에 대한 답변을 찾아보세요.',
    hi: 'हमारी कानूनी सहायता सेवा के बारे में सामान्य प्रश्नों के उत्तर पाएं।',
  },
  'faq.q1': {
    en: 'Is this service really free?',
    es: '¿Este servicio es realmente gratuito?',
    fr: 'Ce service est-il vraiment gratuit?',
    zh: '这项服务真的是免费的吗？',
    ko: '이 서비스는 정말로 무료인가요?',
    hi: 'क्या यह सेवा वास्तव में निःशुल्क है?',
  },
  'faq.a1': {
    en: 'Yes, our legal assistance service is completely free to use. It\'s designed to help immigrant workers understand their rights and navigate labor law violations without any financial burden.',
    es: 'Sí, nuestro servicio de asistencia legal es completamente gratuito. Está diseñado para ayudar a los trabajadores inmigrantes a comprender sus derechos y navegar por las violaciones de las leyes laborales sin ninguna carga financiera.',
    fr: 'Oui, notre service d\'assistance juridique est entièrement gratuit. Il est conçu pour aider les travailleurs immigrés à comprendre leurs droits et à naviguer dans les violations du droit du travail sans aucune charge financière.',
    zh: '是的，我们的法律援助服务完全免费使用。它旨在帮助移民工人了解他们的权利并应对劳动法违规，而不会带来任何经济负担。',
    ko: '네, 저희 법률 지원 서비스는 완전히 무료로 이용하실 수 있습니다. 이는 이민 노동자들이 경제적 부담 없이 자신의 권리와 혜택을 이해하고 노동법 위반 사항을 처리할 수 있도록 설계되었습니다.',
    hi: 'हां, हमारी कानूनी सहायता सेवा पूरी तरह से मुफ्त है। यह प्रवासी श्रमिकों को बिना किसी वित्तीय बोझ के अपने अधिकारों को समझने और श्रम कानून उल्लंघनों का सामना करने में मदद करने के लिए डिज़ाइन की गई है।',
  },
  'faq.q2': {
    en: 'What languages are supported?',
    es: '¿Qué idiomas son compatibles?',
    fr: 'Quelles langues sont prises en charge?',
    zh: '支持哪些语言？',
    ko: '어떤 언어를 지원하나요?',
    hi: 'कौन सी भाषाएँ समर्थित हैं?',
  },
  'faq.a2': {
    en: 'Currently, our service supports English, Spanish, French, Chinese, Korean, and Hindi. We\'re working to add more languages in the future to better serve diverse immigrant communities.',
    es: 'Actualmente, nuestro servicio es compatible con inglés, español, francés, chino, coreano e hindi. Estamos trabajando para agregar más idiomas en el futuro para servir mejor a las diversas comunidades de inmigrantes.',
    fr: 'Actuellement, notre service prend en charge l\'anglais, l\'espagnol, le français, le chinois, le coréen et l\'hindi. Nous travaillons à ajouter plus de langues à l\'avenir pour mieux servir les diverses communautés d\'immigrants.',
    zh: '目前，我们的服务支持英语、西班牙语、法语、中文、韩语和印地语。我们正在努力在未来添加更多语言，以更好地服务于不同的移民社区。',
    ko: '현재 저희 서비스는 영어, 스페인어, 프랑스어, 중국어, 한국어, 힌디어를 지원합니다. 다양한 이민자 커뮤니티를 더 잘 지원하기 위해 앞으로 더 많은 언어를 추가할 예정입니다.',
    hi: 'वर्तमान में, हमारी सेवा अंग्रेजी, स्पेनिश, फ्रेंच, चीनी, कोरियाई, और हिंदी का समर्थन करती है। हम विविध प्रवासी समुदायों की बेहतर सेवा के लिए भविष्य में और अधिक भाषाएँ जोड़ने पर काम कर रहे हैं।',
  },
  'faq.q3': {
    en: 'Is my information kept confidential?',
    es: '¿Mi información se mantiene confidencial?',
    fr: 'Mes informations sont-elles gardées confidentielles?',
    zh: '我的信息是否保密？',
    ko: '내 정보는 기밀로 유지되나요?',
    hi: 'क्या मेरी जानकारी गोपनीय रखी जाती है?',
  },
  'faq.a3': {
    en: 'Absolutely. We take your privacy very seriously. All conversations are confidential, and personal information is never shared with third parties without your explicit consent.',
    es: 'Absolutamente. Nos tomamos su privacidad muy en serio. Todas las conversaciones son confidenciales, y la información personal nunca se comparte con terceros sin su consentimiento explícito.',
    fr: 'Absolument. Nous prenons votre vie privée très au sérieux. Toutes les conversations sont confidentielles, et les informations personnelles ne sont jamais partagées avec des tiers sans votre consentement explicite.',
    zh: '当然。我们非常重视您的隐私。所有对话都是保密的，未经您的明确同意，个人信息绝不会与第三方共享。',
    ko: '물론입니다. 저희는 귀하의 개인 정보를 매우 중요하게 생각합니다. 모든 대화는 기밀이며, 귀하의 명시적 동의 없이는 개인 정보가 제3자와 공유되지 않습니다.',
    hi: 'बिल्कुल। हम आपकी गोपनीयता को बहुत ���ंभीरता से लेते हैं। सभी बातचीत गोपनीय हैं, और व्यक्तिगत जानकारी आपकी स्पष्ट सहमति के बिना कभी भी तीसरे पक्ष के साथ साझा नहीं की जाती है।',
  },
  'faq.q4': {
    en: 'What types of labor issues can this help with?',
    es: '¿Con qué tipos de problemas laborales puede ayudar esto?',
    fr: 'Avec quels types de problèmes de travail cela peut-il aider?',
    zh: '这可以帮助解决哪些类型的劳动问题？',
    ko: '이것은 어떤 유형의 노동 문제를 도울 수 있나요?',
    hi: 'यह किस प्रकार के श्रम मुद्दों में मदद कर सकता है?',
  },
  'faq.a4': {
    en: 'Our service can help with various labor issues including wage theft, workplace safety violations, discrimination, harassment, wrongful termination, and questions about workers\' rights and benefits.',
    es: 'Nuestro servicio puede ayudar con varios problemas laborales, incluido el robo de salarios, violaciones de seguridad en el lugar de trabajo, discriminación, acoso, despido injustificado y preguntas sobre los derechos y beneficios de los trabajadores.',
    fr: 'Notre service peut aider avec divers problèmes de travail, y compris le vol de salaire, les violations de la sécurité au travail, la discrimination, le harcèlement, le licenciement abusif et les questions sur les droits et avantages des travailleurs.',
    zh: '我们的服务可以帮助解决各种劳动问题，包括工资盗窃、工作场所安全违规、歧视、骚扰、不当解雇以及有关工人权利和福利的问题。',
    ko: '저희 서비스는 임금 도둑, 직장 안전 위반, 차별, 괴롭힘, 부당 해고, 그리고 근로자의 권리와 혜택에 관한 질문 등 다양한 노동 문제를 도울 수 있습니다.',
    hi: 'हमारी सेवा विभिन्न श्रम मुद्दों में मदद कर सकती है, जिनमें वेतन चोरी, कार्यस्थल सुरक्षा उल्लंघन, भेदभाव, उत्पीड़न, अनुचित बर्खास्तगी, और श्रमिकों के अधिकारों और लाभों के बारे में प्रश्न शामिल हैं।',
  },
  'faq.q5': {
    en: 'Do I need legal documentation to use this service?',
    es: '¿Necesito documentación legal para usar este servicio?',
    fr: 'Ai-je besoin d\'une documentation légale pour utiliser ce service?',
    zh: '我需要法律文件才能使用此服务吗？',
    ko: '이 서비스를 이용하기 위해 법적 서류가 필요한가요?',
    hi: 'क्या मुझे इस सेवा का उपयोग करने के लिए कानूनी दस्तावेज़ की आवश्यकता है?',
  },
  'faq.a5': {
    en: 'No, our service is available to all workers regardless of immigration status. We do not ask about or require any documentation to provide assistance.',
    es: 'No, nuestro servicio está disponible para todos los trabajadores independientemente de su estado migratorio. No preguntamos ni requerimos ninguna documentación para brindar asistencia.',
    fr: 'Non, notre service est disponible pour tous les travailleurs, quel que soit leur statut d\'immigration. Nous ne demandons ni n\'exigeons aucune documentation pour fournir une assistance.',
    zh: '不，我们的服务适用于所有工人，无论其移民身份如何。我们不会询问或要求任何文件来提供帮助。',
    ko: '아니요, 저희 서비스는 이민 신분과 관계없이 모든 근로자가 이용할 수 있습니다. 저희는 도움을 제공하기 위해 어떤 서류도 요구하거나 필요로 하지 않습니다.',
    hi: 'नहीं, हमारी सेवा आप्रवासन स्थिति की परवाह किए बिना सभी कार्यकर्ताओं के लिए उपलब्ध है। हम सहायता प्रदान करने के लिए किसी भी दस्तावेज़ के बारे में पूछते या आवश्यक नहीं करते हैं।',
  },
};

// Define context interface
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
    if (savedLanguage && Object.keys(translations['hero.title']).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
