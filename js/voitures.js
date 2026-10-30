
// import { voituresInitiales as donneesInitiales } from "./data.js";

// let voituresInitiales = donneesInitiales.map((voiture) => ({ ...voiture }));


import { voituresInitiales as donneesInitiales } from "./data.js";

const voituresSauvegardees = localStorage.getItem("voitures");

let voituresInitiales = voituresSauvegardees
    ? JSON.parse(voituresSauvegardees)
    : donneesInitiales.map((voiture) => ({ ...voiture }));

let idModification = null;
const tBody = document.getElementById("liste-voitures")
const button = document.getElementById("bouton-enregistrer");
const carBrand = document.getElementById("marque");
const carModel = document.getElementById("modele");
const carPlate = document.getElementById("immatriculation");
const carCategorie = document.getElementById("categorie");
const carPrix = document.getElementById("prix-jour");
const carStatus = document.getElementById("statut");
const form = document.getElementById("formulaire-voiture");
const selectTriPrix = document.getElementById("tri-prix");
const filtreStatut = document.getElementById("filtre-statut");
const filtreCategorie = document.getElementById("filtre-categorie");
const recherche = document.getElementById("recherche");
const btnReinitialiser = document.getElementById("reinitialiser-filtres");
const annulation = document.getElementById("annuler-modification")

// error message
const brandError = document.getElementById("erreur-marque")
brandError.className =" field-error"
const modelError  = document.getElementById("erreur-modele")
modelError.className = "field-error";
const plateError = document.getElementById("erreur-immatriculation");
plateError.className = "field-error"
const categorieError = document.getElementById("erreur-categorie");
categorieError.className ="field-error"
const prixError = document.getElementById("erreur-prix-jour");
prixError.className = "field-error";
const statusError  = document.getElementById("erreur-statut");
statusError.className = "field-error";
const vide = document.getElementById("etat-vide")
// localStorage function
function sauvegarderVoitures() {
    localStorage.setItem("voitures", JSON.stringify(voituresInitiales));
}


// fonction afficher 
function afficher (voituresInitiales) {
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
button1.addEventListener("click",(event) => {   
    event.preventDefault()
    idModification = voiture.id;
    carBrand.value = voiture.marque;
    carModel.value = voiture.modele;
    carPlate.value = voiture.immatriculation;
    carCategorie.value = voiture.categorie;
    carPrix.value = voiture.prixJour;
    carStatus.value = voiture.statut;
    button.textContent = "Modifier";
    annulation.removeAttribute("hidden")
})
// annuler modification
annulation.addEventListener("click",() => {

    form.reset()
    button.textContent = "Ajouter la voiture";
    annulation.setAttribute("hidden","")
    idModification = null;    

    

})

// supprimer
const button2 = document.createElement("button")
button2.type = "button";
button2.className = "button button-delete"
button2.textContent = "Supprimer"
// function supprimer
button2.addEventListener("click", (event) => {
    event.preventDefault();
    if( confirm ("Voulez-vous supprimer cette voiture ?")){
        voituresInitiales = voituresInitiales.filter(
            (item) => item.id !== voiture.id
        )

        sauvegarderVoitures();
        afficher(voituresInitiales)
        form.reset()
    }

})


td7Container.append(button1,button2)
td7.append(td7Container)


// append childe
tr.append(td1,td2,td3,td4,td5,td6,td7)
tBody.append(tr)

})

if(voituresInitiales.length == 0){
    vide.removeAttribute("hidden")

}
}

// function ajouter 
button.addEventListener("click", (event) => {
    event.preventDefault();

    const brandFiel = carBrand.value;
    const modelField = carModel.value;
    const plateField = carPlate.value;
    const categorieField = carCategorie.value;
    const prixField = carPrix.value;
    const statusField = carStatus.value;
    annulation.setAttribute("hidden","")

    // validation de champ
    let valid = true;
    plateError.textContent = "";
categorieError.textContent = "";
 prixError.textContent = "";
 statusError.textContent = "";
 modelError.textContent = "";
brandError.textContent = "";

if(brandFiel.trim() === ""){
    brandError.textContent = "champ required";
    valid = false;

}

if(modelField.trim() === ""){
    modelError.textContent = "champ required";
    valid = false;
}

if(plateField.trim() === ""){
    plateError.textContent = "champ required";
    valid = false;
}

if(categorieField.trim() === ""){
    categorieError.textContent = "champ required";
    valid = false;
}

if(prixField.trim() === ""){
    prixError.textContent = "champ required";
    valid = false;
}

if(statusField.trim() === ""){
    statusError.textContent = "champ required";
    valid = false;
}
if (valid === false){
    return;
}
    // Vérifier limmatriculation

    const immatriculationExiste = voituresInitiales.some((voiture) =>
        voiture.immatriculation.trim().toLowerCase() ===
        plateField.trim().toLowerCase() &&
        voiture.id !== idModification
    );

    if (immatriculationExiste) {
        plateError.textContent = "Cette immatriculation existe déjà";
        return;
    }

// modifier les champ
if (idModification !== null){
    const voitureModifier = voituresInitiales.find(
        (voiture ) => voiture.id === idModification
    )
    
    if(voitureModifier){
        voitureModifier.marque = brandFiel.trim(); 
        voitureModifier.modele = modelField.trim();
        voitureModifier.immatriculation = plateField.trim();
        voitureModifier.categorie = categorieField.trim();
        voitureModifier.prixJour = prixField.trim();
        voitureModifier.statut = statusField.trim();
            button.textContent = "Ajouter la voiture";
        
   idModification = null;
 }
}else {
        // noveau voiture
    const nouvell =  {
        id: voituresInitiales.length +1,
        marque:brandFiel.trim(),
        modele: modelField.trim(),
        immatriculation: plateField.trim(),
        categorie: categorieField.trim(),
        prixJour: prixField.trim(),
        statut: statusField.trim(), 

    }
    voituresInitiales.push(nouvell)
}

sauvegarderVoitures();
afficher(voituresInitiales)
form.reset()


})
// filtr a partir status categorie and recherch 
function afficherVoiturApartir () {
let copy = [...voituresInitiales];

// filter statut

if(filtreStatut.value !== ""){
    copy = copy.filter(filtrer => filtrer.statut === filtreStatut.value)
}
// filter categorie
if(filtreCategorie.value !== ""){
    copy = copy.filter(filtrer => filtrer.categorie === filtreCategorie.value)
}
// recherch par
const recherchText = recherche.value.trim().toLowerCase();
if(recherchText !== ""){
    copy = copy.filter(filtrer => 
        filtrer.marque.toLocaleLowerCase().trim().includes(recherchText)||
        filtrer.modele.toLocaleLowerCase().trim().includes(recherchText)||
        filtrer.immatriculation.toLocaleLowerCase().trim().includes(recherchText)
    )
}


    if (selectTriPrix.value === "decroissant") {
        copy.sort((a, b) => Number(a.prixJour) - Number(b.prixJour));
    } else if (selectTriPrix.value === "croissant") {
        copy.sort((a, b) => Number(b.prixJour) - Number(a.prixJour));
    }



afficher(copy)
}
selectTriPrix.addEventListener("change",afficherVoiturApartir)
recherche.addEventListener("input",afficherVoiturApartir)
filtreCategorie.addEventListener("change",afficherVoiturApartir)
filtreStatut.addEventListener("change",afficherVoiturApartir)
// Reinitialiser
btnReinitialiser.addEventListener("click",() => {
        filtreStatut.value = "";
    filtreCategorie.value = "";
    selectTriPrix.value = "initial";
    recherche.value = "";

afficher(voituresInitiales)
})
sauvegarderVoitures();
afficher(voituresInitiales)