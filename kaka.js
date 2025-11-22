function Commentaire2(){
    var pseudo = document.getElementById("pseudo").value
    var commentaire = document.getElementById("com").value
        
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
    
    document.getElementById("pseudo").value = "quelqu'un"
    document.getElementById("com").value =""
    
    
}
