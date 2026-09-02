'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductConfiguration } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';
import { calculateItemPrice } from '@/lib/pricing';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (config: ProductConfiguration) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'alta7_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to restore cart from localStorage:', e);
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Save to localStorage on items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addToCart = (config: ProductConfiguration) => {
    if (!config.model || !config.fabricId || !config.sizeId) return;

    const color = ALTA7_PRODUCT.colors.find((c) => c.id === config.colorId) || ALTA7_PRODUCT.colors[0];
    const fabric = ALTA7_PRODUCT.fabrics.find((f) => f.id === config.fabricId) || ALTA7_PRODUCT.fabrics[0];
    const print = ALTA7_PRODUCT.prints.find((p) => p.id === config.printId) || ALTA7_PRODUCT.prints[0];
    const size = ALTA7_PRODUCT.sizes.find((s) => s.id === config.sizeId) || null;

    const { unitPrice, totalPrice } = calculateItemPrice(config);

    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      configuration: { ...config },
      color,
      fabric,
      print,
      size,
      quantity: config.quantity,
      unitPrice,
      totalPrice,
      createdAt: Date.now(),
    };

    setItems((prev) => [newItem, ...prev]);
    setIsOpen(true); // Open drawer on add
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const configuration = { ...item.configuration, quantity };
          const { unitPrice, totalPrice } = calculateItemPrice(configuration);
          return { ...item, configuration, quantity, unitPrice, totalPrice };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
