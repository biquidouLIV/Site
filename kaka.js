function Commentaire(){
    var pseudo = document.getElementById("pseudo").value
    var commentaire = document.getElementById("com").value
        
    if(commentaire == ""){
        return
    }
    if(pseudo == ""){
        pseudo = "un gens"
    }
    
    var date = new Date()

    j = date.getDate().toString()
    m = date.getMonth().toString()
    a = date.getFullYear().toString()

    
    var tableCommentaire = document.getElementById("TableCom")
    
    var ligne = document.createElement("tr")
    var newName = document.createElement("td")
    var newCom = document.createElement("td")
    var newDate = document.createElement("td")
    

    newName.innerText = pseudo
    newCom.innerText = commentaire
    newDate.innerText = j + "/" + m + "/" + a
    
    ligne.appendChild(newName)
    ligne.appendChild(newCom)
    ligne.appendChild(newDate)
    tableCommentaire.appendChild(ligne)
    
    document.getElementById("pseudo").value = ""
    document.getElementById("com").value =""
}






function envoyerMail() {
    var nom = document.getElementById("ContactBox1").value;
    var objet = document.getElementById("ContactBox2").value;
    var message = document.getElementById("ContactBox3").value;

    var contenu = "Bonjour je sapel " + nom + " koman keske tu vas ?\n" + message;

    var destinataire = "wengshinliam@gmail.com";

    var lien = "mailto:" + destinataire
        + "?subject=" + encodeURIComponent(objet)
        + "&body=" + encodeURIComponent(contenu);

    window.location.href = lien;
    ouvrirPopUp();
}
function ouvrirPopUp() {
    document.getElementById("Overlay").style.display = "flex";
}

function fermerPopUp() {
    document.getElementById("Overlay").style.display = "none";
}

function ouvrirShopInfo(){
    document.getElementById("ShopInfo").style.display = "flex";
}

function fermerShopInfo(){
    document.getElementById("ShopInfo").style.display = "none";
}

function ouvrirPopupConnexion(){
 document.getElementById("PopupConnexion").style.display ="flex"
}

function fermerPopupConnexion(){
    document.getElementById("PopupConnexion").style.display = "none"
}


function chargerProduits() {
    fetch('https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/produits?gp1=Liam')
        .then(response => response.json())
        .then(produits => {
            var container = document.getElementById("liste-produits");

            produits.forEach(produit => {
                CreerProduit(produit, container);
            });
        })
}

function CreerProduit(produit, container){
    // 1. Création de la div .shop-item
    var divItem = document.createElement("div");
    divItem.className = "shop-item";

    // 2. Création de l'image
    var img = document.createElement("img");
    img.className = "shop-image";

    // --- C'EST ICI QUE CA SE JOUE ---

    // Pour t'aider : regarde dans la Console (F12) de ton navigateur.
    // Ça va t'afficher les infos du produit. Cherche s'il y a "image", "url", "src" ou "photo".
    console.log("Infos du produit :", produit);

    // Si dans ta base de données, la colonne s'appelle "image", laisse ça :
    if (produit.image) {
        img.src = produit.image;
    }
        // Si elle s'appelle "url", remplace par : img.src = produit.url;
    // Si elle s'appelle "photo", remplace par : img.src = produit.photo;
    else {
        // Image de secours si aucune image n'est trouvée
        img.src = "images/produit1.png";
    }

    // 3. Création du nom
    var pName = document.createElement("p");
    pName.innerText = produit.nom || "Produit sans nom";

    // 4. Création du bouton
    var btn = document.createElement("button");
    btn.innerText = "Acheter";

    // On garde en mémoire les infos de CE produit pour la popup
    btn.onclick = function() {
        AfficherDetailsProduit(produit);
    };

    // 5. Assemblage
    divItem.appendChild(img);
    divItem.appendChild(pName);
    divItem.appendChild(btn);

    // 6. Ajout à la page
    container.appendChild(divItem);
}

function AfficherDetailsProduit(produit) {
    document.getElementById("productName").innerText = produit.nom;
    document.getElementById("prix").innerText =produit.prix + " €";
    document.getElementById("description").innerText = produit.description;
    document.getElementById("Img").src = produit.image
    
    
    ouvrirShopInfo();
}






var modeInscription = false; // Par défaut, on est en mode "Connexion"

function basculerMode() {
    modeInscription = !modeInscription; // On inverse le mode

    document.getElementById("ErrorMessage").innerText = "";

    var divInscrip = document.getElementById("champsInscription");
    var titre = document.getElementById("titreConnexion");
    var btn = document.getElementById("btnAction");
    var lien = document.getElementById("lienMode");

    if (modeInscription) {
        // On affiche le mode Inscription
        divInscrip.style.display = "block";
        titre.innerText = "Créer un compte";
        btn.innerText = "S'inscrire";
        lien.innerText = "Toi déjà compte";
    } else {
        // On revient au mode Connexion
        divInscrip.style.display = "none";
        titre.innerText = "Connexion";
        btn.innerText = "Se connecter";
        lien.innerText = "Toi pas compte ? Toi faire compte";
    }
}

function actionConnexion() {
    if (modeInscription) {
        Inscription();
    } else {
        Connexion();
    }
}


function Connexion() {
    var mail = document.getElementById("emailClient").value;
    var mdp = document.getElementById("mdpClient").value;
    
    
    fetch('https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients?gp1=Liam')
        .then(response => response.json())
        
        .then(clients => {
            // 2. On cherche si un client a ce mail et ce mot de passe
            var clientTrouve = clients.find(c => c.mail === mail && c.mdp === mdp);

            if (clientTrouve) {
                document.getElementById("ErrorMessage").innerText = "C'est bon t'es co "+clientTrouve.prenom + " "+clientTrouve.nom;
                localStorage.setItem("clientConnecte", JSON.stringify(clientTrouve));
            } else {
                document.getElementById("ErrorMessage").innerText = "Email ou mot de passe incorrect";
            }
        })
        .catch(error => console.error("Erreur:", error));
}

function Inscription() {
    var nom = document.getElementById("nomClient").value;
    var prenom = document.getElementById("prenomClient").value;
    var mail = document.getElementById("emailClient").value;
    var mdp = document.getElementById("mdpClient").value;
    var adresse = document.getElementById("adresseClient").value;
    var tel = document.getElementById("telClient").value;

    if (!nom || !prenom || !mail || !mdp || !adresse || !tel) {
        document.getElementById("ErrorMessage").innerText = "Toi tout remplir sinon toi pas bien";
        return;
    }
    
    var nouveauClient = {
        prenom: prenom,
        gp1: "Liam",
        adresse:adresse,
        tel:tel,
        mail: mail,    
        nom: nom,
        mdp: mdp,
    };

    fetch('https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nouveauClient)
    })
        
    .catch(error => {
        document.getElementById("ErrorMessage").innerText = "Erreur";
    })
        
    .then(data => {
        basculerMode();
    })

}