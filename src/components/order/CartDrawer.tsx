'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  onProceedToReview: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToReview }) => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeCart} aria-modal="true" role="dialog">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleRow}>
            <h3 className={styles.title}>SUA SELEÇÃO ALTA7</h3>
            <span className={styles.badgeCount}>{totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'}</span>
          </div>
          <button type="button" className={styles.closeButton} onClick={closeCart} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className={styles.itemsList}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>👕</span>
              <p className={styles.emptyText}>Sua seleção ALTA7 está vazia.</p>
              <button
                type="button"
                className={styles.emptyCta}
                onClick={closeCart}
              >
                MONTE A SUA AGORA ➔
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.cartCard}>
                {/* Mini Preview Thumbnail */}
                <div className={styles.thumbWrapper} style={{ backgroundColor: item.color.hex }}>
                  <Image
                    src={item.color.baseImages.front}
                    alt={item.color.name}
                    width={70}
                    height={87}
                    className={styles.thumbImage}
                  />
                  <span className={styles.thumbPrintCode}>{item.print.code}</span>
                </div>

                {/* Info & Specs */}
                <div className={styles.cardDetails}>
                  <div className={styles.cardHeader}>
                    <span className={styles.modelTag}>
                      {item.configuration.model === 'female' ? '♀ FEMININO' : '♂ MASCULINO'}
                    </span>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remover item"
                    >
                      ✕
                    </button>
                  </div>

                  <h4 className={styles.itemTitle}>{item.print.code} / {item.print.title}</h4>

                  <div className={styles.specsRow}>
                    <span>{item.color.name}</span>
                    <span>•</span>
                    <span>{item.fabric.name}</span>
                    <span>•</span>
                    <span className={styles.sizeHighlight}>TAM {item.size?.label || '-'}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.qtyControl}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.itemSubtotal}>R$ {item.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total & Proceed CTA */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>SUBTOTAL SELEÇÃO</span>
              <span className={styles.totalValue}>R$ {totalPrice}</span>
            </div>

            <button
              type="button"
              className={styles.reviewButton}
              onClick={() => {
                closeCart();
                onProceedToReview();
              }}
            >
              <span>REVISAR E FINALIZAR</span>
              <span>➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
