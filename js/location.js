
import { voituresInitiales as donneesInitiales } from "./data.js";

let voituresInitiales = donneesInitiales.map((voiture) => ({ ...voiture }));


const menue = document.getElementById("btnmenu")
const menuContainer = document.getElementById("divmenuee")
const liste = document.getElementById("allCarss")
liste.className ="allCars"
const dateDebut = document.getElementById("date-debut")
const dateFin = document.getElementById("date-fin")
const debutErreur = document.getElementById("erreur-debut")
const finErreur = document.getElementById("erreur-fin")
const btnsuivant = document.getElementById("Suivant")
const marqueModele  = document.querySelector(".secondP")
const categoriePrix = document.querySelector(".thirdP")
const joureLoue = document.querySelector(".jours")
const prixDesJours = document.querySelector(".prixApartir-deree")
const calculPrix = document.querySelector(".claculPrix")
const prixtotal = document.querySelector(".prixEstime")
const detedexpiration = document.querySelector(".dateDexpiration")
const stepOne = document.querySelector(".deuxSection")
const stepTwo = document.querySelector(".step-2")
const agence = document.querySelector(".agency")


  const configuration = {
    voitureId: null,
    DateDeDebut:"",
    DateDeFin: "",
    marquee:"",
    modelee:"",
    categoriee:"",
    mad:"MAD / jour",
    statuss:"",
    prixee:""

  }

  const aujourdhui = new Date().toISOString().slice(0, 10);
  console.log(aujourdhui)
  dateDebut.min = aujourdhui
  

function afficher () {
voituresInitiales.forEach((voiture) => {
  

  const labelle = document.createElement("label")
  labelle.className = ""
  const articlee = document.createElement("article")

  const modelleDiv = document.createElement("div")
  modelleDiv.className ="flexible"

  const modele = document.createElement("p")
  modele.className = "modelle"
  modele.textContent = voiture.categorie
  const check = document.createElement("input")
  check.type = "radio"
  check.name = "voiture"
  check.className ="radio"
  check.addEventListener("change", () => {
    configuration.voitureId = voiture.id
    configuration.marquee = voiture.marque
    configuration.modelee = voiture.modele
    configuration.categoriee = voiture.categorie
    configuration.statuss = voiture.statut
    configuration.prixee = voiture.prixJour

    marqueModele .textContent = configuration.marquee + " " + configuration.modelee;
    categoriePrix.textContent = configuration.categoriee + " " + configuration.prixee + " " + configuration.mad


  })
  
  
  const marquee = document.createElement("p")
  marquee.className = "carBrand"
  marquee.textContent = voiture.marque + " " + voiture.modele
  const statuss = document.createElement("p")
  statuss.className ="carStatu"
  statuss.textContent = voiture.statut
  const prixe = document.createElement("p")
  prixe.className = "carPrix"
  prixe.textContent = voiture.prixJour 
  const dh = document.createElement("span")
  dh.className = "carPrix"
  dh.textContent = " MAD / jour"
  prixe.append(dh)

modelleDiv.append(modele,check)
articlee.append(modelleDiv,marquee,statuss,prixe)
labelle.append(articlee)
liste.append(labelle)




})
}
afficher()

function verefierDate () {

debutErreur.textContent = ""
finErreur.textContent = ""
let valid = true

if(dateDebut.value === ""){
  debutErreur.textContent = "champe required"
valid = false
}

if(dateFin.value == "" ){
  finErreur.textContent = "champe required"
  valid = false
}
return valid





}
btnsuivant.addEventListener("click", () => {
  if(!verefierDate()) return
  stepOne.setAttribute("hidden","")
  stepTwo.removeAttribute("hidden")

})

function calculerJours() {
  if(dateDebut.value !== "" && dateFin.value !== ""){

    const difference = new Date (dateFin.value) - new Date(dateDebut.value)
    const jours = difference /(1000 * 60 * 60 * 24)
    joureLoue.textContent = jours + "jours · dates incluses"
    prixDesJours.textContent = "vehicule : " + jours + " jours * " +configuration.prixee + "DH"
    calculPrix.textContent = jours * configuration.prixee + "MAD"
    prixtotal.textContent = jours * configuration.prixee + " MAD"
    detedexpiration.textContent = dateDebut.value + " → " + dateFin.value
  }

}

  dateDebut.addEventListener("change",() => {

    dateFin.min = dateDebut.value

})

dateFin.addEventListener("change",() => {
 calculerJours()

})



menue.addEventListener("click",() => {
  menuContainer.toggleAttribute("hidden")
})