// Função para criar um elemento HTML
function createElement(tag, textContent, attributes = {}) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

function createGridItem(wreck) {
    // Criando o container principal
    const gridItem = createElement("div", "", { class: "grid-item" });

    // Título
    const title = createElement("h3", wreck.tituloWreck);

    // Localização
    const location = createElement("span", wreck.localWreck);

    // Imagem
    const image = createElement("img", "", {
        src: wreck.imgWreck,
        alt: wreck.tituloWreck
    });

    // Criando o link
    const link = createElement(
      "a",
      "Clique aqui - página do naufrágio",
      {
        href: wreck.linkWreck,
        target: "_blank",
        class: "link",
      },
      
    );

    // Envolvendo o link dentro de uma tag 'label'
    const label = document.createElement("label");
    label.appendChild(link);  // Inserindo o link dentro do 'label'

    // Montando a estrutura do gridItem com os elementos aninhados
    gridItem.appendChild(title);
    gridItem.appendChild(location);
    gridItem.appendChild(image);
    gridItem.appendChild(label);  // Adicionando o 'label' com o link dentro

    console.log(gridItem);
    return gridItem;
}

// Função principal
async function populateGrid() {
  const response = await fetch("../wreck.json");
  const data = await response.json();
  const gridContainer = document.querySelector(".grid-container-wreck");

  for (const wreck of data) {
    const gridItem = createGridItem(wreck);
    gridContainer.appendChild(gridItem);
  }
}

export { populateGrid };
