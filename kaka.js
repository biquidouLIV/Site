function Commentaire(){
    var a = document.getElementById("oui").value
    console.log(a)
    document.getElementById("non").value = a
}

function Commentaire2(){
    var pseudo = document.getElementById("pseudo").value
    var commentaire = document.getElementById("com").value
        
    var tableCommentaire = document.getElementById("TableCom")
    
    var ligne = document.createElement("tr")
    var newName = document.createElement("td")
    var newCom = document.createElement("td")

    newName.innerText = pseudo
    newCom.innerText = commentaire
    
    ligne.appendChild(newName)
    ligne.appendChild(newCom)
    
    tableCommentaire.appendChild(ligne)
    
    
}