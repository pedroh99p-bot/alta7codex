# Especificação de Assets - Camiseta ALTA7 (Padrão 4:5)

Esta documentação define o padrão visual oficial de assets da **ALTA7**, atualizado conforme a coleção Cloudinary integrada.

---

## 1. Canvas e Dimensões Oficiais (Padrão 4:5)
- **Dimensão da Imagem:** `1122px` x `1402px`
- **Aspect Ratio:** `4:5` (`0.80`)
- **Formato:** WebP (ou PNG transparente)
- **Fundo:** Dark `#080808` com iluminação de estúdio sutil para valorizar o produto.

---

## 2. Bases Oficiais Cloudinary
O configurador usa 20 bases oficiais, consumidas diretamente do Cloudinary e mapeadas em `src/data/product.ts`:
- 5 cores;
- 2 lados (`front`, `back`);
- 2 modelos (`male`, `female`).

A alternância entre cor, modelo e lado deve ocorrer dentro do mesmo canvas 4:5, sem deslocamento visual perceptível.

---

## 3. Especificação da Camada de Aplicação de Arte (Prints)
- **Posicionamento Costas Masculino:** `top: 47%`, `width: 60%`, `height: 56%`.
- **Posicionamento Costas Feminino:** `top: 45%`, `width: 56%`, `height: 52%`.
- **Formato:** PNG com canal alfa transparente ou WebP com transparência.
- **Debug:** `?debugPrintArea=true` exibe o contorno da área calibrada.
