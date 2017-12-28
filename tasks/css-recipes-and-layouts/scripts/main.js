const toggleIcon = document.querySelector('#toggle-icon');

toggleIcon.onclick = function() {
    const nav = document.querySelector('#nav');

    nav.classList.contains('show-nav') ? nav.classList.remove('show-nav') : nav.classList.add('show-nav');
}
