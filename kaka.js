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
    document.getElementById("prix").innerText = produit.prix + " €";
    document.getElementById("description").innerText = produit.description;
    document.getElementById("Img").src = produit.image;

    // On récupère le bouton "Acheter" de la popup produit
    var btnAcheter = document.querySelectorAll(".shop-info-button button")[1];

    // Quand on clique dessus -> Hop dans le panier
    btnAcheter.onclick = function() {
        ajouterAuPanier(produit);
    };

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

// --- GESTION DU PANIER ---

var panier = []; // Notre liste d'achats

// 1. Ajouter un produit (appelé quand on clique "Acheter" sur un produit)
function ajouterAuPanier(produit) {
    panier.push(produit);
    alert("C'est ajouté !"); // Petit message de confirmation
    fermerShopInfo();        // On ferme la fiche produit
}

// 2. Ouvrir la popup et afficher la liste (C'est là que ça se dessine)
function ouvrirPanier() {
    var zoneListe = document.getElementById("listeArticles");
    var zoneTotal = document.getElementById("prixTotal");

    // Si vide
    if (panier.length === 0) {
        zoneListe.innerHTML = "<p style='text-align:center'>Ton panier est vide...</p>";
        zoneTotal.innerText = "0";
    } else {
        // Sinon, on construit la liste
        var html = "";
        var total = 0;

        // On boucle sur chaque article pour l'afficher
        panier.forEach((prod, index) => {
            html += `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #ccc; padding:5px;">
                        <span>${prod.nom}</span>
                        <span>${prod.prix} €</span>
                        <button onclick="retirerArticle(${index})" style="background:red; color:white; padding:2px 8px; margin:0; font-size:12px;">X</button>
                     </div>`;

            // On ajoute au total (on s'assure que c'est bien un nombre)
            total += parseFloat(prod.prix);
        });

        zoneListe.innerHTML = html;
        zoneTotal.innerText = total; // On arrondit si besoin
    }

    document.getElementById("PopupPanier").style.display = "flex";
}

// 3. Fermer la popup
function fermerPanier() {
    document.getElementById("PopupPanier").style.display = "none";
}

// 4. Retirer un article précis
function retirerArticle(index) {
    panier.splice(index, 1); // Enlève 1 élément à la position 'index'
    ouvrirPanier();          // On rafraîchit l'affichage tout de suite
}

// 5. Envoyer la commande (Le grand final)


function validerCommande() {
    // 1. Récupération Client
    var clientJson = localStorage.getItem("clientConnecte");
    if (!clientJson) {
        fermerPanier();
        return ouvrirPopupConnexion();
    }
    var client = JSON.parse(clientJson);

    // 2. ID Client
    var idClient = client.id || client.idClient || client._id;
    if (!idClient) return alert("Erreur CRITIQUE : Pas d'ID client trouvé. Déconnecte-toi et recrée un compte.");

    // 3. Corps du message (EXACTEMENT comme Postman)
    // On force des valeurs simples pour débloquer la situation
    var payload = {
        "produits": [],         // Tableau vide obligatoire pour la création
        "prixTotal": 0,         // Entier (pas de string, pas de virgule)
        "dateLivraison": "2024-01-01", // Une date simple
        "gp1": "Liam"           // Le groupe est ICI, pas dans l'URL
    };

    // 4. L'URL (On enlève le ?gp1=Liam à la fin !)
    var url = 'https://ffw95cfxfg.execute-api.eu-north-1.amazonaws.com/clients/' + idClient + '/commandes';

    console.log("---------------- VERIFICATION ----------------");
    console.log("URL visée :", url);
    console.log("Données envoyées :", JSON.stringify(payload));
    console.log("----------------------------------------------");

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Pas d'autres headers bizarres
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (response.ok) {
                alert("✅ VICTOIRE ! Commande créée.");
                panier = [];
                fermerPanier();
            } else {
                // Si ça rate, on affiche le message technique du serveur
                return response.text().then(text => {
                    alert("❌ Erreur " + response.status + " : " + text);
                    console.log("Réponse serveur :", text);
                });
            }
        })
        .catch(error => {
            alert("⚠️ Erreur Réseau : " + error.message);
        });
}