'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FabricCode, ProductConfiguration, ProductModelCode, SizeCode, TShirtViewSide } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';
import { calculateItemPrice, normalizeFabricForModel } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';
import { ProductPreview } from './ProductPreview';
import { SizeGuideModal } from './SizeGuideModal';
import styles from './ConfiguratorMain.module.css';

type AccordionStep = 'model' | 'color' | 'print' | 'fabric' | 'size' | null;

export const ConfiguratorMain: React.FC = () => {
  const { addToCart } = useCart();

  // Initial Model Selection State (false until user confirms initial model screen)
  const [hasChosenInitialModel, setHasChosenInitialModel] = useState<boolean>(false);
  const [initialModelPick, setInitialModelPick] = useState<ProductModelCode | null>(null);

  // Active product configuration
  const [config, setConfig] = useState<ProductConfiguration>(ALTA7_PRODUCT.defaultConfiguration);

  // Accordion active step (only ONE open at a time)
  const [openStep, setOpenStep] = useState<AccordionStep>('color');

  // Modals and Warnings
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);

  // Derived current options
  const currentColor = ALTA7_PRODUCT.colors.find((c) => c.id === config.colorId) || ALTA7_PRODUCT.colors[0];
  const normalizedFabricId = normalizeFabricForModel(config.model, config.fabricId);
  const currentFabric = ALTA7_PRODUCT.fabrics.find((f) => f.id === normalizedFabricId) || ALTA7_PRODUCT.fabrics[0];
  const currentPrint = ALTA7_PRODUCT.prints.find((p) => p.id === config.printId) || ALTA7_PRODUCT.prints[0];
  const currentSize = ALTA7_PRODUCT.sizes.find((s) => s.id === config.sizeId) || null;
  const activeModel = config.model ?? 'male';

  const itemPrice = calculateItemPrice(config);

  // Toggle Accordion step (ensures ONLY ONE is open)
  const toggleStep = (step: AccordionStep) => {
    if (openStep === step) {
      setOpenStep(null);
    } else {
      setOpenStep(step);
      // Auto-switch to COSTAS when ART step is opened
      if (step === 'print') {
        setConfig((prev) => ({ ...prev, viewSide: 'back' }));
      }
    }
  };

  // Initial Model Confirm Handler
  const handleConfirmInitialModel = () => {
    if (!initialModelPick) return;

    setConfig((prev) => ({
      ...prev,
      model: initialModelPick,
      fabricId: 'cotton',
    }));
    setHasChosenInitialModel(true);
    setOpenStep('color'); // Move naturally to color step
  };

  // Model change handler (preserves compatible options)
  const handleSelectModel = (model: ProductModelCode) => {
    setConfig((prev) => {
      const fabricId = model === 'female' ? 'cotton' : prev.fabricId;
      return {
        ...prev,
        model,
        fabricId,
      };
    });
    setOpenStep('color');
  };

  // Color change handler
  const handleSelectColor = (colorId: string) => {
    setConfig((prev) => ({ ...prev, colorId }));
    setOpenStep('print'); // Advance naturally to ART
    setConfig((prev) => ({ ...prev, viewSide: 'back' })); // Auto-switch to COSTAS
  };

  // Print change handler
  const handleSelectPrint = (printId: string) => {
    setConfig((prev) => ({ ...prev, printId, viewSide: 'back' }));
    // If Male, move to fabric; if Female, move to size (since fabric is auto-cotton)
    setOpenStep(config.model === 'male' ? 'fabric' : 'size');
  };

  // Fabric change handler
  const handleSelectFabric = (fabricId: FabricCode) => {
    if (config.model === 'female' && fabricId === 'malha-30-1') return; // Enforce rule
    setConfig((prev) => ({ ...prev, fabricId }));
    setOpenStep('size'); // Advance naturally to SIZE
  };

  // Size change handler
  const handleSelectSize = (sizeId: SizeCode) => {
    setSizeWarning(false);
    setConfig((prev) => ({ ...prev, sizeId }));
  };

  // Toggle view side
  const handleToggleSide = (side: TShirtViewSide) => {
    setConfig((prev) => ({ ...prev, viewSide: side }));
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!config.sizeId) {
      setSizeWarning(true);
      setOpenStep('size');
      const sizeElem = document.getElementById('step-size');
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

        {/* ---------------------------------------------------- */}
        {/* INITIAL SCREEN: ESCOLHA SEU MODELO (First Contact)    */}
        {/* ---------------------------------------------------- */}
        {!hasChosenInitialModel ? (
          <div className={styles.initialScreen}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>PASSO 1 • PERSONALIZAÇÃO</span>
              <h2 className={styles.title}>ESCOLHA SEU MODELO</h2>
              <p className={styles.subtitle}>
                Selecione a modelagem para começar a personalizar sua camisa.
              </p>
            </div>

            {/* Side-by-Side Model Cards (Mobile & Desktop) */}
            <div className={styles.initialGrid}>
              {/* FEMININO Card */}
              <button
                type="button"
                className={`${styles.initialCard} ${initialModelPick === 'female' ? styles.initialCardSelected : ''}`}
                onClick={() => setInitialModelPick('female')}
                aria-pressed={initialModelPick === 'female'}
              >
                {initialModelPick === 'female' && <span className={styles.checkBadge}>✓</span>}
                <div className={styles.initialImageWrapper}>
                  <Image
                    src="https://res.cloudinary.com/dhbrxzt5a/image/upload/fem_preta_frente_impu3b.webp"
                    alt="Modelagem Feminina ALTA7"
                    fill
                    sizes="(max-width: 430px) 45vw, 240px"
                    className={styles.initialImage}
                    priority
                  />
                  <div className={styles.initialLogoOverlay}>
                    <Image
                      src="/brand/front-logo-white.png"
                      alt="ALTA7"
                      width={60}
                      height={20}
                      className={styles.initialLogoImage}
                    />
                  </div>
                </div>
                <div className={styles.initialCardFooter}>
                  <span className={styles.initialCardTitle}>FEMININO</span>
                  <span className={styles.initialCardSubtitle}>R$ 100,00</span>
                </div>
              </button>

              {/* MASCULINO Card */}
              <button
                type="button"
                className={`${styles.initialCard} ${initialModelPick === 'male' ? styles.initialCardSelected : ''}`}
                onClick={() => setInitialModelPick('male')}
                aria-pressed={initialModelPick === 'male'}
              >
                {initialModelPick === 'male' && <span className={styles.checkBadge}>✓</span>}
                <div className={styles.initialImageWrapper}>
                  <Image
                    src="https://res.cloudinary.com/dhbrxzt5a/image/upload/masc_preta_frente_mbhxtx.webp"
                    alt="Modelagem Masculina ALTA7"
                    fill
                    sizes="(max-width: 430px) 45vw, 240px"
                    className={styles.initialImage}
                    priority
                  />
                  <div className={styles.initialLogoOverlay}>
                    <Image
                      src="/brand/front-logo-white.png"
                      alt="ALTA7"
                      width={65}
                      height={22}
                      className={styles.initialLogoImage}
                    />
                  </div>
                </div>
                <div className={styles.initialCardFooter}>
                  <span className={styles.initialCardTitle}>MASCULINO</span>
                  <span className={styles.initialCardSubtitle}>A partir de R$ 100,00</span>
                </div>
              </button>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className={styles.initialCtaButton}
              onClick={handleConfirmInitialModel}
              disabled={!initialModelPick}
            >
              <span>CONTINUAR</span>
              <span>➔</span>
            </button>
            <span className={styles.microcopy}>Depois você poderá trocar o modelo.</span>
          </div>
        ) : (

          /* ---------------------------------------------------- */
          /* MAIN CONFIGURATOR (ACCORDION & DOMINANT PREVIEW)     */
          /* ---------------------------------------------------- */
          <div className={styles.mainLayout}>
            {/* Header Title */}
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>ALTA7 AUTORAL</span>
              <h2 className={styles.title}>MONTE SUA CAMISA</h2>
            </div>

            {/* Dominant Product Preview Engine */}
            <div className={styles.previewWrapper}>
              <ProductPreview
                model={activeModel}
                color={currentColor}
                print={currentPrint}
                viewSide={config.viewSide}
                onToggleSide={handleToggleSide}
              />
            </div>

            {/* Real-time Summary Line */}
            <div className={styles.summaryLine}>
              <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={12} height={12} />
              <span>
                {config.model === 'female' ? 'Feminino' : 'Masculino'} / {currentColor.name} / {currentFabric.name} / {currentPrint.code} {currentSize ? `/ ${currentSize.label}` : ''}
              </span>
            </div>

            {/* Progressive Single-Step Accordion */}
            <div className={styles.accordionContainer}>

              {/* STEP 01: MODELO */}
              <div className={`${styles.accordionItem} ${openStep === 'model' ? styles.accordionItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleStep('model')}
                >
                  <div className={styles.stepTitleGroup}>
                    <span className={styles.stepNumber}>01</span>
                    <span className={styles.stepName}>MODELO</span>
                  </div>
                  <span className={styles.stepValue}>
                    {config.model === 'female' ? 'Feminino' : 'Masculino'} <span className={styles.checkDone}>✓</span>
                  </span>
                </button>

                {openStep === 'model' && (
                  <div className={styles.accordionBody}>
                    <div className={styles.modelOptionsGrid}>
                      <button
                        type="button"
                        className={`${styles.modelOptBtn} ${config.model === 'male' ? styles.modelOptActive : ''}`}
                        onClick={() => handleSelectModel('male')}
                      >
                        <span className={styles.modelOptTitle}>MASCULINO</span>
                        <span className={styles.modelOptSub}>R$ 100,00 ou R$ 120,00</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.modelOptBtn} ${config.model === 'female' ? styles.modelOptActive : ''}`}
                        onClick={() => handleSelectModel('female')}
                      >
                        <span className={styles.modelOptTitle}>FEMININO</span>
                        <span className={styles.modelOptSub}>Cotton • R$ 100,00</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 02: COR */}
              <div className={`${styles.accordionItem} ${openStep === 'color' ? styles.accordionItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleStep('color')}
                >
                  <div className={styles.stepTitleGroup}>
                    <span className={styles.stepNumber}>02</span>
                    <span className={styles.stepName}>COR</span>
                  </div>
                  <span className={styles.stepValue}>
                    {currentColor.name} <span className={styles.checkDone}>✓</span>
                  </span>
                </button>

                {openStep === 'color' && (
                  <div className={styles.accordionBody}>
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
                            <span className={styles.swatchName}>{color.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 03: ARTE (Auto-switches to COSTAS) */}
              <div className={`${styles.accordionItem} ${openStep === 'print' ? styles.accordionItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleStep('print')}
                >
                  <div className={styles.stepTitleGroup}>
                    <span className={styles.stepNumber}>03</span>
                    <span className={styles.stepName}>ARTE (COSTAS)</span>
                  </div>
                  <span className={styles.stepValue}>
                    {currentPrint.code} <span className={styles.checkDone}>✓</span>
                  </span>
                </button>

                {openStep === 'print' && (
                  <div className={styles.accordionBody}>
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
                            <div className={`${styles.printThumbPlaceholder} ${config.colorId === 'branco' ? styles.printThumbLightBg : ''}`}>
                              <Image
                                src={config.colorId === 'branco' ? (print.overlayImageBackBlack || print.thumbnail) : (print.overlayImageBackWhite || print.thumbnail)}
                                alt={print.title}
                                fill
                                sizes="110px"
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
                )}
              </div>

              {/* STEP 04: TECIDO (Dynamic per gender) */}
              <div className={`${styles.accordionItem} ${openStep === 'fabric' ? styles.accordionItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleStep('fabric')}
                >
                  <div className={styles.stepTitleGroup}>
                    <span className={styles.stepNumber}>04</span>
                    <span className={styles.stepName}>TECIDO</span>
                  </div>
                  <span className={styles.stepValue}>
                    {currentFabric.name} <span className={styles.checkDone}>✓</span>
                  </span>
                </button>

                {openStep === 'fabric' && (
                  <div className={styles.accordionBody}>
                    {config.model === 'male' ? (
                      <div className={styles.fabricGrid}>
                        <button
                          type="button"
                          className={`${styles.fabricCard} ${config.fabricId === 'cotton' ? styles.fabricSelected : ''}`}
                          onClick={() => handleSelectFabric('cotton')}
                        >
                          <div className={styles.fabricCardHeader}>
                            <span className={styles.fabricTitle}>COTTON</span>
                            <span className={styles.fabricPriceTag}>R$ 100,00</span>
                          </div>
                          <span className={styles.fabricDesc}>Algodão leve & macio com excelente toque.</span>
                        </button>

                        <button
                          type="button"
                          className={`${styles.fabricCard} ${config.fabricId === 'malha-30-1' ? styles.fabricSelected : ''}`}
                          onClick={() => handleSelectFabric('malha-30-1')}
                        >
                          <div className={styles.fabricCardHeader}>
                            <span className={styles.fabricTitle}>MALHA 30.1</span>
                            <span className={styles.fabricPriceTag}>R$ 120,00</span>
                          </div>
                          <span className={styles.fabricDesc}>Algodão penteado encorpado alta gramatura.</span>
                        </button>
                      </div>
                    ) : (
                      <div className={styles.femaleFabricNote}>
                        <div className={`${styles.fabricCard} ${styles.fabricSelected}`}>
                          <div className={styles.fabricCardHeader}>
                            <span className={styles.fabricTitle}>COTTON</span>
                            <span className={styles.fabricPriceTag}>R$ 100,00</span>
                          </div>
                          <span className={styles.fabricDesc}>Modelagem feminina disponível exclusivamente em Cotton macio.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* STEP 05: TAMANHO */}
              <div id="step-size" className={`${styles.accordionItem} ${openStep === 'size' ? styles.accordionItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleStep('size')}
                >
                  <div className={styles.stepTitleGroup}>
                    <span className={styles.stepNumber}>05</span>
                    <span className={styles.stepName}>TAMANHO</span>
                  </div>
                  <span className={styles.stepValue}>
                    {currentSize ? currentSize.label : 'Escolher'} {currentSize && <span className={styles.checkDone}>✓</span>}
                  </span>
                </button>

                {openStep === 'size' && (
                  <div className={styles.accordionBody}>
                    <div className={styles.sizeHeaderGroup}>
                      {sizeWarning && <span className={styles.warningText}>Selecione um tamanho para continuar</span>}
                      <button
                        type="button"
                        className={styles.sizeGuideLink}
                        onClick={() => setIsSizeGuideOpen(true)}
                      >
                        Guia de medidas 📏
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
                )}
              </div>

            </div>

            {/* Bottom Sticky Action & Purchase Bar */}
            <div className={styles.stickyBar}>
              <div className={styles.stickyContainer}>
                <div className={styles.stickyPriceGroup}>
                  <span className={styles.stickyPriceLabel}>VALOR TOTAL:</span>
                  <span className={styles.stickyPriceValue}>R$ {itemPrice.totalPrice},00</span>
                </div>

                <button
                  type="button"
                  className={`${styles.stickyButton} ${!config.sizeId ? styles.buttonWarn : ''}`}
                  onClick={handleAddToCart}
                >
                  <span>{config.sizeId ? 'ADICIONAR AO PEDIDO' : 'ESCOLHA O TAMANHO'}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        sizes={ALTA7_PRODUCT.sizes}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </section>
  );
};
