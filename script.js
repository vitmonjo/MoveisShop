// Estado da aplicação
let cart = []
import products from './products.js'
let currentProducts = [...products]
let currentCategory = "all"

// Elementos DOM
const productsGrid = document.getElementById("productsGrid")
const cartBtn = document.getElementById("cartBtn")
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const closeCartBtn = document.getElementById("closeCartBtn")
const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")
const emptyCart = document.getElementById("emptyCart")
const cartFooter = document.getElementById("cartFooter")
const checkoutBtn = document.getElementById("checkoutBtn")
const successModal = document.getElementById("successModal")
const closeSuccessBtn = document.getElementById("closeSuccessBtn")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const pageTitle = document.getElementById("pageTitle")
const noProducts = document.getElementById("noProducts")

/**
 * Inicializa a aplicação quando o DOM é carregado
 */
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products)
    updateCartUI()
    setupEventListeners()
})

/**
 * Configura todos os event listeners da aplicação
 */
function setupEventListeners() {
    cartBtn.addEventListener("click", openCart)
    closeCartBtn.addEventListener("click", closeCart)
    checkoutBtn.addEventListener("click", checkout)
    closeSuccessBtn.addEventListener("click", closeSuccessModal)
    searchBtn.addEventListener("click", searchProducts)
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchProducts()
        }
    })

    // Fechar modais clicando fora
    cartModal.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            closeCart()
        }
    })

    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) {
            closeSuccessModal()
        }
    })
}

/**
 * Exibe os produtos na grade de produtos
 * @param {Array} productsToShow - Array de produtos para exibir
 */
function displayProducts(productsToShow) {
    productsGrid.innerHTML = ""

    if (productsToShow.length === 0) {
        noProducts.classList.remove("hidden")
        return
    }

    noProducts.classList.add("hidden")

    productsToShow.forEach((product) => {
        const productCard = createProductCard(product)
        productsGrid.appendChild(productCard)
    })
}

/**
 * Cria um card de produto
 * @param {Object} product - Objeto do produto
 * @returns {HTMLElement} - Elemento do card do produto
 */
function createProductCard(product) {
    const card = document.createElement("div")
    const availableStock = getAvailableStock(product.id)
    const isOutOfStock = availableStock === 0

    card.className = `product-card bg-white rounded-lg shadow-md overflow-hidden ${isOutOfStock ? "out-of-stock" : ""}`

    card.innerHTML = `
        <div class="relative">
            <img src="${product.imagem}" alt="${product.nome}" class="w-full h-48 object-cover">
            ${isOutOfStock ? '<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="text-white font-bold text-lg">ESGOTADO</span></div>' : ""}
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-2 text-gray-800">${product.nome}</h3>
            <p class="text-sm text-gray-600 mb-2">Categoria: ${getCategoryName(product.categoria)}</p>
            <p class="text-sm text-gray-600 mb-3">Estoque: ${availableStock} unidades</p>
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-green-600">R$ ${formatPrice(product.valor)}</span>
                <button 
                    onclick="addToCart(${product.id})" 
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}"
                    ${isOutOfStock ? "disabled" : ""}
                >
                    <i class="fas fa-cart-plus mr-1"></i>
                    ${isOutOfStock ? "Esgotado" : "Adicionar"}
                </button>
            </div>
        </div>
    `

    return card
}

/**
 * Converte o código da categoria para nome legível
 * @param {string} category - Código da categoria
 * @returns {string} - Nome da categoria
 */
function getCategoryName(category) {
    const categories = {
        sala: "Sala de Estar",
        quarto: "Quarto",
        cozinha: "Cozinha",
    }
    return categories[category] || category
}

/**
 * Calcula o estoque disponível de um produto (estoque original - quantidade no carrinho)
 * @param {number} productId - ID do produto
 * @returns {number} - Quantidade disponível em estoque
 */
function getAvailableStock(productId) {
    const product = products.find(p => p.id === productId)
    if (!product) return 0

    const cartItem = cart.find(item => item.id === productId)
    const quantityInCart = cartItem ? cartItem.quantity : 0

    return product.quantidade - quantityInCart
}

/**
 * Adiciona um produto ao carrinho
 * @param {number} productId - ID do produto a ser adicionado
 */
function addToCart(productId) {
    const product = products.find((p) => p.id === productId)

    if (!product) {
        alert("Produto não encontrado!")
        return
    }

    const availableStock = getAvailableStock(productId)

    // Verifica se tem estoque disponível
    if (availableStock === 0) {
        alert("Produto fora de estoque!")
        return
    }

    const cartItem = cart.find((item) => item.id === productId)

    if (cartItem) {
        cartItem.quantity++
    } else {
        cart.push({
            id: product.id,
            nome: product.nome,
            valor: product.valor,
            imagem: product.imagem,
            quantity: 1,
        })
    }

    updateCartUI()
    showAddToCartFeedback()
    // Atualiza a exibição dos produtos para refletir o novo estoque
    displayProducts(currentProducts)
}

/**
 * Remove um produto completamente do carrinho
 * @param {number} productId - ID do produto a ser removido
 */
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId)
    updateCartUI()
    displayCartItems()
    // Atualiza a exibição dos produtos para refletir o novo estoque
    displayProducts(currentProducts)
}

/**
 * Atualiza a quantidade de um produto no carrinho
 * @param {number} productId - ID do produto
 * @param {number} newQuantity - Nova quantidade
 */
function updateCartQuantity(productId, newQuantity) {
    const cartItem = cart.find((item) => item.id === productId)
    const product = products.find((p) => p.id === productId)

    if (newQuantity <= 0) {
        removeFromCart(productId)
        return
    }

    // Verifica se a nova quantidade não excede o estoque original
    if (newQuantity > product.quantidade) {
        alert(`Quantidade máxima em estoque: ${product.quantidade}`)
        return
    }

    if (cartItem) {
        cartItem.quantity = newQuantity
        updateCartUI()
        displayCartItems()
        // Atualiza a exibição dos produtos para refletir o novo estoque
        displayProducts(currentProducts)
    }
}

/**
 * Atualiza a interface do carrinho (contador de itens)
 */
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
}

/**
 * Exibe feedback visual quando um item é adicionado ao carrinho
 */
function showAddToCartFeedback() {
    cartBtn.classList.add("animate-pulse")
    setTimeout(() => {
        cartBtn.classList.remove("animate-pulse")
    }, 500)
}

/**
 * Abre o modal do carrinho
 */
function openCart() {
    displayCartItems()
    cartModal.classList.remove("hidden")
}

/**
 * Fecha o modal do carrinho
 */
function closeCart() {
    cartModal.classList.add("hidden")
}

/**
 * Exibe os itens do carrinho no modal
 */
function displayCartItems() {
    if (cart.length === 0) {
        emptyCart.classList.remove("hidden")
        cartFooter.classList.add("hidden")
        cartItems.innerHTML = ""
        return
    }

    emptyCart.classList.add("hidden")
    cartFooter.classList.remove("hidden")

    cartItems.innerHTML = ""
    let total = 0

    cart.forEach((item) => {
        total += item.valor * item.quantity

        const cartItem = document.createElement("div")
        cartItem.className = "flex items-center justify-between p-4 border border-gray-200 rounded-lg"

        cartItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
                <div>
                    <h4 class="font-semibold">${item.nome}</h4>
                    <p class="text-gray-600">R$ ${formatPrice(item.valor)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300">-</button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300">+</button>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 ml-4">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `

        cartItems.appendChild(cartItem)
    })

    cartTotal.textContent = formatPrice(total)
}

/**
 * Finaliza a compra
 */
function checkout() {
    if (cart.length === 0) {
        alert("Carrinho vazio!")
        return
    }

    // Atualiza o estoque dos produtos (desconta as quantidades compradas)
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id)
        if (product) {
            product.quantidade -= cartItem.quantity
        }
    })

    // Limpa o carrinho
    cart = []
    updateCartUI()
    closeCart()

    // Atualiza a exibição dos produtos com o novo estoque
    displayProducts(currentProducts)

    // Mostra modal de sucesso
    successModal.classList.remove("hidden")
}

/**
 * Fecha o modal de sucesso
 */
function closeSuccessModal() {
    successModal.classList.add("hidden")
}

/**
 * Filtra produtos por categoria
 * @param {string} category - Categoria a ser filtrada
 */
function filterByCategory(category) {
    currentCategory = category
    currentProducts = products.filter((product) => product.categoria === category)
    displayProducts(currentProducts)
    pageTitle.textContent = `${getCategoryName(category)}`
}

/**
 * Exibe todos os produtos
 */
function showAllProducts() {
    currentCategory = "all"
    currentProducts = [...products]
    displayProducts(currentProducts)
    pageTitle.textContent = "Todos os Produtos"
}

/**
 * Realiza a pesquisa de produtos
 */
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
        showAllProducts()
        return
    }

    const filteredProducts = products.filter((product) =>
        product.nome.toLowerCase().includes(searchTerm)
    )

    currentProducts = filteredProducts
    displayProducts(filteredProducts)
    pageTitle.textContent = `Resultados para: "${searchTerm}"`
}

/**
 * Formata um valor monetário para o padrão brasileiro
 * @param {number} price - Valor a ser formatado
 * @returns {string} - Valor formatado
 */
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",")
}

// Exporta funções para uso global
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateCartQuantity = updateCartQuantity
window.filterByCategory = filterByCategory
window.showAllProducts = showAllProducts