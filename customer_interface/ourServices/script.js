// Product data
const products = [
    {
        id: 1,
        name: "Notebook (A4)",
        prices: {
            Block32Shop: 50,
            CSEBlockShop: 48,
            MainBuildingShop: 45,
            GirlsHostelShop: 50
        },
        category: "stationery",
        rating: 4.2,
        availability: false,
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80"
    },
    {
        id: 2,
        name: "Notebook (B5)",
        prices: {
            Block32Shop: 45,
            CSEBlockShop: 42,
            MainBuildingShop: 40,
            GirlsHostelShop: 45
        },
        category: "stationery",
        rating: 4.1,
        availability: true,
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80"
    },
    {
        id: 3,
        name: "Register (200 Pages)",
        prices: {
            Block32Shop: 80,
            CSEBlockShop: 78,
            MainBuildingShop: 75,
            GirlsHostelShop: 80
        },
        category: "stationery",
        rating: 4.5,
        availability: true,
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80"
    },
    {
        id: 4,
        name: "Resistors (Pack of 10)",
        prices: {
            Block32Shop: 30,
            CSEBlockShop: 32,
            MainBuildingShop: 30,
            GirlsHostelShop: 30
        },
        category: "electronics",
        rating: 4.7,
        availability: true,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=80"
    },
    {
        id: 5,
        name: "Capacitors (10uF, Pack of 5)",
        prices: {
            Block32Shop: 20,
            CSEBlockShop: 22,
            MainBuildingShop: 20,
            GirlsHostelShop: 21
        },
        category: "electronics",
        rating: 4.6,
        availability: true,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=80"
    },
    {
        id: 6,
        name: "Small Switch",
        prices: {
            Block32Shop: 15,
            CSEBlockShop: 18,
            MainBuildingShop: 15,
            GirlsHostelShop: 17
        },
        category: "electronics",
        rating: 4.3,
        availability: true,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=80"
    },
    {
        id: 7,
        name: "Breadboard",
        prices: {
            Block32Shop: 100,
            CSEBlockShop: 98,
            MainBuildingShop: 95,
            GirlsHostelShop: 99
        },
        category: "electronics",
        rating: 4.8,
        availability: true,
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&q=80"
    },
    {
        id: 8,
        name: "Glue Stick",
        prices: {
            Block32Shop: 25,
            CSEBlockShop: 27,
            MainBuildingShop: 25,
            GirlsHostelShop: 26
        },
        category: "stationery",
        rating: 4.6,
        availability: true,
        image: "https://images.unsplash.com/photo-1580910365203-7c0df32cbb34?w=300&q=80"
    },
    {
        id: 9,
        name: "AA Batteries (Pack of 4)",
        prices: {
            Block32Shop: 60,
            CSEBlockShop: 58,
            MainBuildingShop: 55,
            GirlsHostelShop: 59
        },
        category: "electronics",
        rating: 4.5,
        availability: true,
        image: "https://images.unsplash.com/photo-1580910365203-7c0df32cbb34?w=300&q=80"
    },
    {
        id: 10,
        name: "Lays Classic",
        prices: {
            Block32Shop: 20,
            CSEBlockShop: 22,
            MainBuildingShop: 20,
            GirlsHostelShop: 21
        },
        category: "snacks",
        rating: 4.5,
        availability: true,
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80"
    }
]

// State management
let cart = [];
let selectedProduct = null;
let selectedShop = null;

// DOM elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const productsGrid = document.getElementById('productsGrid');
const priceComparison = document.querySelector('.price-comparison');
const comparisonGrid = document.getElementById('comparisonGrid');
const closeComparisonBtn = document.querySelector('.close-comparison');
const addToCartBtn = document.getElementById('addToCartBtn');
const shareBtn = document.getElementById('shareBtn');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');

// Helper functions
function getBestPrice(prices) {
    return Math.min(...Object.values(prices));
}

function getBestShop(prices) {
    const bestPrice = getBestPrice(prices);
    return Object.entries(prices).find(([, price]) => price === bestPrice)[0];
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Cart functions
function toggleCart() {
    cartModal.classList.toggle('active');
    updateCart();
}

function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '₹0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.product.name}</div>
                    <div class="cart-item-shop">${item.shop}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.product.id})">×</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `₹${total}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        updateCart();
        showToast('Cart updated');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
    showToast('Item removed from cart');
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Compare prices for a product
function comparePrices(product) {
    selectedProduct = product;
    selectedShop = null;
    priceComparison.classList.add('active');
    const bestPrice = getBestPrice(product.prices);
    
    comparisonGrid.innerHTML = Object.entries(product.prices)
        .map(([shop, price]) => `
            <div class="shop-price ${price === bestPrice ? 'best-price' : ''}"
                 onclick="selectShop('${shop}')">
                <h3>${shop}</h3>
                <p class="price">₹${price}</p>
                ${price === bestPrice ? '<p class="best-price-tag">Best Price! 🏆</p>' : ''}
            </div>
        `).join('');

    priceComparison.scrollIntoView({ behavior: 'smooth' });
}

// Select shop for purchase
function selectShop(shop) {
    selectedShop = shop;
    document.querySelectorAll('.shop-price').forEach(el => {
        el.style.opacity = el.querySelector('h3').textContent === shop ? '1' : '0.6';
    });
}

// Add to cart
function addToCart() {
    if (!selectedProduct || !selectedShop) {
        showToast('Please select a shop first!');
        return;
    }

    if (!selectedProduct.availability) {
        showToast('Sorry, this product is out of stock!');
        return;
    }

    const existingItem = cart.find(item => 
        item.product.id === selectedProduct.id && 
        item.shop === selectedShop
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: selectedProduct,
            shop: selectedShop,
            price: selectedProduct.prices[selectedShop],
            quantity: 1
        });
    }

    updateCart();
    showToast('Added to cart successfully!');
    priceComparison.classList.remove('active');
}

// Sort products
function sortProducts(products) {
    const sortValue = sortFilter.value;
    return [...products].sort((a, b) => {
        if (sortValue === 'price-low') {
            return getBestPrice(a.prices) - getBestPrice(b.prices);
        } else if (sortValue === 'price-high') {
            return getBestPrice(b.prices) - getBestPrice(a.prices);
        } else if (sortValue === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });
}

// Filter and display products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    filteredProducts = sortProducts(filteredProducts);
    displayProducts(filteredProducts);
}

// Display products in the grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = productsToShow.map(product => {
        const bestPrice = getBestPrice(product.prices);
        const bestShop = getBestShop(product.prices);
        
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-header">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            ★ ${product.rating}
                        </div>
                    </div>
                    <div class="product-location">
                        📍 Best price at ${bestShop}
                    </div>
                    <div class="product-footer">
                        <span class="product-price">₹${bestPrice}</span>
                        <div class="product-status">
                            <span class="status-text ${product.availability ? 'available' : 'unavailable'}">
                                ${product.availability ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                    <button class="compare-button" onclick='comparePrices(${JSON.stringify(product)})'>
                        Compare Prices
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Share product
function shareProduct() {
    if (!selectedProduct) return;
    
    const shareData = {
        title: 'Check this product on Tuckline',
        text: `${selectedProduct.name} - Best price: ₹${getBestPrice(selectedProduct.prices)}`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('Shared successfully!'))
            .catch(() => showToast('Error sharing product'));
    } else {
        showToast('Sharing is not supported on this device');
    }
}

// Event listeners
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
sortFilter.addEventListener('change', filterProducts);
closeComparisonBtn.addEventListener('click', () => priceComparison.classList.remove('active'));
addToCartBtn.addEventListener('click', addToCart);
shareBtn.addEventListener('click', shareProduct);

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartModal.classList.contains('active') && 
        !cartModal.contains(e.target) && 
        !e.target.closest('.cart-icon')) {
        cartModal.classList.remove('active');
    }
});

// Initial display
displayProducts(products);
updateCart();
