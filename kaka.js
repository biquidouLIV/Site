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


function TiralarkEnPot(){
    document.getElementById("productName").innerText = "Tiralark en Pot"
    document.getElementById("prix").innerText = "100,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function LotDeTiralarkEnPot(){
    document.getElementById("productName").innerText = "Lot De Tiralark en Pot"
    document.getElementById("prix").innerText = "500,00€"
    document.getElementById("description").innerText = "kaka kaka kaka *5"
    ouvrirShopInfo()
}

function TiralarkEnTube(){
    document.getElementById("productName").innerText = "Tiralark en Tube"
    document.getElementById("prix").innerText = "100,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Zarkuzes(){
    document.getElementById("productName").innerText = "Zarkuzés"
    document.getElementById("prix").innerText = "950,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Blazonhuzé(){
    document.getElementById("productName").innerText = "Blazonhuzé"
    document.getElementById("prix").innerText = "30,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Uranium(){
    document.getElementById("productName").innerText = "Uranium"
    document.getElementById("prix").innerText = "6000,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Random(){
    document.getElementById("productName").innerText = "Truc tres tres précis"
    document.getElementById("prix").innerText = "10,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Formation1(){
    document.getElementById("productName").innerText = "Formation Tiralark"
    document.getElementById("prix").innerText = "2500,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Formation2(){
    document.getElementById("productName").innerText = "Formation QI++"
    document.getElementById("prix").innerText = "950,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Formation3(){
    document.getElementById("productName").innerText = "Formation Tiralark Pro Max"
    document.getElementById("prix").innerText = "9999,99€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Eau(){
    document.getElementById("productName").innerText = "Eau Iyophilisé"
    document.getElementById("prix").innerText = "25,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Carquoi(){
    document.getElementById("productName").innerText = "Car Quoi ?"
    document.getElementById("prix").innerText = "44,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function DixPlus(){
    document.getElementById("productName").innerText = "10+"
    document.getElementById("prix").innerText = "10,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function Pailluze(){
    document.getElementById("productName").innerText = "Pailluzé"
    document.getElementById("prix").innerText = "20,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    ouvrirShopInfo()
}

function PayantEmploi(){
    document.getElementById("productName").innerText = "Payant d'emploi"
    document.getElementById("prix").innerText = "950,00€"
    document.getElementById("description").innerText = "kaka kaka kaka"
    document.getElementById("Img").src = "images/produit1grand.png"
    ouvrirShopInfo()
}

function Kanard(){
    document.getElementById("productName").innerText = "Kanard"
    document.getElementById("prix").innerText = "999,99€"
    document.getElementById("description").innerText = "coin coin"
    document.getElementById("Img").src = "images/kanard.png"
    ouvrirShopInfo()
}