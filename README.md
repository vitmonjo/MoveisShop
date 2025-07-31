# 🛒 MoveisShop - E-commerce de Móveis

Uma aplicação web moderna e responsiva para venda de móveis online, desenvolvida com JavaScript vanilla, HTML5 e CSS3 (Tailwind CSS).

## 📝 Descrição do Projeto

Este projeto é um e-commerce completo para uma loja de móveis, oferecendo uma experiência de compra intuitiva e moderna. A aplicação permite aos usuários navegar por diferentes categorias de produtos, pesquisar itens específicos, adicionar produtos ao carrinho e finalizar compras com controle de estoque em tempo real.

## ✨ Funcionalidades

### 🏠 **Catálogo de Produtos**
- Exibição de produtos em cards organizados
- Informações detalhadas: nome, categoria, preço e estoque
- Status visual para produtos esgotados
- Layout responsivo e moderno

<img width="1140" height="1147" alt="image" src="https://github.com/user-attachments/assets/71a3c699-7320-4231-92e5-f39f5e92d207" />

### 🔍 **Sistema de Pesquisa**
- Busca em tempo real por nome do produto
- Interface intuitiva com barra de pesquisa
- Resultados filtrados instantaneamente

<img width="1102" height="751" alt="image" src="https://github.com/user-attachments/assets/a9e10990-f2e2-43fa-889e-5f39fcd7ffd9" />

### 📂 **Filtros por Categoria**
- Navegação por categorias: Sala de Estar, Quarto, Cozinha
- Filtro "Todos os Produtos" para visualização completa
- Atualização dinâmica do título da página

<img width="1109" height="1119" alt="image" src="https://github.com/user-attachments/assets/2ce00dbc-6767-4fb0-a394-6d3736defeaf" />

### 🛒 **Carrinho de Compras Inteligente**
- Adição/remoção de produtos com feedback visual
- Controle de quantidade com botões + e -
- Contador de itens no ícone do carrinho
- Cálculo automático do total da compra
- Validação de estoque em tempo real

<img width="1122" height="1305" alt="image" src="https://github.com/user-attachments/assets/22811513-0d43-45b6-9dc4-74a8e0804916" />

### 📦 **Controle de Estoque Avançado**
- Estoque dinâmico que considera itens no carrinho
- Prevenção de compras acima da quantidade disponível
- Desconto automático do estoque após finalização da compra
- Atualização visual em tempo real

<img width="1128" height="656" alt="image" src="https://github.com/user-attachments/assets/afe0d4ed-727e-4b26-9c0e-15ab0a978822" />

### ✅ **Sistema de Checkout**
- Processo de finalização simples e direto
- Modal de confirmação de compra bem-sucedida
- Limpeza automática do carrinho após compra

<img width="1123" height="904" alt="image" src="https://github.com/user-attachments/assets/f7da8d2e-a652-4e59-b05e-30d548acd438" />

## 🚀 Tecnologias Utilizadas

### **Frontend**
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** - Estrutura semântica
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** - Estilização
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Framework de CSS utilitário
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript ES6+** - Lógica da aplicação

### **Recursos Externos**
- **Font Awesome** - Ícones vetoriais
- **Google Fonts** - Tipografia moderna

### **Arquitetura**
- **Modular JavaScript** - Separação de responsabilidades
- **ES6 Modules** - Importação de dados
- **DOM Manipulation** - Interatividade nativa
- **Local State Management** - Controle de estado da aplicação

## 📋 Como Executar o Projeto

### **Pré-requisitos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (recomendado para módulos ES6)

### **Passo a Passo**

#### **1. Clone o Repositório**
```bash
git clone git@github.com:vitmonjo/MoveisShop.git
cd MoveisShop
```

#### **2. Estrutura de Arquivos**
Certifique-se de que sua estrutura está organizada assim:
```
MoveisShop/
├── index.html
├── styles.css
├── script.js
├── products.js
├── images/
│   ├── produto1.jpg
│   ├── produto2.jpg
│   └── ...
└── README.md
```

#### **3. Configure o Servidor Local**

**VS Code com Live Server Extension**
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

#### **4. Acesse a Aplicação**
- Abra seu navegador
- Acesse: `http://localhost:8000` (ou a porta indicada pelo seu servidor)

### **🔧 Configuração dos Produtos**

O arquivo `products.js` contém o catálogo de produtos. Para adicionar novos produtos:

```javascript
// products.js
const products = [
    {
        id: 1,
        nome: "Nome do Produto",
        categoria: "sala", // "sala", "quarto", "cozinha"
        valor: 999.99,
        quantidade: 10,
        imagem: "./assets/images/produto.jpg"
    },
    // ... mais produtos
]

export default products;
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Gostou do projeto? Deixe uma estrela!**
