import React from 'react';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menu';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  return (
    <section className="relative overflow-hidden min-h-[580px] md:min-h-[660px] flex items-center justify-center border-b border-neutral-800">
      {/* Background Image with Slow Smooth Ken Burns Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          src="https://ik.imagekit.io/gwbbqzgwj/e17610bc8d53e36a4a69a68a9123976f.jpg"
          alt="خلفية مطعم كينغ فود"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center brightness-95 contrast-105"
        />
        {/* Soft elegant gradient scrims so the background photo is vivid while keeping text legible */}
        <div className="absolute inset-0 bg-neutral-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/25" />
      </div>

      {/* Hero Content with Staggered Entrance Animations */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center">
        {/* Circular Logo Showcase with Floating Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="relative group">
            {/* Animated Ambient Ring */}
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 blur-md"
            />
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-orange-500 bg-neutral-900 shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="شعار كينغ فود"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Clean Unboxed Metadata Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-orange-400"
        >
          <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
          <span>مطعم المأكولات السريعة والمشاوي الفاخرة</span>
          <span aria-hidden="true">·</span>
          <span>خدمة التوصيل السريع</span>
        </motion.div>

        {/* Headline with text-wrap balance */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight sm:leading-snug mb-5 [text-wrap:balance]"
        >
          طعم الملوك بانتظارك في <span className="text-orange-500 inline-block">كينغ فود</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 [text-wrap:balance]"
        >
          أشهى البرغر المحضر طازجاً، البيتزا الإيطالية المقرمشة، التاكوس المتبل والمشاوي الفاخرة على الفحم. اختر وجبتك المفضلة واطلبها مباشرة عبر الواتساب لتصلك ساخنة وسريعة!
        </motion.p>

        {/* Action CTAs with Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-orange-500/25 transition-colors hover:bg-orange-600"
          >
            <span>استكشف القائمة واطلب الآن</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={`https://wa.me/${RESTAURANT_INFO.phoneIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-base font-bold text-neutral-200 transition-colors hover:border-orange-500/50 hover:bg-neutral-800 hover:text-white"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span>طلب فوري عبر الواتساب</span>
          </motion.a>
        </motion.div>

        {/* Quiet Trust Attributes */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span>
            <span>وجبات طازجة 100%</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span>
            <span>الدفع نقداً عند الاستلام</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span>
            <span>هاتف مباشر: <span className="tabular-nums font-mono text-neutral-200">{RESTAURANT_INFO.phoneLocal}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};
