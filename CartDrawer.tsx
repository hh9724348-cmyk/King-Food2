import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Container (RTL: slides in smoothly from the right) */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-950">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-bold text-white">سلة طلباتك</h2>
                  {items.length > 0 && (
                    <motion.span
                      key={items.length}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-neutral-400 font-sans tabular-nums"
                    >
                      ({items.reduce((acc, i) => acc + i.quantity, 0)} عناصر)
                    </motion.span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="إغلاق السلة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <p className="text-base font-bold text-white mb-1">السلة فارغة حالياً</p>
                    <p className="text-xs text-neutral-400 max-w-xs mb-6">
                      تصفح قائمة الطعام واختر وجباتك المفضلة لتظهر هنا
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition-colors"
                    >
                      تصفح الوجبات
                    </motion.button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        key={item.product.id}
                        className="flex gap-4 p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.nameAr}
                          referrerPolicy="no-referrer"
                          className="h-20 w-20 rounded-lg object-cover bg-neutral-900 shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-white text-sm">{item.product.nameAr}</h4>
                              <span className="text-[11px] text-neutral-400 font-sans">
                                {item.product.nameEn}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                              title="حذف الوجبة"
                              aria-label="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 p-1">
                              <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="h-6 w-6 flex items-center justify-center rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700"
                                aria-label="إنقاص"
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <span className="min-w-6 text-center text-xs font-bold tabular-nums text-white">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="h-6 w-6 flex items-center justify-center rounded bg-orange-500 text-white hover:bg-orange-600"
                                aria-label="زيادة"
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>

                            <span className="text-sm font-black text-orange-400 tabular-nums">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer with Calculations and Proceed Button */}
              {items.length > 0 && (
                <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-neutral-400">
                      <span>المجموع الفرعي</span>
                      <span className="tabular-nums font-mono text-neutral-300">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>طريقة الدفع</span>
                      <span className="text-xs text-emerald-400 font-semibold">نقداً عند الاستلام</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800/80 flex justify-between items-baseline">
                      <span className="text-base font-bold text-white">المجموع الإجمالي</span>
                      <span className="text-xl font-black text-orange-500 tabular-nums">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={onProceedToCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition-colors"
                    >
                      <span>متابعة الطلب عبر الواتساب</span>
                      <ArrowLeft className="h-4 w-4" />
                    </motion.button>

                    <button
                      onClick={onClearCart}
                      className="w-full py-2 text-center text-xs text-neutral-500 hover:text-neutral-400 transition-colors"
                    >
                      تفريغ السلة بالكامل
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
