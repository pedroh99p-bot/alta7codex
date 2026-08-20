'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductConfiguration, SizeCode, ProductModelCode, TShirtViewSide } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';
import { calculateItemPrice } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { ProductPreview } from './ProductPreview';
import { ModelSelectorModal } from './ModelSelectorModal';
import { SizeGuideModal } from './SizeGuideModal';
import styles from './ConfiguratorMain.module.css';

interface ConfiguratorMainProps {
  onOpenOrderReview?: () => void;
}

export const ConfiguratorMain: React.FC<ConfiguratorMainProps> = ({ onOpenOrderReview }) => {
  const { addToCart } = useCart();

  // Customization active state (starts false until user initiates)
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  // Local state for active configuration
  const [config, setConfig] = useState<ProductConfiguration>(ALTA7_PRODUCT.defaultConfiguration);

  // Modals state
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);

  // Derived selections from data source of truth
  const currentColor = ALTA7_PRODUCT.colors.find((c) => c.id === config.colorId) || ALTA7_PRODUCT.colors[0];
  const currentFabric = ALTA7_PRODUCT.fabrics.find((f) => f.id === config.fabricId) || ALTA7_PRODUCT.fabrics[0];
  const currentPrint = ALTA7_PRODUCT.prints.find((p) => p.id === config.printId) || ALTA7_PRODUCT.prints[0];

  const itemPrice = calculateItemPrice(config);

  const startCustomizing = () => {
    if (!isCustomizing) {
      setIsCustomizing(true);
    }
  };

  // Reset / Cancel current customization & hide sticky bar
  const handleResetCustomization = () => {
    setIsCustomizing(false);
    setSizeWarning(false);
    setConfig(ALTA7_PRODUCT.defaultConfiguration);
  };

  const handleToggleSide = (side: TShirtViewSide) => {
    startCustomizing();
    setConfig((prev) => ({ ...prev, viewSide: side }));
  };

  const handleSelectColor = (colorId: string) => {
    startCustomizing();
    setConfig((prev) => ({ ...prev, colorId }));
  };

  const handleSelectFabric = (fabricId: string) => {
    startCustomizing();
    setConfig((prev) => ({ ...prev, fabricId }));
  };

  const handleSelectPrint = (printId: string) => {
    startCustomizing();
    setConfig((prev) => ({ ...prev, printId, viewSide: 'back' }));
  };

  const handleSelectSize = (sizeId: SizeCode) => {
    startCustomizing();
    setSizeWarning(false);
    setConfig((prev) => ({ ...prev, sizeId }));
  };

  const handleSelectModel = (model: ProductModelCode) => {
    startCustomizing();
    setConfig((prev) => ({ ...prev, model }));
  };

  const handleQuantityChange = (delta: number) => {
    startCustomizing();
    setConfig((prev) => {
      const next = prev.quantity + delta;
      return { ...prev, quantity: Math.max(1, Math.min(10, next)) };
    });
  };

  const handleAddToCart = () => {
    startCustomizing();
    if (!config.sizeId) {
      setSizeWarning(true);
      const sizeElem = document.getElementById('size-section');
      if (sizeElem) {
        sizeElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    addToCart(config);
  };

  return (
    <section id="configurator" className={styles.section}>
      <div className={styles.container}>
        {/* Header Title */}
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>MONTE A SUA ALTA7</span>
          <h2 className={styles.title}>CONFIGURADOR VISUAL</h2>
        </div>

        {/* Model Selector Bar */}
        <div className={styles.modelBar}>
          <div className={styles.modelInfo}>
            <span className={styles.modelLabel}>MODELAGEM:</span>
            <span className={`${styles.modelBadge} ${config.model === 'female' ? styles.badgeFemale : styles.badgeMale}`}>
              {config.model === 'female' ? '♀ FEMININO' : '♂ MASCULINO'}
            </span>
          </div>
          <button
            type="button"
            className={styles.changeModelBtn}
            onClick={() => setIsModelModalOpen(true)}
          >
            ALTERAR MODELO
          </button>
        </div>

        {/* Product Preview Engine Component */}
        <div className={styles.previewWrapper}>
          <ProductPreview
            color={currentColor}
            print={currentPrint}
            viewSide={config.viewSide}
            onToggleSide={handleToggleSide}
          />
        </div>

        {/* Active Config Status Summary Line */}
        <div className={styles.statusLine}>
          <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} />
          <span>
            {currentColor.name.toUpperCase()} / {currentFabric.name} / {currentPrint.code} {config.sizeId ? `/ ${config.sizeId}` : ''}
          </span>
          {isCustomizing && (
            <button
              type="button"
              className={styles.resetInlineBtn}
              onClick={handleResetCustomization}
              title="Cancelar customização atual"
              aria-label="Cancelar customização"
            >
              ✕
            </button>
          )}
        </div>

        {/* Controls Container */}
        <div className={styles.controls}>

          {/* Color Selector */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>COR</span>
              <span className={styles.groupValue}>{currentColor.name}</span>
            </div>
            <div className={styles.colorSwatches}>
              {ALTA7_PRODUCT.colors.map((color) => {
                const isSelected = color.id === config.colorId;
                return (
                  <button
                    key={color.id}
                    type="button"
                    className={`${styles.swatchBtn} ${isSelected ? styles.swatchSelected : ''}`}
                    onClick={() => handleSelectColor(color.id)}
                    aria-label={`Cor ${color.name}`}
                  >
                    <span
                      className={styles.swatchFill}
                      style={{ backgroundColor: color.hex, borderColor: color.borderHex || 'transparent' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fabric Selector */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>TECIDO</span>
              <span className={styles.groupValue}>{currentFabric.name}</span>
            </div>
            <div className={styles.fabricGrid}>
              {ALTA7_PRODUCT.fabrics.map((fabric) => {
                const isSelected = fabric.id === config.fabricId;
                return (
                  <button
                    key={fabric.id}
                    type="button"
                    className={`${styles.fabricCard} ${isSelected ? styles.fabricSelected : ''}`}
                    onClick={() => handleSelectFabric(fabric.id)}
                  >
                    <div className={styles.fabricIconWrapper}>
                      {fabric.id === 'cotton' && (
                        <svg className={styles.fabricIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 3a6 6 0 00-6 6c0 1.6.6 3 1.6 4.1L12 21l4.4-7.9A6 6 0 0012 3z" />
                        </svg>
                      )}
                      {fabric.id === 'performance' && (
                        <svg className={styles.fabricIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="6" cy="6" r="2" />
                          <circle cx="18" cy="6" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="6" cy="18" r="2" />
                          <circle cx="18" cy="18" r="2" />
                        </svg>
                      )}
                      {fabric.id === 'premium' && (
                        <svg className={styles.fabricIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
                        </svg>
                      )}
                    </div>
                    <span className={styles.fabricTitle}>{fabric.name}</span>
                    <span className={styles.fabricTagline}>{fabric.tagline}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prints / Artwork Selector (Horizontal Scroll Rail) */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>ESCOLHA SUA ARTE</span>
              <span className={styles.groupValue}>{currentPrint.code} - {currentPrint.title}</span>
            </div>
            <div className={styles.printsRail}>
              {ALTA7_PRODUCT.prints.map((print) => {
                const isSelected = print.id === config.printId;
                return (
                  <button
                    key={print.id}
                    type="button"
                    className={`${styles.printCard} ${isSelected ? styles.printSelected : ''}`}
                    onClick={() => handleSelectPrint(print.id)}
                  >
                    {isSelected && <span className={styles.printBadgeCheck}>✓</span>}
                    <div className={`${styles.printThumbPlaceholder} ${config.colorId === 'branca' ? styles.printThumbLightBg : ''}`}>
                      <Image
                        src={config.colorId === 'branca' ? (print.overlayImageBackBlack || print.thumbnail) : (print.overlayImageBackWhite || print.thumbnail)}
                        alt={print.title}
                        fill
                        className={styles.printThumbImage}
                      />
                    </div>
                    <div className={styles.printInfo}>
                      <span className={styles.printTitle}>{print.code}</span>
                      <span className={styles.printSubtitle}>{print.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div id="size-section" className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>
                TAMANHO {sizeWarning && <span className={styles.warningText}>— ESCOLHA UM TAMANHO</span>}
              </span>
              <button
                type="button"
                className={styles.sizeGuideLink}
                onClick={() => setIsSizeGuideOpen(true)}
              >
                Guia de medidas
              </button>
            </div>
            <div className={styles.sizeGrid}>
              {ALTA7_PRODUCT.sizes.map((size) => {
                const isSelected = size.id === config.sizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    className={`${styles.sizePill} ${isSelected ? styles.sizeSelected : ''}`}
                    onClick={() => handleSelectSize(size.id)}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className={styles.controlGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>QUANTIDADE</span>
            </div>
            <div className={styles.quantityRow}>
              <div className={styles.quantityPicker}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={config.quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span className={styles.qtyVal}>{config.quantity}</span>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange(1)}
                  disabled={config.quantity >= 10}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <div className={styles.priceBreakdown}>
                <span className={styles.unitPriceLabel}>Preço unitário: R$ {itemPrice.unitPrice}</span>
                <span className={styles.totalPriceLabel}>Total: R$ {itemPrice.totalPrice}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sticky Action Bar - ONLY Appears when customization process is started */}
        {isCustomizing && (
          <div className={styles.stickyBar}>
            <div className={styles.stickyContainer}>
              {/* Cancel / Reset Small ✕ Button */}
              <button
                type="button"
                className={styles.cancelCustomizationBtn}
                onClick={handleResetCustomization}
                title="Cancelar customização e zerar seleções"
                aria-label="Cancelar customização e fechar barra"
              >
                ✕
              </button>

              <div className={styles.stickyPrice}>
                <span className={styles.currencySymbol}>R$</span>
                <span className={styles.priceValue}>{itemPrice.totalPrice}</span>
              </div>

              <button
                type="button"
                className={`${styles.stickyButton} ${!config.sizeId ? styles.buttonWarn : ''}`}
                onClick={handleAddToCart}
              >
                <span>{config.sizeId ? 'ADICIONAR AO CARRINHO' : 'ESCOLHA O TAMANHO'}</span>
                <span className={styles.stickyArrow}>➔</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModelModalOpen}
        selectedModel={config.model}
        onSelectModel={handleSelectModel}
        onClose={() => setIsModelModalOpen(false)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        sizes={ALTA7_PRODUCT.sizes}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </section>
  );
};
