import {injectElements, renewTag} from "./functions/dom.js";

const wrapper = document.querySelector('#controle')

const typecafe=[
    {title : "expresso", ingredients :{eau:200, café:15, lait: 50}},
    {title : "latte", ingredients :{eau:200, café:15, lait: 50}},
    {title : "cappuccino", ingredients :{eau:200, café:15, lait: 50}}
]
let nbtasse;

let ingredientsM = {eau:0, café:0, lait:0}


//boutton
// const b =["Acheter","Remplir","Prendre"]
// for(i=0;i<=3;++i){
// }
function initia(){
    let bouton = document.getElementById("start")
    bouton.textContent = "Acheter"
    bouton.removeEventListener("click",initia)
    bouton.addEventListener("click",acheter)

    let bouton1 = document.createElement("button")
    bouton1.setAttribute("id","bouton1")
    bouton1.textContent = "Remplir"
    wrapper.append(bouton1)

    let bouton2 = document.createElement("button")
    bouton2.setAttribute("id","bouton2")
    bouton2.textContent = "Prendre"
    wrapper.append(bouton2)
}

function acheter(){    
    affichecafe()
    let bouton = document.getElementById("start")
    bouton.textContent = typecafe[0].title
    let bouton1 = document.getElementById("bouton1")
    bouton1.textContent = typecafe[1].title
    let bouton2 = document.getElementById("bouton2")
    bouton2.textContent = typecafe[2].title
}

function affichecafe(){
    let bouton = document.getElementById("start")
    bouton.textContent = typecafe[0].title
    let bouton1 = document.getElementById("bouton1")
    bouton1.textContent = typecafe[1].title
    let bouton2 = document.getElementById("bouton2")
    bouton2.textContent = typecafe[2].title

}

function mise_a_jour(){
    for (let elt in ingredientsM){
        let entree = document.createElement("input")
        entree.setAttribute("id", elt)
        wrapper.prepend(entree)
        let txt = document.createElement("p")
        txt.setAttribute("id", "p"+elt)
        txt.textContent = `Quantité ${elt} :`
        wrapper.prepend(txt)
    }
    bouton.textContent = "Mettre quantité à jour"
    document.querySelector('#start').addEventListener('click', quantiteM)

}

//mise_a_jour()

//Fonction de départ
function quantiteM(){
    let v = verif()
    if (v == 0){
        alert("Données non valide");
        // resetInput()
    }
    else{
        let i=0
        for (let elt in ingredientsM){
            ingredientsM[elt] = Number(v[i])
            ++i
        }
        document.querySelector('#start').removeEventListener('click', quantiteM)
        document.querySelector('#start').addEventListener('click', calculer)
        document.getElementById('start').textContent = "Calculer"
        cache()
        let nbcafe = document.createElement("input")
        nbcafe.setAttribute("id", "nbcafe")
        wrapper.prepend(nbcafe)


    }
}

//Fonction de vérification des données de quantité entrées pour la machine
function verif(){
    let tab =[]
    for (let elt in ingredientsM){
        let entree = document.getElementById(elt)
        let valeur = entree.value
        if (valeur == "" || isNaN(valeur) == true) {
            return 0
        }else{
            tab.push(valeur)
        }
    }
    return tab
}

//Prévient si le nombre de café demandé est possible ou non et donne des explications
function calculer(){
    let msgpred = document.getElementById("message")
    if(msgpred !== null){
        console.log(msgpred)

        msgpred.remove()
    }
    // console.log(eau,lait,cafe);
    let entree = document.getElementById("nbcafe")
    let q = Number(entree.value)

    //fdgfhjhkjnjbhgdcgvnjnj,hknb

    const liste = renewTag('ul')

    let max = nbcafepossible()
    let msg = document.createElement("h3")
    msg.setAttribute("Id","message")
    console.log(q,max)
    if(isNaN(q) == false){
        if(q <= max){
            msg.textContent = "Oui, je peux faire cette quantité de café"
            if(q < max){
                msg.textContent += " et même "+(max-q)+" plus que cela"
            }
        }
        else{
            msg.textContent = "Non, je ne peux faire que " + max + " tasses de café"
        }
        wrapper.prepend(msg)
    }
    //Plus utile grace à nbcafepossible
    // for(let elt in ingredients){
    //     let qt = document.createElement("li")
    //     qt.textContent = elt + " : " + ingredients[elt]*q
    //     liste.append(qt)
    // }

    // elt.append(liste)
}

//Retourne le nombre de café possible
function nbcafepossible(){
    const {ingredients} = typecafe.find(element => {
        if(element.title == "cafe"){
            return element.ingredients
        }
    });
    // console.log(ingredients)

    let min = []
    for(let elt in ingredients){
        console.log(ingredients[elt],ingredientsM[elt])
        min.push(parseInt(ingredientsM[elt]/ingredients[elt]))
    }
    // console.log(Math.min(...min),min)
    return Math.min(...min)
}

//Fonction qui cache les input pour données de quantité machine
function cache(){
    for (let elt in ingredientsM){
        document.getElementById(elt).style.display = "none"
        document.getElementById("p"+elt).style.display = "none"
    }
}

function resetInput(){
    for (let elt in ingredientsM){
        let i = document.getElementById(elt)
        i.value =""
    }
}

//Fcontion de Base plus utilisé
function start() {

    const etapes = [
        {title : "Commence à faire le café", duree: 1000},
        {title : "Mouds les grains de café", duree: 3000},
        {title : "Fait chauffer l'eau", duree: 3000},
        {title : "Infuse les grains de café moulus", duree: 2000},
        {title : "Verse le café dans une tasse", duree: 2000},
        {title : "Ajoute un peu de lait dans la tasse", duree: 2000},
        {title : "Le café est terminé.", duree: 1000}
    ]
    const laListe = renewTag('ul');
    wrapper.append(laListe)

    injectElements(etapes, laListe)

}
// document.querySelector('#start').addEventListener('click', start)
//moi
// document.querySelector('#start').addEventListener('click', calculer)
document.querySelector('#start').addEventListener('click', initia)
