"use strict";
/*global DATA_TACHES */

/**
 * 
 * @param {string} pImage resoit l'image 
 * @param {string} pTitre recois le titre du card 
 * @param {string} pDEscription recois la description 
 * @param {boolean} pEstAvecBouton  s'il y a un bouton ou non
 * @param {*} pElementHtmlBouton je ne sais pas
 * @returns {Element} retourne la div contenat le card
 */
function creerCard(pImage,pTitre,pDEscription,pEstAvecBouton,pElementHtmlBouton)
{
    let divContentLECard = document.createElement("div");

        divContentLECard.className="card";
        // header du card:
        let CardHeader = document.createElement("div");
        CardHeader.classList.add("");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let ul = document.createElement("ul");

        for(let data of DATA_TACHES.detailsTache)
        {
            let li = document.createElement("li");
            li.textContent = data.id;
            li.textContent = data.titre;
            li.textContent = data.dateDebut;
            li.textContent = data.dateFin;
            li.textContent = data.dureeEnNbJours;
            li.textContent = data.pctComplete;
            li.textContent = data.dependances;
            ul.appendChild(li);
        }
        
        //body du card:
        let CardBody = document.createElement("div");
        h2.textContent=pTitre;
        h2.className="";


        // footer du card:
        let cardFooter = document.createElement("div");
        let btnSupprimer = document.createElement("button");
        
        img.src=pImage;


        divContentLECard.appendChild(CardHeader);
        CardHeader.appendChild(img);
        divContentLECard.appendChild(CardBody);
        CardBody.appendChild(h2);
        divContentLECard.appendChild(cardFooter);
        cardFooter.appendChild(btnSupprimer);
        return divContentLECard;
}   