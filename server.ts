import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

export const app = express();

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment variables.");
    }
    return new GoogleGenAI({
      apiKey: apiKey || "dummy_key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Chat Assistant endpoint for English Learning & Practice
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history, gradeContext } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          answer:
            "مرحبًا بك! الذكاء الاصطناعي جاهز للعمل بمجرد إضافة مفتاح GEMINI_API_KEY في الإعدادات. يمكنك دائمًا الاستفسار عن المواعيد والحجز مباشرة عبر الواتساب: 01003837404.",
        });
      }

      const ai = getAiClient();

      const systemInstruction = `
أنت "مساعد مستر مصطفى مشالي الذكي للغة الإنجليزية" (Mr. Mostafa Meshaly's AI English Assistant).
مستر مصطفى مشالي هو أستاذ اللغة الإنجليزية المتميز للمرحلتين الإعدادية والثانوية (عام وأزهر وبكالوريا).

بيانات المواعيد والدروس الخاصة بمستر مصطفى مشالي:
- هاتف / واتساب الحجز والتواصل: 01003837404
- العنوان والمقر: فاقوس - شارع الدروس - خلف السيد البدوي - بجوار مان كلوب للملابس.
- مواعيد المرحلة الإعدادية (أيام الأحد والثلاثاء والخميس):
  * الصف الأول الإعدادي: الساعة 4:00
  * الصف الثاني الإعدادي: الساعة 3:00
  * الصف الثالث الإعدادي: الساعة 2:00
  * بداية الدروس الإعدادية: الأحد 8/16
- مواعيد المرحلة الثانوية:
  * ثالثة ثانوي عام: السبت والاثنين والأربعاء الساعة 11:00 (بداية من السبت 8/1)
  * ثانية ثانوي (بكالوريا): الأحد والثلاثاء والخميس الساعة 11:00 (بداية من الأحد 8/2)
  * ثانية ثانوي أزهر: السبت والاثنين والأربعاء الساعة 2:00 (بداية من السبت 8/15)
  * أولى ثانوي: السبت والاثنين والأربعاء الساعة 3:00 (بداية من السبت 8/15)

مهامك ومسؤولياتك كمعلم ومساعد ذكي:
1. الإجابة على أسئلة الطلاب في قواعد اللغة الإنجليزية (Grammar)، القواعد والملاحظات اللغوية، مفردات الكلمات (Vocabulary)، وفنون الترجمة (Translation).
2. إعطاء شرح مبسط ومشجع باللغة العربية مع أمثلة بالإنجليزية وواضحة جداً تناسب المناهج المصرية للمرحلتين الإعدادية والثانوية.
3. الإجابة بدقة عن أي استفسار تخص مواعيد مستر مصطفى مشالي أو طريقة التواصل والحجز.
4. حافظ دائمًا على أسلوب مشجع، راقٍ، واحترافي يحفز الطلاب على التميز والتفوق الدراسي.
${gradeContext ? `الصف الدراسي الحالي للطالب: ${gradeContext}` : ""}
`;

      let promptContent = message;
      if (history && Array.isArray(history) && history.length > 0) {
        const historyText = history
          .map((h: { role: string; content: string }) => `${h.role === "user" ? "الطالب" : "المساعد"}: ${h.content}`)
          .join("\n");
        promptContent = `السجل السابق للمحادثة:\n${historyText}\n\nسؤال الطالب الجديد:\n${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptContent,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const answerText = response.text || "عذرًا، لم أتمكن من الحصول على إجابة حاليًا. حاول مرة أخرى.";
      return res.json({ answer: answerText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "حدث خطأ أثناء الاتصال بالمساعد الذكي.",
        details: error?.message,
      });
    }
  });

  // Quiz Generator endpoint
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { grade, topic } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback default quiz if API key is not present
        return res.json({
          questions: [
            {
              id: 1,
              question: "Choose the correct answer: By next year, he ______ his English degree.",
              options: ["A) will complete", "B) will have completed", "C) completed", "D) completes"],
              answer: "B) will have completed",
              explanation: "استخدام زمن المستقبل التام (Will have + P.P) للتعبير عن حدث سوف يكتمل قبل وقت معين في المستقبل.",
            },
            {
              id: 2,
              question: "If I ______ enough time, I would have joined Mr. Mostafa's English class.",
              options: ["A) had", "B) have had", "C) had had", "D) have"],
              answer: "C) had had",
              explanation: "الحالة الشرطية الثالثة لـ If تتكون من (If + الماضي التام had + p.p) والطرف الثاني (would have + p.p).",
            },
            {
              id: 3,
              question: "The teacher asked the students ______ silent during the explanation.",
              options: ["A) to keep", "B) keep", "C) keeping", "D) kept"],
              answer: "A) to keep",
              explanation: "الفعل ask يأتي بعده مفعول ثم (to + المصدر) في الكلام غير المباشر.",
            }
          ]
        });
      }

      const ai = getAiClient();
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

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (error: any) {
      console.error("Quiz Gen Error:", error);
      return res.status(500).json({ error: "Failed to generate quiz." });
    }
  });

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
