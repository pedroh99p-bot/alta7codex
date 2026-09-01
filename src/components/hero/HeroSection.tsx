'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onStartConfigurator: () => void;
}

const HERO_IMAGES = [
  { src: '/lifestyle/hero-lifestyle.jpg', alt: 'ALTA7 Lifestyle - Jogador na praia do Rio de costas com bola' },
  { src: '/lifestyle/lifestyle-1.jpg', alt: 'ALTA7 Lifestyle - Casal na praia no pôr do sol' },
  { src: '/lifestyle/lifestyle-2.webp', alt: 'ALTA7 Lifestyle - Jogadora na barraca de praia' },
  { src: '/lifestyle/lifestyle-3.webp', alt: 'ALTA7 Lifestyle - Modelo na praia no fim de tarde' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartConfigurator }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Lifestyle Media Slot Container (4:5 Ratio) */}
      <ScrollReveal>
        <div className={styles.mediaContainer}>
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className={`${styles.slide} ${idx === currentIndex ? styles.slideActive : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                className={styles.lifestyleImage}
              />
            </div>
          ))}

          <div className={styles.mediaOverlay} />

          {/* Top Overlay Location & Brand Tags */}
          <div className={styles.topOverlayLeft}>
            <span className={styles.tagSmall}>RIO DE JANEIRO</span>
            <span className={`${styles.tagSmall} ${styles.symbolRow}`}>
              BRASIL <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} />
            </span>
          </div>

          <div className={styles.topOverlayRight}>
            <span className={styles.tagSmall}>FUTEBOL</span>
            <span className={styles.tagSmall}>PRAIA</span>
            <span className={`${styles.tagSmall} ${styles.tagActive}`}>
              RUA
              <span className={styles.underlineYellow} />
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Progress Indicator Line Sync with Carousel */}
      <div className={styles.progressLineContainer}>
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={idx === currentIndex ? styles.progressActive : styles.progressInactive}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir para imagem ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hero Content & Headline */}
      <div className={styles.content}>
        <ScrollReveal delayMs={100}>
          <h1 className={styles.headline}>
            FEITA PRO JOGO.
            <br />
            FEITA PRA RUA.
          </h1>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <p className={styles.subtitle}>
            <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={14} height={14} className={styles.inlineSymbol} /> Monte a sua camiseta ALTA7
          </p>
        </ScrollReveal>

        {/* Main Action Button */}
        <ScrollReveal delayMs={200}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={onStartConfigurator}
            aria-label="Monte a sua camiseta ALTA7"
          >
            <span>MONTE A SUA</span>
            <span className={styles.ctaArrow}>➔</span>
          </button>
        </ScrollReveal>

        {/* Stats Grid Bar */}
        <ScrollReveal delayMs={250}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <svg
                className={styles.statIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>ARTES</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <svg
                className={styles.statIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>6</span>
                <span className={styles.statLabel}>CORES</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <svg
                className={styles.statIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>TECIDOS</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer Tagline Note */}
        <div className={styles.footerNote}>
          <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} className={styles.inlineSymbol} />
          <span> ALTA7. FUTEBOL É LIBERDADE.</span>
        </div>
      </div>
    </section>
  );
};
