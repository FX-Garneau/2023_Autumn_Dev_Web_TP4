"use strict";
/* global DATA_TACHES */

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
   } catch { return; }
}

/**
 * Permet de sauvegarder les tâches dans le localStorage
 */
function saveData() {
   try {
      let data = Object.assign({}, DATA_TACHES);
      data.detailsTache = data.detailsTache.map(tache => {
         tache.dateDebut = tache.dateDebut.toISOString();
         tache.dateFin = tache.dateFin.toISOString();
         return tache;
      });
      localStorage.setItem("45jid7fy", btoa(JSON.stringify(data)));
      console.log("Les données ont été sauvegardées dans le localStorage.");
   } catch { return; }
}