import { ProductConfiguration } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';

const STORAGE_KEY = 'alta7_custom_config_v1';

export function saveConfiguration(config: ProductConfiguration): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn('Failed to save configuration to localStorage:', error);
  }
}

export function loadSavedConfiguration(): ProductConfiguration {
  if (typeof window === 'undefined') return ALTA7_PRODUCT.defaultConfiguration;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...ALTA7_PRODUCT.defaultConfiguration,
        ...parsed,
      };
    }
  } catch (error) {
    console.warn('Failed to load configuration from localStorage:', error);
  }
  return ALTA7_PRODUCT.defaultConfiguration;
}
