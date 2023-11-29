"use strict";
/* global DATA_TACHES, creerCard, $id, $li, google */

let bouton = true;
/** @type {google.visualization.Gantt} */
let chart;
/** @type {google.visualization.DataTable} */
let table;

/**
 * Fonction exécutée après que le DOM HTML soit
 * chargé. Dans cette fonction, on va en profiter pour lancer les
 * méthodes de base de google.charts (soit load et setOnLoadCallback
 * qui va appeler notre fonction chargerEtAfficherDonneesDiagrammeEtCards
 * une fois que la librairie JavaScript de Google est prêt). Voir la documentation.
 * @author Ulric Huot
 */
function initialisation() {
   google.charts.load("current", { packages: ["gantt"], callback: chargerEtAfficherDonneesDiagrammeEtCards });
}

/**
 * Affiche toutes les tâches sous forme de card.
 * On vide la section des cards, puis on recréer l'affichage.
 * On appelle la fonction utilitaire creerCard. Le titre est
 * le id et titre de la tâche, le contenu est le reste des
 * propriétés d'une tâche.
 */
function afficherCardsTaches() {
   let DivCard = document.getElementById("LesCards");

   // la descrition
   for (let data of DATA_TACHES.detailsTache) {
      let ul = document.createElement("ul");

      ul.append($li(data.id), $li(data.titre), $li(data.dateDebut));

      let boutonHtml = document.createElement("bouton");
      boutonHtml.className = "btn btn-warning";
      boutonHtml.textContent = "Supprimer";
      boutonHtml.setAttribute("type", "Button");
      boutonHtml.setAttribute("id-task", data.id);
      let titre = data.id + data.titre;
      DivCard.appendChild(
         creerCard(
            "./images/check2-square.svg",
            titre,
            ul,
            bouton,
            boutonHtml
         )
      );
   }

}

/**
 * Fonction qui met en place le visuel de la page.
 * On charge les données pour le graphique, on instancie
 * le graphique de Google, on le dessine, puis on affiche
 * les cards en appelant la fonction afficherCardsTaches.
 * Cette fonction est appelée lorsque la bibliothèque de
 * base de Google est complètement chargée.
 * @author Ulric Huot
 */
function chargerEtAfficherDonneesDiagrammeEtCards() {
   // 1. Charger les données pour le graphique
   table = creerDonneesPourGraphique();
   // 2. Créer le graphique
   chart = new google.visualization.Gantt($id("graphique"));
   (window.onresize = () => chart.draw(table, { height: 250 }))();
   // 3. Afficher les cards
   afficherCardsTaches();
}

/**
 * Permet de bâtir le DataTable que Google a besoin à partir
 * de notre base de données (DATA_TACHES). Les méthodes addColumn
 * et addRow du DataTable seront utiles pour cette fonction.
 * @returns {google.visualization.DataTable} La DataTable
 * @author Ulric Huot
 */
function creerDonneesPourGraphique() {
   let table = new google.visualization.DataTable();

   for (let tache of DATA_TACHES.taches)
      table.addColumn(tache.type, tache.titreTache);

   for (let tache of DATA_TACHES.detailsTache)
      table.addRow([tache.id, tache.titre, tache.dateDebut, tache.dateFin, tache.dureeEnNbJours, tache.pctComplete, tache.dependances?.join() ?? ""]);

   return table;
}

/**
 * Fonction exécutée (déclenchée par l’événement SELECT du diagramme de Gantt)
 * lorsqu'on sélectionne une tâche dans le diagramme. Cette fonction permet
 * d'afficher les données dans une formulaire intégré à une fenêtre modale
 * pour les éditer.
 */
function recupererTacheSelectionneeDansDiagrammeDeGantt() { }

/**
 * Cette fonction est appelée par une minuterie aux secondes.
 * Elle compte les secondes et les affiche dans le champ Réalisation.
 * On simule ici qu'une seconde équivaut à 1 journée de travail.
 * On calcule ensuite le % d'avancement (nb jours réalisés sur le
 * nombre de jours estimé.). On anime finalement une progressBar
 * (composant Bootstrap) en appliquant dynamiquement un style (width: X%)
 */
function calculerAvancement() { }

/** Arrête la minuterie. */
function arreterMinuterie() { }

/**
 * Mettre à jour les données du DataTable du diagramme de Gantt.
 * Les fonctions setValue (méthode du DataTable) et daysToMilliseconds
 * vous seront utiles.
 */
function sauvegarderChangementsTache() { }

/**
 * Vérifie si la tâche fait partie des dépendances d'autres tâches.
 * Si le ID de la tâche est présente dans le tableau dependancies
 * d'une autre tâche, il y a alors dépendance.
 * @param {*} pIdTache Le ID de la tâche à vérifier
 * @author Georgi Gavrailov
 */
function verifierSiDependanceExiste(pIdTache) {
   if (table.getDistinctValues(6).some(deps => deps.includes(pIdTache))) /** @author Ulric Huot */
      alert("La tache ne peux pas etre retire car elle est depend de d'autre tache aussi");
   else
      return false;
}

/**
 * Supprimer une tâche dont le Id est spécifié dans un attribut HTML
 * personnalisé « data-id » dans les données du graphique et réafficher
 * les cards, puis redessiner le graphique. On peut accéder à l’élément
 * card via le paramètre e (qui est l’événement déclencheur). On ne peut
 * pas supprimer une tâche lorsqu’il y a des dépendance (utilisation de
 * la fonction verifierSiDependanceExiste)
 * @param {MouseEvent} e Le event
 */
function supprimerTache(e) {
   let boutonSupprimer = e.target;
   let id_task = boutonSupprimer.getAttribute("id-task");
   if (verifierSiDependanceExiste(id_task)) {
      document.removeChild();
   }
}

window.addEventListener("load", initialisation);
