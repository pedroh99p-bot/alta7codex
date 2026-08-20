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

  // Determine front logo artwork (White PNG for dark shirts, Black WebP for white shirt)
  const isWhiteShirt = color.id === 'branca';
  const frontLogoSrc = isWhiteShirt
    ? '/brand/front-logo-black.webp'
    : '/brand/front-logo-white.png';

  // Determine back artwork PNG
  const backArtworkSrc = isWhiteShirt
    ? print.overlayImageBackBlack || print.overlayImageBack
    : print.overlayImageBackWhite || print.overlayImageBack;

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

      {/* 4:5 Aspect Ratio Canvas (1122x1402px) */}
      <div className={styles.canvas}>
        {/* Collar View Text Tag (FRENTE / COSTAS) */}
        <div className={styles.collarViewTag}>
          {isFront ? 'FRENTE' : 'COSTAS'}
        </div>

        {/* Layer 1: Base T-Shirt Image (Cloudinary 4:5 Asset - Front or Back) */}
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

        {/* Layer 2: Front Chest Branding Artwork (Reduced 15% & Moved 15% Higher) */}
        {isFront && (
          <div className={styles.frontLogoLayer}>
            <div className={styles.brandLogoWrapper}>
              <Image
                src={frontLogoSrc}
                alt="ALTA7 Front Logo"
                width={100}
                height={35}
                className={styles.brandLogoImage}
                priority
              />
            </div>
          </div>
        )}

        {/* Layer 3: Back Print Overlay (Enlarged & Positioned Naturally across Upper Back) */}
        {!isFront && (
          <>
            <div className={styles.collarSymbol}>
              <Image src="/brand/symbol-alta7.webp" alt="Symbol" width={14} height={14} />
            </div>
            <div className={styles.backPrintLayer}>
              <Image
                src={backArtworkSrc}
                alt={`Estampa ${print.code} ${print.title}`}
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                className={styles.artworkOverlayImage}
                priority
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
