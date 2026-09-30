import { FabricCode, ItemPriceSummary, ProductConfiguration, ProductModelCode } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';

export function getAvailableFabricsForModel(model: ProductModelCode | null) {
  if (!model) return [];
  return ALTA7_PRODUCT.fabrics.filter((fabric) => fabric.availableModels.includes(model));
}

export function normalizeFabricForModel(
  model: ProductModelCode | null,
  fabricId: FabricCode | null
): FabricCode | null {
  if (!model) return null;
  const availableFabrics = getAvailableFabricsForModel(model);
  if (fabricId && availableFabrics.some((fabric) => fabric.id === fabricId)) return fabricId;
  return availableFabrics[0]?.id ?? null;
}

export function getProductPrice(
  model: ProductModelCode | null,
  fabricId: FabricCode | null
): number {
  const normalizedFabric = normalizeFabricForModel(model, fabricId);

  return ALTA7_PRODUCT.fabrics.find((fabric) => fabric.id === normalizedFabric)?.price ?? 0;
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
