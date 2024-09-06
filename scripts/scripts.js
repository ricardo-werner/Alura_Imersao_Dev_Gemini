import carregarTextos from "./text.js";
carregarTextos("textos.json", "tituloPagina", "textoPagina", "citacaoPagina");

// Carrega o rodapé assim que a página estiver totalmente carregada
import { loadFooter } from "./footer.js";

const isHomePage = window.location.pathname === "/index.html";

window.addEventListener("DOMContentLoaded", () => {
  loadFooter(isHomePage);
});
