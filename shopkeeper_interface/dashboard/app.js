// Demo data
let products = [
    { id: 1, name: "Ballpoint Pens", price: 5, description: "Smooth writing, long-lasting ink!" },
    { id: 2, name: "Gel Pens", price: 10, description: "Vibrant colors, smooth gel ink!" },
    { id: 3, name: "Pencils (HB/2B)", price: 10, description: "Ideal for drawing and writing" },
    { id: 4, name: "Erasers", price: 15, description: "Clean erasing, smudge-free finish" },
    { id: 5, name: "Sharpeners", price: 5, description: "Sharp blades, compact and durable"},
    { id: 6, name: "Rulers (15cm)", price: 20, description: "Clear markings, flexible plastic build" },
    { id: 7, name: "Notebooks (Single/Double Line)", price: 40, description: "Thick pages, sturdy cover notebook" },
    { id: 8, name: "Sticky Notes", price: 30, description: "Bright colors, easy to peel and stick" },   
    { id: 9, name: "Highlighters", price: 25, description: "Fluorescent colors, chisel tip" },
    { id: 10, name: "Markers", price: 50, description: "Bold colors, quick-drying ink" },
    { id: 11, name: "Whiteboard Markers", price: 60, description: "Erasable ink, vibrant colors" },
    { id: 12, name: "Colored Pencils", price: 100, description: "Smooth application, rich colors" },
    { id: 13, name: "Sketch Pens", price: 80, description: "Fine tip, assorted colors" },
    { id: 14, name: "Glue Sticks", price: 30, description: "Strong adhesive, mess-free application" },
    { id: 15, name: "Tape Dispenser", price: 50, description: "Easy to use, refillable tape dispenser" },
    { id: 16, name: "Scissors", price: 70, description: "Sharp blades, ergonomic handle" },
    { id: 17, name: "Stapler", price: 150, description: "Durable metal construction, easy to use" },
    { id: 18, name: "Paper Clips", price: 20, description: "Strong grip, assorted sizes" },
    { id: 19, name: "Binder Clips", price: 25, description: "Strong grip, assorted sizes" },
    { id: 20, name: "File Folders", price: 40, description: "Durable plastic, assorted colors" }
];

let orders = [
    { id: 1, product: "Stapler", customer: "Chandanpreet", status: "Pending" },
    { id: 2, product: "Gel Pens", customer: "Deepali Singh", status: "Shipped" },
    { id: 3, product: "Colored Pencils", customer: "Aarav", status: "Pending" },
    { id: 4, product: "Highlighters", customer: "Riya Sharma", status: "Shipped" },
    { id: 5, product: "Markers", customer: "Kabir", status: "Pending" },
    { id: 6, product: "Erasers", customer: "Ananya", status: "Shipped" },
    { id: 7, product: "Tape Dispenser", customer: "Ishaan", status: "Pending" },
    { id: 8, product: "Scissors", customer: "Tanvi", status: "Shipped" },
    { id: 9, product: "Sticky Notes", customer: "Nisha", status: "Pending" },
    { id: 10, product: "File Folders", customer: "Arjun", status: "Shipped" }
];

// Initialize stats with random data
function initializeStats() {
    document.getElementById('todaySales').textContent = (Math.random() * 100 * 83).toFixed(2);
    document.getElementById('activeProducts').textContent = products.length;
    document.getElementById('pendingOrders').textContent = orders.filter(o => o.status === "Pending").length;
    document.getElementById('happyCustomers').textContent = Math.floor(Math.random() * 100);
    updateStatsAnimation();
}

// Add animation to stats
function updateStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Navigation with smooth transitions
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.style.color = btn.onclick.toString().includes(sectionId) ? 
            'var(--primary-color)' : 'var(--text-color)';
    });
}

// Products with enhanced UI
function showAddProductForm() {
    const form = document.getElementById('productForm');
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) {
        document.getElementById('productName').focus();
    }
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const priceUSD = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;

    if (!name || !priceUSD || !description) {
        alert('Please fill in all fields');
        return;
    }

    const priceINR = priceUSD * 83;

    const newProduct = {
        id: products.length + 1,
        name,
        price: priceINR,
        description
    };

    products.push(newProduct);
    renderProducts();
    document.getElementById('productForm').classList.add('hidden');
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    updateStats();
    showConfetti();
}

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="deleteProduct(${product.id})" class="action-btn">Delete</button>
        `;
        productList.appendChild(productCard);
        
        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

function deleteProduct(id) {
    const productToDelete = document.querySelector(`[onclick="deleteProduct(${id})"]`).parentElement;
    productToDelete.style.transform = 'translateX(100px)';
    productToDelete.style.opacity = '0';
    
    setTimeout(() => {
        products = products.filter(p => p.id !== id);
        renderProducts();
        updateStats();
    }, 300);
}

// Orders with enhanced UI
function renderOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    orders.forEach((order, index) => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <h3>Order #${order.id}</h3>
                <p>Product: ${order.product}</p>
                <p>Customer: ${order.customer}</p>
            </div>
            <div>
                <span class="status ${order.status.toLowerCase()}">${order.status}</span>
                <button onclick="updateOrderStatus(${order.id})" class="action-btn">
                    ${order.status === 'Pending' ? 'Mark Shipped' : 'Mark Pending'}
                </button>
            </div>
        `;
        orderList.appendChild(orderItem);
        
        setTimeout(() => {
            orderItem.style.opacity = '1';
            orderItem.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function updateOrderStatus(id) {
    const order = orders.find(o => o.id === id);
    if (order) {
        const orderElement = document.querySelector(`[onclick="updateOrderStatus(${id})"]`).parentElement.parentElement;
        orderElement.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            order.status = order.status === 'Pending' ? 'Shipped' : 'Pending';
            renderOrders();
            updateStats();
            orderElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Stats update with animation
function updateStats() {
    const activeProducts = document.getElementById('activeProducts');
    const pendingOrders = document.getElementById('pendingOrders');
    
    activeProducts.style.transform = 'scale(1.1)';
    pendingOrders.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        activeProducts.textContent = products.length;
        pendingOrders.textContent = orders.filter(o => o.status === "Pending").length;
        activeProducts.style.transform = 'scale(1)';
        pendingOrders.style.transform = 'scale(1)';
    }, 200);
}

// Enhanced confetti effect
function showConfetti() {
    const colors = ['#6366f1', '#818cf8', '#c084fc', '#f472b6', '#fb923c'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Initialize with smooth animations
window.onload = () => {
    initializeStats();
    renderProducts();
    renderOrders();
    showSection('dashboard');

    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        updateStatsAnimation();
    }, 100);
};

document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    fromCurrency.value = "USD";
    toCurrency.value = "INR";

    convertCurrency();
});

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    let converted = 0;
    let symbol = "";

    if (from === "USD" && to === "INR") {
        converted = amount * 83;
        symbol = "₹";
    }

    document.getElementById("result").textContent = `${symbol}${converted.toFixed(2)}`;
}
