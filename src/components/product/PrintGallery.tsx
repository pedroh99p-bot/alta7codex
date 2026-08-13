'use client';

import React from 'react';
import { ALTA7_PRODUCT } from '@/data/product';
import styles from './PrintGallery.module.css';

interface PrintGalleryProps {
  onSelectPrint: (printId: string) => void;
}

export const PrintGallery: React.FC<PrintGalleryProps> = ({ onSelectPrint }) => {
  return (
    <section id="prints-gallery" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>COLEÇÃO EDITORIAL</span>
          <h2 className={styles.title}>COLEÇÃO DE ARTES</h2>
          <p className={styles.subtitle}>
            Artes exclusivas inspiradas na cultura de futebol de praia e rua do Rio de Janeiro.
          </p>
        </div>

        <div className={styles.grid}>
          {ALTA7_PRODUCT.prints.map((print) => (
            <div
              key={print.id}
              className={styles.card}
              onClick={() => onSelectPrint(print.id)}
            >
              <div className={styles.cardFrame}>
                <span className={styles.artCode}>{print.code}</span>
                <span className={styles.artTitle}>{print.title}</span>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.selectBtnText}>SELECIONAR ➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
