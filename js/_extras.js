"use strict";
/* global DATA_TACHES, $id, minuterie, selected */

/**
 * Permet de récupérer les tâches depuis le localStorage
 */
function loadData() {
   try {
      let data = JSON.parse(atob(localStorage.getItem("45jid7fy")));
      if (data.taches && data.detailsTache) {
         data.detailsTache = data.detailsTache.map(tache => {
            tache.dateDebut = new Date(tache.dateDebut);
            tache.dateFin = new Date(tache.dateFin);
            return tache;
         });
         DATA_TACHES.taches = data.taches;
         DATA_TACHES.detailsTache = data.detailsTache;
      }
      console.log("Les données ont été chargées depuis le localStorage.");
   } catch (error) { console.log(error); }
}

/**
 * Permet de sauvegarder les tâches dans le localStorage
 */
function saveData() {
   try {
      let data = Object.assign({}, DATA_TACHES);
      data.detailsTache = data.detailsTache.map(tache => {
         tache.dateDebut = Number(tache.dateDebut);
         tache.dateFin = Number(tache.dateFin);
         return tache;
      });
      localStorage.setItem("45jid7fy", btoa(JSON.stringify(data)));
      console.log("Les données ont été sauvegardées dans le localStorage.");
   } catch (error) { console.log(error); }
}

/**
 * Rafraîchit les boutons start/stop du formulaire de la tâche.
 */
function updateButtons() {
   let start = minuterie || DATA_TACHES.detailsTache[selected?.row]?.pctComplete >= 100;
   let stop = !minuterie;
   console.log("start:", start, "stop:", stop, DATA_TACHES.detailsTache[selected?.row]?.pctComplete, minuterie);
   $id("btn-start").disabled = start;
   $id("btn-end").disabled = stop;
}