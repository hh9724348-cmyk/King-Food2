import React, { useState } from 'react';
import { Plus, Minus, Check, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 900);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 transition-colors duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/15"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.nameAr}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 text-center text-neutral-500">
            <UtensilsCrossed className="mb-2 h-10 w-10 text-orange-500/60" />
            <span className="text-sm font-medium text-neutral-400">{product.nameAr}</span>
          </div>
        )}

        {/* Subtle Dark Gradient Overlay at bottom for clean image separation */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />

        {/* Price Tag with subtle spring appearance */}
        <div className="absolute top-3 left-3 rounded-lg bg-neutral-950/85 px-3 py-1.5 backdrop-blur-md border border-neutral-800 text-sm font-extrabold text-orange-400 tabular-nums shadow-md">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Product Details Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-orange-400">
            {product.nameAr}
          </h3>
          <span className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            {product.nameEn}
          </span>
        </div>

        <p className="mb-5 flex-1 text-sm text-neutral-400 leading-relaxed">
          {product.description}
        </p>

        {/* Bottom Bar: Price & Action */}
        <div className="mt-auto pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-400">السعر الفردي</span>
            <span className="text-lg font-black text-white tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/50 bg-orange-500/10 p-1">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                aria-label={`إنقاص كمية ${product.nameAr}`}
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <AnimatePresence mode="wait">
                <motion.span
                  key={quantityInCart}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-7 text-center font-bold text-orange-400 tabular-nums text-sm inline-block"
                >
                  {quantityInCart}
                </motion.span>
              </AnimatePresence>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white transition-colors hover:bg-orange-600"
                aria-label={`زيادة كمية ${product.nameAr}`}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleAdd}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-md transition-colors duration-200 ${
                isAddedFeedback
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>أضف إلى السلة</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
