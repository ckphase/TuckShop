// Demo data
let products = [
    { id: 1, name: "Awesome Product", price: 99.99, description: "This is amazing!" },
    { id: 2, name: "Cool Gadget", price: 149.99, description: "You need this!" }
];

let orders = [
    { id: 1, product: "Awesome Product", customer: "John Doe", status: "Pending" },
    { id: 2, product: "Cool Gadget", customer: "Jane Smith", status: "Shipped" }
];

// Initialize stats with random data
function initializeStats() {
    document.getElementById('todaySales').textContent = (Math.random() * 1000).toFixed(2);
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
    
    // Update active state in navigation
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
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;

    if (!name || !price || !description) {
        alert('Please fill in all fields');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
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
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="deleteProduct(${product.id})" class="action-btn">Delete</button>
        `;
        productList.appendChild(productCard);
        
        // Add fade-in animation
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
        
        // Add staggered animation
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
    
    // Add initial animations
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        updateStatsAnimation();
    }, 100);
};