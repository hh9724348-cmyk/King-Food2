import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menu';
import { formatPrice } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Brand Wordmark & Circular Logo */}
        <a
          href="#"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-orange-500/80 shadow-md shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
            <img
              src={RESTAURANT_INFO.logoUrl}
              alt="شعار كينغ فود"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback SVG container if image ever fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white transition-colors group-hover:text-orange-400">
              {RESTAURANT_INFO.name}
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-orange-500 uppercase font-sans">
              {RESTAURANT_INFO.nameEn}
            </span>
          </div>
        </a>

        {/* Zone 2: Single-line Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-300">
          <a
            href="#menu"
            className="transition-colors hover:text-orange-400 whitespace-nowrap shrink-0"
          >
            قائمة الوجبات
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-orange-400 whitespace-nowrap shrink-0"
          >
            كيفية الطلب
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-orange-400 whitespace-nowrap shrink-0"
          >
            لماذا كينغ فود؟
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-orange-400 whitespace-nowrap shrink-0"
          >
            اتصل بنا
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Button) + Contact Quick Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${RESTAURANT_INFO.phoneLocal}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3.5 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-orange-500/40 hover:text-white"
            title="اتصال مباشر"
          >
            <Phone className="h-3.5 w-3.5 text-orange-500" />
            <span className="tabular-nums font-mono text-xs">{RESTAURANT_INFO.phoneLocal}</span>
          </a>

          <motion.button
            key={cartCount}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600 whitespace-nowrap shrink-0"
            aria-label="فتح سلة الطلبات"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden xs:inline">السلة</span>
            {cartCount > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-orange-600 tabular-nums shadow-sm"
              >
                {cartCount}
              </motion.span>
            ) : null}
            {cartTotal > 0 && (
              <span className="hidden sm:inline-block border-r border-orange-400/50 pr-2 tabular-nums text-xs font-medium">
                {formatPrice(cartTotal)}
              </span>
            )}
          </motion.button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-xl border border-neutral-800 p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 hover:text-orange-400 transition-colors"
            >
              قائمة الوجبات
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 hover:text-orange-400 transition-colors"
            >
              كيفية الطلب
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 hover:text-orange-400 transition-colors"
            >
              لماذا كينغ فود؟
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 hover:text-orange-400 transition-colors"
            >
              اتصل بنا
            </a>
          </nav>
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>رقم الهاتف للطلب:</span>
            <a
              href={`tel:${RESTAURANT_INFO.phoneLocal}`}
              className="font-mono text-orange-400 font-bold tabular-nums"
            >
              {RESTAURANT_INFO.phoneLocal}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
