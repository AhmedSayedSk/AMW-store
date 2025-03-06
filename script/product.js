document.addEventListener('DOMContentLoaded', function() {
    // ===== المتغيرات العامة =====
    // تحديد اتجاه الصفحة (من اليمين لليسار أو العكس)
    let isRTL = document.documentElement.dir === 'rtl';
    // تحديد اللغة الحالية (العربية هي الافتراضية)
    let currentLang = document.documentElement.lang || 'ar';
    // مصفوفة لتخزين منتجات سلة التسوق
    let cart = [];
    // عدد العناصر في سلة التسوق
    let cartCount = 0;
    
    // ===== عناصر DOM الخاصة بالهيدر والفوتر =====
    // زر القائمة للهواتف المحمولة
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    // قائمة التنقل الرئيسية
    const mainNav = document.querySelector('.main-nav');
    // صندوق البحث
    const searchBox = document.querySelector('.search-box');
    // زر البحث
    const searchBtn = document.querySelector('.search-button');
    // حقل إدخال البحث
    const searchInput = document.querySelector('.search-input');
    // زر تبديل اللغة
    const langToggleBtn = document.getElementById('langToggleBtn');
    // مؤشر اللغة الحالية
    const langIndicator = document.getElementById('langIndicator');
    // نموذج النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // ===== عناصر DOM الخاصة بصفحة المنتج =====
    // الصورة الرئيسية للمنتج
    const mainImage = document.querySelector('.main-image');
    // عنصر العد التنازلي للعرض
    const countdownElement = document.querySelector('.countdown');
    // زر إضافة إلى السلة
    const addToCartBtn = document.querySelector('.add-to-cart');
    // زر الشراء الآن
    const buyNowBtn = document.querySelector('.buy-now');
    // نجوم التقييم
    const stars = document.querySelectorAll('.star');
    
    // ===== تحميل تفاصيل المنتج =====
    // استخراج معرف المنتج من عنوان URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // تحميل تفاصيل المنتج إذا كان هناك معرف منتج
    if (productId) {
        loadProductDetails(productId);
    }
    
    // دالة لتحميل تفاصيل المنتج بناءً على المعرف
    function loadProductDetails(id) {
        // في الحالة الحقيقية، ستقوم بجلب البيانات من الخادم
        // لكن هنا سنستخدم بيانات وهمية للتوضيح
        
        // محاكاة طلب الشبكة
        setTimeout(() => {
            // بيانات المنتج (في التطبيق الحقيقي ستأتي من الخادم)
            const productData = getProductById(id);
            
            if (productData) {
                // تحديث عنوان الصفحة
                document.title = productData.name + ' - AMW Store';
                
                // تحديث عنوان المنتج
                const productTitle = document.querySelector('.product-title');
                if (productTitle) {
                    productTitle.textContent = productData.name;
                }
                
                // تحديث التقييمات
                if (stars && stars.length > 0 && productData.rating) {
                    // تحديث النجوم بناءً على التقييم
                    const fullStars = Math.floor(productData.rating);
                    const hasHalfStar = productData.rating - fullStars >= 0.5;
                    
                    stars.forEach((star, index) => {
                        if (index < fullStars) {
                            star.textContent = '★'; // نجمة كاملة
                        } else if (index === fullStars && hasHalfStar) {
                            star.textContent = '★'; // نجمة كاملة للتبسيط (يمكن استخدام نجمة نصفية إذا كانت متوفرة)
                        } else {
                            star.textContent = '☆'; // نجمة فارغة
                        }
                    });
                }
                
                // تحديث عدد التقييمات
                const ratingCount = document.querySelector('.rating-count');
                if (ratingCount && productData.rating && productData.reviewCount) {
                    ratingCount.textContent = `(${productData.rating} out of 5 | ${productData.reviewCount} reviews)`;
                }
                
                // تحديث نسبة الخصم
                const offerBadge = document.querySelector('.offer-badge');
                if (offerBadge && productData.discount) {
                    offerBadge.textContent = `Discount ${productData.discount}%`;
                    offerBadge.style.display = 'block';
                } else if (offerBadge) {
                    offerBadge.style.display = 'none';
                }
                
                // تحديث السعر الحالي
                const productPrice = document.querySelector('.product-price');
                if (productPrice) {
                    productPrice.textContent = formatPrice(productData.price);
                }
                
                // تحديث السعر القديم
                const oldPrice = document.querySelector('.old-price');
                if (oldPrice) {
                    if (productData.oldPrice) {
                        oldPrice.textContent = formatPrice(productData.oldPrice);
                        oldPrice.style.display = 'block';
                    } else {
                        oldPrice.style.display = 'none';
                    }
                }
                
                // تحديث مقدار التوفير
                const savings = document.querySelector('.savings');
                if (savings) {
                    if (productData.oldPrice) {
                        const savedAmount = productData.oldPrice - productData.price;
                        savings.textContent = `You saved: ${formatPrice(savedAmount)}`;
                        savings.style.display = 'block';
                    } else {
                        savings.style.display = 'none';
                    }
                }
                
                // تحديث وصف المنتج
                const productDescriptionElement = document.querySelector('.product-description p');
                if (productDescriptionElement) {
                    productDescriptionElement.textContent = productData.longDescription || productData.description;
                }
                
                // تحديث ميزات المنتج
                const productFeaturesList = document.querySelector('.product-features ul');
                if (productFeaturesList && productData.features && productData.features.length > 0) {
                    productFeaturesList.innerHTML = '';
                    productData.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        productFeaturesList.appendChild(li);
                    });
                }
                
                // استخدام الصورة المخزنة من الصفحة الرئيسية إذا كانت متوفرة
                const lastViewedProductImage = localStorage.getItem('lastViewedProductImage');
                
                // تحديث الصورة الرئيسية
                if (mainImage) {
                    if (lastViewedProductImage) {
                        // استخدام الصورة المخزنة من الصفحة الرئيسية
                        mainImage.src = lastViewedProductImage;
                        mainImage.alt = productData.name;
                    } else if (productData.images && productData.images.length > 0) {
                        // استخدام الصورة الأولى من مصفوفة الصور
                        mainImage.src = productData.images[0];
                        mainImage.alt = productData.name;
                    }
                }
                
                // مسح الصورة المخزنة بعد استخدامها
                localStorage.removeItem('lastViewedProductImage');
                
                // تحديث زر إضافة إلى السلة
                if (addToCartBtn) {
                    addToCartBtn.onclick = function() {
                        addToCart(productData.id, productData.name, productData.price);
                    };
                }
                
                // تحديث زر الشراء الآن
                if (buyNowBtn) {
                    buyNowBtn.onclick = function() {
                        addToCart(productData.id, productData.name, productData.price);
                        window.location.href = 'cart.html';
                    };
                }
            } else {
                // إذا لم يتم العثور على المنتج، عرض رسالة خطأ
                const productContainer = document.querySelector('.product-container');
                if (productContainer) {
                    productContainer.innerHTML = `
                        <div class="product-not-found">
                            <h2>المنتج غير موجود</h2>
                            <p>عذراً، لم يتم العثور على المنتج المطلوب.</p>
                            <a href="index.html" class="btn">العودة إلى الصفحة الرئيسية</a>
                        </div>
                    `;
                }
            }
        }, 300); // محاكاة تأخير الشبكة
    }
    
    // دالة للحصول على بيانات المنتج بناءً على المعرف
    function getProductById(id) {
        // هذه بيانات وهمية للتوضيح
        // في التطبيق الحقيقي، ستأتي هذه البيانات من الخادم
        const products = [
            {
                id: 1,
                name: "Gaming Laptop",
                price: 999.99,
                oldPrice: 1299.99,
                discount: 23,
                rating: 4.7,
                reviewCount: 128,
                description: "حاسوب محمول عالي الأداء مخصص للألعاب مع معالج قوي وبطاقة رسومات متطورة.",
                longDescription: "حاسوب محمول عالي الأداء مخصص للألعاب مع معالج Intel Core i7 من الجيل الحادي عشر وبطاقة رسومات NVIDIA GeForce RTX 3070. يأتي مع شاشة 15.6 بوصة بدقة Full HD ومعدل تحديث 144 هرتز، وذاكرة وصول عشوائي 16 جيجابايت، وقرص تخزين SSD بسعة 1 تيرابايت.",
                features: [
                    "معالج Intel Core i7 من الجيل الحادي عشر",
                    "بطاقة رسومات NVIDIA GeForce RTX 3070",
                    "ذاكرة وصول عشوائي 16 جيجابايت",
                    "قرص تخزين SSD بسعة 1 تيرابايت",
                    "شاشة 15.6 بوصة بدقة Full HD ومعدل تحديث 144 هرتز"
                ],
                images: [
                    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
                    "img/laptop1.jpg",
                    "img/laptop2.jpg",
                    "img/laptop3.jpg",
                    "img/laptop4.jpg"
                ]
            },
            {
                id: 2,
                name: "Wireless Headphones",
                price: 149.99,
                oldPrice: 249.99,
                discount: 40,
                rating: 4.2,
                reviewCount: 150,
                description: "سماعات لاسلكية فاخرة مع إلغاء الضوضاء النشط وجودة صوت استثنائية.",
                longDescription: "سماعات لاسلكية فاخرة مع تقنية إلغاء الضوضاء النشط وجودة صوت استثنائية. تتميز بعمر بطارية يصل إلى 20 ساعة، وتصميم مريح للاستخدام لفترات طويلة، ومقاومة للماء والعرق، مما يجعلها مثالية للاستخدام اليومي والرياضة.",
                features: [
                    "عمر بطارية يصل إلى 20 ساعة",
                    "مقاومة للماء والعرق",
                    "تحكم باللمس",
                    "جودة صوت عالية",
                    "تقنية إلغاء الضوضاء النشط"
                ],
                images: [
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                    "img/61cf5aFhqVL._AC_SL1500_.jpg",
                    "img/81gnWKQ-t5L._AC_SL1500_.jpg",
                    "img/61UJBlxTSgL._AC_SL1500_.jpg",
                    "img/61WRtQ6gZTL._AC_SL1500_.jpg"
                ]
            },
            {
                id: 3,
                name: "Smartwatch",
                price: 199.99,
                oldPrice: 299.99,
                discount: 33,
                rating: 4.5,
                reviewCount: 95,
                description: "ساعة ذكية متطورة لتتبع اللياقة البدنية مع شاشة عالية الدقة وعمر بطارية طويل.",
                longDescription: "ساعة ذكية متطورة لتتبع اللياقة البدنية مع شاشة AMOLED عالية الدقة وعمر بطارية يصل إلى 14 يوماً. تتميز بمقاومة الماء حتى عمق 50 متراً، وتتبع النوم، وقياس معدل ضربات القلب، وتتبع أكثر من 100 نوع من التمارين الرياضية.",
                features: [
                    "شاشة AMOLED عالية الدقة",
                    "عمر بطارية يصل إلى 14 يوماً",
                    "مقاومة الماء حتى عمق 50 متراً",
                    "تتبع النوم وقياس معدل ضربات القلب",
                    "تتبع أكثر من 100 نوع من التمارين الرياضية"
                ],
                images: [
                    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
                    "img/watch1.jpg",
                    "img/watch2.jpg",
                    "img/watch3.jpg",
                    "img/watch4.jpg"
                ]
            },
            {
                id: 4,
                name: "4K Monitor",
                price: 299.99,
                oldPrice: 499.99,
                discount: 40,
                rating: 4.8,
                reviewCount: 75,
                description: "شاشة ألعاب بدقة 4K فائقة الوضوح مع معدل تحديث عالي وألوان دقيقة.",
                longDescription: "شاشة ألعاب بدقة 4K فائقة الوضوح مع معدل تحديث 144 هرتز وألوان دقيقة. تتميز بتقنية HDR10 لتجربة بصرية استثنائية، وزمن استجابة 1 مللي ثانية، وتقنية منع تمزق الصورة، مما يجعلها مثالية للألعاب والتصميم والمونتاج.",
                features: [
                    "دقة 4K فائقة الوضوح",
                    "معدل تحديث 144 هرتز",
                    "زمن استجابة 1 مللي ثانية",
                    "تقنية HDR10",
                    "تقنية منع تمزق الصورة"
                ],
                images: [
                    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
                    "img/monitor1.jpg",
                    "img/monitor2.jpg",
                    "img/monitor3.jpg",
                    "img/monitor4.jpg"
                ]
            }
        ];
        
        // البحث عن المنتج بناءً على المعرف
        return products.find(product => product.id === parseInt(id));
    }
    
    // دالة لتنسيق السعر
    function formatPrice(price) {
        return '$' + price.toFixed(2);
    }
    
    // ===== وظائف الهيدر والفوتر =====
    
    // وظيفة القائمة للهواتف المحمولة
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            // تبديل حالة زر القائمة (فتح/إغلاق)
            mobileMenuBtn.classList.toggle('active');
            // تبديل حالة القائمة (ظاهرة/مخفية)
            mainNav.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (mobileMenuBtn && mainNav && 
            !mobileMenuBtn.contains(e.target) && 
            !mainNav.contains(e.target) && 
            mainNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
    
    // وظيفة البحث
    if (searchBtn && searchBox && searchInput) {
        // تبديل حالة صندوق البحث على الهواتف المحمولة
        searchBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                searchBox.classList.toggle('active');
                
                // التركيز على حقل البحث عند فتحه
                if (searchBox.classList.contains('active')) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            }
        });
        
        // تنفيذ البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // إغلاق القائمة وصندوق البحث عند النقر خارجهما
    document.addEventListener('click', (e) => {
        // إغلاق القائمة المتنقلة عند النقر خارجها
        if (mobileMenuBtn && mainNav && 
            !mobileMenuBtn.contains(e.target) && 
            !mainNav.contains(e.target)) {
            
            if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        }
        
        // إغلاق صندوق البحث عند النقر خارجه
        if (searchBox && 
            !searchBox.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            
            if (window.innerWidth <= 768 && searchBox.classList.contains('active')) {
                searchBox.classList.remove('active');
            }
        }
    });
    
    // وظيفة تبديل اللغة
    if (langToggleBtn && langIndicator) {
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    }
    
    // تهيئة اللغة من التخزين المحلي
    initLanguage();
    
    // تمرير سلس لروابط الفوتر
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // تطبيق التمرير السلس فقط للروابط التي تبدأ بـ #
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // إرسال نموذج النشرة البريدية
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            
            if (emailInput && emailInput.value.trim() !== '') {
                // عرض إشعار نجاح الاشتراك
                showNotification('تم الاشتراك في النشرة البريدية بنجاح!');
                emailInput.value = '';
            }
        });
    }
    
    // إضافة تأثير حركي للروابط الاجتماعية
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ===== وظائف صفحة المنتج =====
    
    // العد التنازلي للعرض
    if (countdownElement) {
        // تعيين العد التنازلي لـ 24 ساعة من الآن
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);
        
        // وظيفة تحديث العد التنازلي
        function updateCountdown() {
            const now = new Date();
            const diff = endTime - now;
            
            // إيقاف العد التنازلي عند الوصول للصفر
            if (diff <= 0) {
                countdownElement.textContent = "00:00:00";
                return;
            }
            
            // حساب الساعات والدقائق والثواني المتبقية
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // عرض الوقت المتبقي بتنسيق 00:00:00
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // إضافة تأثير نبض للعد التنازلي
            countdownElement.classList.add('pulse');
            setTimeout(() => {
                countdownElement.classList.remove('pulse');
            }, 500);
        }
        
        // تحديث العد التنازلي كل ثانية
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // زر إضافة إلى السلة
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // الحصول على معلومات المنتج
            const productId = 'headphones-001'; // معرف المنتج
            const productTitle = document.querySelector('.product-title');
            const productName = productTitle ? productTitle.textContent : 'Wireless Bluetooth Headphones';
            
            // استخراج السعر من عنصر السعر
            const priceElement = document.querySelector('.product-price');
            let productPrice = 999; // سعر افتراضي
            
            if (priceElement) {
                // استخراج الرقم من نص السعر (مثل "999 EGP" أو "999 جنيه")
                const priceText = priceElement.textContent;
                const priceMatch = priceText.match(/\d+/);
                if (priceMatch) {
                    productPrice = parseInt(priceMatch[0]);
                }
            }
            
            // إضافة المنتج إلى السلة
            addToCart(productId, productName, productPrice);
            
            // تم إزالة الانتقال التلقائي إلى صفحة السلة
        });
    }

    // زر الشراء الآن
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // في التطبيق الحقيقي، سيتم التوجيه إلى صفحة الدفع
            // window.location.href = 'checkout.html';
            
            // للعرض التوضيحي، نعرض فقط إشعاراً
            showNotification('جاري الانتقال إلى صفحة الدفع...');
        });
    }

    // تأثير التحويم على نجوم التقييم
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                // ملء النجوم حتى النجمة التي تم التحويم عليها
                for (let i = 0; i <= index; i++) {
                    stars[i].style.opacity = '1';
                }
                // جعل النجوم بعد النجمة التي تم التحويم عليها شفافة جزئياً
                for (let i = index + 1; i < stars.length; i++) {
                    stars[i].style.opacity = '0.5';
                }
            });
            
            star.addEventListener('mouseleave', () => {
                // إعادة جميع النجوم إلى حالتها الطبيعية
                stars.forEach(s => {
                    s.style.opacity = '1';
                });
            });
            
            star.addEventListener('click', () => {
                // عرض إشعار عند النقر على نجمة
                showNotification(`شكراً لتقييمك! لقد قمت بتقييم المنتج بـ ${index + 1} نجوم`);
            });
        });
    }
    
    // ===== الوظائف المساعدة =====
    
    // وظيفة تبديل اللغة
    function toggleLanguage() {
        const html = document.documentElement;
        
        // تبديل اتجاه الصفحة واللغة
        if (html.dir === 'rtl') {
            html.dir = 'ltr';
            html.lang = 'en';
            currentLang = 'en';
            if (langIndicator) langIndicator.textContent = 'EN';
        } else {
            html.dir = 'rtl';
            html.lang = 'ar';
            currentLang = 'ar';
            if (langIndicator) langIndicator.textContent = 'AR';
        }
        
        // تحديث المحتوى بناءً على اللغة الجديدة
        updateContent(currentLang);
        
        // حفظ تفضيل اللغة في التخزين المحلي
        localStorage.setItem('language', currentLang);
        localStorage.setItem('direction', html.dir);
    }
    
    // تهيئة اللغة من التخزين المحلي
    function initLanguage() {
        const savedLang = localStorage.getItem('language');
        const savedDir = localStorage.getItem('direction');
        
        // استعادة اللغة والاتجاه المحفوظين
        if (savedLang && savedDir) {
            document.documentElement.lang = savedLang;
            document.documentElement.dir = savedDir;
            currentLang = savedLang;
            
            if (langIndicator) {
                langIndicator.textContent = savedLang.toUpperCase();
            }
            
            // تحديث المحتوى بناءً على اللغة المحفوظة
            updateContent(currentLang);
        } else {
            // تعيين الإنجليزية كلغة افتراضية إذا لم يتم حفظ لغة
            currentLang = 'en';
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            if (langIndicator) langIndicator.textContent = 'EN';
            
            // تحديث المحتوى بناءً على اللغة الافتراضية
            updateContent(currentLang);
        }
    }
    
    // وظيفة البحث
    function performSearch() {
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            return;
        }
        
        // عرض إشعار للعرض التوضيحي
        showNotification(currentLang === 'ar' ? 'جاري البحث عن: ' + searchTerm : 'Searching for: ' + searchTerm);
        
        // في التطبيق الحقيقي، سيتم تصفية المنتجات أو التوجيه إلى صفحة نتائج البحث
        // للعرض التوضيحي، نقوم فقط بمسح حقل البحث
        setTimeout(() => {
            searchInput.value = '';
            if (window.innerWidth <= 768 && searchBox) {
                searchBox.classList.remove('active');
            }
        }, 1000);
    }
    
    // وظيفة إضافة إلى السلة
    function addToCart(productId, productName, productPrice) {
        // البحث عن المنتج في السلة
        const existingProduct = cart.find(item => item.id === productId);
        
        // إذا كان المنتج موجوداً، زيادة الكمية، وإلا إضافته كمنتج جديد
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        // تحديث عدد العناصر في السلة
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        // تحديث عدد العناصر في واجهة المستخدم
        updateCartCount();
        
        // حفظ السلة في التخزين المحلي
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartCount', cartCount);
        
        // حفظ البيانات بالمفاتيح المستخدمة في صفحة السلة أيضًا
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // عرض إشعار نجاح الإضافة
        showNotification(currentLang === 'ar' ? 'تمت إضافة المنتج إلى سلة التسوق' : 'Product added to cart');
    }
    
    // تحديث عدد العناصر في السلة في واجهة المستخدم
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
            
            // إضافة تأثير نبض عند تحديث العدد
            element.classList.add('pulse');
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 500);
        });
    }
    
    // تحميل السلة من التخزين المحلي
    function loadCart() {
        // محاولة تحميل البيانات من المفاتيح المستخدمة في هذه الصفحة
        let savedCart = localStorage.getItem('cart');
        let savedCount = localStorage.getItem('cartCount');
        
        // إذا لم تكن البيانات موجودة، محاولة تحميلها من المفاتيح المستخدمة في صفحة السلة
        if (!savedCart) {
            savedCart = localStorage.getItem('cartItems');
        }
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            cartCount = savedCount ? parseInt(savedCount) : cart.reduce((total, item) => total + item.quantity, 0);
            updateCartCount();
            
            // مزامنة البيانات بين المفاتيح المختلفة
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartItems', JSON.stringify(cart));
            localStorage.setItem('cartCount', cartCount);
        }
    }
    
    // تحميل السلة عند تحميل الصفحة
    loadCart();
    
    // وظيفة عرض الإشعارات
    function showNotification(message) {
        // إزالة الإشعار الموجود إن وجد
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // تحديث المحتوى بناءً على اللغة
    function updateContent(lang) {
        // هذه الوظيفة تقوم بتحديث محتوى النص بناءً على اللغة
        
        // قاموس الترجمة
        const translations = {
            'en': {
                'nav': {
                'home': 'Home',
                'products': 'Products',
                'categories': 'Categories',
                'about': 'About Us',
                    'contact': 'Contact Us'
                },
                'search': 'Search for products...',
                'addToCart': 'Add to Cart',
                'buyNow': 'Buy Now',
                'footer': {
                    'about': 'About Store',
                    'aboutText': 'AMW Store is your ideal destination for online shopping, offering the best products at competitive prices and excellent customer service.',
                    'quickLinks': 'Quick Links',
                    'contact': 'Contact Us',
                    'newsletter': 'Newsletter',
                    'newsletterText': 'Subscribe to our newsletter to receive the latest offers and updates',
                    'emailPlaceholder': 'Email Address',
                'subscribe': 'Subscribe',
                    'address': '123 Main Street, City'
                },
                'copyright': '© 2025 AMW Store. All rights reserved.',
                'product': {
                    'title': 'Wireless Bluetooth Headphones',
                    'description': 'High-quality wireless Bluetooth headphones with pure sound and long battery life. Perfect for everyday use and sports.',
                'features': 'Features',
                    'featuresList': [
                        'Battery lasts up to 20 hours',
                        'Water and sweat resistant',
                        'Touch control',
                        'High sound quality'
                    ],
                    'rating': 'Rating',
                    'reviews': 'reviews',
                    'stars': 'stars',
                    'star': 'star',
                    'offerEnds': 'Offer ends in:',
                    'discount': 'Discount 40%',
                    'price': '999 EGP',
                    'oldPrice': '1,699 EGP',
                    'saved': 'You saved: 700 EGP'
                }
            },
            'ar': {
                'nav': {
                'home': 'الرئيسية',
                'products': 'المنتجات',
                'categories': 'الفئات',
                'about': 'من نحن',
                    'contact': 'اتصل بنا'
                },
                'search': 'ابحث عن منتجات...',
                'addToCart': 'أضف إلى السلة',
                'buyNow': 'اشتري الآن',
                'footer': {
                    'about': 'عن المتجر',
                    'aboutText': 'متجر AMW هو وجهتك المثالية للتسوق الإلكتروني، نقدم أفضل المنتجات بأسعار تنافسية وخدمة عملاء متميزة.',
                    'quickLinks': 'روابط سريعة',
                    'contact': 'اتصل بنا',
                    'newsletter': 'النشرة البريدية',
                    'newsletterText': 'اشترك في نشرتنا البريدية للحصول على آخر العروض والتحديثات',
                    'emailPlaceholder': 'البريد الإلكتروني',
                'subscribe': 'اشتراك',
                    'address': '123 شارع الرئيسي، المدينة'
                },
                'copyright': '© 2025 متجر AMW. جميع الحقوق محفوظة.',
                'product': {
                    'title': 'سماعات بلوتوث لاسلكية',
                    'description': 'سماعات بلوتوث لاسلكية عالية الجودة مع صوت نقي وعمر بطارية طويل. مثالية للاستخدام اليومي والرياضة.',
                'features': 'المميزات',
                    'featuresList': [
                        'بطارية تدوم حتى 20 ساعة',
                        'مقاومة للماء والعرق',
                        'تحكم باللمس',
                        'جودة صوت عالية'
                    ],
                    'rating': 'التقييم',
                    'reviews': 'تقييم',
                    'stars': 'نجوم',
                    'star': 'نجمة',
                    'offerEnds': 'ينتهي العرض في:',
                    'discount': 'خصم 40%',
                    'price': '999 جنيه',
                    'oldPrice': '1,699 جنيه',
                    'saved': 'وفرت: 700 جنيه'
                }
            }
        };
        
        // تحديث العناصر باستخدام سمة data-translate
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const parts = key.split('.');
            
            if (parts.length === 1) {
                if (translations[lang][parts[0]]) {
                    element.textContent = translations[lang][parts[0]];
                }
            } else if (parts.length === 2) {
                if (translations[lang][parts[0]] && translations[lang][parts[0]][parts[1]]) {
                    element.textContent = translations[lang][parts[0]][parts[1]];
                }
            }
        });
        
        // تحديث العناصر باستخدام سمة data-translate-placeholder
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
        
        // تحديث عنوان المنتج
        const productTitle = document.querySelector('.product-title');
        if (productTitle) {
            productTitle.textContent = translations[lang].product.title;
        }
        
        // تحديث وصف المنتج
        const productDesc = document.querySelector('.product-description p');
        if (productDesc) {
            productDesc.textContent = translations[lang].product.description;
        }
        
        // تحديث عنوان الوصف
        const productDescTitle = document.querySelector('.product-description h2');
        if (productDescTitle) {
            productDescTitle.textContent = translations[lang].product.description;
        }
        
        // تحديث عنوان المميزات
        const featuresTitle = document.querySelector('.product-features h2');
        if (featuresTitle) {
            featuresTitle.textContent = translations[lang].product.features;
        }
        
        // تحديث قائمة المميزات
        const featuresList = document.querySelectorAll('.product-features li');
        if (featuresList.length > 0) {
            featuresList.forEach((item, index) => {
                if (translations[lang].product.featuresList[index]) {
                    item.textContent = translations[lang].product.featuresList[index];
                }
            });
        }
        
        // تحديث نص العرض
        const offerBadge = document.querySelector('.offer-badge');
        if (offerBadge) {
            offerBadge.textContent = translations[lang].product.discount;
        }
        
        // تحديث نص انتهاء العرض
        const timerLabel = document.querySelector('.timer-label');
        if (timerLabel) {
            timerLabel.textContent = translations[lang].product.offerEnds;
        }
        
        // تحديث الأسعار
        const productPrice = document.querySelector('.product-price');
        if (productPrice) {
            productPrice.textContent = translations[lang].product.price;
        }
        
        const oldPrice = document.querySelector('.old-price');
        if (oldPrice) {
            oldPrice.textContent = translations[lang].product.oldPrice;
        }
        
        const savings = document.querySelector('.savings');
        if (savings) {
            savings.textContent = translations[lang].product.saved;
        }
        
        // تحديث نص التقييم
        const ratingCount = document.querySelector('.rating-count');
        if (ratingCount) {
            ratingCount.textContent = `(4.2 ${lang === 'ar' ? 'من' : 'out of'} 5 | 150 ${translations[lang].product.reviews})`;
        }
        
        // تحديث نص مستويات التقييم
        const ratingLevels = document.querySelectorAll('.rating-level');
        if (ratingLevels.length > 0) {
            ratingLevels.forEach((level, index) => {
                const starsCount = 5 - index;
                level.textContent = `${starsCount} ${starsCount === 1 ? translations[lang].product.star : translations[lang].product.stars}`;
            });
        }
        
        // تحديث أزرار الشراء
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.textContent = translations[lang].addToCart;
        }
        
        const buyNowButton = document.querySelector('.buy-now');
        if (buyNowButton) {
            buyNowButton.textContent = translations[lang].buyNow;
        }
    }
    
    // إضافة تأثيرات الرسوم المتحركة للإشعارات
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .pulse {
        animation: pulse 0.5s ease-in-out;
    }
    `;
    document.head.appendChild(style);
});
