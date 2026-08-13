'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductConfiguration } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to restore cart from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items, isLoaded]);

  const addToCart = (config: ProductConfiguration) => {
    const color = ALTA7_PRODUCT.colors.find((c) => c.id === config.colorId) || ALTA7_PRODUCT.colors[0];
    const fabric = ALTA7_PRODUCT.fabrics.find((f) => f.id === config.fabricId) || ALTA7_PRODUCT.fabrics[0];
    const print = ALTA7_PRODUCT.prints.find((p) => p.id === config.printId) || ALTA7_PRODUCT.prints[0];
    const size = ALTA7_PRODUCT.sizes.find((s) => s.id === config.sizeId) || null;

    const unitPrice = ALTA7_PRODUCT.basePrice + (fabric.priceModifier || 0);
    const totalPrice = unitPrice * config.quantity;

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
          const totalPrice = item.unitPrice * quantity;
          return { ...item, quantity, totalPrice };
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
