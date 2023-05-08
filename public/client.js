// Henter <h1>-elementet
let h1El = document.querySelector("h1");

// Undersøker om localStorage-variabelen er satt
if (localStorage.antallBesok) {
  // Alt lagres som tekst i localStorage, så vi må gjøre om til tall
  localStorage.antallBesok = Number(localStorage.antallBesok) + 1;
} else {
  localStorage.antallBesok = 1;
}

// Oppdaterer teksten i <h1>-elementet
h1El.innerHTML = "Dette er ditt " + localStorage.antallBesok + ". besøk på denne nettsiden.";