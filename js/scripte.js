
// import { voituresInitiales as donneesInitiales } from "./data.js";


// let voituresInitiales = donneesInitiales.map((voiture) => ({ ...voiture }));
import { voituresInitiales as donneesInitiales } from "./data.js";

const voituresSauvegardees = localStorage.getItem("voitures");

const voituresInitiales = voituresSauvegardees
    ? JSON.parse(voituresSauvegardees)
    : donneesInitiales;


const totalCars = document.getElementById("total")
const carsDisponible = document.getElementById("disponible")
const carsLouee = document.getElementById("louée")
const maintenance = document.getElementById("En-maintenance")
const tBody = document.getElementById("liste-voitures")


totalCars.textContent = voituresInitiales.length;

 carsDisponible.textContent=voituresInitiales.filter(elm=>elm.statut=="Disponible").length
 carsLouee.textContent=voituresInitiales.filter(elm=>elm.statut=="Louée").length
maintenance.textContent=voituresInitiales.filter(elm=>elm.statut=="En maintenance").length



function afficher(voitures) {
  tBody.replaceChildren();

  voitures.forEach((voiture) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-[#fbfcff]";

    // Marque
    const td1 = document.createElement("td");
    td1.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs";

    const strong = document.createElement("strong");
    strong.textContent = voiture.marque;
    td1.append(strong);

    // Modèle
    const td2 = document.createElement("td");
    td2.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs";
    td2.textContent = voiture.modele;

    // Immatriculation
    const td3 = document.createElement("td");
    td3.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs";

    const registration = document.createElement("span");
    registration.className =
      "px-[7px] py-1 border border-[#e0e6ee] rounded-[4px] text-[#506075] font-mono text-[11px]";
    registration.textContent = voiture.immatriculation;
    td3.append(registration);

    // Catégorie
    const td4 = document.createElement("td");
    td4.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs";
    td4.textContent = voiture.categorie;

    // Prix
    const td5 = document.createElement("td");
    td5.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs font-bold";

    const price = document.createElement("span");
    price.textContent = voiture.prixJour;

    const priceUnit = document.createElement("span");
    priceUnit.className = "text-[10px] font-normal text-[#627184]";
    priceUnit.textContent = " DH / jour";

    td5.append(price, priceUnit);

    // Statut
    const td6 = document.createElement("td");
    td6.className = "px-3 py-[18px] border-b border-[#edf0f5] text-xs";

    const badge = document.createElement("span");
    badge.className = "inline-flex items-center gap-[6px] px-[9px] py-[5px] rounded-[5px] font-bold text-[10px]";

    if (voiture.statut === "Disponible") {
      badge.classList.add("bg-[#eaf7f0]", "text-[#1d7048]");
    } else if (voiture.statut === "Louée") {
      badge.classList.add("bg-[#eaf0ff]", "text-[#2c53b1]");
    } else {
      badge.classList.add("bg-[#fff4df]", "text-[#8a5910]");
    }

    badge.textContent = voiture.statut;
    td6.append(badge);


    tr.append(td1, td2, td3, td4, td5, td6);
    tBody.append(tr);
  });
}
document.querySelectorAll("th").forEach((th) => {
  th.classList.add(
    "px-3",
    "py-[13px]",
    "bg-[#f6f8fc]",
    "text-[#617084]",
    "text-[10px]",
    "uppercase",
    "tracking-[0.7px]"
  );
});

const headers = document.querySelectorAll("th");

headers[0]?.classList.add("rounded-l-md");
headers[headers.length - 1]?.classList.add("rounded-r-md");

afficher(voituresInitiales);
