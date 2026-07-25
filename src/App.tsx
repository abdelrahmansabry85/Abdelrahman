import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScheduleSection } from './components/ScheduleSection';
import { AiGrammarAssistant } from './components/AiGrammarAssistant';
import { TeachingHighlights } from './components/TeachingHighlights';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { TEACHER_INFO } from './data/schedules';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070F1E] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-slate-950">
      
      {/* Header Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="space-y-4">
        {/* Hero Section */}
        <HeroSection
          onNavigateToSchedule={() => {
            setActiveTab('schedule');
            document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Schedule & Timetable Portal */}
        <ScheduleSection />

        {/* AI English Assistant */}
        <AiGrammarAssistant />

        {/* Teaching Highlights */}
        <TeachingHighlights />

        {/* Venue & Contact Section */}
        <LocationContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigateTab={(tab) => {
        setActiveTab(tab);
        document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        {/* Scroll Top */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#0E223D] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
          title="للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Direct WhatsApp Floating CTA */}
        <a
          href={`https://wa.me/${TEACHER_INFO.whatsappPhone}?text=${encodeURIComponent("السلام عليكم مستر مصطفى مشالي، أود الاستفسار والحجز في مواعيد الدروس")}`}
          target="_blank"
          rel="noreferrer"
          className="relative group w-13 h-13 rounded-full bg-[#25D366] text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform p-3"
          title="حجز عبر الواتساب"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#070F1E] animate-ping"></span>
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>

    </div>
  );
}
