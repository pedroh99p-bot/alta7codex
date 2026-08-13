'use client';

import React from 'react';
import { ALTA7_PRODUCT } from '@/data/product';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import styles from './PrintGallery.module.css';

interface PrintGalleryProps {
  onSelectPrint: (printId: string) => void;
}

export const PrintGallery: React.FC<PrintGalleryProps> = ({ onSelectPrint }) => {
  return (
    <section id="prints-gallery" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>COLEÇÃO EDITORIAL</span>
            <h2 className={styles.title}>COLEÇÃO DE ARTES</h2>
            <p className={styles.subtitle}>
              Artes exclusivas inspiradas na cultura de futebol de praia e rua do Rio de Janeiro.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {ALTA7_PRODUCT.prints.map((print, idx) => (
            <ScrollReveal key={print.id} delayMs={(idx % 3) * 100}>
              <div
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
