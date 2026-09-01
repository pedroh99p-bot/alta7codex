import { ProductConfiguration, ItemPriceSummary } from '@/types/product';

export function calculateItemPrice(config: ProductConfiguration): ItemPriceSummary {
  const isFemale = config.model === 'female';
  const isPremium = config.fabricId === 'malha-premium';

  let unitPrice = 100;

  if (isFemale) {
    unitPrice = isPremium ? 100 : 80;
  } else {
    unitPrice = isPremium ? 120 : 100;
  }

  const totalPrice = unitPrice * config.quantity;

  return {
    unitPrice,
    totalPrice,
  };
}
