'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import styles from './LookbookShowcase.module.css';

const LOOKBOOK_ITEMS = [
  {
    src: '/lifestyle/hero-lifestyle.jpg',
    title: 'FUTEBOL DE PRAIA',
    location: 'POSTO 9 • IPANEMA',
  },
  {
    src: '/lifestyle/lifestyle-1.jpg',
    title: 'FEITA PRA RUA',
    location: 'LAPA • RIO DE JANEIRO',
  },
  {
    src: '/lifestyle/lifestyle-2.webp',
    title: 'CULTURA STREETWEAR',
    location: 'COPACABANA • RIO',
  },
  {
    src: '/lifestyle/lifestyle-3.webp',
    title: 'ALTA7 LIFESTYLE',
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
              Estilo autoral testado e aprovado na rotina de quem vive o futebol de praia.
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
              <span>MONTE O SEU MODELO</span>
              <span>➔</span>
            </button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
