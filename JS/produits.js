////////////////////////////////////////////////////////////////////////////////////////////// La récupération des éléments de l'URL /////////////////////////////////////////////////////////////////////////////////////////

function getItemFromUrl() {
    const urlParametres = window.location.search;
    const searchParams = new URLSearchParams(urlParametres);

    return searchParams.get('id');
}

////////////////////////////////////////////////////////////////////////////////////////////// Vérification de l'URL ///////////////////////////////////////////////////////////////////////////////////////////////////////

function displayError() {
    if (getItemFromUrl() === null) {
        alert('T\'es moche!');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////// Récupération d'un élément par son id par URL /////////////////////////////////////////////////////////////////////////////////////////

function getProductById() {
    const id = getItemFromUrl();
    if (id === null) {
        displayError();
    } else {
        fetch(`http://localhost:3000/api/cameras/${id}`).then(response => { // .then sert pour les promesses
            if (response.ok) {
                response.json().then((data) => {
                    displayData(data); // Utile pour afficher les éléments dans la console
                });
            } else {
                console.error(response);
            }

        });
    }
}; // ------ Fin de la fonction getProductById ------- //
getProductById();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Indication de l'endroit ou la card sera créee ///////////////////////////////////////////////////////////////////////////////////////

function displayData(data) {
    console.log(data)
    const container = document.querySelector('.camera_container');

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Bloc principale de la card ///////////////////////////////////////////////////////////////////////////////////////

    const card = document.createElement("div");
    card.className = 'card cardStyle';
    card.style.width = '30%';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Image de l'objet ///////////////////////////////////////////////////////////////////////////////////////

    const imgCamera = document.createElement("img");
    imgCamera.setAttribute('src', data.imageUrl);
    imgCamera.className = 'card-img-top cardImageStyle';
    card.appendChild(imgCamera);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Card Bootstrap ////////////////////////////////////////////////////////////////////////////////////////

    const cardBody = document.createElement("div");
    cardBody.className = 'card-body';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Titre de l'objet ////////////////////////////////////////////////////////////////////////////////////////

    const title = document.createElement("h2");
    title.innerHTML = data.name;
    cardBody.appendChild(title);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Prix de l'objet  ////////////////////////////////////////////////////////////////////////////////////////

    const priceCamera = document.createElement("p");
    priceCamera.innerHTML = data.price / 100 + '€';
    cardBody.appendChild(priceCamera);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Description de l'objet ////////////////////////////////////////////////////////////////////////////////////////

    const description = document.createElement("p");
    description.innerHTML = data.description;
    cardBody.appendChild(description);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Menu déroulant ////////////////////////////////////////////////////////////////////////////////////////

    const dropdown = document.createElement("div");
    dropdown.className = 'dropdown mt-4';

    const button = document.createElement("button");
    button.className = 'btn btn-secondary dropdown-toggle buttonChoice';
    button.type = 'button';
    button.id = 'dropdownMenuButton';
    button.setAttribute('data-toggle', 'dropdown');
    button.setAttribute('aria-haspopup', true);
    button.setAttribute('aria-expanted', false);
    button.innerHTML = 'Lentilles';
    dropdown.appendChild(button);

    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = 'dropdown-menu';
    dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

    for (let i = 0; i < data.lenses.length; i++) {
        const dropdownItem = document.createElement("a");
        dropdownItem.className = 'dropdown-item';
        dropdownItem.innerHTML = data.lenses[i];
        dropdownMenu.appendChild(dropdownItem);
    }

    dropdown.appendChild(dropdownMenu);
    description.appendChild(dropdown);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Création du bouton d'envoie au panier ////////////////////////////////////////////////////////////////////////////////////////

    const buttonPanier = document.createElement("a");
    buttonPanier.className = 'btn btn-secondary btn-lg active ml-5 buttonOfPanier';
    buttonPanier.setAttribute('href', 'panier.html');
    buttonPanier.setAttribute('role', 'button');
    buttonPanier.setAttribute('aria-pressed', true);
    buttonPanier.innerHTML = 'Ajoutez au panier';
    dropdown.appendChild(buttonPanier);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Ajout du produit MVP au localStorage ////////////////////////////////////////////////////////////////////////////////////////

    buttonPanier.addEventListener('click', function(event) {
        event.preventDefault();
        let products = JSON.parse(localStorage.getItem("products")) ?? []; //  On affecte une variable à une valeur, ?? vérifie si la valeur de gauche est différente ou null de undefined 
        data.quantity = 1;
        if (products.length === 0) {
            products.push(data);
            localStorage.setItem('products', JSON.stringify(products));
            document.querySelector('.product-alert').style.display = 'flex';

            return;
        }
        let contain = false;
        for (let product of products) {
            if (product._id === data._id) {
                contain = true;
                product.quantity++;
            }
        }
        if (contain === false) {
            products.push(data);
        }
        //products.push(data);
        localStorage.setItem('products', JSON.stringify(products));
        document.querySelector('.product-alert').style.display = 'flex';

    });
    console.log(JSON.parse(localStorage.getItem("products")));

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Eléments enfents principaux ////////////////////////////////////////////////////////////////////////////////////////

    card.appendChild(cardBody);
    container.appendChild(card);
} // ------ Fin de la fonction displayData ------- //