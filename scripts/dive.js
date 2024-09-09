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

  // Localização
  const location = createElement("p", dive.localDive);

  // Imagem
  const image = createElement("img", "", {
    src: dive.imgDive,
    alt: dive.titleDive,
  });

  const link = createElement("a", "Clique aqui - página do mergulho", {
    href: dive.linkDive,
    target: "_blank",
    class: "link",
  });

  // Envolvendo o link dentro de uma tag 'label'
  const label = document.createElement("label");
  label.appendChild(link); // Inserindo o link dentro do 'label'

  // Montando a estrutura do gridItem com os elementos aninhados
  gridItem.appendChild(title);
  gridItem.appendChild(location);
  gridItem.appendChild(image);
  gridItem.appendChild(label); // Adicionando o 'label' com o link dentro

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
