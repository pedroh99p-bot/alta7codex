import type { Metadata, Viewport } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALTA7 — Camiseta Autoral & Configurador Visual | Futebol, Praia e Rua',
  description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho. Cultura de futebol de praia e rua do Rio de Janeiro.',
  keywords: ['ALTA7', 'camiseta personalizada', 'futebol de praia', 'streetwear rio de janeiro', 'configurador de camiseta'],
  icons: {
    icon: '/brand/symbol-alta7.webp',
    shortcut: '/brand/symbol-alta7.webp',
    apple: '/brand/symbol-alta7.webp',
  },
  openGraph: {
    title: 'ALTA7 — Monte a sua Camiseta',
    description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho. Futebol, praia e rua.',
    url: 'https://alta7.vercel.app',
    siteName: 'ALTA7',
    images: [
      {
        url: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1786589506/dadad_1_uzh69j.webp',
        width: 800,
        height: 800,
        alt: 'ALTA7 Símbolo Oficial',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALTA7 — Monte a sua Camiseta',
    description: 'Monte a sua camiseta ALTA7. Escolha modelo, cor, tecido, estampa e tamanho.',
    images: ['https://res.cloudinary.com/dhbrxzt5a/image/upload/v1786589506/dadad_1_uzh69j.webp'],
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
      <head>
        {/* Preload all 5 T-Shirt color base images to prevent white flash or image loading delay */}
        <link rel="preload" as="image" href="/products/tshirt/bases/cld-base-5-1_vqnc4y.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/cld-base-2-2_x8oucf.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/cld-base-4-3_x1e0bp.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/cld-base-3-4_fwq1du.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/cld-base-1-5_a9gq5v.webp" />
      </head>
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
