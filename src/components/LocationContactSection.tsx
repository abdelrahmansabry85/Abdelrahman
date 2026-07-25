import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Navigation } from 'lucide-react';
import { TEACHER_INFO, FAQS } from '../data/schedules';

export const LocationContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>عنوان المقر وساعات التواصل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            المقر ووسائل <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">الاتصال والحجز</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            زوروا مقر الدروس أو تواصلوا هاتفياً عبر الواتساب للاستفسار والحجز المباشر في المجموعات والمواعيد المناسبة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Location Card */}
          <div className="lg:col-span-6 bg-[#0E223D] border-2 border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#D4AF37]/20 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1628] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#F3E5AB]">عنوان المقر الرئيسي</h3>
                <span className="text-xs text-slate-300">{TEACHER_INFO.city}</span>
              </div>
            </div>

            <div className="space-y-4 text-slate-200 text-sm">
              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 space-y-1">
                <span className="text-xs font-bold text-amber-300 block">العنوان بالتفصيل:</span>
                <p className="font-bold text-base text-white">{TEACHER_INFO.address}</p>
                <p className="text-xs text-slate-400">بجوار ملابس مان كلوب - خلف مسجد السيد البدوي.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">هاتف الحجز المباشر:</span>
                  <span className="font-black text-lg text-[#F3E5AB] dir-ltr">{TEACHER_INFO.phone}</span>
                </div>
                <a
                  href={`tel:${TEACHER_INFO.phone}`}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xs hover:bg-[#F3E5AB] transition-colors"
                >
                  اتصال تلفوني
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">واتساب المجموعات:</span>
                  <span className="font-bold text-sm text-emerald-400">متاح 24/7 للاستفسار</span>
                </div>
                <a
                  href={`https://wa.me/${TEACHER_INFO.whatsappPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs hover:bg-[#20ba5a] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>محادثة واتساب</span>
                </a>
              </div>
            </div>

            {/* Map visual card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#122A4B] border border-[#D4AF37]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-bold text-white">سهولة الوصول لمقر الدرس</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${TEACHER_INFO.city} ${TEACHER_INFO.address}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#F3E5AB] font-bold underline"
              >
                فتح خرائط جوجل
              </a>
            </div>

          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-xl font-black text-[#F3E5AB]">الأسئلة الشائعة من الطلاب وأولياء الأمور</h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0E223D] border border-[#D4AF37]/30 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-right font-bold text-sm text-white flex items-center justify-between gap-3 hover:bg-[#122A4B] transition-colors"
                    >
                      <span className="text-[#F3E5AB]">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-[#D4AF37]/10 bg-[#0A1628]/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
