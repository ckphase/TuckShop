// Get cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
let orderTotal = 0;

// DOM Elements
const checkoutItems = document.getElementById('checkoutItems');
const subtotalElement = document.getElementById('subtotal');
const orderTotalElement = document.getElementById('orderTotal');
const deliveryForm = document.getElementById('deliveryForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const toast = document.getElementById('toast');

// Helper function to show toast messages
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Display order items and calculate totals
function displayOrderSummary() {
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    let subtotal = 0;
    const deliveryFee = 10;

    checkoutItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="checkout-item">
                <div class="item-details">
                    <h3>${item.product.name}</h3>
                    <p>From: ${item.shop}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="item-price">₹${itemTotal}</div>
            </div>
        `;
    }).join('');

    orderTotal = subtotal + deliveryFee;
    subtotalElement.textContent = `₹${subtotal}`;
    orderTotalElement.textContent = `₹${orderTotal}`;
}

// Handle order placement
function placeOrder(e) {
    e.preventDefault();

    // Basic form validation
    const formData = new FormData(deliveryForm);
    const formFields = ['name', 'email', 'phone', 'hostel', 'room'];
    const isEmpty = formFields.some(field => !document.getElementById(field).value.trim());

    if (isEmpty) {
        showToast('Please fill in all delivery information');
        return;
    }

    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Create order object
    const order = {
        id: Date.now(),
        items: cart,
        delivery: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            hostel: document.getElementById('hostel').value,
            room: document.getElementById('room').value
        },
        payment: paymentMethod,
        total: orderTotal,
        status: 'pending'
    };

    // Save order (in a real app, this would be sent to a server)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message
    showToast('Order placed successfully!');

    // Redirect to confirmation page (you can create this later)
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Event listeners
placeOrderBtn.addEventListener('click', placeOrder);

// Initialize page
displayOrderSummary();
