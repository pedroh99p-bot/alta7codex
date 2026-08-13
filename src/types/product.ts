export type TShirtViewSide = 'front' | 'back';

export type ProductModelCode = 'male' | 'female';

export type SizeCode = 'P' | 'M' | 'G' | 'GG';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  borderHex?: string;
  baseImages: {
    front: string;
    back: string;
  };
}

export interface FabricOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceModifier: number; // Price added to base price
  iconName: string;
  textureImage?: string;
}

export interface PrintOption {
  id: string;
  code: string; // e.g. "ART.01"
  title: string; // e.g. "FREESTYLE"
  subtitle?: string;
  thumbnail: string;
  overlayImageBack: string; // PNG transparent artwork for back view
  overlayImageFront?: string; // Optional front artwork override
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
  model: ProductModelCode;
  colorId: string;
  fabricId: string;
  printId: string;
  sizeId: SizeCode | null; // Null initially to enforce conscious pick
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
  basePrice: number;
  whatsappNumber: string;
  colors: ColorOption[];
  fabrics: FabricOption[];
  prints: PrintOption[];
  sizes: SizeOption[];
  defaultConfiguration: ProductConfiguration;
}
