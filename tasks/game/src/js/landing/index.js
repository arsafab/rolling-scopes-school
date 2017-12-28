// NAVBAR TOGGLE
const navbarToggle = document.querySelector('#navbar-toggle');
const mainNav = document.querySelector('#main-nav');

const toggleNav = () => {
    navbarToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
};

const closeNav = (event) => {
    let { target } = event;

    while (target !== mainNav) {
        if (target.tagName === 'A') {
            navbarToggle.classList.remove('active');
            mainNav.classList.remove('active');
            return;
        }

        target = target.parentNode;
    }
};

if (navbarToggle) navbarToggle.addEventListener('click', toggleNav);
if (mainNav) mainNav.addEventListener('click', closeNav);
