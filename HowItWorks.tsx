import React from 'react';
import { ShoppingBag, MessageSquareText, Bike } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'اختر وجبتك المفضلة',
      desc: 'تصفح قائمة الطعام المتنوعة من البرغر، البيتزا، التاكوس والمشاوي وأضفها لسلة طلباتك.',
      icon: ShoppingBag,
    },
    {
      num: '02',
      title: 'أدخل بيانات التوصيل',
      desc: 'سجل اسمك ورقم هاتفك وعنوانك لتصلك وجبتك ساخنة في أسرع وقت ممكن.',
      icon: MessageSquareText,
    },
    {
      num: '03',
      title: 'تأكيد بالواتساب والدفع عند الاستلام',
      desc: 'يتم إرسال الطلب تلقائياً إلى واتساب المطعم، وسيقوم فريقنا بتأكيده وتوصيله لباب بيتك.',
      icon: Bike,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 border-t border-neutral-900 bg-neutral-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2">
            خطوات بسيطة وسريعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white [text-wrap:balance]">
            كيف تطلب من كينغ فود؟
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col items-start transition-colors hover:border-orange-500/40"
              >
                <div className="flex items-center justify-between w-full mb-5">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-neutral-700">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
