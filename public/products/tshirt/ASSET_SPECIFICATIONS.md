# Especificação de Assets - Camiseta ALTA7 (Padrão 4:5)

Esta documentação define o padrão visual oficial de assets da **ALTA7**, atualizado conforme a coleção Cloudinary integrada.

---

## 1. Canvas e Dimensões Oficiais (Padrão 4:5)
- **Dimensão da Imagem:** `1122px` x `1402px`
- **Aspect Ratio:** `4:5` (`0.80`)
- **Formato:** WebP (ou PNG transparente)
- **Fundo:** Dark `#080808` com iluminação de estúdio sutil para valorizar o produto.

---

## 2. Alinhamento de 0 Pulos Visuais (Zero Layout Shift)
Todas as 5 imagens de base da camiseta compartilham **exatamente as mesmas coordenadas de pixel, escala, ângulo e posição de gola/ombro**:
1. `Preta`: `public/products/tshirt/bases/cld-base-5-1_vqnc4y.webp`
2. `Azul Marinho`: `public/products/tshirt/bases/cld-base-2-2_x8oucf.webp`
3. `Vinho Bordô`: `public/products/tshirt/bases/cld-base-4-3_x1e0bp.webp`
4. `Verde`: `public/products/tshirt/bases/cld-base-3-4_fwq1du.webp`
5. `Branca`: `public/products/tshirt/bases/cld-base-1-5_a9gq5v.webp`

A alternância entre qualquer uma das 5 cores ocorre sem nenhum deslocamento visual.

---

## 3. Especificação da Camada de Aplicação de Arte (Prints)
- **Posicionamento Costas:** Centralizada nas costas da camiseta, a `320px` do topo do canvas 4:5, cobrindo até `520px` de largura por `620px` de altura.
- **Formato:** PNG com canal alfa transparente ou WebP com transparência.
