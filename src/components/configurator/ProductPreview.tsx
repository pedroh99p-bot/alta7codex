'use client';

import React from 'react';
import Image from 'next/image';
import { ColorOption, PrintOption, TShirtViewSide } from '@/types/product';
import styles from './ProductPreview.module.css';

interface ProductPreviewProps {
  color: ColorOption;
  print: PrintOption;
  viewSide: TShirtViewSide;
  onToggleSide?: (side: TShirtViewSide) => void;
  showTabs?: boolean;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  color,
  print,
  viewSide,
  onToggleSide,
  showTabs = true,
}) => {
  const isFront = viewSide === 'front';

  return (
    <div className={styles.container}>
      {/* Top View Toggle Tabs */}
      {showTabs && (
        <div className={styles.tabsContainer}>
          <button
            type="button"
            className={`${styles.tabButton} ${isFront ? styles.tabActive : ''}`}
            onClick={() => onToggleSide?.('front')}
            aria-label="Ver frente da camiseta"
          >
            FRENTE
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${!isFront ? styles.tabActive : ''}`}
            onClick={() => onToggleSide?.('back')}
            aria-label="Ver costas da camiseta"
          >
            COSTAS
          </button>
        </div>
      )}

      {/* 4:5 Aspect Ratio Canvas */}
      <div className={styles.canvas}>
        {/* Layer 1: Base T-Shirt Image (Cloudinary 4:5 Asset) */}
        <div className={styles.baseLayer}>
          <Image
            src={isFront ? color.baseImages.front : color.baseImages.back}
            alt={`Camiseta ALTA7 cor ${color.name} vista ${isFront ? 'frente' : 'costas'}`}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            priority
            className={styles.baseImage}
          />
        </div>

        {/* Layer 2: Front Chest Branding Overlay (Official Logo Image) */}
        {isFront && (
          <div className={styles.frontLogoLayer}>
            <div className={styles.brandLogoWrapper}>
              <Image
                src="/brand/logo-alta7.webp"
                alt="ALTA7 Logo"
                width={120}
                height={40}
                className={styles.brandLogoImage}
                priority
              />
            </div>
          </div>
        )}

        {/* Layer 3: Back Print Overlay */}
        {!isFront && (
          <>
            <div className={styles.collarSymbol}>
              <Image src="/brand/symbol-alta7.webp" alt="Symbol" width={14} height={14} />
            </div>
            <div className={styles.backPrintLayer}>
              <div className={styles.artworkOverlay}>
                <span className={styles.artCodeTag}>{print.code}</span>
                <span className={styles.artTitleTag}>{print.title}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
