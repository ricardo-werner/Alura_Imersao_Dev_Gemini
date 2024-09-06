// Função para cadastrar um novo ponto
function cadastrarPonto(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const form = document.getElementById("cadastroForm");
  const formData = new FormData(form);

  // Criar um objeto com os dados do novo ponto
  const novoPonto = {};
  formData.forEach((value, key) => {
    novoPonto[key] = value;
  });

  // Adicionar o novo ponto ao array de pontos
  pontosDeMergulho.push(novoPonto);

  // Atualizar a tabela
  preencherTabela();

  // Limpar o formulário
  form.reset();
}

// Adicionar um event listener ao formulário
const cadastroForm = document.getElementById("cadastroForm");
cadastroForm.addEventListener("submit", cadastrarPonto);

function preencherTabela() {
  const tableBody = document.querySelector("#pontosTable tbody");
  tableBody.innerHTML = ""; // Limpar a tabela antes de preencher

  pontosDeMergulho.forEach((ponto) => {
    tableBody.appendChild(criarLinha(ponto));
  });
}