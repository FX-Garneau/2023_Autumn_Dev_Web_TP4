"use strict";
/* global DATA_TACHES, creerCard, $id, $li, google, bootstrap, loadData, saveData */

let bouton = true;
/** @type {google.visualization.Gantt} */
let chart;
/** @type {google.visualization.DataTable} */
let table;
/** @type {NodeJS.Timeout | null} */
let minuterie;
/** @type {google.visualization.ChartSelection} */
let selected;

const modal = new bootstrap.Modal($id("modal"));

/**   
 * Fonction exécutée après que le DOM HTML soit
 * chargé. Dans cette fonction, on va en profiter pour lancer les
 * méthodes de base de google.charts (soit load et setOnLoadCallback
 * qui va appeler notre fonction chargerEtAfficherDonneesDiagrammeEtCards
 * une fois que la librairie JavaScript de Google est prêt). Voir la documentation.
 * @author Ulric Huot
 */
function initialisation() {
   // loadData();
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
   let divCard = document.getElementById("LesCards");
   let divFlex = document.createElement("div");
   dispatchEvent.className = "justify-content-between";

   // la descrition
   for (let data of DATA_TACHES.detailsTache) {
      let ul = document.createElement("ul");

      ul.append($li(data.id), $li(data.titre), $li(data.dateDebut), $li(data.dateFin), $li("Duree Nombre de Jours : " + data.dureeEnNbJours), $li("partie complete" + data.pctComplete), $li(data.dependances));

      let boutonHtml = document.createElement("bouton");
      boutonHtml.className = "btn btn-warning";
      boutonHtml.textContent = "Supprimer";
      boutonHtml.setAttribute("type", "Button");
      boutonHtml.setAttribute("id-task", data.id);
      let titre = data.id + data.titre;
      divCard.appendChild(
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
   google.visualization.events.addListener(chart, "select", recupererTacheSelectionneeDansDiagrammeDeGantt);
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
 * @author Ulric Huot
 */
function recupererTacheSelectionneeDansDiagrammeDeGantt() {
   selected = chart.getSelection()[0];
   if (!selected) return;

   let tache = {}, props = Object.keys(DATA_TACHES.detailsTache[0]);
   for (let i = 0; i < props.length; i++)
      tache[props[i]] = table.getValue(selected.row, i);

   for (let i = 0; i < props.length; i++)
      document.getElementById("tache-" + props[i]).value = tache[props[i]];

   modal.show();


   document.getElementById("btn-start").addEventListener("click", calculerAvancement);
   document.getElementById("btn-end").addEventListener("click", arreterMinuterie);

   document.getElementById("btn-end").addEventListener("click", arreterMinuterie);

}

/**
 * Cette fonction est appelée par une minuterie aux secondes.
 * Elle compte les secondes et les affiche dans le champ Réalisation.
 * On simule ici qu'une seconde équivaut à 1 journée de travail.
 * On calcule ensuite le % d'avancement (nb jours réalisés sur le
 * nombre de jours estimé.). On anime finalement une progressBar
 * (composant Bootstrap) en appliquant dynamiquement un style (width: X%)
 * @author Georgi, Ulric Huot
 */
function calculerAvancement() {
   if (minuterie) return;
   let progressBar = document.getElementById("progress");

   minuterie = setInterval(() => {
      const tache = DATA_TACHES.detailsTache[selected.row];
      console.log(tache.pctComplete);
      // error checks
      if (!tache) return void alert("Aucune tâche sélectionnée!");
      if (tache.pctComplete >= 100) return void alert("La tâche est terminée!");
      if (tache.dureeEnNbJours < 0) return void alert("La durée de la tâche est invalide!");
      // update data
      const realisation = (tache.dureeEnNbJours * tache.pctComplete / 100) + 0.1;
      tache.pctComplete = Math.max(0, Math.min(100, realisation / tache.dureeEnNbJours * 100));
      // update visual
      $id("tache-realisation").value = Math.round(realisation);
      $id("tache-pctComplete").value = Math.round(tache.pctComplete);
      progressBar.style.width = tache.pctComplete.toFixed(2) + "%";
      // save data
      sauvegarderChangementsTache();
      // check if task is completed
      if (tache.pctComplete >= 100 || realisation >= tache.dureeEnNbJours) {
         arreterMinuterie();
         setTimeout(alert, 10, "La tâche est terminée!");
      }
   }, 100);
   document.getElementById("btn-end").addEventListener("click", arreterMinuterie);
}

/** Arrête la minuterie. */
function arreterMinuterie() {
   clearInterval(minuterie);
   minuterie = null;
}

/**
 * Mettre à jour les données du DataTable du diagramme de Gantt.
 * Les fonctions setValue (méthode du DataTable) et daysToMilliseconds
 * vous seront utiles.
 */
function sauvegarderChangementsTache() {
   for (let i = 0; i < DATA_TACHES.detailsTache.length; i++)
      for (let j = 0; j < Object.keys(DATA_TACHES.detailsTache[i]).length; j++)
         table.setValue(i, j, DATA_TACHES.detailsTache[i][j]);
   saveData();
}

/**
 * Vérifie si la tâche fait partie des dépendances d'autres tâches.
 * Si le ID de la tâche est présente dans le tableau dependancies
 * d'une autre tâche, il y a alors dépendance.
 * @param {*} pIdTache Le ID de la tâche à vérifier
 * @returns {boolean} Vrai si la tâche est en dépendance, faux sinon
 * @author Ulric Huot
 */
function verifierSiDependanceExiste(pIdTache) {
   return table.getDistinctValues(6).some(deps => deps.includes(pIdTache));
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
   verifierSiDependanceExiste(e.target.getAttribute("id-task"))
      ? alert("il y a des dependances")
      : e.target.parentElement.parentElement.remove();
}

window.addEventListener("load", initialisation);
