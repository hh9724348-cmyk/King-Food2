/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, OrderFormData, PlacedOrder } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { MobileCartBar } from './components/MobileCartBar';

const CART_STORAGE_KEY = 'king_food_cart_v1';

export default function App() {
  // Initialize cart from localStorage for great persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Derived counts and totals
  const { cartCount, cartTotal, cartItemsMap } = useMemo(() => {
    let count = 0;
    let total = 0;
    const map: Record<string, number> = {};

    for (const item of cart) {
      count += item.quantity;
      total += item.product.price * item.quantity;
      map[item.product.id] = item.quantity;
    }

    return { cartCount: count, cartTotal: total, cartItemsMap: map };
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmitted = (formData: OrderFormData) => {
    const newOrder: PlacedOrder = {
      orderId: `KF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('ar-DZ'),
      items: [...cart],
      total: cartTotal,
      customer: formData,
    };

    setPlacedOrder(newOrder);
    setIsCheckoutOpen(false);
    handleClearCart();
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with background image & circular logo */}
        <Hero onExploreMenu={scrollToMenu} />

        {/* 4 Menu Products Grid */}
        <MenuSection
          cartItemsMap={cartItemsMap}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* How It Works (Order in 3 steps) */}
        <HowItWorks />

        {/* Why Choose King Food */}
        <FeaturesSection />

        {/* Direct Contact & Details */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cart Button for Mobile (Respecting 15% sticky cap) */}
      <MobileCartBar
        cartCount={cartCount}
        total={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        total={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        total={cartTotal}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
        onNewOrder={() => {
          setPlacedOrder(null);
          scrollToMenu();
        }}
      />
    </div>
  );
}
