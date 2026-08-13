'use client';

import React from 'react';
import { SizeOption } from '@/types/product';
import styles from './SizeGuideModal.module.css';

interface SizeGuideModalProps {
  isOpen: boolean;
  sizes: SizeOption[];
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  sizes,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>GUIA DE MEDIDAS</h3>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar guia de medidas">
            ✕
          </button>
        </div>

        <p className={styles.subtitle}>
          Compare as medidas abaixo com uma camiseta sua em uma superfície plana (medidas em centímetros).
        </p>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TAMANHO</th>
                <th>TÓRAX (CM)</th>
                <th>ALTURA (CM)</th>
                <th>MANGA (CM)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((s) => (
                <tr key={s.id}>
                  <td className={styles.sizeLabel}>{s.label}</td>
                  <td>{s.measurements.chest} cm</td>
                  <td>{s.measurements.length} cm</td>
                  <td>{s.measurements.sleeve} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tipBox}>
          <span className={styles.tipTitle}>💡 Dica ALTA7:</span>
          <span>Se você prefere um caimento mais solto (street fit amplo), recomendamos escolher um tamanho acima.</span>
        </div>
      </div>
    </div>
  );
};
