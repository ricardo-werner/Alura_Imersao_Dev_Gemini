// Função para buscar os dados no arquivo JSON
// search.js
export async function searchData(searchTerm) {
  const currentPage = window.location.pathname;
  let data;
  let propertyToSearch;

  // Definir o arquivo JSON e a propriedade de busca com base na página atual
  if (currentPage === '/pages/dive.html') {
    data = await fetch('../filesJSON/dive.json');  // Carrega dive.json
    propertyToSearch = 'titleDive';   // Propriedade do dive.json
  } else if (currentPage === '/pages/wreck.html') {
    data = await fetch('../filesJSON/wreck.json'); // Carrega wreck.json
    propertyToSearch = 'titleWreck'; // Propriedade do wreck.json
  } else {
    console.error("Página não reconhecida");
    return [];
  }

  // Converte a resposta em JSON
  const jsonData = await data.json();

  // Filtro de dados com base na pesquisa e na propriedade relevante para a página atual
  const results = jsonData.filter((item) => {
    const title = item[propertyToSearch]; // Acessa dinamicamente a propriedade
    // Verifica se o título existe e se é uma string antes de aplicar o toLowerCase
    return title && typeof title === 'string' && title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return results;
}



