'use client';

import React, { useCallback, useState } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { ConfiguratorMain } from '@/components/configurator/ConfiguratorMain';
import { LookbookShowcase } from '@/components/product/LookbookShowcase';
import { FabricShowcase } from '@/components/product/FabricShowcase';
import { PrintGallery } from '@/components/product/PrintGallery';
import { FaqSection } from '@/components/product/FaqSection';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/order/CartDrawer';
import { OrderReviewModal } from '@/components/order/OrderReviewModal';

export default function HomePage() {
  const [isOrderReviewOpen, setIsOrderReviewOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  const handlePreloaderDone = useCallback(() => {
    setIsPreloaderDone(true);
  }, []);

  const handleScrollToConfigurator = () => {
    const configuratorElem = document.getElementById('configurator');
    if (configuratorElem) {
      configuratorElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPrintFromGallery = () => {
    handleScrollToConfigurator();
  };

  return (
    <main>
      {/* 01. Preloader */}
      <Preloader onDone={handlePreloaderDone} />

      {/* 02. Minimalist Navbar */}
      <Navbar onStartConfigurator={handleScrollToConfigurator} />

      {/* 03. Hero Lifestyle Section with Auto-play Carousel */}
      <HeroSection
        onStartConfigurator={handleScrollToConfigurator}
        startSlideshow={isPreloaderDone}
      />

      {/* 04. Main Visual Configurator Engine */}
      <ConfiguratorMain />

      {/* 05. Lifestyle Lookbook Rio de Janeiro Gallery */}
      <LookbookShowcase onGoToConfigurator={handleScrollToConfigurator} />

      {/* 06. Fabrics & Details Showcase */}
      <FabricShowcase onGoToConfigurator={handleScrollToConfigurator} />

      {/* 07. Editorial Prints Collection Gallery */}
      <PrintGallery onSelectPrint={handleSelectPrintFromGallery} />

      {/* 08. FAQ Section */}
      <FaqSection />

      {/* 09. Footer */}
      <Footer />

      {/* Persistent Shopping Cart Drawer */}
      <CartDrawer onProceedToReview={() => setIsOrderReviewOpen(true)} />

      {/* Full Order Review & WhatsApp Handoff Modal */}
      <OrderReviewModal
        isOpen={isOrderReviewOpen}
        onClose={() => setIsOrderReviewOpen(false)}
        onEdit={handleScrollToConfigurator}
      />
    </main>
  );
}
