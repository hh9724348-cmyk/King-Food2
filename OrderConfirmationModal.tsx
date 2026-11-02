import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Phone, Copy, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlacedOrder } from '../types';
import { RESTAURANT_INFO } from '../data/menu';
import { formatPrice, generateWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  const [copied, setCopied] = useState(false);

  const orderMessage = order ? generateWhatsAppMessage(order.items, order.total, order.customer) : '';
  const whatsappUrl = order ? getWhatsAppUrl(RESTAURANT_INFO.phoneIntl, orderMessage) : '';

  const handleCopy = () => {
    if (!orderMessage) return;
    navigator.clipboard.writeText(orderMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-8 p-6 text-center"
            >
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/10"
              >
                <CheckCircle2 className="h-8 w-8" />
              </motion.div>

              <h3 className="text-2xl font-black text-white mb-1">
                تم تجهيز طلبك بنجاح!
              </h3>
              <p className="text-xs text-neutral-400 mb-5">
                رقم الطلب المرجعي: <span className="font-mono text-orange-400 font-bold">{order.orderId}</span>
              </p>

              {/* Quick Notice if WhatsApp didn't open */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 mb-5 text-right space-y-2">
                <p className="text-xs font-semibold text-emerald-300">
                  💡 إذا لم يفتح تطبيق واتساب تلقائياً، اضغط على الزر الأخضر بالأسفل للتواصل المباشر مع المطعم وتأكيد طلبك.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 mb-5 text-right space-y-3">
                <div className="border-b border-neutral-800 pb-2">
                  <span className="text-[11px] text-neutral-400 block mb-1">بيانات العميل:</span>
                  <p className="text-xs text-white font-bold">{order.customer.fullName} - {order.customer.phone}</p>
                  <p className="text-xs text-neutral-300 mt-0.5">{order.customer.address}</p>
                </div>

                <div className="space-y-1.5 py-1">
                  <span className="text-[11px] text-neutral-400 block">الوجبات:</span>
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs">
                      <span className="text-white">
                        {item.product.nameAr} × <span className="font-mono text-orange-400 font-bold">{item.quantity}</span>
                      </span>
                      <span className="font-mono tabular-nums text-neutral-300">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">المجموع الإجمالي:</span>
                  <span className="text-lg font-black text-orange-400 tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-2.5">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>فتح محادثة الواتساب وتأكيد الطلب</span>
                </motion.a>

                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ نص الطلب'}</span>
                  </motion.button>

                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${RESTAURANT_INFO.phoneLocal}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-orange-500" />
                    <span>اتصال بالمطعم</span>
                  </motion.a>
                </div>

                <button
                  onClick={onNewOrder}
                  className="w-full pt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-400 hover:text-orange-400 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>طلب وجبات إضافية</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
