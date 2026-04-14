/**
 * Busca jogos na API CheapShark com base no nome digitado pelo usuário.
 * Valida o input, faz requisição fetch e salva os dados no localStorage.
 * @param {void}
 * @returns {Promise<void>}
 */

async function buscarJogos() {
  const nome = document.getElementById('busca').value;

  if (!nome) {
    alert('Digite um nome!');
    return;
  }

  const url = `https://www.cheapshark.com/api/1.0/deals?title=${nome}`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  localStorage.setItem('jogos', JSON.stringify(dados));

  mostrarJogos(dados);
}

/**
 * Exibe os jogos na tabela de resultados.
 * @param {Array} jogos Lista de jogos retornados pela API.
 * @returns {void}
 */

function mostrarJogos(jogos) {
  const tabela = document.getElementById('tabelaJogos');
  tabela.innerHTML = '';

  jogos.slice(0, 10).forEach((jogo, index) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td><img src="${jogo.thumb}"></td>
      <td>${jogo.title}</td>
      <td>R$ ${jogo.normalPrice}</td>
      <td>R$ ${jogo.salePrice}</td>
      <td>${parseFloat(jogo.savings).toFixed(0)}%</td>
      <td>
        <button class="fav-btn" onclick="favoritar(${index})">⭐</button>
        <button class="del-btn" onclick="excluir(${index})">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

/**
 * Remove um jogo da lista de resultados com confirmação do usuário.
 * @param {number} index Índice do jogo a ser removido.
 * @returns {void}
 */

function excluir(index) {
  const confirmar = confirm('Tem certeza que deseja excluir este jogo?');

  if (!confirmar) return;

  let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

  jogos.splice(index, 1);

  localStorage.setItem('jogos', JSON.stringify(jogos));

  mostrarJogos(jogos);
}

/**
 * Adiciona um jogo à lista de favoritos.
 * @param {number} index Índice do jogo selecionado.
 * @returns {void}
 */

function favoritar(index) {
  const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos.push(jogos[index]);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  mostrarFavoritos();
}

/**
 * Exibe os jogos favoritos na tabela.
 * @param {void}
 * @returns {void}
 */

function mostrarFavoritos() {
  const tabela = document.getElementById('tabelaFavoritos');
  tabela.innerHTML = '';

  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos.forEach((jogo, index) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td><img src="${jogo.thumb}"></td>
      <td>${jogo.title}</td>
      <td>R$ ${jogo.normalPrice}</td>
      <td>R$ ${jogo.salePrice}</td>
      <td>${parseFloat(jogo.savings).toFixed(0)}%</td>
      <td><button class="del-btn" onclick="removerFavorito(${index})">Remover</button></td>
    `;

    tabela.appendChild(linha);
  });
}

/**
 * Exibe os jogos favoritos na tabela.
 * @param {void}
 * @returns {void}
 */

function removerFavorito(index) {
  const confirmar = confirm('Tem certeza que deseja remover dos favoritos?');

  if (!confirmar) return;

  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos.splice(index, 1);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  mostrarFavoritos();
}

/**
 * Carrega os dados salvos no localStorage ao iniciar a aplicação.
 * @param {void}
 * @returns {void}
 */

function carregar() {
  const jogos = JSON.parse(localStorage.getItem('jogos'));

  if (jogos) {
    mostrarJogos(jogos);
  }

  mostrarFavoritos();
}

carregar();