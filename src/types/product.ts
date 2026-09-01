export type TShirtViewSide = 'front' | 'back';

export type ProductModelCode = 'male' | 'female';

export type MaleSubModelCode = 'tshirt' | 'oversized' | 'boxy';
export type FemaleSubModelCode = 'babytee' | 'babylook';
export type SubModelCode = MaleSubModelCode | FemaleSubModelCode;

export type SizeCode = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'EX';

export interface SubModelOption {
  id: SubModelCode;
  name: string;
  tagline: string;
}

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
  iconName: string;
}

export interface PrintOption {
  id: string;
  code: string; // e.g. "ART.01"
  title: string; // e.g. "FREESTYLE"
  subtitle?: string;
  thumbnail: string;
  overlayImageBack: string; // PNG transparent artwork for back view
  overlayImageFront?: string; // Optional front artwork override
  overlayImageBackWhite?: string; // White artwork PNG for dark t-shirts
  overlayImageBackBlack?: string; // Black artwork PNG for white t-shirts
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
  subModel: SubModelCode;
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
  whatsappNumber: string;
  maleSubModels: SubModelOption[];
  femaleSubModels: SubModelOption[];
  colors: ColorOption[];
  fabrics: FabricOption[];
  prints: PrintOption[];
  sizes: SizeOption[];
  defaultConfiguration: ProductConfiguration;
}
