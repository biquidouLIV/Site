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