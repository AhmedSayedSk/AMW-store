// Cart functionality
let cart = [];
let cartCount = 0;
let currentLang = 'en';

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

// Function to format price
function formatPrice(price) {
    return currentLang === 'ar' ? `${(price * 30.90).toFixed(2)} ج.م` : `$${price.toFixed(2)}`;
}

// Function to display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>${currentLang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}</p>
                <a href="index.html" class="continue-shopping">
                    ${currentLang === 'ar' ? 'العودة للتسوق' : 'Continue Shopping'}
                </a>
            </div>
        `;
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${formatPrice(item.price)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                ${currentLang === 'ar' ? 'إزالة' : 'Remove'}
            </button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Function to update cart summary
function updateCartSummary() {
    const summaryContainer = document.getElementById('cart-summary');
    if (!summaryContainer) return;

    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = 10; // Fixed shipping cost
    const total = subtotal + shipping;

    summaryContainer.innerHTML = `
        <h3>${currentLang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>
        <div class="summary-item">
            <span>${currentLang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-item">
            <span>${currentLang === 'ar' ? 'الشحن' : 'Shipping'}:</span>
            <span>${formatPrice(shipping)}</span>
        </div>
        <div class="summary-total">
            <span>${currentLang === 'ar' ? 'الإجمالي' : 'Total'}:</span>
            <span>${formatPrice(total)}</span>
        </div>
        <button class="checkout-button">
            ${currentLang === 'ar' ? 'إتمام الشراء' : 'Proceed to Checkout'}
        </button>
    `;
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