// Seleção dos elementos principais
let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

// Função principal de busca
async function iniciarBusca() {
  // Se ainda não carregou o JSON, busca os dados
  if (dados.length === 0) {
    try {
      let resposta = await fetch("data.json");
      dados = await resposta.json();
    } catch (error) {
      console.error("Falha ao buscar dados:", error);
      return; // Interrompe caso dê erro
    }
  }

  // Termo digitado
  const termoBusca = campoBusca.value.toLowerCase();

  // Filtra por nome ou descrição
  const dadosFiltrados = dados.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) ||
      dado.descricao.toLowerCase().includes(termoBusca)
  );

  // Renderiza resultados
  renderizarCards(dadosFiltrados);
}

// Renderiza os cards na tela
function renderizarCards(dados) {
  cardContainer.innerHTML = ""; // Limpa os resultados anteriores

  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card");

    // Estrutura do card
    article.innerHTML = `
      <div class="conteudo">
        <h2>${dado.nome}</h2>
        <p class="ano">${dado.data_criacao}</p>
        <p class="descricao">${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>
      </div>

      ${
        dado.capa
          ? `<img src="${dado.capa}" alt="${dado.nome}" class="capa">`
          : ""
      }
    `;

    // Adiciona ao container
    cardContainer.appendChild(article);
  }
}
