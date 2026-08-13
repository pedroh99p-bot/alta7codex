'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandRow}>
          <Image
            src="/brand/logo-alta7.webp"
            alt="ALTA7"
            width={140}
            height={45}
            className={styles.logoImage}
          />
          <p className={styles.tagline}>FUTEBOL • PRAIA • RUA • RIO DE JANEIRO</p>
        </div>

        <div className={styles.linksRow}>
          <a href="#configurator" className={styles.link}>Configurador</a>
          <a href="#fabrics" className={styles.link}>Tecidos</a>
          <a href="#prints-gallery" className={styles.link}>Artes</a>
          <a href="#faq" className={styles.link}>FAQ</a>
        </div>

        <div className={styles.copyRow}>
          <span>© {new Date().getFullYear()} ALTA7. Todos os direitos reservados.</span>
          <span className={styles.motto}>
            <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} className={styles.inlineSymbol} /> ALTA7. FUTEBOL É LIBERDADE.
          </span>
        </div>
      </div>
    </footer>
  );
};
