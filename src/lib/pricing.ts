import { FabricCode, ItemPriceSummary, ProductConfiguration, ProductModelCode } from '@/types/product';

export function normalizeFabricForModel(
  model: ProductModelCode | null,
  fabricId: FabricCode | null
): FabricCode | null {
  if (!model) return null;
  if (model === 'female') return 'cotton';
  return fabricId ?? 'cotton';
}

export function getProductPrice(
  model: ProductModelCode | null,
  fabricId: FabricCode | null
): number {
  const normalizedFabric = normalizeFabricForModel(model, fabricId);

  if (!model || !normalizedFabric) return 0;
  if (model === 'female') return 100;
  return normalizedFabric === 'malha-30-1' ? 120 : 100;
}

export function calculateItemPrice(config: ProductConfiguration): ItemPriceSummary {
  const unitPrice = getProductPrice(config.model, config.fabricId);

  return {
    unitPrice,
    totalPrice: unitPrice * config.quantity,
  };
}

export function formatPriceBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value).replace(/\u00a0/g, ' ');
}
