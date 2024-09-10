// Função para buscar e renderizar os dados de wreck.json
export async function fetchWreckData(query = '') {
    try {
        const response = await fetch("../filesJSON/wreck.json");
        const data = await response.json();

        const gridContainer = document.querySelector('.grid-container-wreck');
        gridContainer.innerHTML = ''; // Limpa os dados atuais

        let filteredData;
        if (query) {
            filteredData = data.filter(item =>
                item.title.toLowerCase().includes(query) || 
                item.location.toLowerCase().includes(query)
            );
        } else {
            filteredData = data; // Exibe todos os dados se não houver consulta
        }

        if (filteredData.length === 0) {
            gridContainer.innerHTML = '<p>Nenhum dado encontrado, tente novamente!!</p>';
        } else {
            filteredData.forEach(item => {
                const gridItem = createGridItem(item);
                gridContainer.appendChild(gridItem);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar wreck.json:', error);
    }
}

// Função para criar o layout de cada item do grid
function createGridItem(wreck) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  const title = document.createElement("h3");
  title.textContent = wreck.titleWreck;

  const location = document.createElement("p");
  location.textContent = wreck.localWreck;

  const image = document.createElement("img");
  image.src = wreck.imgWreck;
  image.alt = wreck.titleWreck;

  const link = document.createElement("a");
  link.textContent = "Clique aqui - ponto do naufrágio";
  link.href = wreck.linkWreck;
  link.target = "_blank"; // Abre em uma nova aba

  // Envolvendo o Link dentro de uma tag 'label'
  const label = document.createElement("label");
  label.appendChild(link); // Inserindo o link dentro do 'label'

  // Montando a estrutura do gridItem com os elementos aninhados
  gridItem.appendChild(title);
  gridItem.appendChild(location);
  gridItem.appendChild(image);
  gridItem.appendChild(label); // Adicionando o 'label' com o Link dentro
  return gridItem;
}

