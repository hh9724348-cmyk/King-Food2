import React from 'react';
import { MessageCircle, Phone, Clock, Coins, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle orange ambient glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Right Column (Arabic RTL: Start) */}
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2">
                تواصل مباشر
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 [text-wrap:balance]">
                نحن في خدمتك دائماً في كينغ فود
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 [text-wrap:balance]">
                هل لديك استفسار أو ترغب في حجز وجبات خاصة؟ تواصل معنا مباشرة عبر الواتساب أو اتصل برقم الهاتف وسنكون سعداء بخدمتك فوراً.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
                  <Coins className="h-5 w-5 text-orange-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-neutral-400 block">العملة المعتمدة</span>
                    <span className="text-sm font-bold text-white">الدينار الجزائري (DZD)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-neutral-400 block">طريقة الدفع</span>
                    <span className="text-sm font-bold text-white">نقداً عند الاستلام</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: Direct Action Contact Cards */}
            <div className="flex flex-col gap-4">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 font-semibold block">واتساب كينغ فود</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-white tabular-nums" dir="ltr">
                      +{RESTAURANT_INFO.phoneIntl}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 group-hover:underline">
                  مراسلة فورية
                </span>
              </a>

              {/* Direct Phone Call Card */}
              <a
                href={`tel:${RESTAURANT_INFO.phoneLocal}`}
                className="group flex items-center justify-between p-5 rounded-2xl border border-orange-500/30 bg-orange-950/20 hover:bg-orange-950/40 hover:border-orange-500/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs text-orange-400 font-semibold block">الاتصال المباشر</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-white tabular-nums" dir="ltr">
                      {RESTAURANT_INFO.phoneLocal}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-400 group-hover:underline">
                  اتصال الآن
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
