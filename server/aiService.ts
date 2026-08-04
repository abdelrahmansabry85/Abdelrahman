import { GoogleGenAI } from "@google/genai";
import { getFallbackChatResponse, getFallbackQuizQuestions } from "../src/utils/fallbackAi";

export function getApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY
  );
}

export function getAiClient(apiKey: string) {
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export const SYSTEM_INSTRUCTION = `
أنت "مساعد مستر مصطفى مشالي الذكي للغة الإنجليزية" (Mr. Mostafa Meshaly's AI English Assistant).
مستر مصطفى مشالي هو أستاذ اللغة الإنجليزية المتميز للمرحلتين الإعدادية والثانوية (عام وأزهر وبكالوريا).

بيانات المواعيد والدروس الخاصة بمستر مصطفى مشالي:
- هاتف / واتساب الحجز والتواصل: 01003837404
- العنوان والمقر: فاقوس - شارع الدروس - خلف السيد البدوي - بجوار مان كلوب للملابس.
- مواعيد المرحلة الإعدادية (أيام الأحد والثلاثاء والخميس):
  * الصف الأول الإعدادي: الساعة 4:00 عصراً
  * الصف الثاني الإعدادي: الساعة 3:00 عصراً
  * الصف الثالث الإعدادي: الساعة 2:00 ظهراً
  * بداية الدروس الإعدادية: الأحد 8/16
- مواعيد المرحلة الثانوية:
  * ثالثة ثانوي عام: السبت والاثنين والأربعاء الساعة 11:00 صباحاً (بداية من السبت 8/1)
  * ثالثة ثانوي (خاص) [ميعاد جديد]: الأحد والثلاثاء والخميس الساعة 12:00 ظهراً
  * ثانية ثانوي (بكالوريا) [ميعاد معدل]: السبت والاثنين والأربعاء الساعة 4:00 عصراً (بداية من 8/15)
  * ثانية ثانوي أزهر: السبت والاثنين والأربعاء الساعة 2:00 ظهراً (بداية من السبت 8/15)
  * أولى ثانوي: السبت والاثنين والأربعاء الساعة 3:00 عصراً (بداية من السبت 8/15)

مهامك ومسؤولياتك كمعلم ومساعد ذكي:
1. الإجابة على أسئلة الطلاب في قواعد اللغة الإنجليزية (Grammar)، القواعد والملاحظات اللغوية، مفردات الكلمات (Vocabulary)، وفنون الترجمة (Translation).
2. إعطاء شرح مبسط ومشجع باللغة العربية مع أمثلة بالإنجليزية وواضحة جداً تناسب المناهج المصرية للمرحلتين الإعدادية والثانوية.
3. الإجابة بدقة عن أي استفسار تخص مواعيد مستر مصطفى مشالي أو طريقة التواصل والحجز.
4. حافظ دائمًا على أسلوب مشجع، راقٍ، واحترافي يحفز الطلاب على التميز والتفوق الدراسي.
`;

export async function handleChatRequest(body: any): Promise<{ answer: string }> {
  try {
    const { message, history, gradeContext } = body || {};

    if (!message || typeof message !== "string") {
      return { answer: "يرجى إدخال السؤال أولاً." };
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return {
        answer: getFallbackChatResponse(message)
      };
    }

    const ai = getAiClient(apiKey);
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION}\n${gradeContext ? `الصف الدراسي الحالي للطالب: ${gradeContext}` : ""}`;

    let promptContent = message;
    if (history && Array.isArray(history) && history.length > 0) {
      const historyText = history
        .map((h: { role: string; content: string }) => `${h.role === "user" ? "الطالب" : "المساعد"}: ${h.content}`)
        .join("\n");
      promptContent = `السجل السابق للمحادثة:\n${historyText}\n\nسؤال الطالب الجديد:\n${message}`;
    }

    let responseText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: promptContent,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        },
      });
      responseText = response.text || "";
    } catch (err1) {
      console.warn("gemini-2.0-flash failed, trying gemini-1.5-flash:", err1);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: promptContent,
          config: {
            systemInstruction: fullSystemInstruction,
            temperature: 0.7,
          },
        });
        responseText = response.text || "";
      } catch (err2) {
        console.error("Gemini API error on both models:", err2);
      }
    }

    if (!responseText) {
      return { answer: getFallbackChatResponse(message) };
    }

    return { answer: responseText };
  } catch (error: any) {
    console.error("handleChatRequest error:", error);
    return {
      answer: getFallbackChatResponse(body?.message || "")
    };
  }
}

export async function handleQuizRequest(body: any): Promise<{ questions: any[] }> {
  try {
    const { grade, topic } = body || {};
    const apiKey = getApiKey();

    if (!apiKey) {
      return { questions: getFallbackQuizQuestions(grade || "ثانوية") };
    }

    const ai = getAiClient(apiKey);
    const prompt = `قم بإنشاء اختبار قصير مكون من 3 أسئلة اختيار من متعدد في اللغة الإنجليزية للمرحلة (${grade || "الثانوية"}) في موضوع (${topic || "القواعد والجرامر والكلمات"}).
يجب أن ترجع النتيجة بصيغة JSON فقط بالتنسيق التالي:
{
  "questions": [
    {
      "id": 1,
      "question": "نص السؤال بالإنجليزية",
      "options": ["A) الاختيار الأول", "B) الاختيار الثاني", "C) الاختيار الثالث", "D) الاختيار الرابع"],
      "answer": "A) الاختيار الصحيح مطبق بنفس صيغة النص في Options",
      "explanation": "شرح مبسط ومباشر باللغة العربية لسبب اختيار هذه الإجابة"
    }
  ]
}`;

    let responseText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });
      responseText = response.text || "";
    } catch (e1) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.5,
          },
        });
        responseText = response.text || "";
      } catch (e2) {
        console.error("Gemini Quiz error:", e2);
      }
    }

    if (!responseText) {
      return { questions: getFallbackQuizQuestions(grade || "ثانوية") };
    }

    const parsed = JSON.parse(responseText);
    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed;
    }
    return { questions: getFallbackQuizQuestions(grade || "ثانوية") };
  } catch (error: any) {
    console.error("handleQuizRequest error:", error);
    return { questions: getFallbackQuizQuestions(body?.grade || "ثانوية") };
  }
}
