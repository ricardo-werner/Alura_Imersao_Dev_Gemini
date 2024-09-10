// Carregar o arquivo JSON - textos,json
export async function carregarTextos(
  arquivosJson,
  elementoTitulo,
  elementoDescricao,
  elementoCitacao
) {
  try {
    const response = await fetch(arquivosJson);
    const data = await response.json();

    // Atualizar o título e a descrição como antes
    document.getElementById(elementoTitulo).textContent = data.tituloPagina;
    document.getElementById(elementoDescricao).textContent =
      data.descricaoPagina;

    // Atualizar o texto com as quebras de linha
    const textoComQuebras = data.descricaoPagina.replace(/\n/g, "<br>");
    document.getElementById(elementoDescricao).innerHTML = textoComQuebras;

    // Atualizar a citação com as quebras de linha
    const citacaoComQuebras = data.citacaoPagina.replace(/\n/g, "<br>");
    document.getElementById(elementoCitacao).innerHTML = citacaoComQuebras;
  } catch (error) {
    console.error("Erro ao carregar os textos:", error);
  }
}


