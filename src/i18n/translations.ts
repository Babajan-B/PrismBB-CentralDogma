export type LangCode =
  | "en"
  | "ar"
  | "es"
  | "fr"
  | "de"
  | "zh"
  | "ja"
  | "pt"
  | "hi"
  | "ko";

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
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr", flag: "🇯🇵" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr", flag: "🇧🇷" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr", flag: "🇰🇷" },
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

function makeStub(
  overrides: Partial<Translations> & { nav: Translations["nav"]; settings: Translations["settings"] }
): Translations {
  return {
    codonGrid: { ...en.codonGrid },
    molecules: { ...en.molecules },
    tools: { ...en.tools },
    common: { ...en.common },
    ...overrides,
  };
}

export const translations: Record<LangCode, Translations> = {
  en,
  ar,
  es: makeStub({
    nav: { home: "Inicio", table: "Tabla", molecules: "Moléculas", tools: "Herramientas", settings: "Ajustes" },
    settings: { ...en.settings, title: "Ajustes", appearance: "Apariencia", language: "Idioma", display: "Visualización", onboarding: "Incorporación", theme: "Tema", themeDark: "Oscuro", themeLight: "Claro", themeSystem: "Sistema", animationSpeed: "Velocidad de animación", animationSlow: "Lento", animationNormal: "Normal", animationFast: "Rápido", soundEnabled: "Efectos de sonido", seqNotation: "Notación de secuencia", aaDisplay: "Mostrar aminoácidos", aaOne: "1 letra", aaThree: "3 letras", aaFull: "Nombre completo", resetOnboarding: "Restablecer incorporación", resetOnboardingDesc: "Mostrar modal de bienvenida y tours de nuevo", changelog: "Registro de cambios", suggestion: "Enviar sugerencia", suggestionPlaceholder: "¿Qué te gustaría ver en GeneCode?", suggestionSubmit: "Enviar", suggestionThanks: "¡Gracias por tus comentarios!" },
    codonGrid: { title: "Tabla de codones", search: "Buscar codones o aminoácidos…", filter: "Filtrar por categoría" },
    molecules: { title: "Explorador de moléculas", search: "Buscar moléculas…" },
    tools: { title: "Herramientas interactivas" },
    common: { loading: "Cargando…", close: "Cerrar", learnMore: "Más información" },
  }),
  fr: makeStub({
    nav: { home: "Accueil", table: "Tableau", molecules: "Molécules", tools: "Outils", settings: "Paramètres" },
    settings: { ...en.settings, title: "Paramètres", appearance: "Apparence", language: "Langue", display: "Affichage", onboarding: "Intégration", theme: "Thème", themeDark: "Sombre", themeLight: "Clair", themeSystem: "Système", animationSpeed: "Vitesse d'animation", animationSlow: "Lent", animationNormal: "Normal", animationFast: "Rapide", soundEnabled: "Effets sonores", seqNotation: "Notation de séquence", aaDisplay: "Affichage des acides aminés", aaOne: "1 lettre", aaThree: "3 lettres", aaFull: "Nom complet", resetOnboarding: "Réinitialiser l'intégration", resetOnboardingDesc: "Afficher à nouveau la modale de bienvenue et les visites guidées", changelog: "Journal des modifications", suggestion: "Envoyer une suggestion", suggestionPlaceholder: "Que souhaiteriez-vous voir dans GeneCode ?", suggestionSubmit: "Envoyer", suggestionThanks: "Merci pour vos commentaires !" },
    codonGrid: { title: "Table des codons", search: "Rechercher des codons ou acides aminés…", filter: "Filtrer par catégorie" },
    molecules: { title: "Explorateur de molécules", search: "Rechercher des molécules…" },
    tools: { title: "Outils interactifs" },
    common: { loading: "Chargement…", close: "Fermer", learnMore: "En savoir plus" },
  }),
  de: makeStub({
    nav: { home: "Start", table: "Tabelle", molecules: "Moleküle", tools: "Werkzeuge", settings: "Einstellungen" },
    settings: { ...en.settings, title: "Einstellungen", appearance: "Erscheinungsbild", language: "Sprache", display: "Anzeige", onboarding: "Onboarding", theme: "Thema", themeDark: "Dunkel", themeLight: "Hell", themeSystem: "System", animationSpeed: "Animationsgeschwindigkeit", animationSlow: "Langsam", animationNormal: "Normal", animationFast: "Schnell", soundEnabled: "Soundeffekte", seqNotation: "Sequenznotation", aaDisplay: "Aminosäuren-Anzeige", aaOne: "1 Buchstabe", aaThree: "3 Buchstaben", aaFull: "Vollständiger Name", resetOnboarding: "Onboarding zurücksetzen", resetOnboardingDesc: "Willkommensmodal und Touren beim nächsten Besuch wieder anzeigen", changelog: "Änderungsprotokoll", suggestion: "Vorschlag senden", suggestionPlaceholder: "Was möchten Sie in GeneCode sehen?", suggestionSubmit: "Senden", suggestionThanks: "Danke für Ihr Feedback!" },
    codonGrid: { title: "Codon-Tabelle", search: "Codons oder Aminosäuren suchen…", filter: "Nach Kategorie filtern" },
    molecules: { title: "Molekül-Explorer", search: "Moleküle suchen…" },
    tools: { title: "Interaktive Werkzeuge" },
    common: { loading: "Laden…", close: "Schließen", learnMore: "Mehr erfahren" },
  }),
  zh: makeStub({
    nav: { home: "首页", table: "密码子表", molecules: "分子", tools: "工具", settings: "设置" },
    settings: { ...en.settings, title: "设置", appearance: "外观", language: "语言", display: "显示", onboarding: "引导", theme: "主题", themeDark: "深色", themeLight: "浅色", themeSystem: "跟随系统", animationSpeed: "动画速度", animationSlow: "慢", animationNormal: "正常", animationFast: "快", soundEnabled: "音效", seqNotation: "序列表示法", aaDisplay: "氨基酸显示", aaOne: "单字母", aaThree: "三字母", aaFull: "全名", resetOnboarding: "重置引导", resetOnboardingDesc: "下次访问时再次显示欢迎弹窗和教程", changelog: "更新日志", suggestion: "发送建议", suggestionPlaceholder: "您希望在 GeneCode 中看到什么？", suggestionSubmit: "发送", suggestionThanks: "感谢您的反馈！" },
    codonGrid: { title: "密码子表", search: "搜索密码子或氨基酸…", filter: "按类别筛选" },
    molecules: { title: "分子浏览器", search: "搜索分子…" },
    tools: { title: "互动工具" },
    common: { loading: "加载中…", close: "关闭", learnMore: "了解更多" },
  }),
  ja: makeStub({
    nav: { home: "ホーム", table: "コドン表", molecules: "分子", tools: "ツール", settings: "設定" },
    settings: { ...en.settings, title: "設定", appearance: "外観", language: "言語", display: "表示", onboarding: "オンボーディング", theme: "テーマ", themeDark: "ダーク", themeLight: "ライト", themeSystem: "システム", animationSpeed: "アニメーション速度", animationSlow: "遅い", animationNormal: "普通", animationFast: "速い", soundEnabled: "サウンド効果", seqNotation: "配列表記", aaDisplay: "アミノ酸表示", aaOne: "1文字", aaThree: "3文字", aaFull: "フルネーム", resetOnboarding: "オンボーディングをリセット", resetOnboardingDesc: "次回訪問時にウェルカムモーダルとツアーを再表示", changelog: "変更履歴", suggestion: "提案を送る", suggestionPlaceholder: "GeneCode に何を追加してほしいですか？", suggestionSubmit: "送信", suggestionThanks: "フィードバックありがとうございます！" },
    codonGrid: { title: "コドン表", search: "コドンまたはアミノ酸を検索…", filter: "カテゴリで絞り込む" },
    molecules: { title: "分子エクスプローラー", search: "分子を検索…" },
    tools: { title: "インタラクティブツール" },
    common: { loading: "読み込み中…", close: "閉じる", learnMore: "詳細" },
  }),
  pt: makeStub({
    nav: { home: "Início", table: "Tabela", molecules: "Moléculas", tools: "Ferramentas", settings: "Configurações" },
    settings: { ...en.settings, title: "Configurações", appearance: "Aparência", language: "Idioma", display: "Exibição", onboarding: "Integração", theme: "Tema", themeDark: "Escuro", themeLight: "Claro", themeSystem: "Sistema", animationSpeed: "Velocidade da animação", animationSlow: "Lento", animationNormal: "Normal", animationFast: "Rápido", soundEnabled: "Efeitos sonoros", seqNotation: "Notação de sequência", aaDisplay: "Exibição de aminoácidos", aaOne: "1 letra", aaThree: "3 letras", aaFull: "Nome completo", resetOnboarding: "Redefinir integração", resetOnboardingDesc: "Mostrar modal de boas-vindas e tours novamente na próxima visita", changelog: "Registro de alterações", suggestion: "Enviar sugestão", suggestionPlaceholder: "O que você gostaria de ver no GeneCode?", suggestionSubmit: "Enviar", suggestionThanks: "Obrigado pelo seu feedback!" },
    codonGrid: { title: "Tabela de códons", search: "Pesquisar códons ou aminoácidos…", filter: "Filtrar por categoria" },
    molecules: { title: "Explorador de moléculas", search: "Pesquisar moléculas…" },
    tools: { title: "Ferramentas interativas" },
    common: { loading: "Carregando…", close: "Fechar", learnMore: "Saiba mais" },
  }),
  hi: makeStub({
    nav: { home: "होम", table: "तालिका", molecules: "अणु", tools: "उपकरण", settings: "सेटिंग्स" },
    settings: { ...en.settings, title: "सेटिंग्स", appearance: "दिखावट", language: "भाषा", display: "प्रदर्शन", onboarding: "ऑनबोर्डिंग", theme: "थीम", themeDark: "डार्क", themeLight: "लाइट", themeSystem: "सिस्टम", animationSpeed: "एनिमेशन गति", animationSlow: "धीमा", animationNormal: "सामान्य", animationFast: "तेज़", soundEnabled: "ध्वनि प्रभाव", seqNotation: "अनुक्रम संकेतन", aaDisplay: "अमीनो एसिड प्रदर्शन", aaOne: "1 अक्षर", aaThree: "3 अक्षर", aaFull: "पूरा नाम", resetOnboarding: "ऑनबोर्डिंग रीसेट करें", resetOnboardingDesc: "अगली विज़िट पर स्वागत मॉडल और टूर फिर से दिखाएं", changelog: "परिवर्तन लॉग", suggestion: "सुझाव भेजें", suggestionPlaceholder: "GeneCode में आप क्या देखना चाहेंगे?", suggestionSubmit: "भेजें", suggestionThanks: "आपकी प्रतिक्रिया के लिए धन्यवाद!" },
    codonGrid: { title: "कोडन तालिका", search: "कोडन या अमीनो एसिड खोजें…", filter: "श्रेणी के अनुसार फ़िल्टर करें" },
    molecules: { title: "अणु एक्सप्लोरर", search: "अणु खोजें…" },
    tools: { title: "इंटरैक्टिव उपकरण" },
    common: { loading: "लोड हो रहा है…", close: "बंद करें", learnMore: "और जानें" },
  }),
  ko: makeStub({
    nav: { home: "홈", table: "코돈 표", molecules: "분자", tools: "도구", settings: "설정" },
    settings: { ...en.settings, title: "설정", appearance: "외관", language: "언어", display: "표시", onboarding: "온보딩", theme: "테마", themeDark: "다크", themeLight: "라이트", themeSystem: "시스템", animationSpeed: "애니메이션 속도", animationSlow: "느림", animationNormal: "보통", animationFast: "빠름", soundEnabled: "음향 효과", seqNotation: "서열 표기법", aaDisplay: "아미노산 표시", aaOne: "1글자", aaThree: "3글자", aaFull: "전체 이름", resetOnboarding: "온보딩 초기화", resetOnboardingDesc: "다음 방문 시 환영 모달 및 투어 다시 표시", changelog: "변경 로그", suggestion: "제안 보내기", suggestionPlaceholder: "GeneCode에 무엇을 추가하고 싶으신가요?", suggestionSubmit: "보내기", suggestionThanks: "피드백을 주셔서 감사합니다!" },
    codonGrid: { title: "코돈 표", search: "코돈 또는 아미노산 검색…", filter: "카테고리로 필터" },
    molecules: { title: "분자 탐색기", search: "분자 검색…" },
    tools: { title: "인터랙티브 도구" },
    common: { loading: "로딩 중…", close: "닫기", learnMore: "자세히 보기" },
  }),
};
