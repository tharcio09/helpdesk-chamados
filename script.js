const form = document.getElementById('chamadoForm');
const listaChamados = document.getElementById('listaChamados');

let chamados = JSON.parse(localStorage.getItem('chamados')) || [];

function salvarChamado(chamado) {
  chamados.push(chamado);
  localStorage.setItem('chamados', JSON.stringify(chamados));
  exibirChamados();
}

function exibirChamados() {
  listaChamados.innerHTML = '';
  chamados.forEach((chamado, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${chamado.titulo}</strong> <br>
      ${chamado.descricao}<br>
      Prioridade: ${chamado.prioridade}<br>
      <small>${chamado.data}</small>
      <br><button onclick="removerChamado(${index})">Excluir</button>
    `;
    listaChamados.appendChild(li);
  });
}

function removerChamado(index) {
  chamados.splice(index, 1);
  localStorage.setItem('chamados', JSON.stringify(chamados));
  exibirChamados();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prioridade = document.getElementById('prioridade').value;
  const data = new Date().toLocaleString();

  const chamado = { titulo, descricao, prioridade, data };
  salvarChamado(chamado);
  form.reset();
});

exibirChamados();
