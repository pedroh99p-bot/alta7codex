'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

// All 5 color base image paths to preload in browser memory
const PRELOAD_BASES = [
  '/products/tshirt/bases/cld-base-5-1_vqnc4y.webp', // Preta
  '/products/tshirt/bases/cld-base-2-2_x8oucf.webp', // Azul Marinho
  '/products/tshirt/bases/cld-base-4-3_x1e0bp.webp', // Vinho Bordô
  '/products/tshirt/bases/cld-base-3-4_fwq1du.webp', // Verde
  '/products/tshirt/bases/cld-base-1-5_a9gq5v.webp', // Branca
];

export const Preloader: React.FC = () => {
  const [curtainUp, setCurtainUp] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // JS Preload of all 5 t-shirt base color images
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
        <span className={styles.tagline}>FUTEBOL • PRAIA • RUA • RIO DE JANEIRO</span>

        {/* 04. Subtle Loading Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
};
