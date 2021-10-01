document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée');
});




fetch('http://localhost:3000/api/cameras').then(response => {
    if (response.ok) {
        response.json().then((data) => {

            displayData(data);
        });
    } else {
        console.error(response);
    }
});






function displayData(data) {
    console.log(data);


    const container = document.querySelector('.camera_container');
    container.setAttribute("style", "display:flex; flex-direction:column; align-items:center;");



    for (let i = 0; i < data.length; i++) {

        ////////////////////////////////////////////////////////////////////////// Composants du conteneur de la card //////////////////////////////////////////////////////////////////////

        const card = document.createElement("div");
        card.className = 'card cardStyle';
        const cardBody = document.createElement("div");
        cardBody.className = 'card-body';

        ////////////////////////////////////////////////////////////////////////// Composants du lien des cards //////////////////////////////////////////////////////////////////////

        const cardLink = document.createElement("a");
        cardLink.setAttribute("href", "produits.html?id=" + (data[i]._id));
        cardLink.setAttribute("style", "color:black; text-decoration:none; width:20%; margin:80px");
        cardLink.style.width = '20%';
        container.appendChild(cardLink);
        cardLink.appendChild(card);

        ////////////////////////////////////////////////////////////////////////// Composants des images des cards //////////////////////////////////////////////////////////////////////

        const imgCamera = document.createElement("img");
        imgCamera.src = data[i].imageUrl;
        imgCamera.className = 'card-img-top cardImageStyle';
        card.appendChild(imgCamera);

        ////////////////////////////////////////////////////////////////////////// Composants des titres des cards //////////////////////////////////////////////////////////////////////

        const title = document.createElement("h2");
        title.innerHTML = data[i].name;
        card.appendChild(title);

        ////////////////////////////////////////////////////////////////////////// Composants du prix des cards //////////////////////////////////////////////////////////////////////

        const priceCamera = document.createElement("p");
        priceCamera.innerHTML = data[i].price / 100 + '€';
        card.appendChild(priceCamera);

        ////////////////////////////////////////////////////////////////////////// Composants des descriptions des cards //////////////////////////////////////////////////////////////////////

        const description = document.createElement("p");
        description.innerHTML = data[i].description;
        card.appendChild(description);
    }


}