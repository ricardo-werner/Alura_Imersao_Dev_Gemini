// Função para carregar o rodapé

export async function loadFooter(isHomePage) {
  const footerPath = isHomePage ? "./pages/footer.html" : "./footer.html";

  const response = await fetch(footerPath);
  const footerHTML = await response.text();
  const footerElement = document.createElement("footer");
  footerElement.innerHTML = footerHTML;
  document.body.appendChild(footerElement);

  // Chamando a função para atualizar o ano
  updateCurrentYear();
}

export function updateCurrentYear() {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
}
