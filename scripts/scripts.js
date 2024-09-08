import carregarTextos from "./text.js";
carregarTextos(
  "./filesJSON/textos.json",
  "tituloPagina",
  "textoPagina",
  "citacaoPagina"
);

import { populateGridWreck } from "./wreck.js";
import { populateGridDive } from "./dive.js";

// Função para buscar os dados do JSON com caminho dinâmico
async function fetchData(jsonPath) {
  const response = await fetch(jsonPath);
  const data = await response.json();
  return data;
}

// Carregar dados do Wreck
fetchData("../filesJSON/wreck.json")
  .then((data) => {
    const gridContainer = document.querySelector(".grid-container-wreck");
    populateGridWreck(data, gridContainer);
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados do Naufrágio", error);
  });

// Carregar dados do Dive
fetchData("../filesJSON/dive.json")
  .then((data) => {
    const gridContainer = document.querySelector(".grid-container-dive");
    populateGridDive(data, gridContainer);
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados de Mergulho", error);
  });


// Carrega o rodapé assim que a página estiver totalmente carregada
import { loadFooter } from "./footer.js";

const isHomePage = window.location.pathname === "/index.html";

window.addEventListener("DOMContentLoaded", () => {
  loadFooter(isHomePage);
});
