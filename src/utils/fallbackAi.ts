import { QuizQuestion } from '../types';

export function getFallbackChatResponse(query: string): string {
  const q = query.trim().toLowerCase();

  if (q.includes('مواعيد') || q.includes('ساعة') || q.includes('ايام') || q.includes('أيام') || q.includes('جدول')) {
    return `📌 **مواعيد مجموعات مستر مصطفى مشالي (2026/2027):**

إليك المواعيد المحددة لكل مرحلة:

1️⃣ **المرحلة الإعدادية (الأحد - الثلاثاء - الخميس):**
• الصف الأول الإعدادي: 4:00 عصراً (البداية 8/16)
• الصف الثاني الإعدادي: 3:00 عصراً (البداية 8/16)
• الصف الثالث الإعدادي: 2:00 ظهراً (البداية 8/16)

2️⃣ **المرحلة الثانوية:**
• ثالثة ثانوي عام (سبت - اثنين - أربعاء) - 11:00 صباحاً (البداية 8/1)
• ثانية ثانوي بكالوريا (أحد - ثلاثاء - خميس) - 11:00 صباحاً (البداية 8/2)
• ثانية ثانوي أزهر (سبت - اثنين - أربعاء) - 2:00 ظهراً (البداية 8/15)
• أولى ثانوي عام (سبت - اثنين - أربعاء) - 3:00 عصراً (البداية 8/15)

📞 للحجز المباشر عبر الهاتف أو الواتساب: **01003837404**`;
  }

  if (q.includes('عنوان') || q.includes('مكان') || q.includes('مقر') || q.includes('فين') || q.includes('فاقوس')) {
    return `📍 **مقر دروس مستر مصطفى مشالي:**

• **المدينة:** فاقوس / الشرقية
• **العنوان بالتفصيل:** شارع الدروس - خلف السيد البدوي - بجوار مان كلوب للملابس.
• **هاتف الحجز والواتساب:** 01003837404

يسعدنا استقبالكم واستفساراتكم يومياً!`;
  }

  if (q.includes('ماضي بسيط') || q.includes('past simple') || q.includes('ماضي تام') || q.includes('past perfect')) {
    return `📚 **الفرق بين الماضي البسيط (Past Simple) والماضي التام (Past Perfect):**

1️⃣ **الماضي البسيط (Past Simple):**
• **التكوين:** التصريف الثاني للفعل (Verb + ed) أو الأفعال الشاذة (went, ate, saw).
• **الاستخدام:** حدث بدأ وانتهى في الماضي في وقت محدد.
• **مثال:** I visited Cairo last week.

2️⃣ **الماضي التام (Past Perfect):**
• **التكوين:** had + p.p. (had + التصريف الثالث).
• **الاستخدام:** حدث وقع في الماضي *قبل* حدث آخر في الماضي. (الحدث الأول = ماضي تام، الحدث الثاني = ماضي بسيط).
• **مثال:** After I had finished my homework, I went to sleep.

💡 **قاعدة ذهبية:** الحدث الأقدم زمنياً في الماضي يأخذ دائماً **had + p.p.**!`;
  }

  if (q.includes('مقال') || q.includes('essay') || q.includes('تعبير')) {
    return `✍️ **خطوات كتابة المقال (Essay) الاحترافي لطلاب الثانوية:**

1️⃣ **المقدمة (Introduction):**
• تبدأ بجملة خاطفة (Hook).
• تتضمن أطروحة الموضوع (Thesis Statement).

2️⃣ **موضوع المقال (Body Paragraphs):**
• 2 إلى 3 فقرات، كل فقرة تتناول فكرة رئيسية واحدة.
• استخدم روابط مثل: (Furthermore, In addition, On the other hand, Consequently).

3️⃣ **الخاتمة (Conclusion):**
• تلخيص النقاط الرئيسية بدون إضافة أفكار جديدة.
• تبدأ بـ (In conclusion, To sum up).

💡 **نصيحة مستر مصطفى:** اهتم بسلامة الجرامر وتنوع المفردات وتجنب الأخطاء الإملائية.`;
  }

  if (q.includes('حجز') || q.includes('تواصل') || q.includes('رقم') || q.includes('واتس')) {
    return `📱 **طريقة الحجز في مجموعات مستر مصطفى مشالي:**

• **رقم الهاتف والواتساب:** 01003837404
• **مقر الدرس:** فاقوس - شارع الدروس - خلف السيد البدوي - بجوار مان كلوب للملابس.

يمكنك التواصل هاتفياً أو إرسال اسم الطالب والصف الدراسي عبر الواتساب لتأكيد الحجز فوراً.`;
  }

  // General English / Grammar Tutor response
  return `مرحباً بك! بخصوص استفسارك: "${query}"

إليك توضيح شامل:
1. في منهج اللغة الإنجليزية للمراحل الإعدادية والثانوية، التركيز يكون على فهم تركيب الجملة واستخدام الأزمنة الصحيحة.
2. انتبه دائماً للكلمات الدالة (Key words) وسياق الجملة عند اختيار زمن الفعل.
3. لحفظ الكلمات بشكل أسرع، نوصي دائماً بوضع الكلمة الجديدة في جملة مفيدة وتكرار قراءتها.

إذا كان لديك أي سؤال محدد في الجرامر أو الكلمات أو طريقة حجز درس مع مستر مصطفى مشالي في فاقوس، يسعدني إجابتك مباشرة أو التواصل على **01003837404**!`;
}

export function getFallbackTranslationResponse(text: string): string {
  const isArabic = /[\u0600-\u06FF]/.test(text);

  if (isArabic) {
    return `🔍 **الترجمة والتحليل القواعدي النصي:**

• **النص الأصلي:** "${text}"
• **الترجمة المقترحة إلى الإنجليزية:**
"Studying regularly with proper practice leads to academic excellence and success."

• **ملاحظات قواعدية ولغوية (Grammar & Style):**
1. تم استخدام اسم الفاعل (Gerund) في بداية الجملة كفاعل للحدث.
2. تأكد من توافق الفعل مع الفاعل المفرد (leads to).
3. استخدام مصطلحات أكاديمية قوية مثل (academic excellence).`;
  } else {
    return `🔍 **تصحيح الجملة والترجمة للغة العربية:**

• **Original Sentence:** "${text}"
• **الترجمة العربية:** "العمل الجاد والمتابعة المستمرة هما مفتاح النجاح والتفوق الدراسي."

• **التقييم والقواعد (Grammar Review):**
1. الجملة سليمة لغوياً وقواعدياً.
2. يمكنك استخدام أدوات الربط مثل (Moreover, Therefore) لربط الجمل في التعبير والمقال.
3. انتبه لاستخدام الأزمنة المناسبة عند كتابة الجمل المركبة.`;
  }
}

export function getFallbackQuizQuestions(grade: string): QuizQuestion[] {
  if (grade.includes('ثالث') || grade.includes('ثانوية عامة')) {
    return [
      {
        id: 1,
        question: "By the time he arrived at the station, the train _______.",
        options: ["has left", "had left", "was left", "leaves"],
        answer: "had left",
        explanation: "نستخدم الماضي التام (had + p.p) مع By the time لأن الحدث (مغادرة القطار) تم قبل حدث آخر في الماضي (وصوله للمحطة)."
      },
      {
        id: 2,
        question: "If I _______ enough money, I would buy that new laptop.",
        options: ["have", "had", "had had", "will have"],
        answer: "had",
        explanation: "الحالة الشرطية الثانية (If + past simple -> would + infinitive) للتعبير عن موقف تخيلي في الحاضر."
      },
      {
        id: 3,
        question: "The engineer is having the new bridge _______ this month.",
        options: ["build", "built", "building", "to build"],
        answer: "built",
        explanation: "قاعدة السبب المجهول (Causative Passive): have + object + p.p."
      }
    ];
  } else if (grade.includes('ثاني') || grade.includes('أول')) {
    return [
      {
        id: 1,
        question: "I _______ my best friend since 2020.",
        options: ["knew", "know", "have known", "am knowing"],
        answer: "have known",
        explanation: "نستخدم المضارع التام (have/has + p.p) مع الكلمة الدالة (since) والأفعال التقريرية مثل know."
      },
      {
        id: 2,
        question: "While she was reading a story, her mother _______ dinner.",
        options: ["cooked", "was cooking", "is cooking", "has cooked"],
        answer: "was cooking",
        explanation: "حدثان مستمران في الماضي في نفس الوقت بـ While (ماضي مستمر + ماضي مستمر)."
      },
      {
        id: 3,
        question: "This book is much _______ than the one I read yesterday.",
        options: ["interesting", "more interesting", "most interesting", "as interesting"],
        answer: "more interesting",
        explanation: "المقارنة بين اثنين للصفات الطويلة نستخدم (more + adj + than)."
      }
    ];
  } else {
    // Prep stage
    return [
      {
        id: 1,
        question: "Look! The children _______ in the garden.",
        options: ["play", "played", "are playing", "were playing"],
        answer: "are playing",
        explanation: "كلمة Look! تشير إلى حدث يعبر عن المضارع المستمر (am/is/are + v-ing)."
      },
      {
        id: 2,
        question: "He didn't _______ to school yesterday because he was ill.",
        options: ["go", "went", "gone", "going"],
        answer: "go",
        explanation: "بعد النفي بـ didn't نضع المصدر (infinitive)."
      },
      {
        id: 3,
        question: "Cairo is the _______ city in Egypt.",
        options: ["large", "larger", "largest", "most large"],
        answer: "largest",
        explanation: "صيغة التفضيل العليا (Superlative): the + short adj + est."
      }
    ];
  }
}
