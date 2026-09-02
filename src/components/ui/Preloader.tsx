'use client';

import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { ALTA7_PRODUCT } from '@/data/product';
import styles from './Preloader.module.css';

const PRELOAD_BASES = ALTA7_PRODUCT.colors.flatMap((color) => [
  color.maleBaseImages.front,
  color.maleBaseImages.back,
  color.femaleBaseImages.front,
  color.femaleBaseImages.back,
]);

interface PreloaderProps {
  onDone?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const [curtainUp, setCurtainUp] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    let topLockFrame: number | undefined;

    const restorePageTop = (durationMs = 0) => {
      if (topLockFrame) {
        window.cancelAnimationFrame(topLockFrame);
      }
      const startedAt = window.performance.now();

      const tick = () => {
        window.scrollTo(0, 0);
        if (window.performance.now() - startedAt < durationMs) {
          topLockFrame = window.requestAnimationFrame(tick);
        }
      };

      tick();
    };

    const resetTopLock = () => {
      if (topLockFrame) {
        window.cancelAnimationFrame(topLockFrame);
        topLockFrame = undefined;
      }
      window.scrollTo(0, 0);
    };

    const releaseScrollLock = () => {
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };

    if (!window.location.hash) {
      window.history.scrollRestoration = 'manual';
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      restorePageTop();
    }

    // JS Preload of all 10 t-shirt base color images
    PRELOAD_BASES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let unmountTimer: ReturnType<typeof window.setTimeout> | undefined;

    // Start curtain lifting animation after preloading
    const timer = setTimeout(() => {
      if (!window.location.hash) {
        restorePageTop();
      }
      setCurtainUp(true);
      unmountTimer = setTimeout(() => {
        setUnmounted(true);
        onDone?.();
        if (!window.location.hash) {
          releaseScrollLock();
          restorePageTop(1200);
        } else {
          releaseScrollLock();
        }
      }, 650);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (unmountTimer) clearTimeout(unmountTimer);
      resetTopLock();
      releaseScrollLock();
    };
  }, [onDone]);

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
