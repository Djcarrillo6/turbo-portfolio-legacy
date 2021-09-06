// - Netflix Navigation -
const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'));
});

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'));
});


// 3D Boxes JS
const boxesContainer = document.getElementById('boxes');

function createBoxes() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
            boxesContainer.appendChild(box);
        };
    };
};

createBoxes();

// Mobile Navbar JS
const mobileNavbar = document.querySelector('.mobile-navbar');
window.addEventListener('scroll', fixNav);

function fixNav() {
    if (window.scrollY > mobileNavbar.offsetHeight + 150) {
        mobileNavbar.classList.add('active');
    } else {
        mobileNavbar.classList.remove('active');
    };
};