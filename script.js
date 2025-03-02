// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const searchBox = document.querySelector('.search-box');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && 
        !mainNav.contains(e.target) && 
        mainNav.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            searchBox.classList.remove('active');
        }
    }, 250);
});

// Products data
const products = [
    {
        id: 1,
        name: "Gaming Laptop",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
        description: "High-performance gaming laptop"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "Premium wireless headphones"
    },
    {
        id: 3,
        name: "Smartwatch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
        description: "Smart fitness tracker watch"
    },
    {
        id: 4,
        name: "4K Monitor",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        description: "Ultra HD gaming monitor"
    },
    {
        id: 5,
        name: "Mechanical Keyboard",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
        description: "RGB mechanical gaming keyboard"
    },
    {
        id: 6,
        name: "Gaming Mouse",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        description: "High-DPI gaming mouse"
    },
    {
        id: 7,
        name: "Gaming Chair",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500",
        description: "Ergonomic gaming chair"
    },
    {
        id: 8,
        name: "Webcam",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500",
        description: "1080p HD webcam"
    },
    {
        id: 9,
        name: "Microphone",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
        description: "USB condenser microphone"
    },
    {
        id: 10,
        name: "Gaming Console",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500",
        description: "Next-gen gaming console"
    },
    {
        id: 11,
        name: "Gaming Desk",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
        description: "RGB Gaming Desk with Cable Management, LED Lighting, and Headphone Hook"
    },
    {
        id: 12,
        name: "Gaming Headset",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
        description: "Pro Gaming Headset with 7.1 Surround Sound and RGB Lighting"
    },
];

// Cart state
let cart = [];
let cartCount = 0;

// Function to update cart counin the UI
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}

// Function to format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        cartCount++;
        updateCartCount();
        
        // Show notification
        showNotification(productId);
    }
}

// Function to show notification
function showNotification(productId) {
    const product = products.find(p => p.id === productId);
    const translatedProduct = translations[currentLang].products[product.id];
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${translatedProduct.name} ${translations[currentLang].added}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Language translations
const translations = {
    en: {
        nav: {
            home: "Home",
            products: "Products",
            categories: "Categories",
            about: "About",
            contact: "Contact"
        },
        search: "Search products...",
        addToCart: "Add to Cart",
        shopNow: "Shop Now",
        welcome: "Welcome to AMW Store",
        discover: "Discover amazing products at great prices",
        featured: "Featured Products",
        copyright: "© 2023 AMW Store. All rights reserved.",
        added: "added to cart!",
        products: {
            1: { name: "Gaming Laptop", description: "High-performance gaming laptop" },
            2: { name: "Wireless Headphones", description: "Premium wireless headphones" },
            3: { name: "Smartwatch", description: "Smart fitness tracker watch" },
            4: { name: "4K Monitor", description: "Ultra HD gaming monitor" },
            5: { name: "Mechanical Keyboard", description: "RGB mechanical gaming keyboard" },
            6: { name: "Gaming Mouse", description: "High-DPI gaming mouse" },
            7: { name: "Gaming Chair", description: "Ergonomic gaming chair" },
            8: { name: "Webcam", description: "1080p HD webcam" },
            9: { name: "Microphone", description: "USB condenser microphone" },
            10: { name: "Gaming Console", description: "Next-gen gaming console" },
            11: { name: "Gaming Desk", description: "RGB Gaming Desk with Cable Management" },
            12: { name: "Gaming Headset", description: "Pro Gaming Headset with 7.1 Surround Sound and RGB Lighting" }
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            products: "المنتجات",
            categories: "الفئات",
            about: "عن المتجر",
            contact: "اتصل بنا"
        },
        search: "ابحث عن المنتجات...",
        addToCart: "أضف إلى السلة",
        shopNow: "تسوق الآن",
        welcome: "مرحباً بكم في متجر AMW",
        discover: "اكتشف منتجات مذهلة بأسعار رائعة",
        featured: "المنتجات المميزة",
        copyright: "© 2023 متجر AMW. جميع الحقوق محفوظة.",
        added: "تمت الإضافة إلى السلة!",
        products: {
            1: { name: "لابتوب للألعاب", description: "لابتوب عالي الأداء للألعاب" },
            2: { name: "سماعات لاسلكية", description: "سماعات لاسلكية فاخرة" },
            3: { name: "ساعة ذكية", description: "ساعة ذكية لتتبع اللياقة" },
            4: { name: "شاشة 4K", description: "شاشة ألعاب فائقة الدقة" },
            5: { name: "لوحة مفاتيح ميكانيكية", description: "لوحة مفاتيح RGB ميكانيكية" },
            6: { name: "فأرة ألعاب", description: "فأرة ألعاب عالية الدقة" },
            7: { name: "كرسي ألعاب", description: "كرسي ألعاب مريح" },
            8: { name: "كاميرا ويب", description: "كاميرا ويب بدقة 1080p" },
            9: { name: "ميكروفون", description: "ميكروفون USB احترافي" },
            10: { name: "جهاز ألعاب", description: "جهاز ألعاب الجيل الجديد" },
            11: { name: "مكتب ألعاب", description: "مكتب ألعاب RGB مع نظام إدارة الكابلات" },
            12: { name: "سماعة ألعاب", description: "سماعة ألعاب احترافية مع صوت محيطي 7.1 وإضاءة RGB" }
        }
    }
};

let currentLang = 'en';

// Function to update all content based on language
function updateContent(lang) {
    // Update navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    const navItems = ['home', 'products', 'categories', 'about', 'contact'];
    navLinks.forEach((link, index) => {
        link.textContent = translations[lang].nav[navItems[index]];
    });

    // Update search
    document.querySelector('.search-input').placeholder = translations[lang].search;

    // Update hero section
    document.querySelector('.hero h2').textContent = translations[lang].welcome;
    document.querySelector('.hero p').textContent = translations[lang].discover;
    document.querySelector('.hero .btn').textContent = translations[lang].shopNow;

    // Update featured products heading
    document.querySelector('.featured-products h2').textContent = translations[lang].featured;

    // Update footer
    document.querySelector('footer p').textContent = translations[lang].copyright;

    // Update products
    displayProducts(products);
}

// Enhanced display products function
function displayProducts(productsToShow) {
    const productGrid = document.getElementById('featured-products');
    productGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const translatedProduct = translations[currentLang].products[product.id];
        const productCard = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${translatedProduct.name}" onerror="this.src='https://via.placeholder.com/200'">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${translatedProduct.name}</h3>
                    <p class="product-description">${translatedProduct.description}</p>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">${translations[currentLang].addToCart}</button>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    });

    displayProducts(filteredProducts);
}

// Event listeners for search
searchButton.addEventListener('click', performSearch);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Real-time search
searchInput.addEventListener('input', performSearch);

// Language toggle event listener
const langToggleBtn = document.getElementById('langToggleBtn');
const langIndicator = document.getElementById('langIndicator');
const htmlElement = document.documentElement;

langToggleBtn.addEventListener('click', () => {
    const isRTL = htmlElement.dir === 'rtl';
    htmlElement.dir = isRTL ? 'ltr' : 'rtl';
    currentLang = isRTL ? 'en' : 'ar';
    langIndicator.textContent = isRTL ? 'EN' : 'AR';
    
    // Update all content
    updateContent(currentLang);
});

// Initialize the site in English
updateContent('en');
