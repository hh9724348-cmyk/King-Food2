import React from 'react';
import { Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'مكونات طازجة يومياً',
      desc: 'نحرص على انتقاء أفضل المكونات واللحوم والخضار الطازجة لضمان نكهة ملكية لا تقاوم.',
      icon: Sparkles,
    },
    {
      title: 'سرعة التحضير والتوصيل',
      desc: 'يتم تجهيز وجباتك فور تأكيد الطلب لتصلك ساخنة وبأعلى درجات الجودة.',
      icon: Clock,
    },
    {
      title: 'سهولة الطلب عبر الواتساب',
      desc: 'بدون تعقيدات أو إنشاء حسابات، اطلب مباشرة عبر الواتساب وسيتولى فريقنا كل شيء.',
      icon: HeartHandshake,
    },
    {
      title: 'دفع آمن عند الاستلام',
      desc: 'عاين وجبتك أولاً وادفع نقداً بالدينار الجزائري عند باب منزلك بكل راحة واطمئنان.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2">
          التزامنا بالجودة
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white [text-wrap:balance]">
          لماذا يفضل زبائننا كينغ فود؟
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col items-start transition-colors hover:border-neutral-700"
            >
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
