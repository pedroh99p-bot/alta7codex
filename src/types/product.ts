export type TShirtViewSide = 'front' | 'back';

export type ProductModelCode = 'male' | 'female';

export type FabricCode = 'cotton' | 'malha-30-1';

export type SizeCode = 'P' | 'M' | 'G' | 'GG';

export interface GenderBaseImages {
  front: string;
  back: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  borderHex?: string;
  maleBaseImages: GenderBaseImages;
  femaleBaseImages: GenderBaseImages;
}

export interface FabricOption {
  id: FabricCode;
  name: string;
  tagline: string;
  description: string;
  price: number;
  iconName: string;
}

export interface PrintOption {
  id: string;
  code: string; // e.g. "ART.01"
  title: string; // e.g. "FREESTYLE"
  subtitle?: string;
  thumbnail: string;
  overlayImageBack: string; // PNG/WebP transparent artwork for back view
  overlayImageFront?: string; // Optional front artwork override
  overlayImageBackWhite?: string; // White artwork WebP for dark t-shirts
  overlayImageBackBlack?: string; // Black artwork WebP for white t-shirts
}

export interface SizeOption {
  id: SizeCode;
  label: string;
  measurements: {
    chest: number; // in cm
    length: number; // in cm
    sleeve: number; // in cm
  };
}

export interface ProductConfiguration {
  model: ProductModelCode | null;
  colorId: string;
  fabricId: FabricCode | null;
  printId: string;
  sizeId: SizeCode | null;
  quantity: number;
  viewSide: TShirtViewSide;
}

export interface CartItem {
  id: string;
  configuration: ProductConfiguration;
  color: ColorOption;
  fabric: FabricOption;
  print: PrintOption;
  size: SizeOption | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface ItemPriceSummary {
  unitPrice: number;
  totalPrice: number;
}

export interface OrderSummary {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface ProductData {
  id: string;
  name: string;
  logoUrl: string;
  whatsappNumber: string;
  colors: ColorOption[];
  fabrics: FabricOption[];
  prints: PrintOption[];
  sizes: SizeOption[];
  defaultConfiguration: ProductConfiguration;
}
