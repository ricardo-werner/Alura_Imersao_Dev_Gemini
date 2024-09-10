// Carrega o rodapé assim que a página estiver totalmente carregada em todas as páginas
import { loadFooter } from "./footer.js";

const isHomePage =
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html";

window.addEventListener("load", () => {
  loadFooter(isHomePage);
});


// Carrega os textos da página principal,assim que a página estiver totalmente carregada
import { carregarTextos } from "./text.js";
carregarTextos(
  "./filesJSON/textos.json",
  "tituloPagina",
  "textoPagina",
  "citacaoPagina"
);



// lógica para realizar a pesquisa e renderizar os dados na página ativa
import { searchData } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Verifica qual página está ativa e configura a pesquisa corretamente
  if (path.includes("dive")) {
    setupSearch(searchData); // Configura a busca para dive
    renderAllData(searchData); // Renderiza todos os dados ao carregar
  } else if (path.includes("wreck")) {
    setupSearch(searchData); // Configura a busca para wreck
    renderAllData(searchData); // Renderiza todos os dados ao carregar
  }
});

// Função para configurar a pesquisa e chamar a função correta de busca
function setupSearch(searchFunction) {
  const input = document.getElementById("search-input");
  if (input) {
    // Verifica se o campo de input existe
    input.addEventListener("input", async () => {
      try {
        const query = input.value.trim().toLowerCase(); // Captura o valor do input
        const results = await searchFunction(query); // Chama a função de busca com o termo

        renderGridItems(results); // Renderiza os resultados filtrados no grid
      } catch (error) {
        console.error("Erro ao realizar a busca:", error);
        renderErrorMessage("Ocorreu um erro ao realizar a pesquisa.");
      }
    });
  }
}

// Função para renderizar todos os dados ao carregar a página
async function renderAllData(searchFunction) {
  try {
    const results = await searchFunction(); // Chama a função de busca sem termo para pegar todos os dados
    renderGridItems(results); // Renderiza todos os itens no grid
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    renderErrorMessage("Ocorreu um erro ao carregar os dados.");
  }
}

// Função para renderizar os itens no grid
function renderGridItems(data) {
  const gridContainerDive = document.querySelector(".grid-container-dive");
  const gridContainerWreck = document.querySelector(".grid-container-wreck");

  // Verifica se o container de dive existe e limpa o conteúdo
  if (gridContainerDive) {
    gridContainerDive.innerHTML = "";
  }

  // Verifica se o container de wreck existe e limpa o conteúdo
  if (gridContainerWreck) {
    gridContainerWreck.innerHTML = "";
  }

  // Verifica se o array de dados está vazio
  if (data.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "Nenhum resultado encontrado para sua pesquisa.";
    noResultsMessage.classList.add("no-results-message"); // Adiciona uma classe para estilizar se necessário

    // Renderiza a mensagem de erro para a página correta
    if (window.location.pathname.includes("dive") && gridContainerDive) {
      gridContainerDive.appendChild(noResultsMessage);
    } else if (window.location.pathname.includes("wreck") && gridContainerWreck) {
      gridContainerWreck.appendChild(noResultsMessage);
    }

    return; // Sai da função para não tentar renderizar itens
  }

  // Caso tenha dados, renderiza normalmente
  data.forEach((item) => {
    const gridItem = createGridItem(item);

    // Renderiza no grid correspondente (dive ou wreck)
    if (window.location.pathname.includes("dive") && gridContainerDive) {
      gridContainerDive.appendChild(gridItem);
    } else if (window.location.pathname.includes("wreck") && gridContainerWreck) {
      gridContainerWreck.appendChild(gridItem);
    }
  });
}


// Função para criar o layout de cada item do grid (adapte conforme necessário)
function createGridItem(item) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  const title = document.createElement("h3");
  title.textContent = item.titleDive || item.titleWreck; // Adapta para dive ou wreck

  const location = document.createElement("p");
  location.textContent = item.localDive || item.localWreck; // Adapta para dive ou wreck

  const image = document.createElement("img");
  image.src = item.imgDive || item.imgWreck; // Adapta para dive ou wreck
  image.alt = item.titleDive || item.titleWreck;

  const link = document.createElement("a");

  // Verifica a página ativa para customizar o texto do link
  if (window.location.pathname.includes("dive")) {
    link.textContent = "Clique aqui - detalhes do mergulho";
  } else if (window.location.pathname.includes("wreck")) {
    link.textContent = "Clique aqui - detalhes do naufrágio";
  }

  link.href = item.linkDive || item.linkWreck;
  link.target = "_blank"; // Abre em uma nova aba

  const label = document.createElement("label");
  label.appendChild(link); // Insere o link dentro do 'label'

  gridItem.appendChild(title);
  gridItem.appendChild(location);
  gridItem.appendChild(image);
  gridItem.appendChild(label); // Adiciona o 'label' com o Link dentro

  return gridItem;
}

// Função para renderizar mensagens de erro
function renderErrorMessage(message) {
  const gridContainerDive = document.querySelector(".grid-container-dive");
  const gridContainerWreck = document.querySelector(".grid-container-wreck");

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message"); // Adiciona uma classe para estilizar se necessário

  // Renderiza a mensagem de erro para ambas as páginas (dive ou wreck)
  if (window.location.pathname.includes("dive")) {
    gridContainerDive.innerHTML = ""; // Limpa o grid antes de renderizar a mensagem de erro
    gridContainerDive.appendChild(errorMessage);
  } else if (window.location.pathname.includes("wreck")) {
    gridContainerWreck.innerHTML = ""; // Limpa o grid antes de renderizar a mensagem de erro
    gridContainerWreck.appendChild(errorMessage);
  }
}
