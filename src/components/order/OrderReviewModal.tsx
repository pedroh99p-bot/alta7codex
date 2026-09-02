'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { generateWhatsAppUrl } from '@/lib/whatsapp';
import styles from './OrderReviewModal.module.css';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  onClose,
  onEdit,
}) => {
  const { items, totalPrice } = useCart();

  if (!isOpen) return null;

  const whatsappUrl = generateWhatsAppUrl(items);

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Back Link */}
        <button type="button" className={styles.backButton} onClick={onClose}>
          ← REVISÃO DO PEDIDO
        </button>

        {/* Headline */}
        <div className={styles.titleGroup}>
          <h2 className={styles.headline}>
            {items.length > 1 ? 'SEU PEDIDO ESTÁ PRONTO.' : 'SUA ALTA7 ESTÁ PRONTA.'}
          </h2>
          <p className={styles.subtitle}>
            Revise sua configuração abaixo antes de finalizar o pedido pelo WhatsApp.
          </p>
        </div>

        {/* Items List */}
        <div className={styles.itemsContainer}>
          {items.map((item) => {
            const baseImages = item.configuration.model === 'female'
              ? item.color.femaleBaseImages
              : item.color.maleBaseImages;

            return (
            <div key={item.id} className={styles.reviewCard}>
              {/* Dual View Side-by-side T-Shirt Preview */}
              <div className={styles.dualPreviewRow}>
                <div className={styles.previewBox}>
                  <Image
                    src={baseImages.front}
                    alt="Frente"
                    fill
                    sizes="(max-width: 430px) 44vw, 180px"
                    className={styles.previewImg}
                  />
                  <span className={styles.viewLabel}>FRENTE</span>
                </div>
                <div className={styles.previewBox}>
                  <Image
                    src={baseImages.back}
                    alt="Costas"
                    fill
                    sizes="(max-width: 430px) 44vw, 180px"
                    className={styles.previewImg}
                  />
                  <span className={styles.viewLabel}>COSTAS ({item.print.code})</span>
                </div>
              </div>

              {/* Specs Table */}
              <div className={styles.specsList}>
                <div className={styles.specRow}>
                  <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                  </svg>
                  <span className={styles.specText}>{item.print.code} / {item.print.title}</span>
                </div>

                <div className={styles.specRow}>
                  <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                  </svg>
                  <span className={styles.specText}>Cor: {item.color.name}</span>
                </div>

                <div className={styles.specRow}>
                  <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className={styles.specText}>Tecido: {item.fabric.name}</span>
                </div>

                <div className={styles.specRow}>
                  <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="6" y1="6" x2="6" y2="10" />
                    <line x1="10" y1="6" x2="10" y2="10" />
                    <line x1="14" y1="6" x2="14" y2="10" />
                    <line x1="18" y1="6" x2="18" y2="10" />
                  </svg>
                  <span className={styles.specText}>Tamanho: {item.size?.label || 'Não especificado'}</span>
                </div>

                <div className={styles.specRow}>
                  <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  </svg>
                  <span className={styles.specText}>Quantidade: {item.quantity}</span>
                </div>

                <div className={styles.specRowModel}>
                  <span className={styles.modelTagLabel}>
                    Modelagem: {item.configuration.model === 'female' ? 'Feminino ♀' : 'Masculino ♂'}
                  </span>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Total & Action Buttons */}
        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>TOTAL</span>
            <span className={styles.totalValue}>R$ {totalPrice}</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappPrimaryBtn}
          >
            <span>FINALIZAR NO WHATSAPP</span>
            <span className={styles.arrowIcon}>↗</span>
          </a>

          <button
            type="button"
            className={styles.editSecondaryBtn}
            onClick={() => {
              onClose();
              onEdit();
            }}
          >
            Editar configuração ✏
          </button>

          <div className={styles.modalFooterNote}>
            <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} />
            <span>ALTA7. ALTINHA É LIBERDADE.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
