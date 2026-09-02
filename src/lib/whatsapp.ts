import { CartItem } from '@/types/product';
import { ALTA7_PRODUCT } from '@/data/product';
import { formatPriceBRL } from '@/lib/pricing';

export function buildWhatsAppMessage(items: CartItem[]): string {
  if (!items || items.length === 0) {
    return 'Fala! Quero conhecer mais sobre os produtos ALTA7 pro jogo de altinha. ⚽';
  }

  const itemsText = items
    .map((item, index) => {
      const modelLabel = item.configuration.model === 'female' ? 'Feminino' : 'Masculino';
      const printText = `${item.print.code} / ${item.print.title}`;
      const colorText = item.color.name;
      const fabricText = item.fabric.name;
      const sizeText = item.size ? item.size.label : 'Não informado';
      const quantityText = item.quantity.toString();
      const subtotalText = formatPriceBRL(item.totalPrice);

      return `👕 *ITEM ${index + 1}*
🧍 Modelagem: ${modelLabel}
🎨 Estampa: ${printText}
⚫ Cor: ${colorText}
🧵 Tecido: ${fabricText}
📏 Tamanho: ${sizeText}
🔢 Quantidade: ${quantityText}
💵 Subtotal: ${subtotalText}`;
    })
    .join('\n\n');

  const grandTotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return `🛍️ *NOVO PEDIDO ALTA7 — ALTINHA & RUA*

Fala! Montei meu pedido pelo site 👇

${itemsText}

─────────────

💰 *TOTAL: ${formatPriceBRL(grandTotal)}*

Quero confirmar meu pedido. ⚽`;
}

export function generateWhatsAppUrl(items: CartItem[], customPhone?: string): string {
  const phone = customPhone || ALTA7_PRODUCT.whatsappNumber;
  const message = buildWhatsAppMessage(items);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
