"use strict";
/* global DATA_TACHES, creerCard*/

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
  DivCard.className = "d-flex row";
  for (let data of DATA_TACHES.detailsTache) {
    for (let datas of DATA_TACHES.taches) {
      let Cards = creerCard(
        "./images/check2-square.svg",
        datas.titre,
        data.detailsTache,
        data.detailsTache,
        ".."
      );
      DivCard.appendChild(Cards);
    }
  }
}

-


function verifierSiDependanceExiste(){

};


window.addEventListener("load",Initialisation);