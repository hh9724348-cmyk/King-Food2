import { CartItem, OrderFormData } from '../types';
import { RESTAURANT_INFO } from '../data/menu';

export function formatPrice(price: number): string {
  return price.toLocaleString('fr-DZ') + ' ' + RESTAURANT_INFO.currency;
}

export function generateWhatsAppMessage(items: CartItem[], total: number, customer: OrderFormData): string {
  const itemsText = items
    .map(
      (item) =>
        `▪️ *${item.product.nameAr}* (${item.product.nameEn}) × ${item.quantity} = ${formatPrice(
          item.product.price * item.quantity
        )}`
    )
    .join('\n');

  const notesSection = customer.notes.trim()
    ? `\n📝 *ملاحظات إضافية:* ${customer.notes.trim()}`
    : '';

  return `👑 *طلب جديد من كينغ فود (KING FOOD)* 👑

👤 *الاسم الكامل:* ${customer.fullName.trim()}
📞 *رقم الهاتف:* ${customer.phone.trim()}
📍 *عنوان التوصيل:* ${customer.address.trim()}${notesSection}

━━━━━━━━━━━━━━━
📋 *تفاصيل الوجبات المطلوبة:*
${itemsText}
━━━━━━━━━━━━━━━
💰 *المجموع الكلي:* *${formatPrice(total)}*
💵 *طريقة الدفع:* الدفع نقداً عند الاستلام

يرجى تأكيد استلام الطلب وتحديد الوقت التقريبي للتوصيل. شكراً لكم!`;
}

export function getWhatsAppUrl(phoneIntl: string, message: string): string {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;
}
