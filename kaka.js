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


//boutique
function CreerProduit(produit, container){
    var divItem = document.createElement("div");
    divItem.className = "shop-item";
    
    var img = document.createElement("img");
    img.className = "shop-image";
    img.src = produit.image;
    
    var pName = document.createElement("p");
    pName.innerText = produit.nom || "Produit sans nom";
    
    var btn = document.createElement("button");
    btn.innerText = "Acheter";

    
    btn.onclick = function() {
        AfficherDetailsProduit(produit);
    };
    
    divItem.appendChild(img);
    divItem.appendChild(pName);
    divItem.appendChild(btn);
    container.appendChild(divItem);
}



function AfficherDetailsProduit(produit) {
    document.getElementById("productName").innerText = produit.nom;
    document.getElementById("prix").innerText = produit.prix + " €";
    document.getElementById("description").innerText = produit.description;
    document.getElementById("Img").src = produit.image;
    
    var btnAcheter = document.querySelectorAll(".shop-info-button button")[1];
    
    btnAcheter.onclick = function() {
        ajouterAuPanier(produit);
    };

    ouvrirShopInfo();
}





//client
var modeInscription = false;

function basculerMode() {
    modeInscription = !modeInscription;

    document.getElementById("ErrorMessage").innerText = "";

    var divInscrip = document.getElementById("champsInscription");
    var titre = document.getElementById("titreConnexion");
    var btn = document.getElementById("btnAction");
    var lien = document.getElementById("lienMode");

    if (modeInscription) {
        divInscrip.style.display = "block";
        titre.innerText = "Créer un compte";
        btn.innerText = "S'inscrire";
        lien.innerText = "Toi déjà compte";
    } 
    else {
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
            var clientTrouve = clients.find(c => c.mail === mail && c.mdp === mdp);

            if (clientTrouve) {
                document.getElementById("ErrorMessage").innerText = "C'est bon t'es co "+clientTrouve.prenom + " "+clientTrouve.nom;
                localStorage.setItem("clientConnecte", JSON.stringify(clientTrouve));
            } else {
                document.getElementById("ErrorMessage").innerText = "Email ou mot de passe pas bien";
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


//commande
var panier = [];


function ajouterAuPanier(produit) {
    panier.push(produit);
}

function ouvrirPanier() {
    var zoneListe = document.getElementById("listeArticles");
    var zoneTotal = document.getElementById("prixTotal");


    if (panier.length === 0) {
        zoneListe.innerHTML = "<p style='text-align:center'>t'achètes rien... :(</p>";
        zoneTotal.innerText = "0";
    } else {
        //
        var html = "";
        var total = 0;
     
        panier.forEach((prod, index) => {
            html += `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #ccc; padding:5px;">
                        <span>${prod.nom}</span>
                        <span>${prod.prix} €</span>
                        <button onclick="retirerArticle(${index})" style="background:red; color:white; padding:2px 8px; margin:0; font-size:12px;">X</button>
                     </div>`;
            total += parseFloat(prod.prix);
        });
        zoneListe.innerHTML = html;
        zoneTotal.innerText = total;
        //
    }

    document.getElementById("PopupPanier").style.display = "flex";
}


function fermerPanier() {
    document.getElementById("PopupPanier").style.display = "none";
}


function retirerArticle(index) {
    panier.splice(index, 1);
    ouvrirPanier();
}


function validerCommande() {
    if (panier.length === 0) return alert("y a rien...");

    var clientJson = localStorage.getItem("clientConnecte");
    if (!clientJson) {
        fermerPanier();
        return ouvrirPopupConnexion();
    }

    var client = JSON.parse(clientJson);
    var idClient = client.idClient;

    if (!idClient) return;
    
    var payloadCreation = {
        "produits":panier,
        "prixTotal":document.getElementById("prixTotal").innerText,
        "dateLivraison": "très très bientôt",
        "gp1": "Liam"
    };

    var urlCreation = 'https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients/' + idClient + '/commandes';
    
    fetch(urlCreation, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadCreation)
    })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.status );
        })
        .then(data => {
            var idCommande
            fetch('https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients/' + idClient + '?gp1=Liam',{            })
                .then(response => response.json())
                .then(data => {
                    
                    idCommande = data.commandes.en_cours.idCommande;
                    console.log("Commande créée ! ID : " + idCommande);
                    remplirLaCommande(idClient, idCommande);
                    ValiderCommande(idClient,idCommande)
                })

          
        })
        .catch(error => {
            alert(error.message);
        });
}


function remplirLaCommande(idClient, idCommande) {
    var bouton = document.querySelector("#PopupPanier button");
    var produitsAjoutes = 0;

    panier.forEach(produit => {
        var urlAjout = 'https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients/' + idClient + '/commandes/' + idCommande + '/produits';

        fetch(urlAjout, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "gp1": "Liam",
                "idProduit": produit.idProduit,
            })
        }).then(() => {
            produitsAjoutes++;
            console.log(produitsAjoutes)
        });
    });
}

function ValiderCommande(idClient, idCommande) {

    var Patch = {
        "statut": "valide",
        "gp1": "Liam"
    }

    fetch('https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients/' + idClient + '/commandes/' + idCommande, {
        method: 'PATCH',
        headears: {'Content-Type': 'application/json'},
        body: JSON.stringify(Patch)
    })
        .then(response => {
            if(response.ok) {
                alert("Commande Validée")
            }
        })
}