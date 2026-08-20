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
      <head>
        {/* Preload all 10 T-Shirt color base images (Front & Back) to prevent image loading delay */}
        <link rel="preload" as="image" href="/products/tshirt/bases/niw8pljgeipbfkswviaz_a5ysmn.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/czvtrkizefiba6icnaf2_qrczqg.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/nedb4dhcvjg442rkfqap_tsslk4.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/jobypfygnjsamfqibr5y_wteddo.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/msremr9sm5zktxopotbp_gvrpx5.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/wygnf5ayrmhur0kzusby_bqppvk.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/hw82wxjq2uq55mexdrea_djstiq.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/l0iiziafhh9lbht6nuxb_ytoz59.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/rkennsuvmen4znhmhgyz_to913v.webp" />
        <link rel="preload" as="image" href="/products/tshirt/bases/l1ulb3h8des7eidcrgql_sxeckr.webp" />
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
