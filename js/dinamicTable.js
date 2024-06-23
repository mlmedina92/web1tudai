"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const baseURL = 'https://666f71c6f1e1da2be522cfa6.mockapi.io/userRequest/userRequest';
    const table = document.querySelector("#serviceRequestTable");
    const resultMjs = document.querySelector("#status-msg");
    const formPost = document.querySelector(".formTable");
    const formEdit = document.querySelector(".formEdit");
    const idInput = document.querySelector("#clientInput");
    const cancel = document.querySelector("#btn-cancelar");
    const btnNext = document.querySelector("#nexBtn");
    const btnBack = document.querySelector("#backBtn");

    // Events
    formPost.addEventListener('submit', sendData);

    formEdit.addEventListener('submit', updateData);

    cancel.addEventListener('click', () => {
        formEdit.classList.add('oculto');
    });

    let enabled = true;
    let count = 1;
    let limite = 5;

    btnNext.addEventListener('click', () => {
        if (enabled) {
            count++;
            pagination();
        }
    });

    btnBack.addEventListener('click', () => {
        if (count > 1) {
            count--;
            pagination();
        }
    });

    pagination();
    // Funciones
    async function pagination() {
        // funciona como el metodo getData
        let url = new URL(baseURL);
        url.searchParams.append('page', count); // CREA UNA INSTANCIA DEL OBJETO URL
        url.searchParams.append('limit', limite);
        try {
            let response = await fetch(url, {     // Promesa
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                let json = await response.json(); //Promesa
                updateDom(json);
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error 404 - URL no encontrada');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');

                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }

        }
        catch (error) {
            resultMjs.innerText = `Error: ${error.message}`;
        };
        setTimeout(function () {
            resultMjs.innerText = ' ';
        }, 2000);
    }


    function updateDom(json) {
        let itemsCharged = 0;
        table.innerHTML = ' ';
        for (const service of json) {
            let name = service.clientName;
            let vehicle = service.vehicle;
            let date = service.date;
            let ubication = service.location;
            let id = service.id;
            table.innerHTML += `
                                    <tr id="row-${id}">
                                    <td>${name}</td>
                                    <td>${vehicle}</td>
                                    <td>${date}</td>
                                    <td>${ubication}</td>
                                    <td><button class="table-btn" data-id=${id}><i class="fas fa-trash"></i></button></td>
                                    <td><button class="edit-btn" data-id=${id}>Editar</button></td>
                                    </tr>
                                    `;
            itemsCharged++;
        }
        if (itemsCharged < limite) {
            enabled = false;
        } else {
            enabled = true;
        }
        addEventDelete();
        addEventEdit();
    }

    function addEventDelete() {
        let btnDelete = document.getElementsByClassName('table-btn');
        for (let i = 0; i < btnDelete.length; i++) {
            let id = btnDelete[i].dataset.id;
            btnDelete[i].addEventListener('click', function () {
                deleteItem(id);
            });
        }
    }

    async function deleteItem(id) {
        try {
            let response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Eliminar la fila del DOM
                const row = document.querySelector(`#row-${id}`);
                row.remove();
                resultMjs.classList.add('mjs');
                resultMjs.innerText = 'Servicio borrado con éxito!';

                pagination();
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error 404 - Servicio no encontrada');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            resultMjs.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            resultMjs.innerText = ' ';
        }, 2000);
    }

    async function sendData(event) {
        event.preventDefault();
        let name = document.querySelector("#nameTable").value;
        let vehicle = document.querySelector("#vehicleTable").value;
        let date = document.querySelector("#dateTable").value;
        let ubication = document.querySelector("#adressTable").value;

        let service = {
            clientName: name,
            vehicle: vehicle,
            date: date,
            location: ubication
        };

        try {
            let response = await fetch(baseURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(service)
            });
            if (response.ok) {
                let json = await response.json();
                formPost.reset();
                resultMjs.innerText = 'Servicio Agregado con éxito!';

                pagination();

            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error 404 - Servicio no solicitado,comuníquese vía mail');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            resultMjs.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            resultMjs.textContent = '';
        }, 2000);
    }

    function addEventEdit() {
        let btnEdit = document.getElementsByClassName('edit-btn');
        for (let i = 0; i < btnEdit.length; i++) {
            let id = btnEdit[i].dataset.id;
            btnEdit[i].addEventListener('click', function () {
                desplegarFormulario(id);
            });
        }
    }

    function desplegarFormulario(id) {
        formEdit.reset();
        formEdit.classList.toggle('oculto');
        idInput.value = id;
    }

    async function updateData(event) {
        event.preventDefault();
        let id = idInput.value;
        let client = document.querySelector("#nameEdit").value;
        let vehicle = document.querySelector("#vehicleEdit").value;
        let date = document.querySelector("#dateEdit").value;
        let location = document.querySelector("#adressEdit").value;

        let service = {
            clientName: client,
            vehicle: vehicle,
            date: date,
            location: location
        };

        try {
            let response = await fetch(`${baseURL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(service),
            });

            if (response.ok) {
                pagination();
                formEdit.classList.toggle('oculto');
                resultMjs.innerText = 'Servicio actualizado con éxito!';

            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error 404 - Servicio no actualizado');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            resultMjs.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            resultMjs.innerText = ' ';
        }, 2000);

    }

    // Filter
    let inputSearch = document.querySelector('#inputSearch');
    inputSearch.addEventListener("change", filterService);

    async function filterService() {
        let palabraBuscada = inputSearch.value;
        let url = new URL(baseURL);
        url.searchParams.append("clientName", palabraBuscada);
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                resultMjs.innerText = "Servicio encontrado"
                let json = await response.json();
                updateDom(json);

            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error - Servicio no existente');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            resultMjs.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            resultMjs.innerText = ' ';
        }, 2000);
    }
    pagination();
});
