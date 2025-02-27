// Sample product data
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 29.99,
        image: 'https://via.placeholder.com/250',
        description: 'This is a description for Product 1.'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 39.99,
        image: 'https://via.placeholder.com/250',
        description: 'This is a description for Product 2.'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 49.99,
        image: 'https://via.placeholder.com/250',
        description: 'This is a description for Product 3.'
    },
    {
        id: 4,
        name: 'Product 4',
        price: 59.99,
        image: 'https://via.placeholder.com/250',
        description: 'This is a description for Product 4.'
    }
];

// Cart functionality
let cart = [];

// DOM elements
const featuredProductsContainer = document.getElementById('featured-products');
const cartCountElement = document.querySelector('.cart-count');

// Display featured products
function displayFeaturedProducts() {
    featuredProductsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        featuredProductsContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart functionality
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateCartCount();
        showAddedToCartMessage(product.name);
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Show "Added to Cart" message
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.classList.add('cart-message');
    message.textContent = `${productName} added to cart!`;

    document.body.appendChild(message);

    // Remove message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Initialize the store
function initStore() {
    displayFeaturedProducts();
    updateCartCount();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initStore);
