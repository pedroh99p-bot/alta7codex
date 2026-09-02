'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ALTA7_PRODUCT } from '@/data/product';
import styles from './Preloader.module.css';

const PRELOAD_BASES = ALTA7_PRODUCT.colors.flatMap((color) => [
  color.maleBaseImages.front,
  color.maleBaseImages.back,
  color.femaleBaseImages.front,
  color.femaleBaseImages.back,
]);

export const Preloader: React.FC = () => {
  const [curtainUp, setCurtainUp] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // JS Preload of all 10 t-shirt base color images
    PRELOAD_BASES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Start curtain lifting animation after preloading
    const timer = setTimeout(() => {
      setCurtainUp(true);
      const unmountTimer = setTimeout(() => setUnmounted(true), 650);
      return () => clearTimeout(unmountTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (unmounted) return null;

  return (
    <div
      className={`${styles.curtainContainer} ${curtainUp ? styles.curtainLift : ''}`}
      aria-hidden="true"
    >
      <div className={styles.content}>
        {/* 01. Central Emblem Spinning Clockwise around its axis */}
        <div className={styles.spinSymbolWrapper}>
          <Image
            src="/brand/symbol-alta7.webp"
            alt="ALTA7 Símbolo"
            width={80}
            height={80}
            priority
            className={styles.spinSymbol}
          />
        </div>

        {/* 02. Official ALTA7 Logo below */}
        <div className={styles.logoWrapper}>
          <Image
            src="/brand/logo-alta7.webp"
            alt="ALTA7 Logo"
            width={160}
            height={50}
            priority
            className={styles.logoImage}
          />
        </div>

        {/* 03. Preloader Tagline Phrase */}
        <span className={styles.tagline}>ALTINHA • PRAIA • RUA • RIO DE JANEIRO</span>

        {/* 04. Subtle Loading Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
};
