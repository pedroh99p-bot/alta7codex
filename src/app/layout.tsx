import type { Metadata, Viewport } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALTA7 — Camiseta Autoral & Configurador Visual | Altinha, Praia e Rua',
  description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho. Cultura da altinha, praia e rua do Rio de Janeiro.',
  keywords: ['ALTA7', 'camiseta personalizada', 'altinha', 'streetwear rio de janeiro', 'configurador de camiseta'],
  icons: {
    icon: '/brand/symbol-alta7.webp',
    shortcut: '/brand/symbol-alta7.webp',
    apple: '/brand/symbol-alta7.webp',
  },
  openGraph: {
    title: 'ALTA7 — Monte a sua Camiseta',
    description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho. Altinha, praia e rua.',
    url: 'https://alta7.vercel.app',
    siteName: 'ALTA7',
    images: [
      {
        url: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1786589565/5917ea7e-eff0-4d59-b00c-717fa55f2d89_hvtjia.webp',
        width: 1200,
        height: 630,
        alt: 'ALTA7 — Monte a sua Camiseta',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALTA7 — Monte a sua Camiseta',
    description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho.',
    images: ['https://res.cloudinary.com/dhbrxzt5a/image/upload/v1786589565/5917ea7e-eff0-4d59-b00c-717fa55f2d89_hvtjia.webp'],
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
