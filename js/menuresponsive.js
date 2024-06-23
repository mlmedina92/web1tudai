"use strict";


// exporto la variable para poder usarla en darkMode.js
 let menuDesplegable = document.querySelector(".mobile-menu-desplegable");
// Selecciono por clases : el nav se repite en 3 HTML
const botonCierre = document.querySelector (".burgerIcon");
const burgerButton = document.querySelector(".navbarBurger");

function ocultarMenu() {
    menuDesplegable.classList.toggle("visible");
    botonCierre.classList.toggle("fa-times");
}

burgerButton.addEventListener("click", ocultarMenu);

export {menuDesplegable};