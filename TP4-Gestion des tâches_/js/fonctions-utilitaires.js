"use strict";
/* global DATA_TACHES*/
/**
 * Fonction qui convertit un nombre de jours en millisecondes et le retourne.
 * @param {number} pNbJours
 */
function convertirJoursEnMillisecondes(pNbJours) { }

/**
 * Fonction qui convertit un nombre de millisecondes en jours et le retourne.
 * @param {number} pNbMillisecondes
 */
function convertirMillisecondesEnJours(pNbMillisecondes) { }

/**
 * Créer la structure HTML pour afficher une card à partir
 * des paramètres pour personnaliser l’image, le titre et la
 * description, si on veut afficher un bouton ou non et, le
 * cas échéant le HTML composant ce bouton.
 * @param {string} pImage resoit l'image
 * @param {string} pTitre recois le titre du card
 * @param {string} pDescription recois la description
 * @param {boolean} pEstAvecBouton  s'il y a un bouton ou non
 * @param {*} pElementHtmlBouton je ne sais pas
 * @returns {Element} retourne la div contenat le card
 */
function creerCard(pImage, pTitre, pDescription, pEstAvecBouton, pElementHTMLBouton) {
   for (let data of DATA_TACHES.taches) {
      let divContentLECard = document.createElement("div");
      divContentLECard.className = "cards";
      // header du card:
      let CardHeader = document.createElement("div");
      CardHeader.className = "card-header";
      let img = document.createElement("img");
      img.className = "card-image";
      let h2 = document.createElement("h2");
      h2.classList.add("card-title");
      let ul = document.createElement("ul");

      //body du card:
      let CardBody = document.createElement("div");
      CardBody.classList.add("card-body");
      h2.textContent = pTitre;
      h2.className = "card-title";
      //body du card:
      let CardBody = document.createElement("div");
      CardBody.classList.add("card-body");
      h2.textContent = pTitre;
      h2.className = "card-title";

      // footer du card:
      let cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";
      if (pEstAvecBouton) cardFooter.appendChild(pElementHTMLBouton);

      img.src = pImage;
      img.alt = "photo de la card";
      img.src = pImage;
      img.alt = "photo de la card";

      divContentLECard.appendChild(CardHeader);
      CardHeader.appendChild(img);
      divContentLECard.appendChild(CardBody);
      CardBody.appendChild(h2);
      CardBody.appendChild(pDescription);
      divContentLECard.appendChild(CardHeader);
      CardHeader.appendChild(img);
      divContentLECard.appendChild(CardBody);
      CardBody.appendChild(h2);
      CardBody.appendChild(pDescription);

      CardBody.appendChild(ul);
      divContentLECard.appendChild(cardFooter);
      return divContentLECard;
   }
   CardBody.appendChild(ul);
   divContentLECard.appendChild(cardFooter);
   return divContentLECard;
}
}
