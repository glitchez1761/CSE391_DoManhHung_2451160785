const products = [
    { id: 1, name: 'iPhone 16 Pro', price: 29990000, category: 'phone', image: 'https://placehold.co/400x300/1a1a2e/ff8906?text=iPhone+16+Pro', rating: 4.8, inStock: true, desc: 'Chip A18 Pro mạnh mẽ, camera 48MP hệ thống Fusion Camera, màn hình Super Retina XDR 6.3".' },
    { id: 2, name: 'Samsung Galaxy S25', price: 22990000, category: 'phone', image: 'https://placehold.co/400x300/0d1117/4fc3f7?text=Galaxy+S25', rating: 4.6, inStock: true, desc: 'Snapdragon 8 Elite, tích hợp Galaxy AI, camera 50MP, pin 4000mAh sạc nhanh 25W.' },
    { id: 3, name: 'OPPO Find X8 Pro', price: 18990000, category: 'phone', image: 'https://placehold.co/400x300/0a1628/81c784?text=OPPO+Find+X8', rating: 4.4, inStock: true, desc: 'Camera Hasselblad Master, pin 5910mAh, sạc nhanh 100W SuperVOOC, IP68.' },
    { id: 4, name: 'Xiaomi 14 Ultra', price: 24990000, category: 'phone', image: 'https://placehold.co/400x300/1a0a0a/ff7043?text=Xiaomi+14+Ultra', rating: 4.6, inStock: true, desc: 'Camera Leica professional, Snapdragon 8 Gen 3, sạc 90W HyperCharge, IP68.' },
    { id: 5, name: 'MacBook Air M3', price: 32990000, category: 'laptop', image: 'https://placehold.co/400x300/1a1a2e/ff8906?text=MacBook+Air+M3', rating: 4.9, inStock: true, desc: 'Chip Apple M3 thế hệ mới, 8GB RAM, 256GB SSD, 18 giờ pin, màn hình Liquid Retina.' },
    { id: 6, name: 'Dell XPS 15 OLED', price: 42990000, category: 'laptop', image: 'https://placehold.co/400x300/0d1117/4fc3f7?text=Dell+XPS+15', rating: 4.7, inStock: false, desc: 'Intel Core i7-13700H, NVIDIA RTX 4060, màn hình OLED 3.5K 120Hz, 86Wh battery.' },
    { id: 7, name: 'ASUS ROG Zephyrus G16', price: 38990000, category: 'laptop', image: 'https://placehold.co/400x300/0d1a0d/ff7043?text=ROG+Zephyrus', rating: 4.5, inStock: true, desc: 'AMD Ryzen 9 8945HS, NVIDIA RTX 4070, màn hình OLED 165Hz, tản nhiệt Frost Force.' },
    { id: 8, name: 'Lenovo ThinkPad X1C', price: 45990000, category: 'laptop', image: 'https://placehold.co/400x300/1a0a1a/e94560?text=ThinkPad+X1C', rating: 4.6, inStock: false, desc: 'Intel Core Ultra 7 vPro, bảo mật enterprise, màn hình IPS 2K, MIL-SPEC 810H.' },
    { id: 9, name: 'iPad Pro 13" M4', price: 27990000, category: 'tablet', image: 'https://placehold.co/400x300/1a1a2e/81c784?text=iPad+Pro+13', rating: 4.8, inStock: true, desc: 'Chip Apple M4 cực mạnh, màn hình OLED Ultra Retina XDR 13", hỗ trợ Apple Pencil Pro.' },
    { id: 10, name: 'Samsung Galaxy Tab S10', price: 20990000, category: 'tablet', image: 'https://placehold.co/400x300/0a0a1a/ffd54f?text=Galaxy+Tab+S10', rating: 4.5, inStock: true, desc: 'Snapdragon 8 Gen 3, bút S Pen, màn hình AMOLED Dynamic 11", IP68.' },
    { id: 11, name: 'Xiaomi Pad 7', price: 9990000, category: 'tablet', image: 'https://placehold.co/400x300/001a1a/4fc3f7?text=Xiaomi+Pad+7', rating: 4.2, inStock: false, desc: 'Snapdragon 7s Gen 3, pin 10000mAh, sạc nhanh 67W, màn hình 144Hz LCD 11".' },
    { id: 12, name: 'AirPods Pro 2', price: 6990000, category: 'audio', image: 'https://placehold.co/400x300/1a1a2e/ff8906?text=AirPods+Pro+2', rating: 4.7, inStock: true, desc: 'Chip H2, ANC chủ động thế hệ 2, âm thanh Spatial Audio, Adaptive Transparency.' },
    { id: 13, name: 'Sony WH-1000XM6', price: 8990000, category: 'audio', image: 'https://placehold.co/400x300/0d1117/81c784?text=Sony+XM6', rating: 4.9, inStock: true, desc: 'ANC hàng đầu thế giới, 40 giờ pin, LDAC Hi-Res, Multipoint 2 thiết bị đồng thời.' },
    { id: 14, name: 'Samsung Galaxy Buds3 Pro', price: 4490000, category: 'audio', image: 'https://placehold.co/400x300/0a1a0a/ffd54f?text=Buds3+Pro', rating: 4.3, inStock: true, desc: 'Thiết kế ergonomic, ANC thích ứng, tích hợp Galaxy AI, chống nước IPX7.' },
];

let state = {
    category: 'all',
    searchQuery: '',
    sortBy: 'default',
    cart: 0,
};

function fmt(price) {
    return price.toLocaleString('vi-VN') + '₫';
}
function stars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

function buildShell() {
    const app = document.getElementById('app');

    const header = document.createElement('header');
    header.className = 'catalog-header';

    const logo = document.createElement('div');
    logo.className = 'catalog-logo';
    logo.innerHTML = 'Shop<span>Tech</span>';

    const actions = document.createElement('div');
    actions.className = 'header-actions';

    const darkBtn = document.createElement('button');
    darkBtn.className = 'dark-toggle';
    darkBtn.id = 'darkToggle';
    darkBtn.innerHTML = '🌙 Dark mode';
    darkBtn.addEventListener('click', toggleDarkMode);

    const cartWrap = document.createElement('div');
    cartWrap.className = 'cart-wrapper';
    cartWrap.setAttribute('aria-label', 'Giỏ hàng');
    cartWrap.innerHTML = '🛒';

    const badge = document.createElement('span');
    badge.className = 'cart-badge';
    badge.id = 'cartBadge';
    badge.textContent = '0';
    cartWrap.appendChild(badge);

    actions.appendChild(darkBtn);
    actions.appendChild(cartWrap);
    header.appendChild(logo);
    header.appendChild(actions);

    const main = document.createElement('div');
    main.className = 'catalog-main';

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.id = 'searchInput';
    searchInput.placeholder = '🔍  Tìm kiếm sản phẩm...';
    searchInput.setAttribute('aria-label', 'Tìm kiếm sản phẩm');
    searchInput.addEventListener('input', function () {
        state.searchQuery = this.value.trim().toLowerCase();
        renderProducts(getFiltered());
    });

    const sortSelect = document.createElement('select');
    sortSelect.className = 'sort-select';
    sortSelect.id = 'sortSelect';
    sortSelect.setAttribute('aria-label', 'Sắp xếp');
    [
        ['default', 'Mặc định'],
        ['price-asc', 'Giá: Thấp → Cao'],
        ['price-desc', 'Giá: Cao → Thấp'],
        ['name-az', 'Tên: A → Z'],
        ['rating-desc', 'Đánh giá cao nhất'],
    ].forEach(([val, label]) => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = label;
        sortSelect.appendChild(opt);
    });
    sortSelect.addEventListener('change', function () {
        state.sortBy = this.value;
        renderProducts(getFiltered());
    });

    toolbar.appendChild(searchInput);
    toolbar.appendChild(sortSelect);

    const catFilters = document.createElement('div');
    catFilters.className = 'cat-filters';
    catFilters.setAttribute('role', 'group');
    catFilters.setAttribute('aria-label', 'Lọc danh mục');

    const categories = [
        { val: 'all', label: '🏪 Tất cả' },
        { val: 'phone', label: '📱 Điện thoại' },
        { val: 'laptop', label: '💻 Laptop' },
        { val: 'tablet', label: '📱 Máy tính bảng' },
        { val: 'audio', label: '🎧 Âm thanh' },
    ];
    categories.forEach(({ val, label }) => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn' + (val === 'all' ? ' active' : '');
        btn.dataset.cat = val;
        btn.textContent = label;
        btn.setAttribute('aria-pressed', val === 'all' ? 'true' : 'false');
        btn.addEventListener('click', function () {
            filterByCategory(this.dataset.cat);
        });
        catFilters.appendChild(btn);
    });

    const grid = document.createElement('div');
    grid.className = 'product-grid';
    grid.id = 'productGrid';

    main.appendChild(toolbar);
    main.appendChild(catFilters);
    main.appendChild(grid);

    app.appendChild(header);
    app.appendChild(main);
}

function searchProducts(list) {
    if (!state.searchQuery) return list;
    return list.filter(p =>
        p.name.toLowerCase().includes(state.searchQuery) ||
        p.category.toLowerCase().includes(state.searchQuery)
    );
}

function filterByCategory(category) {
    state.category = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        const isActive = btn.dataset.cat === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    renderProducts(getFiltered());
}

function sortProducts(list) {
    const sorted = [...list];
    switch (state.sortBy) {
        case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
        case 'name-az': return sorted.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        case 'rating-desc': return sorted.sort((a, b) => b.rating - a.rating);
        default: return sorted;
    }
}

function getFiltered() {
    let list = products;
    if (state.category !== 'all') list = list.filter(p => p.category === state.category);
    list = searchProducts(list);
    list = sortProducts(list);
    return list;
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    while (grid.firstChild) grid.removeChild(grid.firstChild);

    if (!list.length) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = '😔 Không tìm thấy sản phẩm phù hợp.';
        grid.appendChild(empty);
        return;
    }

    const frag = document.createDocumentFragment();
    list.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${i * 0.04}s`;
        card.setAttribute('aria-label', p.name);
        card.setAttribute('tabindex', '0');
        card.dataset.id = p.id;

        const imgWrap = document.createElement('div');
        imgWrap.className = 'card-img-wrap';

        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.name;
        img.loading = 'lazy';

        const stockTag = document.createElement('span');
        stockTag.className = 'stock-tag ' + (p.inStock ? 'in' : 'out');
        stockTag.textContent = p.inStock ? 'Còn hàng' : 'Hết hàng';

        imgWrap.appendChild(img);
        imgWrap.appendChild(stockTag);

        const body = document.createElement('div');
        body.className = 'card-body';

        const cat = document.createElement('div');
        cat.className = 'card-cat';
        cat.textContent = p.category;

        const name = document.createElement('h3');
        name.className = 'card-name';
        name.textContent = p.name;

        const rating = document.createElement('div');
        rating.className = 'card-rating';
        rating.innerHTML = `${stars(p.rating)} <span>${p.rating}</span>`;

        const footer = document.createElement('div');
        footer.className = 'card-footer';

        const price = document.createElement('span');
        price.className = 'card-price';
        price.textContent = fmt(p.price);

        const addBtn = document.createElement('button');
        addBtn.className = 'add-cart-btn';
        addBtn.textContent = p.inStock ? '+ Giỏ hàng' : 'Hết hàng';
        addBtn.disabled = !p.inStock;
        addBtn.setAttribute('aria-label', `Thêm ${p.name} vào giỏ hàng`);
        addBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            addToCart(p.id);
        });

        footer.appendChild(price);
        footer.appendChild(addBtn);
        body.appendChild(cat);
        body.appendChild(name);
        body.appendChild(rating);
        body.appendChild(footer);

        card.appendChild(imgWrap);
        card.appendChild(body);

        card.addEventListener('click', () => openModal(p));
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(p); });

        frag.appendChild(card);
    });
    grid.appendChild(frag);
}

function openModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', product.name);

    const box = document.createElement('div');
    box.className = 'modal-box';

    const img = document.createElement('img');
    img.className = 'modal-img';
    img.src = product.image;
    img.alt = product.name;

    const body = document.createElement('div');
    body.className = 'modal-body';

    const cat = document.createElement('div');
    cat.className = 'modal-cat';
    cat.textContent = product.category;

    const name = document.createElement('h2');
    name.className = 'modal-name';
    name.textContent = product.name;

    const desc = document.createElement('p');
    desc.className = 'modal-desc';
    desc.textContent = product.desc;

    const meta = document.createElement('div');
    meta.className = 'modal-meta';

    const price = document.createElement('span');
    price.className = 'modal-price';
    price.textContent = fmt(product.price);

    const ratingEl = document.createElement('span');
    ratingEl.className = 'modal-rating';
    ratingEl.textContent = `★ ${product.rating} / 5`;

    meta.appendChild(price);
    meta.appendChild(ratingEl);

    const footerEl = document.createElement('div');
    footerEl.className = 'modal-footer';

    const addBtn = document.createElement('button');
    addBtn.className = 'modal-add-btn';
    addBtn.textContent = product.inStock ? '🛒 Thêm vào giỏ hàng' : 'Hết hàng';
    addBtn.disabled = !product.inStock;
    addBtn.addEventListener('click', () => {
        addToCart(product.id);
        closeModal(overlay);
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.textContent = 'Đóng';
    closeBtn.addEventListener('click', () => closeModal(overlay));

    footerEl.appendChild(addBtn);
    footerEl.appendChild(closeBtn);

    body.appendChild(cat);
    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(meta);
    body.appendChild(footerEl);
    box.appendChild(img);
    box.appendChild(body);
    overlay.appendChild(box);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal(overlay);
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') { closeModal(overlay); document.removeEventListener('keydown', escHandler); }
    });

    document.body.appendChild(overlay);
    closeBtn.focus();
}

function closeModal(overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 160);
}

function addToCart(productId) {
    state.cart++;
    const badge = document.getElementById('cartBadge');
    badge.textContent = state.cart;
    badge.classList.add('visible');
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkToggle').innerHTML = isDark ? '☀️ Light mode' : '🌙 Dark mode';
}

buildShell();
renderProducts(products);