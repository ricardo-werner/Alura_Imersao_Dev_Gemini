// Função para buscar e renderizar os dados de dive.json
export async function fetchDiveData(query = '') {
    try {
        const response = await fetch("../filesJSON/dive.json");
        const data = await response.json();

        const gridContainer = document.querySelector('.grid-container-dive');
        gridContainer.innerHTML = ''; // Limpa os dados atuais

        let filteredData;
        if (query) {
            filteredData = data.filter(item =>
                item.titleDive.toLowerCase().includes(query) || 
                item.descriptionDive.toLowerCase().includes(query)
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
        console.error('Erro ao carregar dive.json:', error);
    }
}

// Função para criar o layout de cada item do grid
function createGridItem(dive) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    const title = document.createElement('h3');
    title.textContent = dive.titleDive;

    const location = document.createElement('p');
    location.textContent = dive.localDive;

    const image = document.createElement('img');
    image.src = dive.imgDive;
    image.alt = dive.titleDive;

    const link = document.createElement('a');
    link.textContent = "Clique aqui - ponto do mergulho";
    link.href = dive.linkDive;
    link.target = "_blank"; // Abre em uma nova aba

    // Envolvendo o Link dentro de uma tag 'label'
    const label = document.createElement('label');
    label.appendChild(link); // Inserindo o link dentro do 'label'

    // Montando a estrutura do gridItem com os elementos aninhados
    gridItem.appendChild(title);
    gridItem.appendChild(location);
    gridItem.appendChild(image);
    gridItem.appendChild(label); // Adicionando o 'label' com o Link dentro

    console.log(gridItem);
    return gridItem;
}
