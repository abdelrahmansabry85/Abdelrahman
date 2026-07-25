import React from 'react';
import { BookOpen, Target, FileText, Users, Award } from 'lucide-react';

export const TeachingHighlights: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'تبسيط قواعد الجرامر العميقة',
      description: 'شرح القواعد المعقدة من خلال خرائط ذهنية مبتكرة وأمثلة حية تثبت في أذهان الطلاب بسهولة.',
    },
    {
      icon: Target,
      title: 'تركيز مكثف على الترجمة والقطعة',
      description: 'تدريب أسبوعي حقيقي على مهارات الفهم والترجمة والنصوص للتعامل الكفء مع أسئلة الامتحانات.',
    },
    {
      icon: FileText,
      title: 'مذكرات وشيتات تلخيص شاملة',
      description: 'كتيبات وملازم يدوية منسقة تغطي الكلمات والقواعد والأسئلة المتوقعة بنظام البوكليت والنظام الجديد.',
    },
    {
      icon: Users,
      title: 'متابعة أسبوعية وتقارير لأولياء الأمور',
      description: 'امتحانات تقييمية أسبوعية وتواصل مستمر مع أولياء الأمور لضمان الالتزام والتطور الدراسي.',
    },
  ];

  return (
    <section className="py-12 relative bg-[#070F1E]/80">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>منهجية التميز في التأسيس والتفوق</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            لماذا يختار الطلاب <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D4AF37]">مستر مصطفى مشالي؟</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            خبرة متكاملة وطريقة تدريس تناسب احتياجات طلاب المرحلة الإعدادية والثانوية (العام والأزهر والبكالوريا).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0E223D] border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-xl transition-all hover:-translate-y-1 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#F3E5AB]">{feat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
