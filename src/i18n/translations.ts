export type LangCode = "en" | "ar";

export interface Translations {
  nav: {
    home: string;
    table: string;
    molecules: string;
    tools: string;
    settings: string;
  };
  settings: {
    title: string;
    appearance: string;
    language: string;
    display: string;
    onboarding: string;
    theme: string;
    themeDark: string;
    themeLight: string;
    themeSystem: string;
    animationSpeed: string;
    animationSlow: string;
    animationNormal: string;
    animationFast: string;
    soundEnabled: string;
    seqNotation: string;
    seqRNA: string;
    seqDNA: string;
    aaDisplay: string;
    aaOne: string;
    aaThree: string;
    aaFull: string;
    resetOnboarding: string;
    resetOnboardingDesc: string;
    changelog: string;
    suggestion: string;
    suggestionPlaceholder: string;
    suggestionSubmit: string;
    suggestionThanks: string;
  };
  codonGrid: { title: string; search: string; filter: string };
  molecules: { title: string; search: string };
  tools: { title: string };
  common: { loading: string; close: string; learnMore: string };
}

export const LANGUAGES: Array<{
  code: LangCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}> = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
];

const en: Translations = {
  nav: {
    home: "Home",
    table: "Table",
    molecules: "Molecules",
    tools: "Tools",
    settings: "Settings",
  },
  settings: {
    title: "Settings",
    appearance: "Appearance",
    language: "Language",
    display: "Display",
    onboarding: "Onboarding",
    theme: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    themeSystem: "System",
    animationSpeed: "Animation Speed",
    animationSlow: "Slow",
    animationNormal: "Normal",
    animationFast: "Fast",
    soundEnabled: "Sound Effects",
    seqNotation: "Sequence Notation",
    seqRNA: "RNA",
    seqDNA: "DNA",
    aaDisplay: "Amino Acid Display",
    aaOne: "1-letter",
    aaThree: "3-letter",
    aaFull: "Full name",
    resetOnboarding: "Reset Onboarding",
    resetOnboardingDesc: "Show welcome modal and tours again on next visit",
    changelog: "Changelog",
    suggestion: "Send a Suggestion",
    suggestionPlaceholder: "What would you like to see in GeneCode?",
    suggestionSubmit: "Send",
    suggestionThanks: "Thanks for your feedback!",
  },
  codonGrid: {
    title: "Codon Table",
    search: "Search codons or amino acids…",
    filter: "Filter by category",
  },
  molecules: { title: "Molecule Explorer", search: "Search molecules…" },
  tools: { title: "Interactive Tools" },
  common: { loading: "Loading…", close: "Close", learnMore: "Learn more" },
};

const ar: Translations = {
  nav: {
    home: "الرئيسية",
    table: "الجدول",
    molecules: "الجزيئات",
    tools: "الأدوات",
    settings: "الإعدادات",
  },
  settings: {
    title: "الإعدادات",
    appearance: "المظهر",
    language: "اللغة",
    display: "العرض",
    onboarding: "الإعداد الأولي",
    theme: "السمة",
    themeDark: "داكن",
    themeLight: "فاتح",
    themeSystem: "النظام",
    animationSpeed: "سرعة الحركة",
    animationSlow: "بطيء",
    animationNormal: "عادي",
    animationFast: "سريع",
    soundEnabled: "المؤثرات الصوتية",
    seqNotation: "تدوين التسلسل",
    seqRNA: "RNA",
    seqDNA: "DNA",
    aaDisplay: "عرض الأحماض الأمينية",
    aaOne: "حرف واحد",
    aaThree: "ثلاثة أحرف",
    aaFull: "الاسم الكامل",
    resetOnboarding: "إعادة ضبط الإعداد الأولي",
    resetOnboardingDesc: "إظهار نافذة الترحيب والجولات مرة أخرى عند الزيارة القادمة",
    changelog: "سجل التغييرات",
    suggestion: "إرسال اقتراح",
    suggestionPlaceholder: "ما الذي تريد رؤيته في GeneCode؟",
    suggestionSubmit: "إرسال",
    suggestionThanks: "شكرًا على ملاحظاتك!",
  },
  codonGrid: {
    title: "جدول الكودون",
    search: "البحث عن الكودونات أو الأحماض الأمينية…",
    filter: "تصفية حسب الفئة",
  },
  molecules: { title: "مستكشف الجزيئات", search: "البحث عن الجزيئات…" },
  tools: { title: "الأدوات التفاعلية" },
  common: { loading: "جارٍ التحميل…", close: "إغلاق", learnMore: "اعرف المزيد" },
};

export const translations: Record<LangCode, Translations> = {
  en,
  ar,
};
