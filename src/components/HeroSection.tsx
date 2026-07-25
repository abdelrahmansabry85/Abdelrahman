import React from 'react';
import { TEACHER_INFO, heroPosterImg, emblemLogoImg } from '../data/schedules';
import { Calendar, Phone, MessageCircle, Clock, MapPin, Sparkles, CheckCircle2, Award } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToSchedule: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToSchedule,
}) => {
  return (
    <section id="hero" className="relative py-8 md:py-16 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#0E223D] to-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold shadow-lg">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
              <span>المنصة الرسمية لحجز ومواعيد دروس اللغة الإنجليزية 2026/2027</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[#D4AF37] font-black text-lg sm:text-xl">أهلاً بكم مع</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">
                  {TEACHER_INFO.name}
                </span>
              </h1>
              <p className="text-base sm:text-xl font-bold text-[#F3E5AB] leading-relaxed">
                {TEACHER_INFO.titleFull}
              </p>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              مرحبًا بكم في البوابة الرسمية لمعرفة مواعيد المجموعات والحجز المباشر. نقدم تدريساً متكاملاً يجمع بين تبسيط القواعد، مهارات الترجمة، والمتابعة الأسبوعية لطلاب المرحلة الإعدادية والثانوية (العام والأزهر والبكالوريا).
            </p>

            {/* Start Dates Strip (Clean Text Block) */}
            <div className="p-4 rounded-2xl bg-[#0E223D]/90 border border-[#D4AF37]/40 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-[#F3E5AB] text-sm font-black border-b border-[#D4AF37]/20 pb-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>مواعيد بداية الكورس والمجموعات الجديدة:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {TEACHER_INFO.startDates.map((sd, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-[#0A1628] border border-[#D4AF37]/20">
                    <span className="text-slate-300 font-medium">{sd.label}:</span>
                    <span className="font-extrabold text-[#D4AF37]">{sd.dateDisplay}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${TEACHER_INFO.whatsappPhone}?text=${encodeURIComponent("السلام عليكم مستر مصطفى مشالي، أود الاستفسار والحجز في مجموعة اللغة الإنجليزية")}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] text-slate-950 font-black text-sm sm:text-base shadow-xl hover:bg-[#20ba5a] transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>احجز الآن عبر الواتساب</span>
              </a>

              <a
                href={`tel:${TEACHER_INFO.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-slate-950 font-black text-sm sm:text-base shadow-xl hover:brightness-110 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>اتصال تلفوني: {TEACHER_INFO.phone}</span>
              </a>

              <button
                onClick={onNavigateToSchedule}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0E223D] border border-[#D4AF37]/40 text-[#F3E5AB] hover:bg-[#122A4B] font-bold text-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>استعرض الجدول والـمواعيد</span>
              </button>
            </div>

            {/* Key Value Points */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E223D]/50 border border-[#D4AF37]/20">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>شرح مبسط للقواعد</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E223D]/50 border border-[#D4AF37]/20">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>متابعة وتقارير أسبوعية</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E223D]/50 border border-[#D4AF37]/20 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>تغطية البوكليت والنظام الجديد</span>
              </div>
            </div>

          </div>

          {/* Visual Poster & Emblem Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-[#0E223D] to-[#0A1628] border-2 border-[#D4AF37] p-3 shadow-2xl overflow-hidden group">
              
              {/* Gold Ribbon Tag */}
              <div className="absolute top-5 right-5 z-20 bg-[#D4AF37] text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>المقر الرسمي - فاقوس</span>
              </div>

              {/* Poster Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#D4AF37]/30">
                <img
                  src={heroPosterImg}
                  alt={TEACHER_INFO.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-80"></div>

                {/* Overlay Text */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#0A1628]/90 backdrop-blur-md border border-[#D4AF37]/40 space-y-1">
                  <span className="text-xs text-[#D4AF37] font-bold block">{TEACHER_INFO.city}</span>
                  <h3 className="text-base font-black text-white">{TEACHER_INFO.name}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{TEACHER_INFO.address}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
