'use client';

import React from 'react';
import Image from 'next/image';
import { ColorOption, PrintOption, ProductModelCode, TShirtViewSide } from '@/types/product';
import styles from './ProductPreview.module.css';

interface ProductPreviewProps {
  model: ProductModelCode;
  color: ColorOption;
  print: PrintOption;
  viewSide: TShirtViewSide;
  onToggleSide?: (side: TShirtViewSide) => void;
  showTabs?: boolean;
  showViewTag?: boolean;
  priority?: boolean;
}

// Normalize measured shirt widths while preserving each original image's proportions.
const baseScales: Record<string, Record<ProductModelCode, Record<TShirtViewSide, number>>> = {
  preto: { male: { front: 1, back: 1 }, female: { front: 1, back: 1 } },
  branco: { male: { front: 0.983, back: 0.919 }, female: { front: 0.994, back: 0.996 } },
  verde: { male: { front: 1.025, back: 0.933 }, female: { front: 1.006, back: 1.014 } },
  'azul-marinho': { male: { front: 1.009, back: 0.95 }, female: { front: 0.934, back: 1.04 } },
  'vinho-bordo': { male: { front: 0.866, back: 0.843 }, female: { front: 0.858, back: 0.958 } },
};

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  model,
  color,
  print,
  viewSide,
  onToggleSide,
  showTabs = true,
  showViewTag = true,
  priority = true,
}) => {
  const isFront = viewSide === 'front';
  const isMale = model === 'male';
  const isWhiteShirt = color.id === 'branco';

  const isDebugPrintArea = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('debugPrintArea') === 'true';

  // Base image selection according to model + color + viewSide
  const baseImageSrc = isMale
    ? (isFront ? color.maleBaseImages.front : color.maleBaseImages.back)
    : (isFront ? color.femaleBaseImages.front : color.femaleBaseImages.back);

  // Front logo artwork (White for dark shirts, Black for white shirt)
  const frontLogoSrc = isWhiteShirt
    ? '/brand/front-logo-black-cropped.webp'
    : '/brand/front-logo-white-cropped.png';

  // Back artwork overlay
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
            aria-label="Ver frente da camisa"
          >
            FRENTE
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${!isFront ? styles.tabActive : ''}`}
            onClick={() => onToggleSide?.('back')}
            aria-label="Ver costas da camisa"
          >
            COSTAS
          </button>
        </div>
      )}

      {/* 4:5 Aspect Ratio Preview Canvas */}
      <div className={styles.canvas}>
        {/* Collar View Text Tag Badge */}
        {showViewTag && (
          <div className={styles.collarViewTag}>
            {isFront ? 'FRENTE' : 'COSTAS'}
          </div>
        )}

        <div className={styles.shirtLayer}>
          {/* Layer 1: Base T-Shirt Image */}
          <div className={styles.baseLayer}>
            <Image
              key={baseImageSrc}
              src={baseImageSrc}
              alt={`Camisa ALTA7 ${isMale ? 'Masculina' : 'Feminina'} cor ${color.name} vista ${isFront ? 'frente' : 'costas'}`}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              priority={priority}
              className={styles.baseImage}
              style={{ transform: `scale(${baseScales[color.id]?.[model]?.[viewSide] ?? 1})` }}
            />
          </div>

          {/* Layer 2: Front Chest Branding Logo Layer */}
          {isFront && (
            <div className={`${styles.frontLogoLayer} ${isMale ? styles.maleFrontLogo : styles.femaleFrontLogo}`}>
              <div className={styles.brandLogoWrapper}>
                <Image
                  src={frontLogoSrc}
                  alt="ALTA7 Front Logo"
                  fill
                  sizes="95px"
                  className={styles.brandLogoImage}
                  priority={priority}
                />
              </div>
            </div>
          )}

          {/* Layer 3: Back Print Area Overlay System (Calibrated per Gender) */}
          {!isFront && (
            <div
              className={`${styles.printArea} ${isMale ? styles.malePrintArea : styles.femalePrintArea} ${
                isDebugPrintArea ? styles.debugActive : ''
              }`}
            >
              {isDebugPrintArea && (
                <span className={styles.debugLabel}>
                  PRINT AREA ({isMale ? 'MASC' : 'FEM'})
                </span>
              )}
              <Image
                key={backArtworkSrc}
                src={backArtworkSrc}
                alt={`Estampa ${print.code} ${print.title}`}
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                style={{
                  '--artwork-scale': (print.artworkScale ?? 1) * (print.invertArtworkForDarkShirts ? 0.75 : 1),
                  '--artwork-offset-y': `${print.artworkOffsetYPercent ?? 0}%`,
                } as React.CSSProperties}
                className={styles.artworkOverlayImage}
                priority={priority}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
