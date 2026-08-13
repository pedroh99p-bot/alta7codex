'use client';

import React, { useState } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { ConfiguratorMain } from '@/components/configurator/ConfiguratorMain';
import { FabricShowcase } from '@/components/product/FabricShowcase';
import { PrintGallery } from '@/components/product/PrintGallery';
import { FaqSection } from '@/components/product/FaqSection';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/order/CartDrawer';
import { OrderReviewModal } from '@/components/order/OrderReviewModal';

export default function HomePage() {
  const [isOrderReviewOpen, setIsOrderReviewOpen] = useState(false);

  const handleScrollToConfigurator = () => {
    const configuratorElem = document.getElementById('configurator');
    if (configuratorElem) {
      configuratorElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPrintFromGallery = (printId: string) => {
    handleScrollToConfigurator();
  };

  return (
    <main>
      {/* 01. Preloader */}
      <Preloader />

      {/* 02. Minimalist Navbar */}
      <Navbar onStartConfigurator={handleScrollToConfigurator} />

      {/* 03. Hero Lifestyle Section */}
      <HeroSection onStartConfigurator={handleScrollToConfigurator} />

      {/* 04. Main Visual Configurator Engine */}
      <ConfiguratorMain onOpenOrderReview={() => setIsOrderReviewOpen(true)} />

      {/* 05. Fabrics & Details Showcase */}
      <FabricShowcase onGoToConfigurator={handleScrollToConfigurator} />

      {/* 06. Editorial Prints Collection Gallery */}
      <PrintGallery onSelectPrint={handleSelectPrintFromGallery} />

      {/* 07. FAQ Section */}
      <FaqSection />

      {/* 08. Footer */}
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
