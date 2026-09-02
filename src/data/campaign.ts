export interface CampaignAsset {
  id: string;
  src: string;
  cloudinaryUrl: string;
  alt: string;
  title: string;
  location: string;
  objectPosition?: string;
}

export const ALTA7_CAMPAIGN_ASSETS: CampaignAsset[] = [
  {
    id: 'capa-alta7',
    src: '/assets/alta7/campaign/capa-alta7.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788314298/WhatsApp_Image_2026-09-01_at_13.03.35_1_h1wanp.webp',
    alt: 'Casal usando camisetas ALTA7 pretas caminhando na praia',
    title: 'CAPA ALTA7',
    location: 'RECREIO • RIO',
    objectPosition: 'center 34%',
  },
  {
    id: 'rio-altinha-duo',
    src: '/assets/alta7/campaign/whatsapp-image-2026-08-27-17-04-50.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275700/WhatsApp_Image_2026-08-27_at_17.04.50_paar2w.webp',
    alt: 'Casal usando camisetas ALTA7 na praia com bola de altinha',
    title: 'ALTINHA NA PRAIA',
    location: 'PRAIA • RIO',
    objectPosition: 'center 38%',
  },
  {
    id: 'img-3-hero',
    src: '/assets/alta7/campaign/img-3-hero.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788314080/WhatsApp_Image_2026-09-01_at_13.03.35_2_xcd3gz.webp',
    alt: 'Modelo com estampa nas costas e jogador com camiseta ALTA7 na praia',
    title: 'ARTE NAS COSTAS',
    location: 'PRAIA • RIO',
    objectPosition: 'center 42%',
  },
  {
    id: 'feminino-praia-close',
    src: '/assets/alta7/campaign/whatsapp-image-2026-08-27-17-04-59.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275700/WhatsApp_Image_2026-08-27_at_17.04.59_mhfdrb.webp',
    alt: 'Modelo feminina usando camiseta ALTA7 preta na praia',
    title: 'BABY LOOK ALTA7',
    location: 'BARRACA • RIO',
    objectPosition: 'center 32%',
  },
  {
    id: 'img-5-hero',
    src: '/assets/alta7/campaign/img-5-hero.webp',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788314080/WhatsApp_Image_2026-09-01_at_13.03.35_djf2hr.webp',
    alt: 'Casal ALTA7 mostrando camiseta frontal e estampa nas costas',
    title: 'ALTINHA DE RUA',
    location: 'RECREIO • RJ',
    objectPosition: 'center 38%',
  },
  {
    id: 'casal-areia-portrait',
    src: '/assets/alta7/campaign/campaign-c6be-x7oics.jpg',
    cloudinaryUrl: 'https://res.cloudinary.com/dhbrxzt5a/image/upload/v1788275767/c6be3dd6-3ed9-4031-a87c-57031bef4174_x7oics.jpg',
    alt: 'Modelos ALTA7 com bola na areia em enquadramento vertical',
    title: 'PRETO NA AREIA',
    location: 'AREIA • RIO',
    objectPosition: 'center 38%',
  },
];

export const ALTA7_HERO_SLIDES = ALTA7_CAMPAIGN_ASSETS;

export const ALTA7_LOOKBOOK_ITEMS = ALTA7_CAMPAIGN_ASSETS;
