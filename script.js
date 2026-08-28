// Product Database
const products = [
    { code: 'AA-10001', name: 'Premium Handbag', price: 89.99, emoji: '👜', authentic: true },
    { code: 'AA-10002', name: 'Luxury Watch', price: 249.99, emoji: '⌚', authentic: true },
    { code: 'AA-10003', name: 'Designer Sneakers', price: 129.99, emoji: '👟', authentic: true },
    { code: 'AA-10004', name: 'Signature Ring', price: 199.99, emoji: '💍', authentic: true },
];

// Shopping Cart
let cart = [];
const SHIPPING_COST = 10.00;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    showSection('home');
});

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Product Verification
function verifyProduct() {
    const productCode = document.getElementById('product-code').value.toUpperCase().trim();
    const resultDiv = document.getElementById('verification-result');
    const resultContent = document.getElementById('result-content');
    
    if (!productCode) {
        alert('Please enter a product code');
        return;
    }
    
    const product = products.find(p => p.code === productCode);
    
    if (product && product.authentic) {
        resultDiv.classList.remove('unverified');
        resultDiv.classList.add('authentic');
        resultContent.innerHTML = `
            <h3>✅ Product Verified - AUTHENTIC</h3>
            <p><strong>${product.name}</strong></p>
            <p>Code: ${product.code}</p>
            <p>This product has been verified as authentic and original.</p>
        `;
    } else {
        resultDiv.classList.remove('authentic');
        resultDiv.classList.add('unverified');
        resultContent.innerHTML = `
            <h3>⚠️ Product Not Verified</h3>
            <p>Code: ${productCode}</p>
            <p>This product code could not be verified in our database.</p>
            <p>Please check the code and try again, or contact our support team.</p>
        `;
    }
    
    resultDiv.classList.remove('hidden');
}

// Display Products in Shop
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-code">Code: ${product.code}</div>
                <div class="product-verification">✅ Verified Authentic</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="addToCart('${product.code}')">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productCode) {
    const product = products.find(p => p.code === productCode);
    if (!product) return;
    
    const existingItem = cart.find(item => item.code === productCode);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            code: product.code,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    updateCart();
    alert(`${product.name} added to cart!`);
}

// Update Cart Display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
    
    // Clear cart display
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty"><p>Your cart is empty</p></div>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const itemTotal = (item.price * item.quantity).toFixed(2);
            cartItem.innerHTML = `
                <div>
                    <div class="cart-item-info">
                        <h3>${item.emoji} ${item.name}</h3>
                        <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    <div class="cart-item-price">$${itemTotal}</div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
    }
    
    updateCartTotals();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + SHIPPING_COST;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + SHIPPING_COST;
    
    const message = `
    Thank you for shopping at Abba Authentics!
    
    Order Summary:
    Items: ${cart.length}
    Subtotal: $${subtotal.toFixed(2)}
    Shipping: $${SHIPPING_COST.toFixed(2)}
    Total: $${total.toFixed(2)}
    
    In a real application, you would be redirected to a payment gateway (Stripe, PayPal, etc.)
    
    For now, please contact us at info@abbaauthentics.com to complete your order.`;
    
    alert(message);
    cart = [];
    updateCart();
    showSection('home');
}

// Contact Form Submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    alert('Thank you for contacting Abba Authentics!\n\nWe have received your message and will get back to you as soon as possible.\n\nEmail: info@abbaauthentics.com');
    
    form.reset();
}

// Product Code Input - Enter Key Support
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('product-code') === document.activeElement) {
        verifyProduct();
    }
});