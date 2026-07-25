import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Menu, X, Calendar, Bot } from 'lucide-react';
import { TEACHER_INFO, emblemLogoImg } from '../data/schedules';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'schedule', label: 'مواعيد الدروس', icon: Calendar },
    { id: 'ai', label: 'المساعد الذكي للإنجليزية', icon: Bot, badge: 'جديد' },
    { id: 'contact', label: 'المقر والتواصل', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A1628]/95 backdrop-blur-md border-b border-[#D4AF37]/30 text-white shadow-2xl">
      {/* Top info strip */}
      <div className="bg-gradient-to-r from-[#070F1E] via-[#0E223D] to-[#070F1E] py-2 px-4 border-b border-[#D4AF37]/20 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`tel:${TEACHER_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#F3E5AB] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold dir-ltr">{TEACHER_INFO.phone}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{TEACHER_INFO.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37]/15 text-[#F3E5AB] text-xs px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              باب الحجز مفتوح الآن
            </span>
            <a
              href={`https://wa.me/${TEACHER_INFO.whatsappPhone}?text=${encodeURIComponent("السلام عليكم مستر مصطفى، أود الاستفسار عن حجز مواعيد دروس اللغة الإنجليزية")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow-md transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Teacher Branding */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] shadow-lg group-hover:scale-105 transition-transform">
            <img
              src={emblemLogoImg}
              alt="شعار مستر مصطفى مشالي"
              className="w-full h-full object-cover rounded-full border-2 border-[#0A1628]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37] tracking-tight">
                {TEACHER_INFO.name}
              </h1>
            </div>
            <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-[#D4AF37]/20 to-[#0A1628] border border-[#D4AF37]/40 text-xs font-bold text-[#F3E5AB]">
              {TEACHER_INFO.title}
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E1E36]/80 p-1.5 rounded-2xl border border-[#D4AF37]/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-lg shadow-[#D4AF37]/20'
                    : 'text-slate-200 hover:text-[#F3E5AB] hover:bg-[#D4AF37]/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-[#D4AF37]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={`tel:${TEACHER_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-slate-950 font-black text-sm shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>اتصل الآن: {TEACHER_INFO.phone}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-[#0E1E36] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
          aria-label="القائمة"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070F1E] border-t border-[#D4AF37]/30 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-right font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950'
                    : 'text-slate-200 hover:bg-[#0E1E36]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-[#D4AF37]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-extrabold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col gap-2">
            <a
              href={`https://wa.me/${TEACHER_INFO.whatsappPhone}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] text-slate-950 font-bold"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل عبر الواتساب</span>
            </a>
            <a
              href={`tel:${TEACHER_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#D4AF37] text-slate-950 font-bold"
            >
              <Phone className="w-5 h-5" />
              <span>اتصال مباشر: {TEACHER_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
