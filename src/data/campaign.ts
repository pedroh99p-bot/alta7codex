export interface CampaignAsset {
  id: string;
  src: string;
  cloudinaryUrl: string;
  alt: string;
  title: string;
  location: string;
  objectPosition?: string;
  isNewCampaign?: boolean;
}

export const ALTA7_CAMPAIGN_ASSETS: CampaignAsset[] = [
  {
    id: 'rio-altinha-duo',
    src: '/assets/alta7/campaign/whatsapp-image-2026-08-27-17-04-50.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275700/WhatsApp_Image_2026-08-27_at_17.04.50_paar2w.webp',
    alt: 'Casal usando camisetas ALTA7 na praia com bola de altinha',
    title: 'ALTINHA NA PRAIA',
    location: 'PRAIA • RIO DE JANEIRO',
    objectPosition: 'center 38%',
    isNewCampaign: true,
  },
  {
    id: 'feminino-praia-close',
    src: '/assets/alta7/campaign/whatsapp-image-2026-08-27-17-04-59.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275700/WhatsApp_Image_2026-08-27_at_17.04.59_mhfdrb.webp',
    alt: 'Modelo feminina usando camiseta ALTA7 preta na praia',
    title: 'BABY LOOK ALTA7',
    location: 'BARRACA • RIO',
    objectPosition: 'center 32%',
    isNewCampaign: true,
  },
  {
    id: 'casal-areia-wide',
    src: '/assets/alta7/campaign/campaign-c6be-igmijr.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275677/c6be3dd6-3ed9-4031-a87c-57031bef4174_igmijr.webp',
    alt: 'Modelos masculino e feminino com camisetas ALTA7 sentados na areia',
    title: 'RIO OFF COURT',
    location: 'AREIA • RIO',
    objectPosition: 'center 42%',
    isNewCampaign: true,
  },
  {
    id: 'casal-areia-portrait',
    src: '/assets/alta7/campaign/campaign-c6be-x7oics.jpg',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275767/c6be3dd6-3ed9-4031-a87c-57031bef4174_x7oics.jpg',
    alt: 'Modelos ALTA7 com bola na areia em enquadramento vertical',
    title: 'PRETO NA AREIA',
    location: 'RIO DE JANEIRO',
    objectPosition: 'center 38%',
    isNewCampaign: true,
  },
];

export const ALTA7_LEGACY_LOOKBOOK_ASSETS: CampaignAsset[] = [
  {
    id: 'legacy-cultura-altinha',
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_1_h1wanp.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_1_h1wanp.webp',
    alt: 'ALTA7 lifestyle na praia do Rio',
    title: 'CULTURA DA ALTINHA',
    location: 'POSTO 9 • IPANEMA',
    objectPosition: 'center 20%',
  },
  {
    id: 'legacy-feita-pra-rua',
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_2_xcd3gz.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_2_xcd3gz.webp',
    alt: 'ALTA7 feita para a rua',
    title: 'FEITA PRA RUA',
    location: 'LAPA • RIO DE JANEIRO',
  },
  {
    id: 'legacy-streetwear-autoral',
    src: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_djf2hr.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/WhatsApp_Image_2026-09-01_at_13.03.35_djf2hr.webp',
    alt: 'ALTA7 streetwear autoral no Rio',
    title: 'STREETWEAR AUTORAL',
    location: 'ARPOADOR • RIO',
  },
];

export const ALTA7_HERO_SLIDES = ALTA7_CAMPAIGN_ASSETS;

export const ALTA7_LOOKBOOK_ITEMS: CampaignAsset[] = [
  ALTA7_CAMPAIGN_ASSETS[0],
  ALTA7_LEGACY_LOOKBOOK_ASSETS[0],
  ALTA7_CAMPAIGN_ASSETS[1],
  ALTA7_LEGACY_LOOKBOOK_ASSETS[1],
  ALTA7_CAMPAIGN_ASSETS[2],
  ALTA7_LEGACY_LOOKBOOK_ASSETS[2],
  ALTA7_CAMPAIGN_ASSETS[3],
];
