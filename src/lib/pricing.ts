import { ProductConfiguration, ItemPriceSummary } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';

export function calculateItemPrice(config: ProductConfiguration): ItemPriceSummary {
  const fabric = ALTA7_PRODUCT.fabrics.find((f) => f.id === config.fabricId) || ALTA7_PRODUCT.fabrics[0];
  const unitPrice = ALTA7_PRODUCT.basePrice + (fabric.priceModifier || 0);
  const totalPrice = unitPrice * config.quantity;

  return {
    unitPrice,
    totalPrice,
  };
}
