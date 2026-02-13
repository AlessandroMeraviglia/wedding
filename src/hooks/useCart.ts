'use client';

import { useState, useCallback, useEffect } from 'react';
import { Template, Addon, CartState } from '@/types';

const CART_STORAGE_KEY = 'wedding-cart';

function loadCart(): CartState {
  if (typeof window === 'undefined') return { template: null, selectedAddons: [], total: 0 };
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { template: null, selectedAddons: [], total: 0 };
}

function calculateTotal(template: Template | null, addons: Addon[]): number {
  const templatePrice = template?.price || 0;
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  return templatePrice + addonsTotal;
}

export function useCart() {
  const [cart, setCart] = useState<CartState>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const setTemplate = useCallback((template: Template) => {
    setCart(prev => ({
      ...prev,
      template,
      total: calculateTotal(template, prev.selectedAddons),
    }));
  }, []);

  const addAddon = useCallback((addon: Addon) => {
    setCart(prev => {
      if (prev.selectedAddons.find(a => a.id === addon.id)) return prev;
      const newAddons = [...prev.selectedAddons, addon];
      return {
        ...prev,
        selectedAddons: newAddons,
        total: calculateTotal(prev.template, newAddons),
      };
    });
  }, []);

  const removeAddon = useCallback((addonId: string) => {
    setCart(prev => {
      const newAddons = prev.selectedAddons.filter(a => a.id !== addonId);
      return {
        ...prev,
        selectedAddons: newAddons,
        total: calculateTotal(prev.template, newAddons),
      };
    });
  }, []);

  const toggleAddon = useCallback((addon: Addon) => {
    setCart(prev => {
      const exists = prev.selectedAddons.find(a => a.id === addon.id);
      const newAddons = exists
        ? prev.selectedAddons.filter(a => a.id !== addon.id)
        : [...prev.selectedAddons, addon];
      return {
        ...prev,
        selectedAddons: newAddons,
        total: calculateTotal(prev.template, newAddons),
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ template: null, selectedAddons: [], total: 0 });
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const itemCount = (cart.template ? 1 : 0) + cart.selectedAddons.length;

  return {
    cart,
    setTemplate,
    addAddon,
    removeAddon,
    toggleAddon,
    clearCart,
    itemCount,
  };
}
