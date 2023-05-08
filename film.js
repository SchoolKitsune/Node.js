// Henter HTML-elementer
let listeEl = document.querySelector("ul");
let inputEl = document.querySelector("input");
let knappEl = document.querySelector("button");

// Legger til lytter på knappen
knappEl.addEventListener("click", leggTilFilm);

// Lager en array for å holde orden på filmene
let filmer = [];

// Viser liste over filmene
lagListe();

// Funksjon for å skrive ut filmer
function lagListe() {
  // Sjekker om det er lagret filmer tidligere
  if (localStorage.filmliste) {
    // Det finnes lagrede filmer, vi henter dem
    let tekst = localStorage.filmliste;

    // Deler opp teksten i en array
    filmer = tekst.split(":");
  }

  // Tømmer listeelementet
  listeEl.innerHTML = "";

  for (let i = 0; i < filmer.length; i++) {
    // Lager et <li>-element
    let liEl = document.createElement("li");

    // Legger til en film i <li>-elementet
    liEl.innerHTML = filmer[i];

    // Legger til <li>-elementet i lista
    listeEl.appendChild(liEl);    
  }
}

// Funksjon for å legge til film
function leggTilFilm() {
  // Henter tittelen til ny film
  let nyFilm = inputEl.value;

  // Legger til filmen i arrayen
  filmer.push(nyFilm);

  // Oppdaterer localStorage
  let tekst = "";

  for (let i = 0; i < filmer.length; i++) {
    if (i == 0) {
      tekst += filmer[i];
    } else {
      tekst += ":" + filmer[i];
    }
  }

  localStorage.filmliste = tekst;

  // Viser listen på nytt
  lagListe();
}