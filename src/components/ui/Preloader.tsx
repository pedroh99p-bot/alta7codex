'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export const Preloader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Fast preloader - unmount quickly to prioritize performance
    const timer = setTimeout(() => {
      setLoaded(true);
      const hideTimer = setTimeout(() => setHidden(true), 300);
      return () => clearTimeout(hideTimer);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className={`${styles.overlay} ${loaded ? styles.fadeOut : ''}`} aria-hidden="true">
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Image
            src="/brand/logo-alta7.webp"
            alt="ALTA7 Logo"
            width={180}
            height={60}
            priority
            className={styles.logoImage}
          />
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
        <span className={styles.tagline}>FUTEBOL É LIBERDADE</span>
      </div>
    </div>
  );
};
