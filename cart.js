// Cart functionality
// Remove the variable declarations since they're already defined in script.js
// let cart = [];
// let cartCount = 0;
// let currentLang = 'en';

// Load cart data when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data from localStorage
    const savedCart = localStorage.getItem('cartItems');
    const savedCount = localStorage.getItem('cartCount');
    const savedLang = localStorage.getItem('currentLang');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    if (savedCount) {
        cartCount = parseInt(savedCount);
    }
    if (savedLang) {
        currentLang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }

    // Display cart items and update summary
    displayCartItems();
    updateCartSummary();
    updateCartCount();
});

// Function to display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>${currentLang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}</p>
                <a href="index.html" class="continue-shopping">
                    ${currentLang === 'ar' ? 'العودة للتسوق' : 'Continue Shopping'}
                </a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => {
        // Get translated product name from translations object
        const translatedProduct = translations[currentLang].products[item.id];
        const productName = translatedProduct ? translatedProduct.name : item.name;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${productName}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${productName}</h3>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity-value">1</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Function to update quantity
function updateQuantity(index, change) {
    const quantityElement = document.querySelectorAll('.quantity-value')[index];
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
    updateCartSummary();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    cartCount--;
    updateLocalStorage();
    updateCartCount();
    displayCartItems();
    updateCartSummary();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = currentLang === 'ar' ? 'تم إزالة المنتج من السلة' : 'Item removed from cart';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Function to update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    if (!subtotalElement || !shippingElement || !totalElement) return;

    let subtotal = 0;
    cart.forEach((item, index) => {
        const quantity = parseInt(document.querySelectorAll('.quantity-value')[index]?.textContent || 1);
        subtotal += item.price * quantity;
    });

    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
}

// Function to format price
function formatPrice(price) {
    return currentLang === 'ar' ? `${(price * 30.90).toFixed(2)} ج.م` : `$${price.toFixed(2)}`;
}

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('currentLang', currentLang);
}

// Function to update cart count in the UI
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Add translations for cart page
translations.en.cart = {
    title: "Shopping Cart",
    summary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    checkout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",
    empty: "Your cart is empty"
};

translations.ar.cart = {
    title: "سلة التسوق",
    summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    total: "الإجمالي",
    checkout: "إتمام الشراء",
    continueShopping: "مواصلة التسوق",
    empty: "سلة التسوق فارغة"
};

// Add event listener for language change
document.addEventListener('languageChanged', function() {
    displayCartItems();
    updateCartSummary();
}); 