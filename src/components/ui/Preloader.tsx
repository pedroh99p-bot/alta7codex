'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

// All 10 color base image paths (Front & Back for 5 colors) to preload in browser memory
const PRELOAD_BASES = [
  // Preta (Front & Back)
  '/products/tshirt/bases/niw8pljgeipbfkswviaz_a5ysmn.webp',
  '/products/tshirt/bases/czvtrkizefiba6icnaf2_qrczqg.webp',
  // Branca (Front & Back)
  '/products/tshirt/bases/nedb4dhcvjg442rkfqap_tsslk4.webp',
  '/products/tshirt/bases/jobypfygnjsamfqibr5y_wteddo.webp',
  // Azul Marinho (Front & Back)
  '/products/tshirt/bases/msremr9sm5zktxopotbp_gvrpx5.webp',
  '/products/tshirt/bases/wygnf5ayrmhur0kzusby_bqppvk.webp',
  // Vinho Bordô (Front & Back)
  '/products/tshirt/bases/hw82wxjq2uq55mexdrea_djstiq.webp',
  '/products/tshirt/bases/l0iiziafhh9lbht6nuxb_ytoz59.webp',
  // Verde (Front & Back)
  '/products/tshirt/bases/rkennsuvmen4znhmhgyz_to913v.webp',
  '/products/tshirt/bases/l1ulb3h8des7eidcrgql_sxeckr.webp',
];

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
        <span className={styles.tagline}>FUTEBOL • PRAIA • RUA • RIO DE JANEIRO</span>

        {/* 04. Subtle Loading Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
};
