"use strict";

import { menuDesplegable } from './menuresponsive.js';
document.addEventListener('DOMContentLoaded', () => {

const bodyElement = document.querySelector('.main');
const btnDarkHidden = document.querySelector('.btn-mode-change-hidden');
const btnDark = document.querySelector('.btn-mode-change');
const sunBtn = document.querySelector('.fa-sun');

btnDark.addEventListener('click', modeChange);
btnDarkHidden.addEventListener('click', modeChange);

function modeChange() {
    btnDark.classList.toggle('dark-mode-view-btn');
    btnDarkHidden.classList.toggle('dark-mode-view-btn');
    bodyElement.classList.toggle("dark-mode-view-body");
    menuDesplegable.classList.toggle("dark-mode-view-nav");
    sunBtn.classList.toggle('fa-moon');
}

});
