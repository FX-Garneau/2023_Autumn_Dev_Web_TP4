"use strict";
/* global DATA_TACHES, supprimerTache*/

/**
 * Fonction qui convertit un nombre de jours en millisecondes et le retourne.
 * @param {number} pNbJours
 */
function convertirJoursEnMillisecondes(pNbJours) {
   return pNbJours * 24 * 60 * 60 * 1000;
}

/**
 * Fonction qui convertit un nombre de millisecondes en jours et le retourne.
 * @param {number} pNbMillisecondes
 */
function convertirMillisecondesEnJours(pNbMillisecondes) {
   return pNbMillisecondes / 24 / 60 / 60 / 1000;
}

/**
 * Créer la structure HTML pour afficher une card à partir
 * des paramètres pour personnaliser l’image, le titre et la
 * description, si on veut afficher un bouton ou non et, le
 * cas échéant le HTML composant ce bouton.
 * @param {string} pImage resoit l'image
 * @param {string} pTitre recois le titre du card
 * @param {string} pDescription recois la description
 * @param {boolean} pEstAvecBouton  s'il y a un bou   ton ou non
 * @param {Element} pElementHtmlBouton le code du bouton
 * @returns {Element} retourne la div contenat le card
 */
function creerCard(pImage, pTitre, pDescription, pEstAvecBouton, pElementHTMLBouton) {
   for (let i = 0; i < DATA_TACHES.taches.length; i++) {
      let divContentLECard = document.createElement("div");

      divContentLECard.className = "card w-25 m-1 animate__animated animate__fadeInDown";
      // header du card:
      let CardHeader = document.createElement("div");
      CardHeader.className = "card-header";

      let img = document.createElement("img");
      img.className = "card-image w-100";

      divContentLECard.appendChild(CardHeader);
      CardHeader.appendChild(img);

      // body du card:
      let CardBody = document.createElement("div");
      CardBody.classList.add("card-body");

      let h2 = document.createElement("h2");
      h2.classList.add("card-title");
      h2.textContent = pTitre;

      divContentLECard.appendChild(CardBody);
      CardBody.appendChild(h2);
      CardBody.appendChild(pDescription);

      pElementHTMLBouton.addEventListener("click", supprimerTache);
      // footer du card:
      let cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";
      if (pEstAvecBouton) cardFooter.appendChild(pElementHTMLBouton);

      img.src = pImage;
      img.alt = "photo de la card";
      img.src = pImage;
      img.alt = "photo de la card";

      divContentLECard.appendChild(cardFooter);
      return divContentLECard;
   }
}

/**
 * @type {(tag: string) => HTMLElement} 
 */
const $id = document.getElementById.bind(document);
/**
 * @type {(tag: string) => HTMLElement} 
 */
const $new = document.createElement.bind(document);
/**
 * Crée un <li> avec le texte spécifié
 * @param {string} text textContent
 * @returns {HTMLElement} Le <li>
 */
const $li = (text) => { let e = $new("li"); e.textContent = text; return e; };