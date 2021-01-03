(function() {
    var httpRequest; // on crée la variable httpRequest //
    document.getElementById("buy").addEventListener('click', makeRequest); // On prend l \' élément\ ' ayant pour id buy, et on écoute l'événement click qui appelle la fonction makeRequest //

    function makeRequest(url, userName) { // On crée la fonction makeRequest //  
        httpRequest = new XMLHttpRequest(); // La variable httpRequest est égale à une nouvelle requête HTTP //

        if (!httpRequest) { // Si le résultat est différent de httpRequest alors...//
            alert('Abandon :( Impossible de créer une instance de XMLHTTP'); // On affiche un message comme  quoi il impossible de créer une instance HTTP//
            return false; // Et on retourne faux //
        }
        httpRequest.onreadystatechange = alertContents; // La requête HTTP est faite, on réalise l'exécution grâce à alertContents() via onreadystatechange//
        httpRequest.open('GET', '​http://localhost:3000/api/cameras'); // On va récupérer le contenu du back-end via l'URL //
        httpRequest.setRequestHeader('JSON', 'application/x-www-form-urlencoded'); // On applique le format JSON à la requête //
        httpRequest.send('userName=' + encodeURIComponent(userName)); // On envoie la demande de récupération //
    }

    function alertContents() { // On crée la fonction alertContents //
        if (httpRequest.readyState === XMLHttpRequest.DONE) { //Si httpRequest.readyState est valide //
            if (httpRequest.status === 200) { // Si httpRequest.status trouve la page en question //
                var response = JSON.parse(httpRequest.responseText);
                alert(response.computedString); // alors on affiche computedString //
            } else { // Sinon... //
                alert('Il y a eu un problème avec la requête.'); // On affiche un message d'erreur//
            }
        }
    }
})();