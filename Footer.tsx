import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { MessageCircle, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-orange-500/60 bg-neutral-900 shrink-0">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="شعار كينغ فود"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="text-base font-bold text-white block">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-xs font-semibold text-orange-500 font-sans">
                {RESTAURANT_INFO.nameEn}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs font-medium text-neutral-300">
            <a href="#menu" className="hover:text-orange-400 transition-colors">
              قائمة الطعام
            </a>
            <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
              كيفية الطلب
            </a>
            <a href="#features" className="hover:text-orange-400 transition-colors">
              لماذا نحن
            </a>
            <a href="#contact" className="hover:text-orange-400 transition-colors">
              اتصل بنا
            </a>
          </div>

          {/* Contact Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.phoneIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono tabular-nums" dir="ltr">0673883349</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneLocal}`}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-orange-400" />
              <span>اتصال</span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center sm:text-right">
          <p>© {new Date().getFullYear()} مطعم كينغ فود (KING FOOD). جميع الحقوق محفوظة.</p>
          <p className="text-[11px] text-neutral-400">
            العملة المعتمدة: الدينار الجزائري (DZD) · الدفع عند الاستلام
          </p>
        </div>
      </div>
    </footer>
  );
};
