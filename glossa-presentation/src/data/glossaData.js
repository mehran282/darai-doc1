// داده‌های استخراج شده از سند استراتژیک Glossa

export const projectInfo = {
  company: "شرکت همفکران",
  author: "مهران قلمبر",
  systemName: "Glossa",
  client: "وزارت (بخش دستیاری و پشتیبانی داخلی)",
  period: "۱۴۰۴ (۱ سال اجرا + پشتیبانی سالانه)",
  date: "۱۴۰۴/۱۱/۰۵",
  version: "۱.۰",
  status: "آماده تقدیم به کمیته تصمیم‌گیری"
};

export const mainGoals = [
  {
    title: "کاهش ۵۸.۳% هزینه‌های عملیاتی",
    description: "صرفه‌جویی ۱۰.۲ میلیارد تومان در سال اول"
  },
  {
    title: "بهبود کیفیت خدمات",
    description: "از ۸ ساعت دسترسی به ۲۴ ساعت پاسخ فوری"
  },
  {
    title: "افزایش رضایت شهروندان",
    description: "پاسخ فوری، دقیق، و شخصی‌شده"
  },
  {
    title: "نمایش رهبری فناوری",
    description: "رهبری در دولت ایران در عصر هوش مصنوعی"
  },
  {
    title: "توسعه قابلیت‌های داخلی",
    description: "استفاده از فناوری و تیم ایرانی"
  },
  {
    title: "پایداری و مقیاس‌پذیری",
    description: "قابلیت توسعه و گسترش به سایر بخش‌های سازمان"
  }
];

export const comparisonMetrics = [
  { metric: "ساعات دسترسی", current: "۸ ساعت (۸-۱۶)", after: "۲۴ ساعت", improvement: "+۶۶%" },
  { metric: "زمان متوسط پاسخ", current: "۲-۴ ساعت", after: "۱۰ ثانیه", improvement: "۹۹.۷% بهتر" },
  { metric: "درصد خودکارسازی", current: "۰%", after: "۷۵-۸۰%", improvement: "+۷۵%" },
  { metric: "هزینه سالانه", current: "۱۷.۵ میلیارد تومان", after: "۷.۳ میلیارد تومان", improvement: "-۵۸.۳%" },
  { metric: "هزینه هر تعامل", current: "۴,۲۲۰ هزار تومان", after: "۲,۴۷۰ هزار تومان", improvement: "-۴۱.۵%" }, // این عدد از سند اصلی است
  { metric: "رضایتمندی کاربر", current: "۷۰%", after: "۹۶%", improvement: "+۲۶%" },
  { metric: "دقت پاسخ", current: "۷۰%", after: "۹۸%", improvement: "+۲۸%" }
];

export const roadmapPhases = [
  {
    id: 1,
    title: "فاز اول: آماده‌سازی و تربیت Glossa",
    duration: "۳ ماه (بهمن ۱۴۰۴ - فروردین ۱۴۰۵)",
    team: "۵ نفر",
    budget: 5,
    actions: [
      "نصب و تنظیم Glossa بر روی سرورهای وزارت",
      "آموزش ۸ نفر کارکنان موجود برای نقش‌های نگهبان سامانه",
      "تنظیم پارامترهای Glossa بر اساس الگوی سؤالات موجود",
      "انجام تست‌های ایمنی و امنیتی کامل",
      "انتقال ۲۰% تیکت‌های موجود برای تست اولیه"
    ]
  },
  {
    id: 2,
    title: "فاز دوم: پایلوت و گسترش Glossa",
    duration: "۵ ماه (اردیبهشت ۱۴۰۵ - شهریور ۱۴۰۵)",
    team: "۸ نفر",
    budget: 1.2,
    actions: [
      "افزایش پوشش Glossa به ۵۰% تیکت‌های ورودی",
      "جمع‌آوری بازخورد کاربران و بهبود مدل‌ها",
      "آموزش بخش‌های دیگر وزارت",
      "ایجاد اتاق کنترل ۲۴/۷",
      "انتشار گزارش‌های تفصیلی"
    ]
  },
  {
    id: 3,
    title: "فاز سوم: توسعه و پایدارسازی Glossa",
    duration: "۴ ماه (مهر ۱۴۰۵ - دی ۱۴۰۵)",
    team: "۱۰ نفر",
    budget: 1.1,
    actions: [
      "افزایش پوشش Glossa به ۷۵-۸۰%",
      "گسترش به سایر بخش‌های وزارت",
      "پیوند یکپارچه با سایر سامانه‌های دولتی",
      "بهینه‌سازی مدل Glossa",
      "راه‌اندازی API"
    ]
  },
  {
    id: 4,
    title: "پشتیبانی و نگهداری سالانه",
    duration: "سالانه (از سال دوم به بعد)",
    team: "۳ نفر",
    budget: 0.6,
    actions: [
      "نگهداری روتینی و بهینه‌سازی مستمر",
      "به‌روزرسانی مدل‌های Glossa (در صورت نیاز)",
      "توسعه ویژگی‌های جدید (در صورت نیاز)",
      "پشتیبانی فنی ۲۴/۷"
    ]
  }
];

export const kpiData = {
  quantitative: [
    { metric: "نرخ خودکارسازی", year1: 60, year2: 75, year3: 80, unit: "%" },
    { metric: "زمان پاسخ اولیه (ثانیه)", year1: 10, year2: 5, year3: 3, unit: "ثانیه" },
    { metric: "نرخ حل مسئله", year1: 65, year2: 78, year3: 85, unit: "%" },
    { metric: "میانگین زمان رسیدگی (دقیقه)", year1: 2, year2: 1.5, year3: 1, unit: "دقیقه" },
    { metric: "در دسترس بودن سیستم", year1: 99.5, year2: 99.8, year3: 99.95, unit: "%" },
    { metric: "حجم تیکت‌ها (هزار)", year1: 300, year2: 350, year3: 400, unit: "هزار" }
  ],
  qualitative: [
    { metric: "رضایت مشتری (CSAT)", target: "۸۵٪+", description: "نظرسنجی رضایت مشتری" },
    { metric: "امتیاز خالص ترویج (NPS)", target: "۵۰+", description: "احتمال توصیه به دیگران" },
    { metric: "رضایت کارکنان", target: "۸۰٪", description: "رضایت تیم پشتیبانی" },
    { metric: "دسترسی (۲۴/۷)", target: "بدون نقص", description: "دسترسی ۲۴ ساعته و ۷ روز هفته" },
    { metric: "امنیت داده", target: "۱۰۰٪ انطباق", description: "رعایت کامل استانداردهای امنیتی" }
  ]
};

export const financialData = {
  year1: {
    budget: 7.3, // محاسبه: فاز ۱ (۵) + فاز ۲ (۱.۲) + فاز ۳ (۱.۱) = ۷.۳ میلیارد تومان
    savings: 10.2, // صرفه‌جویی سال اول: نیروی انسانی (۱۷.۵) - گلوسا (۷.۳) = ۱۰.۲ میلیارد تومان
    roi: 139.7, // محاسبه: (۱۰.۲ / ۷.۳) * ۱۰۰ = ۱۳۹.۷%
    paybackPeriod: 8.6, // محاسبه: (۷.۳ / ۱۰.۲) * ۱۲ = ۸.۶ ماه
    description: "اجرای کامل پروژه (فاز ۱: آماده‌سازی + فاز ۲: پایلوت + فاز ۳: توسعه)"
  },
  year2: {
    budget: 5.599, // هزینه سالانه (۴.۴۷۹) با تورم ۲۵% = ۵.۵۹۹ میلیارد تومان
    savings: 16.276, // صرفه‌جویی سال دوم: نیروی انسانی (۲۱.۸۷۵) - گلوسا (۵.۵۹۹) = ۱۶.۲۷۶ میلیارد تومان
    cumulativeROI: 205.3, // محاسبه: (۲۶.۴۷۶ / ۱۲.۸۹۹) * ۱۰۰ = ۲۰۵.۳%
    cumulativeReturn: 26.476, // صرفه‌جویی تجمعی: ۱۰.۲ + ۱۶.۲۷۶
    description: "پشتیبانی و نگهداری با تورم ۲۵% (حقوق تیم + زیرساخت + سرویس AI + نگهداری + به‌روزرسانی)"
  },
  year3: {
    budget: 6.999, // هزینه سالانه (۵.۵۹۹) با تورم ۲۵% = ۶.۹۹۹ میلیارد تومان
    savings: 20.345, // صرفه‌جویی سال سوم: نیروی انسانی (۲۷.۳۴۴) - گلوسا (۶.۹۹۹) = ۲۰.۳۴۵ میلیارد تومان
    cumulativeROI: 235.3, // محاسبه: (۴۶.۸۲۱ / ۱۹.۸۹۸) * ۱۰۰ = ۲۳۵.۳%
    cumulativeReturn: 46.821, // صرفه‌جویی کل ۳ ساله: ۱۰.۲ + ۱۶.۲۷۶ + ۲۰.۳۴۵
    description: "پشتیبانی و نگهداری با تورم ۲۵% (حقوق تیم + زیرساخت + سرویس AI + نگهداری + به‌روزرسانی)"
  },
  total3Years: {
    totalSavings: 46.821, // صرفه‌جویی کل ۳ ساله: ۱۰.۲ + ۱۶.۲۷۶ + ۲۰.۳۴۵
    totalInvestment: 19.898, // سال اول (۷.۳) + سال دوم (۵.۵۹۹) + سال سوم (۶.۹۹۹)
    netReturn: 46.821, // صرفه‌جویی خالص
    totalROI: 235.3, // محاسبه: (۴۶.۸۲۱ / ۱۹.۸۹۸) * ۱۰۰ = ۲۳۵.۳%
    apiRevenue: 36,
    description: "سرمایه‌گذاری اولیه: سال اول | پشتیبانی سالانه با تورم ۲۵%: سال‌های بعد"
  },
  budgetBreakdown: [
    { phase: "فاز اول: آماده‌سازی و تربیت", amount: 5, percentage: 0 },
    { phase: "فاز دوم: پایلوت و گسترش", amount: 1.2, percentage: 0 },
    { phase: "فاز سوم: توسعه و پایدارسازی", amount: 1.1, percentage: 0 }
  ]
};

export const teamStructure = [
  { role: "توسعه و آپدیت", count: 1, salary: 75 },
  { role: "پشتیبانی و نگهداری", count: 1, salary: 45 },
  { role: "نگهداری سرور، شبکه و امنیت", count: 1, salary: 65 }
];

export const challenges = [
  { challenge: "مقاومت تغییر", probability: "بالا", impact: "بالا", solution: "آموزش، شفاف‌بودن" },
  { challenge: "کیفیت داده", probability: "متوسط", impact: "بالا", solution: "تمیزکاری داده" },
  { challenge: "خرابی فنی", probability: "کم", impact: "بالا", solution: "Backup، monitoring" },
  { challenge: "ناامنی داده", probability: "کم", impact: "بالا", solution: "رمزنگاری، audit" },
  { challenge: "عدم قبول کاربران", probability: "متوسط", impact: "متوسط", solution: "رابط بهتر" }
];

export const satisfactionMetrics = [
  { metric: "رضایتمندی کاربران", current: 70, after: 96, improvement: 26 },
  { metric: "زمان انتظار (دقیقه)", current: 180, after: 0.17, improvement: 99.7 },
  { metric: "دسترسی ۲۴/۷", current: 0, after: 100, improvement: 100 },
  { metric: "دقت پاسخ", current: 70, after: 98, improvement: 28 }
];
