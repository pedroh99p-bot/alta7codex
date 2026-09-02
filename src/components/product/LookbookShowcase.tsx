'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import styles from './LookbookShowcase.module.css';

const LOOKBOOK_ITEMS = [
  {
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_1_h1wanp.webp',
    title: 'CULTURA DA ALTINHA',
    location: 'POSTO 9 • IPANEMA',
  },
  {
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_2_xcd3gz.webp',
    title: 'FEITA PRA RUA',
    location: 'LAPA • RIO DE JANEIRO',
  },
  {
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_djf2hr.webp',
    title: 'STREETWEAR AUTORAL',
    location: 'ARPOADOR • RIO',
  },
];

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
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <ScrollReveal key={item.src} delayMs={idx * 100} className={styles.cardWrapper}>
              <div className={styles.card}>
                <div className={styles.imageSlot}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 430px) 80vw, 320px"
                    className={styles.image}
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
