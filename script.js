'use strict';
// ---------- Selectors ----------
const menuBtn = document.querySelector('.menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');
const nav = document.querySelector('.nav');

// ---------- Gallery Selectors ----------
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtns = document.querySelectorAll('.gallery-prev');
const nextBtns = document.querySelectorAll('.gallery-next');

// ---------- Quantity Selectors ----------
const decreaseBtn = document.querySelector('.quantity__decrease');
const increaseBtn = document.querySelector('.quantity__increase');
const quantityValue = document.querySelector('.quantity__value');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

const cartBadge = document.querySelector('.cart-badge');

// ---------- Lightbox Selectors ----------
const lightbox = document.querySelector('.lightbox');
const lightboxMainImage = document.querySelector('.lightbox__main-image');
const lightboxClose = document.querySelector('.lightbox-close');

const cartItemDelete = document.querySelector('.cart-item__delete');

// ---------- Mobile Menu ----------
menuBtn.addEventListener('click', () => {
  nav.classList.add('open');
});

navCloseBtn.addEventListener('click', () => {
  nav.classList.remove('open');
});

nav.addEventListener('click', (e) => {
  if (e.target === nav) {
    nav.classList.remove('open');
  }
});

// ---------- Gallery Data ----------
const productImages = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

let currentImageIndex = 0; // عکس فعلی، از صفر شروع می‌شه

// ---------- Update Gallery Function ----------
function updateGallery(index) {
  currentImageIndex = index;
  mainImage.src = productImages[index];
  lightboxMainImage.src = productImages[index]; 

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// ---------- Thumbnail Click ----------
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    updateGallery(index % 4); // باقیمانده تقسیم بر ۴، یعنی همیشه بین ۰ تا ۳
  });
});

// ---------- Prev/Next Buttons ----------
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newIndex = currentImageIndex === 0 
      ? productImages.length - 1 
      : currentImageIndex - 1;
    updateGallery(newIndex);
  });
});

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newIndex = currentImageIndex === productImages.length - 1 
      ? 0 
      : currentImageIndex + 1;
    updateGallery(newIndex);
  });
});

// ---------- Quantity Logic ----------
let quantity = 0;

decreaseBtn.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityValue.textContent = quantity;
  }
});

increaseBtn.addEventListener('click', () => {
  quantity++;
  quantityValue.textContent = quantity;
});

// ---------- Add to Cart ----------
const cartItem = document.querySelector('.cart-item');
const cartItemQty = document.querySelector('.cart-item__qty');
const cartItemTotal = document.querySelector('.cart-item__info strong');
const cartEmptyMsg = document.querySelector('.cart-empty-msg');
const checkoutBtn = document.querySelector('.checkout-btn');


const PRICE_PER_ITEM = 125.00;

addToCartBtn.addEventListener('click', () => {
  if (quantity === 0) return; // اگه صفره، کاری نکن

  // آپدیت اطلاعات کارت آیتم
  cartItemQty.textContent = quantity;
  cartItemTotal.textContent = `$${(PRICE_PER_ITEM * quantity).toFixed(2)}`;

  // نمایش آیتم، مخفی کردن پیام خالی بودن
  cartItem.hidden = false;
  cartEmptyMsg.hidden = true;
  checkoutBtn.hidden = false;
});

// ---------- Cart Widget Toggle ----------
const cartBtn = document.querySelector('.cart-btn');
const cartWidget = document.querySelector('.cart-widget');

cartBtn.addEventListener('click', () => {
  cartWidget.classList.toggle('open');
});

// بستن با کلیک بیرون از سبد
document.addEventListener('click', (e) => {
  const clickedInsideCart = cartWidget.contains(e.target);
  const clickedCartBtn = cartBtn.contains(e.target);

  if (!clickedInsideCart && !clickedCartBtn) {
    cartWidget.classList.remove('open');
  }
});

addToCartBtn.addEventListener('click', () => {
  if (quantity === 0) return;

  cartItemQty.textContent = quantity;
  cartItemTotal.textContent = `$${(PRICE_PER_ITEM * quantity).toFixed(2)}`;

  cartItem.hidden = false;
  cartEmptyMsg.hidden = true;
  checkoutBtn.hidden = false;

  // ⬅️ این دو خط جدیدن: آپدیت بج
  cartBadge.textContent = quantity;
  cartBadge.hidden = false;
});

// ---------- Open Lightbox ----------
mainImage.addEventListener('click', () => {
  if (window.innerWidth >= 768) { // فقط تو دسکتاپ باز بشه
    lightboxMainImage.src = productImages[currentImageIndex];
    lightbox.classList.add('open');
  }
});


// ---------- Close Lightbox ----------
lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
});

// ---------- Remove from Cart ----------
cartItemDelete.addEventListener('click', () => {
  quantity = 0;
  quantityValue.textContent = quantity;

  cartItem.hidden = true;
  cartEmptyMsg.hidden = false;
  checkoutBtn.hidden = true;

  cartBadge.hidden = true;
});

// ---------- Profile Dropdown Toggle ----------
const avatarBtn = document.querySelector('.avatar-btn');
const profileDropdown = document.querySelector('.profile-dropdown');

avatarBtn.addEventListener('click', () => {
  profileDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const clickedInside = profileDropdown.contains(e.target);
  const clickedBtn = avatarBtn.contains(e.target);

  if (!clickedInside && !clickedBtn) {
    profileDropdown.classList.remove('open');
  }
});


