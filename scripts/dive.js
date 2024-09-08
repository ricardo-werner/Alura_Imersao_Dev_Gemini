// Função para criar um elemento HTML
function createElement(tag, textContent, attributes = {}) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

function createGridItem(dive) {
  // Criando o container principal
  const gridItem = createElement("div", "", { class: "grid-item" });

  // Título
  const title = createElement("h3", dive.titleDive);

  // Imagem
  const image = createElement("img", "", {
    src: dive.imgDive,
    alt: dive.tituloDive,
  });

  // Criando o link
  const link = createElement("a", "", {
    href: dive.linkDive,
    target: "_blank",
    class: "link",
  });

  // Envolvendo a imagem com o link
  link.appendChild(image);

  // Localização
  const location = createElement("p", dive.descriptionDive);

  // Montando a estrutura do gridItem com os elementos aninhados
  gridItem.appendChild(title);
  gridItem.appendChild(link); // Agora o link envolve a imagem
  gridItem.appendChild(location);

  console.log(gridItem);
  return gridItem;
}

// Função principal
async function populateGridDive() {
  const response = await fetch("../filesJSON/dive.json");
  const data = await response.json();
  const gridContainer = document.querySelector(".grid-container-dive");

  for (const dive of data) {
    const gridItem = createGridItem(dive);
    gridContainer.appendChild(gridItem);
  }
}

export { populateGridDive };
