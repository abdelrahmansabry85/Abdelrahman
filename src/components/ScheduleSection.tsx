import React, { useState } from 'react';
import { SCHEDULES, TEACHER_INFO } from '../data/schedules';
import { Stage, ScheduleItem } from '../types';
import { Clock, Calendar, Phone, MessageCircle, BookOpen, Sparkles, Filter, CheckCircle } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<Stage>('all');

  const filteredSchedules = SCHEDULES.filter((item) => {
    if (selectedStage === 'all') return true;
    if (selectedStage === 'preparatory') return item.stage === 'preparatory';
    if (selectedStage === 'secondary') return item.stage === 'secondary';
    if (selectedStage === 'azhar') return item.stage === 'azhar' || item.gradeName.includes('أزهر') || item.gradeName.includes('بكالوريا');
    return true;
  });

  return (
    <section id="schedule" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>جدول مواعيد المجموعات للعام الدراسي 2026/2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            مواعيد دروس <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">مستر مصطفى مشالي</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            مواعيد منظمة للمراحل الإعدادية والثانوية (عام وأزهر وبكالوريا). يمكنك التواصل هاتفياً أو عبر الواتساب مباشرة للحجز والاستفسار.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#0E223D] p-2 rounded-2xl border border-[#D4AF37]/30 max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
              selectedStage === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-[#0A1628]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>كل المجموعات</span>
          </button>

          <button
            onClick={() => setSelectedStage('preparatory')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              selectedStage === 'preparatory'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-[#0A1628]'
            }`}
          >
            المرحلة الإعدادية
          </button>

          <button
            onClick={() => setSelectedStage('secondary')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              selectedStage === 'secondary'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-[#0A1628]'
            }`}
          >
            الثانوية العامة
          </button>

          <button
            onClick={() => setSelectedStage('azhar')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              selectedStage === 'azhar'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-[#0A1628]'
            }`}
          >
            البكالوريا والأزهر
          </button>
        </div>

        {/* Schedules Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((schedule) => {
            const whatsappMsg = `السلام عليكم مستر مصطفى مشالي، أود الاستفسار والحجز في مجموعة (${schedule.gradeName}) - مواعيد: ${schedule.days.join(" - ")} (${schedule.timeText})`;

            return (
              <div
                key={schedule.id}
                className="rounded-3xl bg-[#0E223D] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] p-6 shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  
                  {/* Top Badge & Grade Name */}
                  <div className="flex items-start justify-between gap-2 border-b border-[#D4AF37]/20 pb-3">
                    <div>
                      <span className="text-[11px] font-extrabold text-[#D4AF37] bg-[#0A1628] px-2.5 py-1 rounded-md border border-[#D4AF37]/30 inline-block mb-1.5">
                        {schedule.stage === 'preparatory' ? 'المرحلة الإعدادية' : 'المرحلة الثانوية'}
                      </span>
                      <h3 className="text-xl font-black text-white group-hover:text-[#F3E5AB] transition-colors">
                        {schedule.gradeName}
                      </h3>
                    </div>
                  </div>

                  {/* Schedule Details Text Block */}
                  <div className="space-y-2.5 text-xs text-slate-200">
                    
                    <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-bold">أيام الأسبوع:</span>
                      </div>
                      <span className="font-black text-white text-sm">{schedule.days.join(' - ')}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-bold">التوقيت:</span>
                      </div>
                      <span className="font-black text-[#F3E5AB] text-sm">{schedule.timeText}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#0A1628] border border-[#D4AF37]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-bold">تاريخ البداية:</span>
                      </div>
                      <span className="font-extrabold text-amber-300 text-xs">{schedule.startDateText}</span>
                    </div>

                    {schedule.description && (
                      <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                        {schedule.description}
                      </p>
                    )}

                  </div>
                </div>

                {/* Direct Action Buttons: Phone & WhatsApp */}
                <div className="pt-2 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={`https://wa.me/${TEACHER_INFO.whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>حجز واتساب</span>
                  </a>

                  <a
                    href={`tel:${TEACHER_INFO.phone}`}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال تلفوني</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* General Footer Note */}
        <div className="mt-10 p-4 rounded-2xl bg-[#0E223D] border border-[#D4AF37]/30 text-center space-y-2 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-[#F3E5AB] font-bold">
            للحجز والاستفسار يرجى الاتصال المباشر أو مراسلتنا عبر الواتساب على الرقم:
          </p>
          <div className="flex items-center justify-center gap-4 text-base font-black text-white dir-ltr">
            <a href={`tel:${TEACHER_INFO.phone}`} className="hover:text-[#D4AF37] transition-colors">
              {TEACHER_INFO.phone}
            </a>
          </div>
          <p className="text-[11px] text-slate-400">
            العنوان: {TEACHER_INFO.address} ({TEACHER_INFO.city})
          </p>
        </div>

      </div>
    </section>
  );
};
