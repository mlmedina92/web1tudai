"use strict";

// selección de elemntos del DOM
const captchaText = document.querySelector('#captcha-text');
const resultCaptcha = document.querySelector('#result-captcha');
const reCaptcha = document.querySelector('#reCaptcha');

const form = document.querySelector('#form')

// caracteres posibles que puede tener el captcha
const charactersCaptcha = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

let captchaArray = [];

// obtener la longitud  del array deseada.
let lengthCaptcha = 5; 

// Funcion para crear un numero randon,
function generateRandomNumber() {
    let result = Math.floor(Math.random() * charactersCaptcha.length); //se usa .legth para que no se rompa si se borran o agregan caracteres psibles al captcha
    return result;
}

// Generación aleatoria de un captcha, por cada iteracion accedo a una posicion random del arreglo
function captchaGenerator() {
    let numRandom;
    for (let i = 0; i < lengthCaptcha; i++) {
        numRandom = generateRandomNumber();
        let characterCaptcha = charactersCaptcha[numRandom];
        captchaArray.push(characterCaptcha);
    }
    return captchaArray;
}

// Funciones para renderizar captcha en pantalla 
function showCaptcha() {
    captchaGenerator();
    let captchaString = captchaArray.join(" ");
    captchaText.innerText = captchaString;
}

function captchaValidation() {
    let formData = new FormData(form);// alternativa al .value para tomar los valores de ingreso del input
    let captchavalue = formData.get('input-captcha');

    let captchaStringValue = captchaArray.join("");
    // usar join() para unir estos substrings sin incluir los espacios. 
    let count = 0;
    if (captchavalue.length === lengthCaptcha) {
        for (let i = 0; i < lengthCaptcha; i++) {//lengthCaptcha es 5
            if (captchaStringValue[i] === captchavalue[i]) {//caCa5 caCa5
                count++; /// 5
            }
        }
        if (lengthCaptcha === count) {
            resultCaptcha.innerText = "El captcha ingresado es correcto";
        }
        else {
            resultCaptcha.innerText = "El captcha ingresado no es correcto";
        }
    }
    else {
        resultCaptcha.innerText = "El captcha ingresado no es correcto";
    }
}

function updateCaptcha() {
    captchaArray = [];
    showCaptcha();
}

//en vez de poner el evento click en el button, escucho el submit del form y uso prevent default()
//para que la pag no se recargue y a la vez el HTML valide los datos ingresados por el usuario
form.addEventListener('submit', function (e) {
    e.preventDefault();
    captchaValidation();
});

// Escucho el evento para regenerar el captcha
reCaptcha.addEventListener('click', updateCaptcha);

// Llamado a funciones
// Mostrar el captcha inicial
showCaptcha();






