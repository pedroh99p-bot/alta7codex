'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ALTA7_PRODUCT } from '@/data/product';
import styles from './Navbar.module.css';

interface NavbarProps {
  onStartConfigurator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartConfigurator }) => {
  const { totalQuantity, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (sectionId === 'configurator' && onStartConfigurator) {
      onStartConfigurator();
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.container}>
          {/* Left: Official ALTA7 Logo */}
          <a href="#" className={styles.logoLink} aria-label="ALTA7 Home">
            <Image
              src="/brand/logo-alta7.webp"
              alt="ALTA7"
              width={120}
              height={40}
              className={styles.logoImage}
              priority
            />
          </a>

          {/* Right: Cart Badge & Menu Hamburger */}
          <div className={styles.actions}>
            {/* Cart Icon Button */}
            <button
              type="button"
              className={styles.cartButton}
              onClick={toggleCart}
              aria-label={`Carrinho com ${totalQuantity} itens`}
            >
              <svg
                className={styles.cartIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
            </button>

            {/* Menu Hamburger */}
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </button>
          </div>
        </div>
      </header>

      {/* Functional Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)} aria-modal="true" role="dialog">
          <div className={styles.menuDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.menuHeader}>
              <Image
                src="/brand/logo-alta7.webp"
                alt="ALTA7 Logo"
                width={110}
                height={35}
                className={styles.menuLogo}
              />
              <button
                type="button"
                className={styles.closeMenuBtn}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu"
              >
                ✕
              </button>
            </div>

            <nav className={styles.menuNav}>
              <button
                type="button"
                className={`${styles.navItem} ${styles.navItemHighlight}`}
                onClick={() => handleNavClick('configurator')}
              >
                <span>MONTE A SUA ALTA7</span>
                <span className={styles.navArrow}>➔</span>
              </button>

              <button
                type="button"
                className={styles.navItem}
                onClick={() => handleNavClick('fabrics')}
              >
                <span>TECIDOS & DETALHES</span>
                <span className={styles.navArrow}>➔</span>
              </button>

              <button
                type="button"
                className={styles.navItem}
                onClick={() => handleNavClick('prints-gallery')}
              >
                <span>COLEÇÃO DE ARTES</span>
                <span className={styles.navArrow}>➔</span>
              </button>

              <button
                type="button"
                className={styles.navItem}
                onClick={() => handleNavClick('faq')}
              >
                <span>PERGUNTAS FREQUENTES</span>
                <span className={styles.navArrow}>➔</span>
              </button>

              <a
                href={`https://wa.me/${ALTA7_PRODUCT.whatsappNumber}?text=Fala!%20Quero%20falar%20com%20a%20ALTA7.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navItemWhatsapp}
              >
                <span>FALAR NO WHATSAPP</span>
                <span className={styles.navArrow}>↗</span>
              </a>
            </nav>

            <div className={styles.menuFooter}>
              <Image src="/brand/symbol-alta7.webp" alt="ALTA7" width={14} height={14} />
              <span>ALTA7. ALTINHA É LIBERDADE.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
