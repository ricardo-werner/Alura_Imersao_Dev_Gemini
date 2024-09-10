// Função para buscar os dados no arquivo JSON
export async function searchData(searchTerm = '') {
    const currentPage = window.location.pathname;
    let data;
    let propertyToSearch;

    // Definir o arquivo JSON e a propriedade de busca com base na página atual
    if (currentPage.includes('dive')) {
        data = await fetch('../filesJSON/dive.json'); // Carrega dive.json
        propertyToSearch = 'titleDive'; // Propriedade de busca em dive.json
    } else if (currentPage.includes('wreck')) {
        data = await fetch('../filesJSON/wreck.json'); // Carrega wreck.json
        propertyToSearch = 'titleWreck'; // Propriedade de busca em wreck.json
    } else {
        console.error("Página não reconhecida!");
        return [];
    }

    // Converte a resposta em JSON
    const jsonData = await data.json();

    // Se o campo de pesquisa estiver vazio, retorna todos os dados
    if (!searchTerm) {
        return jsonData;
    }

    // Filtra os dados com base no termo de pesquisa
    const results = jsonData.filter((item) => {
        const title = item[propertyToSearch];
        // Verifica se o título existe e se é uma string antes de aplicar o toLowerCase
        return title && typeof title === 'string' && title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return results;
}




