"use strict";
/* global DATA_TACHES, creerCard*/
let bouton = true;

/**
 * fonction qui initialise le fichier de base et appelle
 *  les fonction de base lors du chargement de la page
 */
function Initialisation() {
  AfficherCardsTaches();
  ChargerEtAfficherDonnerDiagrammeEtCards();
}

function creeDoneesPourGraphique() {}

function ChargerEtAfficherDonnerDiagrammeEtCards() {}

/**
 * appelle la fonction creercard du fichier fonction-utilitaire.js
 *  pour les lier et les afficher a l'ecran de l'utilisateur
 */
function AfficherCardsTaches() {
  let DivCard = document.getElementById("LesCards");

  for (let data of DATA_TACHES.detailsTache) {
    let Htmlbouton = creerBoutonHTmlS();
    let description = creeDesCriptionCard();
    let titre = data.id + data.titre;
    DivCard.appendChild(
      creerCard(
        "./images/check2-square.svg",
        titre,
        description,
        bouton,
        Htmlbouton
      )
    );
  }
}

/**
 *
 * @returns retourne le bouton
 */
function creerBoutonHTmlS() {
  let bouton = document.createElement("bouton");
  bouton.className = "btn btn-warning";
  bouton.textContent = "Supprimer";
  return bouton;
}

/**
 * creer les li
 * @returns retourne un vecteur de li
 */
function creeDesCriptionCard() {
  let vecLi = [];
  let ul = document.createElement("ul");

  for (let data of DATA_TACHES.detailsTache) {
    let li = document.createElement("li");
    // en dvp
    li.textContent = "";
    li.textContent = data.id;
    ul.appendChild(li);
    li.textContent = "";
    li.textContent = data.titre;
    ul.appendChild(li);
    li.textContent = "";

    li.textContent = data.dateDebut;
  }
  return ul;
}
-function verifierSiDependanceExiste() {};

window.addEventListener("load", Initialisation);
