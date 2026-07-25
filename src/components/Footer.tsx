import React from 'react';
import { TEACHER_INFO, emblemLogoImg } from '../data/schedules';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#050B16] border-t border-[#D4AF37]/30 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#D4AF37]/20">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] overflow-hidden">
                <img src={emblemLogoImg} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">
                  {TEACHER_INFO.name}
                </h3>
                <span className="text-xs text-[#D4AF37] font-bold">{TEACHER_INFO.title}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              المنصة الرسمية المعتمدة لاستعلام وحجز مواعيد دروس ومجموعات اللغة الإنجليزية للمرحلتين الإعدادية والثانوية (عام وأزهر وبكالوريا).
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <a href={`tel:${TEACHER_INFO.phone}`} className="flex items-center gap-1 hover:text-[#F3E5AB]">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="dir-ltr font-bold">{TEACHER_INFO.phone}</span>
              </a>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>فاقوس - شارع الدروس</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-[#F3E5AB]">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigateTab('hero')} className="hover:text-[#F3E5AB]">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('schedule')} className="hover:text-[#F3E5AB]">
                  جدول المواعيد
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ai')} className="hover:text-[#F3E5AB]">
                  المساعد الذكي
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('contact')} className="hover:text-[#F3E5AB]">
                  المقر والتواصل
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Reserve Button */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-[#F3E5AB]">الحجز والتواصل المباشر</h4>
            <p className="text-xs text-slate-400">احجز مكانك في مجموعتك الدراسية الآن عبر الواتساب:</p>
            <a
              href={`https://wa.me/${TEACHER_INFO.whatsappPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] text-slate-950 font-black text-xs shadow-lg hover:bg-[#20ba5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>تواصل واتساب مباشر</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© 2026 جميع الحقوق محفوظة لـ مستر مصطفى مشالي - معلم اللغة الإنجليزية</span>
          <span className="flex items-center gap-1 text-slate-400">
            TEACH • INSPIRE • EXCEL
          </span>
        </div>

      </div>
    </footer>
  );
};
