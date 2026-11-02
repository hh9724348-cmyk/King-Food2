import React from 'react';
import { motion } from 'motion/react';
import { MENU_PRODUCTS } from '../data/menu';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { Flame } from 'lucide-react';

interface MenuSectionProps {
  cartItemsMap: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cartItemsMap,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <section id="menu" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mb-2 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-orange-500 uppercase tracking-widest">
          <Flame className="h-4 w-4" />
          <span>وجباتنا الرئيسية المحضرة يومياً</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight [text-wrap:balance]">
          قائمة طعام كينغ فود
        </h2>
        <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-lg mx-auto [text-wrap:balance]">
          اختر وجبتك المفضلة وأضفها إلى السلة لتجهيز طلبك فوراً وإرساله عبر الواتساب
        </p>
      </div>

      {/* 4-Item Product Grid with Staggered Entrance */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {MENU_PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <ProductCard
              product={product}
              quantityInCart={cartItemsMap[product.id] || 0}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
