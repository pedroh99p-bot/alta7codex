'use client';

import React from 'react';
import { ProductModelCode, SubModelCode } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';
import styles from './ModelSelectorModal.module.css';

interface ModelSelectorModalProps {
  isOpen: boolean;
  selectedModel: ProductModelCode;
  selectedSubModel: SubModelCode;
  onSelectModel: (model: ProductModelCode, subModel: SubModelCode) => void;
  onClose: () => void;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({
  isOpen,
  selectedModel,
  selectedSubModel,
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
          <h2 className={styles.title}>MODELAGEM & CORTE</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <p className={styles.description}>
          Escolha a modelagem e o tipo de corte ideal para o seu estilo.
        </p>

        {/* Model Options Grid */}
        <div className={styles.grid}>
          {/* Male Section */}
          <div className={styles.genderSection}>
            <div className={styles.genderTitle}>
              <span className={styles.iconCircleMale}>♂</span> MASCULINO (R$ 100 - R$ 120)
            </div>
            <div className={styles.subGrid}>
              {ALTA7_PRODUCT.maleSubModels.map((sub) => {
                const isSelected = selectedModel === 'male' && selectedSubModel === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    className={`${styles.optionCard} ${styles.maleCard} ${isSelected ? styles.cardSelectedMale : ''}`}
                    onClick={() => {
                      onSelectModel('male', sub.id);
                      onClose();
                    }}
                  >
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>{sub.name.toUpperCase()}</span>
                      <span className={styles.cardSubtitle}>{sub.tagline}</span>
                    </div>
                    {isSelected && <span className={styles.checkMark}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Female Section */}
          <div className={styles.genderSection}>
            <div className={styles.genderTitle}>
              <span className={styles.iconCircleFemale}>♀</span> FEMININO (R$ 80 - R$ 100)
            </div>
            <div className={styles.subGrid}>
              {ALTA7_PRODUCT.femaleSubModels.map((sub) => {
                const isSelected = selectedModel === 'female' && selectedSubModel === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    className={`${styles.optionCard} ${styles.femaleCard} ${isSelected ? styles.cardSelectedFemale : ''}`}
                    onClick={() => {
                      onSelectModel('female', sub.id);
                      onClose();
                    }}
                  >
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>{sub.name.toUpperCase()}</span>
                      <span className={styles.cardSubtitle}>{sub.tagline}</span>
                    </div>
                    {isSelected && <span className={styles.checkMark}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
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
