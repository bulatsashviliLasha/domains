const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const body = document.querySelector('body');

btn.addEventListener('click', navToggle)

function navToggle() {
    btn.classList.toggle('open')
    menu.classList.toggle('flex')
    menu.classList.toggle('hidden')
    body.classList.toggle('overflow-hidden')
}