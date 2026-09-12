// =========================================
// XỬ LÝ MENU HAMBURGER (MOBILE)
// =========================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hiệu ứng biến nút 3 gạch thành dấu X (Tùy chọn)
        mobileMenu.classList.toggle('is-active');
    });
}