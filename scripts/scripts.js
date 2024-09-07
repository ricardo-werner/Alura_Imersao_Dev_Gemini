import carregarTextos from "./text.js";
carregarTextos("textos.json", "tituloPagina", "textoPagina", "citacaoPagina");

import { populateGrid } from "./wreck.js";
// Função para buscar os dados do JSON
async function fetchData() {
  const response = await fetch("../wreck.json");
  const data = await response.json();
  return data;
}

fetchData()
  .then((data) => {
    const gridContainer = document.querySelector(".grid-container");
    populateGrid(data, gridContainer);
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados:", error);
  });


// Carrega o rodapé assim que a página estiver totalmente carregada
import { loadFooter } from "./footer.js";

const isHomePage = window.location.pathname === "/index.html";

window.addEventListener("DOMContentLoaded", () => {
  loadFooter(isHomePage);
});
