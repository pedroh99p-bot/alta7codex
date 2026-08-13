'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMenu }) => {
  const { totalQuantity, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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

        {/* Right: Cart Badge & Menu */}
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
            onClick={onOpenMenu}
            aria-label="Abrir menu"
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </div>
    </header>
  );
};
