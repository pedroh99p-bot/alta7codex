import type { Metadata, Viewport } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALTA7 — Camiseta Autoral & Configurador Visual | Futebol, Praia e Rua',
  description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho. Cultura de futebol de praia e rua do Rio de Janeiro.',
  keywords: ['ALTA7', 'camiseta personalizada', 'futebol de praia', 'streetwear rio de janeiro', 'configurador de camiseta'],
  openGraph: {
    title: 'ALTA7 — Monte a sua Camiseta',
    description: 'Experiência visual interativa de personalização ALTA7.',
    images: ['/brand/logo-alta7.webp'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <div className="mobile-container bg-grain">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
