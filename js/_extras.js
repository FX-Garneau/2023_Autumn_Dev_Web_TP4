"use strict";
/* global DATA_TACHES, $id, minuterie, selected, table, creerDonneesPourGraphique */

/**
 * Permet de charger les données depuis le localStorage.
 * @param {boolean} initial Si vrai, charge initiales données.
 */
function loadData(initial) {
   try {
      let data = JSON.parse(atob(localStorage.getItem("data_tache")));
      if (data.taches && data.detailsTache) {
         if (initial && !confirm("Un enregistrement des données à été trouvé. Voulez-vous le charger?"))
            return void localStorage.removeItem("data_tache");
         data.detailsTache = data.detailsTache.map(tache => {
            tache.dateDebut = new Date(tache.dateDebut);
            tache.dateFin = new Date(tache.dateFin);
            return tache;
         });
         DATA_TACHES.taches = data.taches;
         DATA_TACHES.detailsTache = data.detailsTache;
      }
      table = creerDonneesPourGraphique();
      console.log("Les données ont été chargées depuis le localStorage.");
      logProgress();
   } catch (error) { console.log(error); }
}

/**
 * Permet de sauvegarder les tâches dans le localStorage
 */
function saveData() {
   try {
      table = creerDonneesPourGraphique();
      let data = { ...DATA_TACHES };
      data.detailsTache = data.detailsTache.map(tache => {
         tache.dateDebut = Number(tache.dateDebut);
         tache.dateFin = Number(tache.dateFin);
         return tache;
      });
      localStorage.setItem("data_tache", btoa(JSON.stringify(data)));
      console.log("Les données ont été sauvegardées dans le localStorage.");
      logProgress();
   } catch (error) { console.log(error); }
}

/**
 * Rafraîchit les boutons start/stop du formulaire de la tâche.
 */
function updateButtons() {
   $id("btn-start").disabled = minuterie || DATA_TACHES.detailsTache[selected?.row]?.pctComplete >= 100;
   $id("btn-end").disabled = !minuterie;
}

/**
 * Permet d'afficher la progression de la tache sélectionnée.
 */
function logProgress() {
   console.log("memory:", selected && DATA_TACHES.detailsTache[selected?.row]?.pctComplete, "localStorage:", selected && table.getValue(selected?.row, 5));
}