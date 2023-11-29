"use strict";
/* global DATA_TACHES, creerCard*/

/**
 * fonction qui initialise le fichier de base et appelle
 *  les fonction de base lors du chargement de la page
 */
function initialisation() {
   afficherCardsTaches();
   chargerEtAfficherDonnerDiagrammeEtCards();
}

function creeDoneesPourGraphique() { }

function chargerEtAfficherDonnerDiagrammeEtCards() { }

/**
 * appelle la fonction creercard du fichier fonction-utilitaire.js
 *  pour les lier et les afficher a l'ecran de l'utilisateur
 */
function afficherCardsTaches() {
   let divCard = document.getElementById("LesCards");
}

function verifierSiDependanceExiste() { };

window.addEventListener("load", initialisation);
