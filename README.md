# ALTA7 — Configurador de Camisetas (Landing Page & Microloja Mobile-First)

> Experiência visual interativa de personalização e intenção de compra para a **ALTA7** — marca com identidade na altinha, praia, rua, Rio de Janeiro e cultura streetwear.

---

## Conceito do Produto
A ALTA7 não opera como um e-commerce genérico com catálogo exaustivo. O núcleo do projeto é a **Camiseta ALTA7**, permitindo ao cliente montar sua versão customizada escolhendo:
- **Modelo** (Feminino ou Masculino)
- **Cor** (Preta, Branca, Verde, Azul-Marinho, Vinho Bordô)
- **Tecido** (Cotton ou Malha 30.1, conforme a modelagem)
- **Estampa Editorial** (ART.01 a ART.04)
- **Tamanho** (P, M, G, GG)
- **Quantidade**

A conclusão do pedido é realizada através do **WhatsApp** com uma mensagem estruturada dinamicamente.

---

## Tech Stack & Arquitetura
- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilização:** CSS Variables Design Tokens + CSS Modules
- **Data Architecture:** Source of Truth centralizado em `src/data/product.ts`
- **Composição Visual:** Engine de camadas transparentes (Base + Branding + Arte) para evitar matrizes estáticas de 135 imagens.

---

## 📁 Estrutura de Diretórios
```text
├── public/                 # Assets estáticos (bases, estampas, tecidos, lifestyle)
├── referencias/            # Mockups de referência visual mobile (5 telas principais)
├── src/
│   ├── app/                # Rotas App Router e layout global
│   ├── components/         # Componentes modulares (hero, configurator, product, order, ui)
│   ├── data/               # Fonte central de dados do produto (product.ts)
│   ├── lib/                # Funções utilitárias (pricing.ts, whatsapp.ts, storage.ts)
│   ├── styles/             # Design Tokens CSS (tokens.css)
│   └── types/              # Definições de tipos TypeScript (product.ts)
├── AGENTS.md               # Guia operacional detalhado para desenvolvimento com agentes
└── README.md
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js `v20+` ou `v24+`
- npm `v10+`

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm run start
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🎨 Referências Visuais
As referências visuais oficiais do projeto estão armazenadas na pasta `/referencias`:
1. `hero tela principal.png` (Screen 1 - Hero & Desejo)
2. `seleçao da cor e do tecido.png` (Screen 2 - Configurador Principal)
3. `seleçao da estampa.png` (Screen 3 - Galeria de Artes)
4. `tecidos e detalhes.png` (Screen 4 - Tecidos & Acabamentos)
5. `pedido confirmado.png` (Screen 5/6 - Revisão & WhatsApp)

Consulte o arquivo [`AGENTS.md`](./AGENTS.md) para diretrizes de contribuição e regras de desenvolvimento.
