import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../utils/whatsapp';

interface MobileCartBarProps {
  cartCount: number;
  total: number;
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({
  cartCount,
  total,
  onOpenCart,
}) => {
  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 inset-x-4 z-30 sm:hidden"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onOpenCart}
            className="w-full flex items-center justify-between gap-3 rounded-2xl bg-orange-500 px-4 py-3 text-white shadow-2xl shadow-orange-500/40 ring-1 ring-orange-400/50"
            aria-label="عرض سلة الطلبات"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-orange-600 tabular-nums shadow-sm"
                >
                  {cartCount}
                </motion.span>
              </div>
              <span className="text-sm font-bold">عرض سلة الطلبات</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black tabular-nums font-mono">
                {formatPrice(total)}
              </span>
              <ArrowLeft className="h-4 w-4" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
