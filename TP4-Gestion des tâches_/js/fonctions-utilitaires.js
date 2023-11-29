"use strict";
/*global DATA_TACHES */

/**
 *
 * @param {string} pImage resoit l'image
 * @param {string} pTitre recois le titre du card
 * @param {string} pDescription recois la description
 * @param {boolean} pEstAvecBouton  s'il y a un bouton ou non
 * @param {*} pElementHtmlBouton je ne sais pas
 * @returns {Element} retourne la div contenat le card
 */
function creerCard(
   pImage,
   pTitre,
   pDescription,
   pEstAvecBouton,
   pElementHtmlBouton
) {
   let divContentLECard = document.createElement("div");
   divContentLECard.className = "card";
   // header du card:
   let cardHeader = document.createElement("div");
   cardHeader.className = "card-header";
   let img = document.createElement("img");
   img.className = "card-image";
   let h2 = document.createElement("h2");
   h2.classList.add("card-title");
   let ul = document.createElement("ul");

   for (let data of DATA_TACHES.detailsTache) {
      let li = document.createElement("li");
      li.textContent = data.id;
      li.textContent = data.titre;
      li.textContent = data.dateDebut;
      li.textContent = data.dateFin;
      li.textContent = data.dureeEnNbJours;
      li.textContent = data.pctComplete;
      li.textContent = data.dependances;
      ul.appendChild(li);
   }

   //body du card:
   let cardBody = document.createElement("div");
   cardBody.classList.add("card-body");
   h2.textContent = pTitre;
   h2.className = "card-title";

   // footer du card:
   let cardFooter = document.createElement("div");
   cardFooter.className = "card-footer";
   let btnSupprimer = document.createElement("button");
   btnSupprimer.textContent = "Supprimer";
   btnSupprimer.className = "btn btn-warning";

   img.src = pImage;
   img.alt = "photo de la card";

   divContentLECard.appendChild(cardHeader);
   cardHeader.appendChild(img);
   divContentLECard.appendChild(cardBody);
   cardBody.appendChild(ul);

   cardBody.appendChild(h2);
   divContentLECard.appendChild(cardFooter);
   cardFooter.appendChild(btnSupprimer);
   return divContentLECard;
}
