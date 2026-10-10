import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'te';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    'nav.jobs': 'Jobs',
    'nav.sectors': 'Sectors',
    'nav.compare': 'Compare',
    'nav.quiz': 'Quiz',
    'nav.timeline': 'Timeline',
    'nav.dashboard': 'Dashboard',
    'nav.dispatches': 'Dispatches',
    'nav.methodology': 'Methodology',
    'nav.search': 'Search jobs...',
    'nav.lightMode': 'Switch to light mode',
    'nav.darkMode': 'Switch to dark mode',

    // Hero
    'hero.badge': 'RESEARCH // INDIA AI LABOR RISK INDEX',
    'hero.headline': 'Will AI take your job in India?',
    'hero.subheadline': 'And when?',
    'hero.desc': 'A research-backed index quantifying the risk of artificial intelligence automation across 40 Indian occupations, 11 key sectors, and 10-year transition windows.',
    'hero.searchPlaceholder': 'Search your job title (e.g. Junior Frontend Dev, BPO Agent, Bank Clerk)...',
    'hero.popularLabel': 'Trending in India:',
    'hero.or': 'or explore by',
    'hero.takeQuiz': 'Take 2-Min Career Quiz',
    'hero.viewHeatmap': 'View Sector Heatmap',

    // Stats
    'stats.jobsCount': 'Indian Careers Analyzed',
    'stats.jobsDesc': 'Decomposed into discrete automatable tasks',
    'stats.sectorsCount': 'Economic Sectors Covered',
    'stats.sectorsDesc': 'From BPO & IT to Healthcare & Agriculture',
    'stats.studiesCount': 'Research Studies & Data Inputs',
    'stats.studiesDesc': 'NASSCOM, PLFS, ILO, and Stanford HAI citations',
    'stats.privateCount': 'Private & Local Processing',
    'stats.privateDesc': 'Zero cookies required, no user data collected',

    // Split showcase
    'showcase.mostAtRisk': 'Highest AI Exposure Careers',
    'showcase.safest': 'Safest & Most Resilient Careers',
    'showcase.viewAllHigh': 'View all high-exposure roles →',
    'showcase.viewAllSafe': 'Explore resilient career paths →',

    // Directory
    'dir.title': 'Complete Indian Occupation Directory (40 Roles)',
    'dir.subtitle': 'Filter by sector to review task breakdowns, Indian salary scales, and future-proof skills.',
    'dir.filterAll': 'All (40)',
    'dir.colTitle': 'Career Title',
    'dir.colSector': 'Sector',
    'dir.colScore': 'AI Score',
    'dir.colExposure': 'Exposure Tier',
    'dir.colTimeline': 'Est. Timeline',
    'dir.colSalary': 'INR Salary Range',
    'dir.colDetails': 'Details',

    // Dashboard
    'dashboard.title': 'National AI Labor Activity & Exposure Dashboard',
    'dashboard.subtitle': '3D Isometric Skyline and telemetry of automation research releases, daily risk adjustments, and skill transition velocity across India.',
    'dashboard.skylineTitle': 'Yearly Automation Benchmark & Transition Events',
    'dashboard.skylineUnit': 'milestone',
    'dashboard.skylineUnitPlural': 'milestones',
    'dashboard.tab2d': '2D Heatmap',
    'dashboard.tab3d': '3D Skyline',
    'dashboard.viewAllCareers': 'Explore All Careers',
    'dashboard.compareCareers': 'Compare Two Occupations',
    'dashboard.takeCareerQuiz': 'Take Career Risk Quiz',
  },
  hi: {
    // Nav
    'nav.jobs': 'करियर',
    'nav.sectors': 'क्षेत्र (Sectors)',
    'nav.compare': 'तुलना करें',
    'nav.quiz': 'क्विज़',
    'nav.timeline': 'समयरेखा',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.dispatches': 'लेख व विश्लेषण',
    'nav.methodology': 'पद्धति (Methodology)',
    'nav.search': 'नौकरियां खोजें...',
    'nav.lightMode': 'लाइट मोड चालू करें',
    'nav.darkMode': 'डार्क मोड चालू करें',

    // Hero
    'hero.badge': 'शोध // भारत एआई श्रम जोखिम सूचकांक',
    'hero.headline': 'क्या एआई भारत में आपकी नौकरी ले लेगा?',
    'hero.subheadline': 'और कब तक?',
    'hero.desc': '40 भारतीय व्यवसायों, 11 प्रमुख क्षेत्रों और 10-वर्षीय कार्यबल संक्रमण खिड़कियों में कृत्रिम बुद्धिमत्ता स्वचालन के जोखिम को मापने वाला एक शोध-आधारित सूचकांक।',
    'hero.searchPlaceholder': 'अपना पद खोजें (उदा. जूनियर डेवलपर, बीपीओ एग्जीक्यूटिव, बैंक क्लर्क)...',
    'hero.popularLabel': 'भारत में लोकप्रिय:',
    'hero.or': 'या देखें',
    'hero.takeQuiz': '2-मिनट का करियर क्विज़ लें',
    'hero.viewHeatmap': 'क्षेत्र हीटमैप देखें',

    // Stats
    'stats.jobsCount': 'भारतीय करियर विश्लेषित',
    'stats.jobsDesc': 'विशिष्ट स्वचालित होने वाले कार्यों में विभाजित',
    'stats.sectorsCount': 'आर्थिक क्षेत्र शामिल',
    'stats.sectorsDesc': 'बीपीओ और आईटी से लेकर स्वास्थ्य और कृषि तक',
    'stats.studiesCount': 'शोध अध्ययन व डेटा इनपुट',
    'stats.studiesDesc': 'नैसकॉम, पीएलएफएस, आईएलओ और स्टैनफोर्ड के उद्धरण',
    'stats.privateCount': 'निजी और स्थानीय प्रोसेसिंग',
    'stats.privateDesc': 'शून्य कुकीज़ आवश्यक, कोई डेटा एकत्र नहीं',

    // Split showcase
    'showcase.mostAtRisk': 'सर्वाधिक एआई जोखिम वाले करियर',
    'showcase.safest': 'सबसे सुरक्षित और लचीले करियर',
    'showcase.viewAllHigh': 'सभी उच्च जोखिम वाले पद देखें →',
    'showcase.viewAllSafe': 'सभी सुरक्षित करियर विकल्प देखें →',

    // Directory
    'dir.title': 'संपूर्ण भारतीय व्यवसाय डायरेक्टरी (40 पद)',
    'dir.subtitle': 'कार्य विभाजन, वेतनमान और भविष्य-सुरक्षित कौशल की समीक्षा के लिए फ़िल्टर करें।',
    'dir.filterAll': 'सभी (40)',
    'dir.colTitle': 'करियर का नाम',
    'dir.colSector': 'क्षेत्र',
    'dir.colScore': 'एआई स्कोर',
    'dir.colExposure': 'जोखिम स्तर',
    'dir.colTimeline': 'अनुमानित समय',
    'dir.colSalary': 'वेतन सीमा (₹)',
    'dir.colDetails': 'विवरण',

    // Dashboard
    'dashboard.title': 'राष्ट्रीय एआई श्रम गतिविधि और जोखिम डैशबोर्ड',
    'dashboard.subtitle': 'भारत में स्वचालन अनुसंधान, दैनिक जोखिम समायोजन और कौशल परिवर्तन का 3D आइसोमेट्रिक स्काईलाइन और टेलीमेट्री।',
    'dashboard.skylineTitle': 'वार्षिक स्वचालन बेंचमार्क और संक्रमण घटनाएं',
    'dashboard.skylineUnit': 'माइलस्टोन',
    'dashboard.skylineUnitPlural': 'माइलस्टोन',
    'dashboard.tab2d': '2D हीटमैप',
    'dashboard.tab3d': '3D स्काईलाइन',
    'dashboard.viewAllCareers': 'सभी करियर देखें',
    'dashboard.compareCareers': 'दो पदों की तुलना करें',
    'dashboard.takeCareerQuiz': 'करियर जोखिम क्विज़ लें',
  },
  te: {
    // Nav
    'nav.jobs': 'ఉద్యోగాలు',
    'nav.sectors': 'రంగాలు (Sectors)',
    'nav.compare': 'పోల్చండి',
    'nav.quiz': 'క్విజ్',
    'nav.timeline': 'టైమ్‌లైన్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.dispatches': 'విశ్లేషణలు',
    'nav.methodology': 'పరిశోధనా పద్ధతి',
    'nav.search': 'ఉద్యోగాలను వెతకండి...',
    'nav.lightMode': 'లైట్ మోడ్',
    'nav.darkMode': 'డార్క్ మోడ్',

    // Hero
    'hero.badge': 'పరిశోధన // భారతదేశం AI ఉద్యోగ ప్రమాద సూచిక',
    'hero.headline': 'భారతదేశంలో AI మీ ఉద్యోగాన్ని తీసుకుంటుందా?',
    'hero.subheadline': 'మరియు ఎప్పుడు?',
    'hero.desc': '40 భారతీయ వృత్తులు, 11 ప్రధాన రంగాలు మరియు 10 సంవత్సరాల భవిష్యత్ మార్పులపై కృత్రిమ మేధస్సు ప్రభావాన్ని కొలిచే పరిశోధనా ఆధారిత నివేదిక.',
    'hero.searchPlaceholder': 'మీ ఉద్యోగ పేరును వెతకండి (ఉదా. జూనియర్ డెవలపర్, BPO ఎగ్జిక్యూటివ్, బ్యాంక్ క్లర్క్)...',
    'hero.popularLabel': 'ట్రెండింగ్ ఉద్యోగాలు:',
    'hero.or': 'లేదా చూడండి',
    'hero.takeQuiz': '2-నిమిషాల కెరీర్ క్విజ్ రాయండి',
    'hero.viewHeatmap': 'రంగాల హీట్‌మ్యాప్ చూడండి',

    // Stats
    'stats.jobsCount': 'విశ్లేషించిన భారతీయ వృత్తులు',
    'stats.jobsDesc': 'ఆటోమేషన్ చేయదగిన పనులుగా విభజించబడింది',
    'stats.sectorsCount': 'ఆర్థిక రంగాలు',
    'stats.sectorsDesc': 'IT, BPO నుండి ఆరోగ్యం & వ్యవసాయం వరకు',
    'stats.studiesCount': 'పరిశోధనా నివేదికలు & గణాంకాలు',
    'stats.studiesDesc': 'NASSCOM, PLFS, ILO ఆధారాలు',
    'stats.privateCount': 'సురక్షిత & గోప్యతా ప్రాసెసింగ్',
    'stats.privateDesc': 'ఎటువంటి కుకీలు అవసరం లేదు, డేటా సేకరించబడదు',

    // Split showcase
    'showcase.mostAtRisk': 'అత్యధిక AI ప్రమాదం ఉన్న ఉద్యోగాలు',
    'showcase.safest': 'అత్యంత సురక్షితమైన & భద్రమైన కెరీర్లు',
    'showcase.viewAllHigh': 'అన్ని అధిక రిస్క్ ఉద్యోగాలను చూడండి →',
    'showcase.viewAllSafe': 'సురక్షితమైన ఉద్యోగ మార్గాలు చూడండి →',

    // Directory
    'dir.title': 'భారతీయ ఉద్యోగాల పూర్తి డైరెక్టరీ (40 వృత్తులు)',
    'dir.subtitle': 'టాస్క్ వివరాలు, భారతీయ జీతాల పరిధి మరియు భవిష్యత్ నైపుణ్యాల కోసం ఫిల్టర్ చేయండి.',
    'dir.filterAll': 'అన్నీ (40)',
    'dir.colTitle': 'ఉద్యోగ శీర్షిక',
    'dir.colSector': 'రంగం',
    'dir.colScore': 'AI స్కోరు',
    'dir.colExposure': 'ప్రమాద స్థాయి',
    'dir.colTimeline': 'అంచనా వేసిన సమయం',
    'dir.colSalary': 'INR జీతం పరిధి',
    'dir.colDetails': 'వివరాలు',

    // Dashboard
    'dashboard.title': 'జాతీయ AI శ్రామిక కార్యాచరణ మరియు రిస్క్ డాష్‌బోర్డ్',
    'dashboard.subtitle': 'భారతదేశంలో ఆటోమేషన్ పరిశోధన, రోజువారీ మార్పులు మరియు నైపుణ్య బదిలీ వేగం యొక్క 3D ఐసోమెట్రిక్ స్కైలైన్.',
    'dashboard.skylineTitle': 'వార్షిక ఆటోమేషన్ బెంచ్‌మార్క్ & సంఘటనలు',
    'dashboard.skylineUnit': 'మైలురాయి',
    'dashboard.skylineUnitPlural': 'మైలురాళ్ళు',
    'dashboard.tab2d': '2D హీట్‌మ్యాప్',
    'dashboard.tab3d': '3D స్కైలైన్',
    'dashboard.viewAllCareers': 'అన్ని ఉద్యోగాలను చూడండి',
    'dashboard.compareCareers': 'రెండు వృత్తులను పోల్చండి',
    'dashboard.takeCareerQuiz': 'కెరీర్ రిస్క్ క్విజ్ రాయండి',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback ?? key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aijobwatch_lang') as LanguageCode;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'te')) {
        return saved;
      }
    }
    return 'en';
  });

  const applyGoogleTranslate = (lang: LanguageCode) => {
    if (typeof window === 'undefined') return;

    const target = lang === 'en' ? '' : `/en/${lang}`;
    const host = window.location.hostname;

    if (!target) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
      document.cookie = 'googtrans=/en/en; path=/;';
    } else {
      document.cookie = `googtrans=${target}; path=/;`;
      document.cookie = `googtrans=${target}; path=/; domain=${host};`;
      document.cookie = `googtrans=${target}; path=/; domain=.${host};`;
    }

    const fireChange = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (!fireChange()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (fireChange() || attempts > 12) {
          clearInterval(interval);
        }
      }, 250);
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aijobwatch_lang', lang);
      document.documentElement.lang = lang;
      applyGoogleTranslate(lang);
      window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language !== 'en') {
      applyGoogleTranslate(language);
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    if (translations.en[key]) {
      return translations.en[key];
    }
    return fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
