'use client';

import React from 'react';
import { ALTA7_PRODUCT } from '@/data/product';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import styles from './FabricShowcase.module.css';

interface FabricShowcaseProps {
  onGoToConfigurator: () => void;
}

export const FabricShowcase: React.FC<FabricShowcaseProps> = ({ onGoToConfigurator }) => {
  return (
    <section id="fabrics" className={styles.section}>
      <div className={styles.container}>
        {/* Section 03 Tecidos Header */}
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.numberBadge}>03</span>
            <h2 className={styles.title}>TECIDOS</h2>
          </div>
          <p className={styles.subtitle}>Escolha o caimento ideal.</p>
        </ScrollReveal>

        {/* 3 Fabric Cards List */}
        <div className={styles.fabricsList}>
          {ALTA7_PRODUCT.fabrics.map((fabric, idx) => (
            <ScrollReveal key={fabric.id} delayMs={idx * 100}>
              <div className={styles.fabricCard}>
                <div className={styles.textureSlot}>
                  <div className={`${styles.textureBg} ${styles[`bg_${fabric.id}`]}`} />
                </div>
                <div className={styles.cardDetails}>
                  <h3 className={styles.fabricName}>{fabric.name}</h3>
                  <p className={styles.fabricSub}>{fabric.tagline}</p>
                  <p className={styles.fabricDesc}>{fabric.description}</p>
                </div>
                <button
                  type="button"
                  className={styles.plusIconBtn}
                  onClick={onGoToConfigurator}
                  aria-label={`Escolher tecido ${fabric.name}`}
                >
                  +
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divider Progress Line */}
        <div className={styles.progressLineContainer}>
          <div className={styles.progressActive} />
          <div className={styles.progressInactive} />
          <div className={styles.progressInactive} />
        </div>

        {/* Section Detalhes da Peça */}
        <ScrollReveal>
          <div className={styles.detailsHeader}>
            <h2 className={styles.title}>DETALHES DA PEÇA</h2>
            <p className={styles.subtitle}>Acabamentos que fazem a diferença.</p>
          </div>
        </ScrollReveal>

        <div className={styles.detailsGrid}>
          <ScrollReveal delayMs={100}>
            <div className={styles.detailCard}>
              <div className={styles.detailThumb}>
                <div className={styles.detailPattern1} />
              </div>
              <h4 className={styles.detailTitle}>GOLA REFORÇADA</h4>
              <p className={styles.detailDesc}>Mais estrutura e durabilidade no uso diário.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <div className={styles.detailCard}>
              <div className={styles.detailThumb}>
                <div className={styles.detailPattern2} />
              </div>
              <h4 className={styles.detailTitle}>COSTURA DUPLA</h4>
              <p className={styles.detailDesc}>Mais resistência e acabamento streetwear premium.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={300}>
            <div className={styles.detailCard}>
              <div className={styles.detailThumb}>
                <div className={styles.detailPattern3} />
              </div>
              <h4 className={styles.detailTitle}>IMPRESSÃO PREMIUM</h4>
              <p className={styles.detailDesc}>Estampa em alta definição com toque zero.</p>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA Button */}
        <ScrollReveal delayMs={200}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={onGoToConfigurator}
          >
            <span>IR PARA MONTAGEM</span>
            <span>➔</span>
          </button>
        </ScrollReveal>

        <div className={styles.footerNote}>
          <span>⚽ ALTA7. FUTEBOL É LIBERDADE.</span>
        </div>
      </div>
    </section>
  );
};
