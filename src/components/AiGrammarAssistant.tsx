import React, { useState } from 'react';
import { Bot, Send, Sparkles, HelpCircle, CheckCircle, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';
import { ChatMessage, QuizQuestion } from '../types';
import {
  getFallbackChatResponse,
  getFallbackTranslationResponse,
  getFallbackQuizQuestions,
} from '../utils/fallbackAi';

export const AiGrammarAssistant: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'translate' | 'quiz'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'مرحبًا بك! أنا مساعد مستر مصطفى مشالي الذكي للغة الإنجليزية. يمكنك سؤالي عن أي قاعدة في الجرامر، شرح الكلمات، أو كيفية حل أسئلة الامتحانات للمرحلتين الإعدادية والثانوية!',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Translation Check State
  const [translateInput, setTranslateInput] = useState('');
  const [translateOutput, setTranslateOutput] = useState('');
  const [loadingTranslate, setLoadingTranslate] = useState(false);

  // Quiz State
  const [selectedGradeForQuiz, setSelectedGradeForQuiz] = useState('الثانوية العامة');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Send message to AI Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || loadingChat) return;

    const userText = inputMsg.trim();
    const userMsgObj: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setInputMsg('');
    setLoadingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      const data = await res.json();
      let assistantText = data.answer;

      if (!res.ok || !assistantText || data.error) {
        assistantText = getFallbackChatResponse(userText);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: assistantText,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      const assistantText = getFallbackChatResponse(userText);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: assistantText,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  // Translation / Grammar Check
  const handleTranslateCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!translateInput.trim() || loadingTranslate) return;

    setLoadingTranslate(true);
    setTranslateOutput('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `قم بترجمة أو تصحيح هذه الجملة وإعطاء الملاحظات والنصائح القواعدية باللغة العربية:\n"${translateInput}"`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.answer && !data.error) {
        setTranslateOutput(data.answer);
      } else {
        setTranslateOutput(getFallbackTranslationResponse(translateInput));
      }
    } catch (err) {
      console.error(err);
      setTranslateOutput(getFallbackTranslationResponse(translateInput));
    } finally {
      setLoadingTranslate(false);
    }
  };

  // Generate Quiz
  const handleGenerateQuiz = async () => {
    setLoadingQuiz(true);
    setUserAnswers({});
    setQuizSubmitted(false);

    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: selectedGradeForQuiz }),
      });

      const data = await res.json();
      if (res.ok && data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuizQuestions(data.questions);
      } else {
        setQuizQuestions(getFallbackQuizQuestions(selectedGradeForQuiz));
      }
    } catch (err) {
      console.error(err);
      setQuizQuestions(getFallbackQuizQuestions(selectedGradeForQuiz));
    } finally {
      setLoadingQuiz(false);
    }
  };

  return (
    <section id="ai" className="py-12 relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>مدعوم بالذكاء الاصطناعي (Gemini)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            مساعد <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">مستر مصطفى الذكي</span> للغة الإنجليزية
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            مساحتك الخاصة للتدريب الشخصي: اسأل عن القواعد، صحح ترجمتك، واختبر مستواك في أي وقت مجاناً.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 bg-[#0E223D] p-1.5 rounded-2xl border border-[#D4AF37]/30 max-w-md mx-auto">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeSubTab === 'chat'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            اسأل المساعد
          </button>

          <button
            onClick={() => setActiveSubTab('translate')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeSubTab === 'translate'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            مصحح الترجمة
          </button>

          <button
            onClick={() => {
              setActiveSubTab('quiz');
              if (quizQuestions.length === 0) handleGenerateQuiz();
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            اختبار تفاعلي
          </button>
        </div>

        {/* SUB-TAB 1: CHAT */}
        {activeSubTab === 'chat' && (
          <div className="bg-[#0E223D] border-2 border-[#D4AF37]/40 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
            
            {/* Messages box */}
            <div className="h-[380px] overflow-y-auto space-y-3 p-3 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold rounded-tl-none'
                        : 'bg-[#122A4B] text-slate-100 border border-[#D4AF37]/30 rounded-tr-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        m.sender === 'user' ? 'text-slate-900/70' : 'text-slate-400'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loadingChat && (
                <div className="flex items-center gap-2 text-xs text-[#F3E5AB] p-2">
                  <Bot className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>المساعد الذكي يكتب الإجابة...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب سؤالك هنا (مثلاً: ما الفرق بين Present Perfect و Past Simple؟)..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-[#0A1628] text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={loadingChat || !inputMsg.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-slate-950 font-black text-sm disabled:opacity-50 hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <span>إرسال</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-400">
              <span className="font-bold text-amber-300">أسئلة مقترحة:</span>
              <button
                onClick={() => setInputMsg('ازاي افرق بين الماضي البسيط والماضي التام؟')}
                className="hover:text-[#F3E5AB] bg-[#0A1628] px-2 py-0.5 rounded border border-[#D4AF37]/20"
              >
                الماضي البسيط والتام
              </button>
              <button
                onClick={() => setInputMsg('ما هي القواعد الأساسية لكتابة Essay للثانوية العامة؟')}
                className="hover:text-[#F3E5AB] bg-[#0A1628] px-2 py-0.5 rounded border border-[#D4AF37]/20"
              >
                كتابة المقال (Essay)
              </button>
              <button
                onClick={() => setInputMsg('ماهي مواعيد دروس ثالثة ثانوي لـ مستر مصطفى مشالي؟')}
                className="hover:text-[#F3E5AB] bg-[#0A1628] px-2 py-0.5 rounded border border-[#D4AF37]/20"
              >
                مواعيد ثالثة ثانوي
              </button>
            </div>

          </div>
        )}

        {/* SUB-TAB 2: TRANSLATE */}
        {activeSubTab === 'translate' && (
          <div className="bg-[#0E223D] border-2 border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                أدخل جملة باللغة العربية للترجمة أو جملة بالإنجليزية للتصحيح والتقييم:
              </label>
              <textarea
                rows={3}
                placeholder="اكتب الجملة هنا..."
                value={translateInput}
                onChange={(e) => setTranslateInput(e.target.value)}
                className="w-full bg-[#0A1628] text-white text-sm p-3.5 rounded-xl border border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              onClick={handleTranslateCheck}
              disabled={loadingTranslate || !translateInput.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {loadingTranslate ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التحليل القواعدي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>تصحيح وترجمة وتوضيح القواعد</span>
                </>
              )}
            </button>

            {translateOutput && (
              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/40 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap animate-fadeIn">
                <span className="font-bold text-[#F3E5AB] block border-b border-[#D4AF37]/20 pb-2">
                  نتيجة التحليل الشامل:
                </span>
                <p>{translateOutput}</p>
              </div>
            )}
          </div>
        )}

        {/* SUB-TAB 3: QUIZ */}
        {activeSubTab === 'quiz' && (
          <div className="bg-[#0E223D] border-2 border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#D4AF37]/20 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-bold text-white text-sm">اختبار تقييم إلكتروني سريع</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedGradeForQuiz}
                  onChange={(e) => setSelectedGradeForQuiz(e.target.value)}
                  className="bg-[#0A1628] text-white text-xs px-3 py-2 rounded-xl border border-[#D4AF37]/30"
                >
                  <option value="الصف الأول الإعدادي">الأول الإعدادي</option>
                  <option value="الصف الثاني الإعدادي">الثاني الإعدادي</option>
                  <option value="الصف الثالث الإعدادي">الثالث الإعدادي</option>
                  <option value="الصف الأول الثانوي">الأول الثانوي</option>
                  <option value="الصف الثاني الثانوي">الثاني الثانوي</option>
                  <option value="الثانوية العامة">الثانوية العامة</option>
                </select>

                <button
                  onClick={handleGenerateQuiz}
                  disabled={loadingQuiz}
                  className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-extrabold text-xs shrink-0 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingQuiz ? 'animate-spin' : ''}`} />
                  <span>أسئلة جديدة</span>
                </button>
              </div>
            </div>

            {loadingQuiz ? (
              <div className="py-12 text-center text-slate-300 space-y-2">
                <RefreshCw className="w-8 h-8 animate-spin text-[#D4AF37] mx-auto" />
                <p className="text-sm font-bold text-[#F3E5AB]">جاري إعداد الأسئلة الخاصة بـ ({selectedGradeForQuiz})...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {quizQuestions.map((q, idx) => {
                  const selectedOpt = userAnswers[q.id];
                  const isCorrect = selectedOpt === q.answer;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-bold text-white pt-0.5 dir-ltr text-right">{q.question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            disabled={quizSubmitted}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                            className={`p-3 rounded-xl text-xs text-right font-semibold transition-all border ${
                              userAnswers[q.id] === opt
                                ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                                : 'bg-[#122A4B] text-slate-200 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs space-y-1 ${
                            isCorrect ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200' : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                            <span>الإجابة الصحيحة: {q.answer}</span>
                          </div>
                          <p className="text-slate-300">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(userAnswers).length < quizQuestions.length}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-slate-950 font-black text-sm shadow-xl disabled:opacity-50"
                  >
                    إنهاء وتصحيح الاختبار
                  </button>
                ) : (
                  <button
                    onClick={handleGenerateQuiz}
                    className="w-full py-3.5 rounded-xl bg-[#0A1628] border border-[#D4AF37] text-[#F3E5AB] font-black text-sm"
                  >
                    محاولة اختبار آخر
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
