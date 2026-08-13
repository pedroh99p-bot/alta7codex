'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onStartConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartConfigurator }) => {
  return (
    <section className={styles.hero}>
      {/* Lifestyle Media Slot Container */}
      <div className={styles.mediaContainer}>
        {/* Cloudinary Hero Banner / Lifestyle Image */}
        <Image
          src="/lifestyle/hero-lifestyle.jpg"
          alt="ALTA7 Lifestyle - Player on Rio Beach with ALTA7 T-Shirt"
          fill
          priority
          className={styles.lifestyleImage}
        />
        <div className={styles.mediaOverlay} />

        {/* Top Overlay Location & Brand Tags */}
        <div className={styles.topOverlayLeft}>
          <span className={styles.tagSmall}>RIO DE JANEIRO</span>
          <span className={styles.tagSmall}>BRASIL ⚽</span>
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

      {/* Progress Indicator Line */}
      <div className={styles.progressLineContainer}>
        <div className={styles.progressActive} />
        <div className={styles.progressInactive} />
        <div className={styles.progressInactive} />
        <div className={styles.progressInactive} />
      </div>

      {/* Hero Content & Headline */}
      <div className={styles.content}>
        <h1 className={styles.headline}>
          FEITA PRO JOGO.
          <br />
          FEITA PRA RUA.
        </h1>

        <p className={styles.subtitle}>
          <span className={styles.ballIcon}>⚽</span> Monte a sua camiseta ALTA7
        </p>

        {/* Main Action Button */}
        <button
          type="button"
          className={styles.ctaButton}
          onClick={onStartConfigurator}
          aria-label="Monte a sua camiseta ALTA7"
        >
          <span>MONTE A SUA</span>
          <span className={styles.ctaArrow}>➔</span>
        </button>

        {/* Stats Grid Bar */}
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
              <span className={styles.statNumber}>9</span>
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
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>TECIDOS</span>
            </div>
          </div>
        </div>

        {/* Footer Tagline Note */}
        <div className={styles.footerNote}>
          <span>⚽ ALTA7. FUTEBOL É LIBERDADE.</span>
        </div>
      </div>
    </section>
  );
};
