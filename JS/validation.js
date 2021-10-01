const products = JSON.parse(localStorage.getItem('products'));
console.log(products);

if (products) {
    displayBasket();
    calculTotalPriceProducts();
}else {
    alert('Une erreur est survenue !');
}
if(localStorage.getItem('itemOrderId')) {
    document.querySelector('#container-order-id').innerHTML = "<h3>Voici votre identifiant de commande:</h3><br/>" + localStorage.getItem('itemOrderId');
}



function displayBasket() {

    for (i = 0; i < products.length; i++) {

        const camerasContainer = document.querySelector('.camera_container');

        const card = document.createElement("div");
        card.className = 'card bg-dark text-white cardStyleValidation';
        card.style.width = '20%';

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Image de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsImgCamera = document.createElement("img");
        productsImgCamera.setAttribute('src', products[i].imageUrl);
        productsImgCamera.className = 'card-img';
        card.appendChild(productsImgCamera);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Corps principale de la card ////////////////////////////////////////////////////////////////////////////////////////

        const mainContainerCard = document.createElement('div');
        mainContainerCard.className = 'card-img-overlay';
        card.appendChild(mainContainerCard);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Titre de l'objet ////////////////////////////////////////////////////////////////////////////////////////

        const productsTitle = document.createElement("h5");
        productsTitle.className = 'card-title';
        productsTitle.innerHTML = products[i].name;
        mainContainerCard.appendChild(productsTitle);

         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Prix de l'objet ////////////////////////////////////////////////////////////////////////////////////////

         const productsPrice = document.createElement("h5");
         productsPrice.className = 'card-price';
         productsPrice.innerHTML = products[i].price * products[i].quantity / 100 + ' €';
         mainContainerCard.appendChild(productsPrice);

         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Prix de l'objet ////////////////////////////////////////////////////////////////////////////////////////

         const productsQuantity = document.createElement("h5");
         productsQuantity.className = 'card-quantity';
         productsQuantity.innerHTML = 'X ' + products[i].quantity;
         mainContainerCard.appendChild(productsQuantity);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Enfents principaux de card ////////////////////////////////////////////////////////////////////////////////////////

        camerasContainer.appendChild(card);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Calcule du prix total des produits ////////////////////////////////////////////////////////////////////////////////////////

function calculTotalPriceProducts() {

    let total = 0;

    for (i = 0; i < products.length; i++) {
        total += products[i].price * products[i].quantity;
        
    }
    document.querySelector('.total-price').innerHTML = 'Prix total des produits: ' + total / 100 + '€';
}
