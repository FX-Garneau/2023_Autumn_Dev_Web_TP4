"use strict";


/**
 * 
 * @param {string} pImage resoit l'image 
 * @param {string} pTitre recois le titre du card 
 * @param {string} pDEscription recois la description 
 * @param {boolean} pEstAvecBouton  s'il y a un bouton ou non
 * @param {*} pElementHtmlBouton je ne sais pas
 */
function creerCard(pImage,pTitre,pDEscription,pEstAvecBouton,pElementHtmlBouton)
{
    let divContentLECard = document.createElement("div");

    divContentLECard.className="card";

    for(let data of DATA_TACHES.detailsTache)
    {
        // header du card:
        let CardHeader = document.createElement("div");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");

        //body du card:
        let CardBody = document.createElement("div");

        // footer du card:
        let cardFooter = document.createElement("div");
        let btnSupprimer = document.createElement("button");

        img.src="./images/check2-square.svg";

        divContentLECard.appendChild(CardHeader);
        CardHeader.appendChild(img);
        divContentLECard.appendChild(CardBody);
        //CardBody.appendChild();
        divContentLECard.appendChild(cardFooter);
        cardFooter.appendChild(btnSupprimer);

        img.src=pImage;
    
    }

}