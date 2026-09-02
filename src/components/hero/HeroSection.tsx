'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ALTA7_HERO_SLIDES } from '@/data/campaign';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onStartConfigurator: () => void;
  startSlideshow?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartConfigurator,
  startSlideshow = true,
}) => {
  const slides = useMemo(() => ALTA7_HERO_SLIDES, []);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!startSlideshow || slides.length <= 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let interval: number | null = null;
    const delayTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % slides.length);
      }, 2000);
    }, 2000);

    return () => {
      window.clearTimeout(delayTimer);
      if (interval) window.clearInterval(interval);
    };
  }, [slides.length, startSlideshow]);

  return (
    <section className={styles.hero}>
      {/* Lifestyle Cover Media Slot Container (4:5 Ratio) */}
      <ScrollReveal>
        <div className={styles.mediaContainer}>
          {slides.map((slide, index) => (
            <Image
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              preload={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={`${styles.lifestyleImage} ${index === activeSlide ? styles.lifestyleImageActive : ''}`}
              style={{ objectPosition: slide.objectPosition }}
            />
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
            <span className={styles.tagSmall}>ALTINHA</span>
            <span className={styles.tagSmall}>PRAIA</span>
            <span className={`${styles.tagSmall} ${styles.tagActive}`}>
              {slides[activeSlide]?.title || 'RUA'}
              <span className={styles.underlineYellow} />
            </span>
          </div>

          {/* Prominent Editorial Watermark Text Overlay (Non-obstructive) */}
          <div className={styles.watermarkEditorial}>
            <span>ALTINHA</span>
            <span className={styles.watermarkYellow}>RIO</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Hero Content & Headline */}
      <div className={styles.content}>
        <ScrollReveal delayMs={100}>
          <h1 className={styles.headline}>
            FEITA PRA ALTINHA.
            <br />
            FEITA PRA RUA.
          </h1>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <p className={styles.subtitle}>
            <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={14} height={14} className={styles.inlineSymbol} /> Monte a sua camiseta ALTA7 autoral
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
                <span className={styles.statNumber}>5</span>
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
          <span> ALTA7 • CULTURA DA ALTINHA RIO DE JANEIRO</span>
        </div>
      </div>
    </section>
  );
};
