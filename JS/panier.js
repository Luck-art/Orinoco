//const { get } = require("mongoose");

const products = JSON.parse(localStorage.getItem('products'));
console.log(products);

if (!localStorage) {
    alert('Une erreur  est survenue !');
}
if (products.length === 0) {
    const errorPanier = document.querySelector('.error_panier').style.display = 'flex';
    const formContainer = document.querySelector('.form_container').style.display = 'none';
}


function displayBasket() {

    for (i = 0; i < products.length; i++) {

        const camerasContainer = document.querySelector('.camera_container');

        const card = document.createElement("div");
        card.className = 'card cardStyle';
        card.style.width = '30%';

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Image de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsCamera = document.createElement("img");
        productsCamera.setAttribute('src', products[i].imageUrl);
        productsCamera.className = 'card-img-top cardImageStyle';
        card.appendChild(productsCamera);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Liste d'éléments de card ////////////////////////////////////////////////////////////////////////////////////////

        const productsContainer = document.createElement("ul");
        productsContainer.className = 'list-group list-group-flush';
        card.appendChild(productsContainer);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Titre de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsTitle = document.createElement("li");
        productsTitle.className = 'list-group-item';
        productsTitle.innerHTML = products[i].name;
        productsTitle.style.backgroundColor = 'silver';
        productsContainer.appendChild(productsTitle);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Description de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsDescription = document.createElement("li");
        productsDescription.className = 'list-group-item';
        productsDescription.innerHTML = products[i].description;
        productsDescription.style.backgroundColor = 'silver';
        productsContainer.appendChild(productsDescription);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Prix de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsPrice = document.createElement("li");
        productsPrice.className = 'list-group-item price-products';
        productsPrice.innerHTML = products[i].price;
        productsPrice.style.backgroundColor = 'silver';
        productsContainer.appendChild(productsPrice);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Corps de la card ////////////////////////////////////////////////////////////////////////////////////////

        const cardBody = document.createElement("div");
        cardBody.className = 'card-body card_body_panier';
        card.appendChild(cardBody);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Bouton de suppression ////////////////////////////////////////////////////////////////////////////////////////

        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-light';
        cancelButton.innerHTML = 'Retirer ce produit';
        cancelButton.setAttribute('data-id', products[i]._id);
        cardBody.appendChild(cancelButton);


        cancelButton.addEventListener('click', function(event) {
            const id = event.target.getAttribute('data-id');
            removeFromBasket(id);
            camerasContainer.removeChild(card);

        })

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Enfents principaux de card ////////////////////////////////////////////////////////////////////////////////////////

        camerasContainer.appendChild(card);
    }
}
displayBasket();

function removeFromBasket(id) {
    for (i = 0; i < products.length; i++) {
        if (id === products[i]._id) {
            products.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Calcule du prix total des produits ////////////////////////////////////////////////////////////////////////////////////////

function calculTotalPriceProducts() {

    let total = 0;

    for (i = 0; i < products.length; i++) {
        total += products[i].price;
    }
    document.querySelector('.total-price').innerHTML = 'Prix total des produits: ' + total + '€';
}
calculTotalPriceProducts();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Envoie des informations ////////////////////////////////////////////////////////////////////////////////////////

function sendInfos() {

    const form = document.querySelector('.form');
    console.log(form);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            alert('Une erreur est survenue !');
            form.classList.add('was-validated');
            return false;
        }


        let contact = {
            firstName: form.querySelector('#firstName').value,
            lastName: form.querySelector('#lastName').value,
            address: form.querySelector('#address').value,
            city: form.querySelector('#city').value,
            email: form.querySelector('#email').value
        }

        let productsId = [];


        for (i = 0; i < products.length; i++) {

            productsId.push(products[i]._id);
        }

        console.log(productsId);

        const options = {
            method: 'POST',
            body: JSON.stringify({ products: productsId, contact }),
            headers: {
                'Content-Type': 'application/json'
            }
        }


        fetch('http://localhost:3000/api/cameras/order', options).then(response => {
            if (response.ok) {
                response.json().then((data) => {
                    localStorage.setItem('itemOrderId', data.orderId);
                    localStorage.setItem('itemContact', JSON.stringify(data.contact));
                    console.log(data);
                });
            } else {
                console.log('Une erreur est survenue !');
            }
        });
        window.location = "validation.html";
    })
}
sendInfos();