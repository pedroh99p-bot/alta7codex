'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ALTA7_LOOKBOOK_ITEMS } from '@/data/campaign';
import styles from './LookbookShowcase.module.css';

interface LookbookShowcaseProps {
  onGoToConfigurator?: () => void;
}

export const LookbookShowcase: React.FC<LookbookShowcaseProps> = ({ onGoToConfigurator }) => {
  return (
    <section id="lookbook" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>CAMPANHA RIO DE JANEIRO</span>
            <h2 className={styles.title}>ALTA7 NA PRAIA & NA RUA</h2>
            <p className={styles.subtitle}>
              Estilo autoral testado e aprovado na rotina de quem vive a altinha.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Rail */}
        <div className={styles.rail}>
          {ALTA7_LOOKBOOK_ITEMS.map((item, idx) => (
            <ScrollReveal key={item.src} delayMs={idx * 100} className={styles.cardWrapper}>
              <div className={styles.card}>
                <div className={styles.imageSlot}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 430px) 80vw, 320px"
                    className={styles.image}
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className={styles.overlay} />
                  <div className={styles.cardBadge}>
                    <span className={styles.locationText}>{item.location}</span>
                    <span className={styles.titleText}>{item.title}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {onGoToConfigurator && (
          <ScrollReveal delayMs={200}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={onGoToConfigurator}
            >
              <span>MONTE SUA CAMISA</span>
              <span>➔</span>
            </button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
