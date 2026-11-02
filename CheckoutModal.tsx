import React, { useState } from 'react';
import { X, MessageCircle, User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, OrderFormData } from '../types';
import { RESTAURANT_INFO } from '../data/menu';
import { formatPrice, generateWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderSubmitted: (formData: OrderFormData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onOrderSubmitted,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'يرجى إدخال الاسم الكامل';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف للتواصل';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'يرجى التأكد من صحة رقم الهاتف';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'يرجى إدخال عنوان التوصيل بالتفصيل';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const message = generateWhatsAppMessage(items, total, formData);
    const whatsappUrl = getWhatsAppUrl(RESTAURANT_INFO.phoneIntl, message);

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Notify parent to record order and show confirmation receipt
    onOrderSubmitted(formData);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with Fade Animation */}
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
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">إتمام الطلب عبر الواتساب</h3>
                    <p className="text-xs text-neutral-400">
                      سيتم توجيهك مباشرة لمحادثة كينغ فود
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Order Mini-Recap */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-neutral-400">
                    <span>الوجبات المحددة ({items.length}):</span>
                    <span className="font-bold text-white">
                      {items.map((i) => `${i.product.nameAr} (${i.quantity})`).join('، ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-800/80">
                    <span className="text-sm font-bold text-white">المجموع الإجمالي:</span>
                    <span className="text-lg font-black text-orange-500 tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Input: Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    الاسم الكامل <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="مثال: محمد بن علي"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full rounded-xl border bg-neutral-950 pr-10 pl-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.fullName ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Input: Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    رقم الهاتف (الجزائر) <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="06 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full rounded-xl border bg-neutral-950 pr-10 pl-3.5 py-2.5 text-sm text-white text-right placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.phone ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Input: Delivery Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    عنوان التوصيل <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute top-3 right-0 flex items-center pr-3.5 text-neutral-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="مثال: حي السلام، عمارة 4، الطابق 2، بجانب المسجد..."
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: undefined });
                      }}
                      className={`w-full rounded-xl border bg-neutral-950 pr-10 pl-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                        errors.address ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-neutral-800'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Input: Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    ملاحظات إضافية <span className="text-neutral-500 font-normal">(اختياري)</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute top-3 right-0 flex items-center pr-3.5 text-neutral-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="مثال: بدون مايونيز، صوص زيادة، صوص حار..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pr-10 pl-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-600/25 transition-colors disabled:opacity-50"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>إرسال الطلب عبر الواتساب الآن</span>
                  </motion.button>
                  <p className="mt-2 text-center text-[11px] text-neutral-400">
                    سيتم فتح تطبيق واتساب مباشرة مع رسالة مفصلة بالطلب لإرسالها بنقرة واحدة
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
