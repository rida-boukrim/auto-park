import { voituresInitiales } from "./data.js";
// let voitures = voituresInitiales.map((voiture) => ({ ...voiture }));


const tBody = document.getElementById("liste-voitures")


















// fonction afficher 
function afficher () {
tBody.replaceChildren();

voituresInitiales.forEach((voiture) => {
const tr = document.createElement("tr")

const td1 = document.createElement("td")
const td1Strong = document.createElement("strong")
td1Strong.textContent = voiture.marque
td1.append(td1Strong);

const td2 = document.createElement("td")
td2.textContent = voiture.modele

const td3 = document.createElement("td")
const td3Strong = document.createElement("strong")
td3Strong.className = "registration"
td3Strong.textContent = voiture.immatriculation
td3.append(td3Strong)

const td4 = document.createElement("td")
td4.textContent = voiture.categorie

const td5 = document.createElement("td")
td5.className = "price"
td5.textContent = voiture.prixJour
const td5Span = document.createElement("span")
td5Span.textContent = " DH/jour"
td5.append(td5Span)

const td6 = document.createElement("td")
const td6Span = document.createElement("span")
td6Span.className = "badge badge-disponible"
td6Span.textContent = voiture.statut
td6.append(td6Span)
if(td6Span.textContent === "Disponible"){
    td6Span.className = "badge badge-disponible"
}else if(td6Span.textContent === "Louée"){
    td6Span.className = "badge badge-louee";
}else{
    td6Span.className = "badge badge-maintenance";
}

const td7 = document.createElement("td")
const td7Container = document.createElement("div")
td7Container.className = "row-actions"
// modifier
const button1 = document.createElement("button")
button1.type = "button";
button1.className = "button button-edit"
button1.textContent = "Modifier"
// supprimer
const button2 = document.createElement("button")
button2.type = "button";
button2.className = "button button-delete"
button2.textContent = "Supprimer"

td7Container.append(button1,button2)
td7.append(td7Container)



// append childe
tr.append(td1,td2,td3,td4,td4,td5,td6,td7)
tBody.append(tr)

})


}
afficher()