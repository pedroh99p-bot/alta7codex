# AGENTS.md — ALTA7 Configurador de Camisetas

> Este documento serve como guia operacional e memória de arquitetura para qualquer agente (IA ou humano) que atue neste repositório.

---

## 1. Visão Geral do Projeto
O **ALTA7** é uma landing page / microloja mobile-first com configurador visual interativo de produto. A marca possui identidade fortemente ligada ao **futebol de praia, rua, Rio de Janeiro e cultura streetwear/esportiva premium**.

## 2. Objetivo Comercial
Não se trata de um e-commerce tradicional com dezenas de produtos. Há essencialmente **um produto-base** (Camiseta ALTA7). O objetivo é engajar o cliente no processo de personalização ("Monte a sua ALTA7") e converter a intenção de compra através do **WhatsApp**.

## 3. Conceito "Monte sua ALTA7"
A experiência deve transmitir:
- **"Eu montei a minha ALTA7."**
- E NÃO: *"Preenchi um formulário de e-commerce."*

## 4. Stack Tecnológica
- **Framework:** Next.js 16 (App Router, React 19)
- **Linguagem:** TypeScript (strict mode)
- **Estilização:** CSS Vanilla + CSS Variables Design Tokens (`src/styles/tokens.css`) + CSS Modules.
- **Gerenciador de Pacotes:** `npm`

## 5. Comandos de Desenvolvimento
- `npm run dev`: Inicia o servidor de desenvolvimento local
- `npm run build`: Executa a compilação e verificação de tipos para produção
- `npm run start`: Inicia o servidor em ambiente de produção
- `npm run lint`: Executa a verificação do ESLint

## 6. Arquitetura do Projeto
```text
/public
  /brand              -> Logo oficial ALTA7 (logo-alta7.webp)
  /products
    /tshirt
      /bases          -> 5 bases reais Cloudinary (4:5 aspect ratio, 1122x1402px)
      /prints         -> Artes em PNG transparente e thumbnails (ART.01 a ART.09)
      /details        -> Fotos de detalhes de costura e acabamento
  /lifestyle          -> Fotos editoriais e de campanha
/src
  /app                -> Layouts e páginas (App Router)
  /components
    /layout           -> Navbar, Footer
    /hero             -> HeroSection
    /configurator     -> ProductPreview (4:5 canvas), ModelSelectorModal (Masculino/Feminino), SizeGuideModal, ConfiguratorMain
    /product          -> FabricShowcase, PrintGallery, FaqSection
    /order            -> CartDrawer, OrderReviewModal
    /ui               -> Preloader, Modais, botões base
  /context            -> CartContext (persistência de carrinho multi-item via localStorage)
  /data               -> Fonte central de dados (product.ts)
  /lib                -> Utilitários (pricing.ts, whatsapp.ts, storage.ts)
  /types              -> Interfaces TypeScript (product.ts)
  /styles             -> Tokens CSS (tokens.css)
```

## 7. Design System
- **Fundo Principal:** `#080808`
- **Superfícies:** `#111111`, `#181818`
- **Canvas de Preview:** `#EAEAEA` (para base neutra da camiseta)
- **Texto:** Off-white (`#F2F0E8`), Secundário (`#999999`), Muted (`#666666`)
- **Cor de Destaque (Accent):** Amarelo ALTA7 (`#E6C619`). Usar estritamente como **acento** (bordas ativas, linhas de progresso, ícones pontuais, underlines, indicadores de seleção).
- **Tipografia:**
  - UI: `Inter` (sans-serif extremamente legível, limpa e funcional)
  - Editorial: `Bebas Neue` / `Oswald` (condensada, bold, esportiva/streetwear)

## 8. Regras Mobile-First
- O desenvolvimento é prioritariamente **Mobile-First**.
- Viewport de referência: `390px`. Testar em `360px`, `375px`, `390px` e `430px`.
- Padding lateral mobile: `20px` a `24px`.
- Utilizar container centralizador `.mobile-container` para visualização desktop/tablet mantendo a fidelidade do design mobile.

## 9. Estrutura dos Assets (Padrão 4:5 - 1122x1402px)
- Todas as imagens de base compartilham rigorosamente a **mesma proporção 4:5** e o **mesmo canvas**:
  - `preto` → `/products/tshirt/bases/cld-base-5-1_vqnc4y.webp`
  - `marinho` → `/products/tshirt/bases/cld-base-2-2_x8oucf.webp`
  - `bordo` → `/products/tshirt/bases/cld-base-4-3_x1e0bp.webp`
  - `verde` → `/products/tshirt/bases/cld-base-3-4_fwq1du.webp`
  - `branca` → `/products/tshirt/bases/cld-base-1-5_a9gq5v.webp`

## 10. Regra Crítica: Composição Visual por Camadas (0 Pulos)
- O preview visual é composto por **Camadas Sobrepostas (Canvas 4:5 / Absolute Positioning)**:
  1. **Camada Base:** Imagem da camiseta (cor correspondente em 4:5)
  2. **Camada de Branding:** Logo ALTA7 (peito na vista frontal)
  3. **Camada de Estampa:** Arte selecionada (costas)
- Ao alterar a cor, o tecido ou a estampa, a camiseta **NÃO PODE saltar ou mudar de posição**.

## 11. Fonte Central de Verdade dos Dados
- A fonte única de verdade reside em `src/data/product.ts`, consumindo tipos estritos de `src/types/product.ts`.
- Toda a interface (modelos Masculino/Feminino, cores, tecidos, estampas, preços, medidas) deve ser derivada desse arquivo.

## 12. Integração WhatsApp
- Número oficial configurado: `5521983565005`.
- A mensagem é gerada dinamicamente via `buildWhatsAppMessage()` em `src/lib/whatsapp.ts` suportando pedidos de 1 ou múltiplos itens do carrinho.

## 13. Instrução Obrigatória
> **ATENÇÃO:** Antes de realizar qualquer alteração significativa na interface, o agente DEVE abrir e inspecionar visualmente os mockups localizados na pasta `/referencias` (`hero tela principal.png`, `seleçao da cor e do tecido.png`, `seleçao da estampa.png`, `tecidos e detalhes.png`, `pedido confirmado.png`).
