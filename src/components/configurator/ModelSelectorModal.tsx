'use client';

import React from 'react';
import { ProductModelCode } from '@/types/product';
import styles from './ModelSelectorModal.module.css';

interface ModelSelectorModalProps {
  isOpen: boolean;
  selectedModel: ProductModelCode;
  onSelectModel: (model: ProductModelCode) => void;
  onClose: () => void;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({
  isOpen,
  selectedModel,
  onSelectModel,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>PASSO 1 DE 5</span>
          <h2 className={styles.title}>QUAL É O MODELO?</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <p className={styles.description}>
          Escolha a modelagem ideal para o seu corpo. Você poderá alterar essa opção a qualquer momento.
        </p>

        {/* Model Options Grid */}
        <div className={styles.grid}>
          {/* Female Model Option */}
          <button
            type="button"
            className={`${styles.optionCard} ${styles.femaleCard} ${
              selectedModel === 'female' ? styles.cardSelectedFemale : ''
            }`}
            onClick={() => {
              onSelectModel('female');
              onClose();
            }}
          >
            <div className={styles.iconCircleFemale}>♀</div>
            <div className={styles.cardContent}>
              <span className={styles.cardTitle}>FEMININO</span>
              <span className={styles.cardSubtitle}>Modelagem baby look / street fit feminino</span>
            </div>
            {selectedModel === 'female' && <span className={styles.checkMark}>✓</span>}
          </button>

          {/* Male Model Option */}
          <button
            type="button"
            className={`${styles.optionCard} ${styles.maleCard} ${
              selectedModel === 'male' ? styles.cardSelectedMale : ''
            }`}
            onClick={() => {
              onSelectModel('male');
              onClose();
            }}
          >
            <div className={styles.iconCircleMale}>♂</div>
            <div className={styles.cardContent}>
              <span className={styles.cardTitle}>MASCULINO</span>
              <span className={styles.cardSubtitle}>Modelagem tradicional street fit unisex</span>
            </div>
            {selectedModel === 'male' && <span className={styles.checkMark}>✓</span>}
          </button>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          className={styles.confirmButton}
          onClick={onClose}
        >
          CONTINUAR MONTAGEM ➔
        </button>
      </div>
    </div>
  );
};
