let modoEdicao = false;
let indiceEdicao = null;

const form = document.getElementById('chamadoForm');
const listaChamados = document.getElementById('listaChamados');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCancelar = document.getElementById('btnCancelar');



let chamados = JSON.parse(localStorage.getItem('chamados')) || [];

function salvarChamado(chamado) {
    chamados.push(chamado);
    localStorage.setItem('chamados', JSON.stringify(chamados));
    exibirChamados();
}

function exibirChamados() {
    const filtro = document.getElementById('filtroPrioridade').value;
    listaChamados.innerHTML = '';

    chamados
        .filter(chamado => filtro === "Todas" || chamado.prioridade === filtro)
        .forEach((chamado, index) => {
            if (modoEdicao && index === indiceEdicao) {
                li.style.backgroundColor = '#ffe4b3'; // cor clara para destaque
                li.style.border = '1px solid orange';
            };
            const li = document.createElement('li');
            li.innerHTML = `
        <strong>${chamado.titulo}</strong> <br>
        ${chamado.descricao}<br>
        Prioridade: ${chamado.prioridade}<br>
        <small>${chamado.data}</small>
        <br>
        <button onclick="editarChamado(${index})">Editar</button>
        <button onclick="removerChamado(${index})">Excluir</button>
      `;
            listaChamados.appendChild(li);
        });
}


function removerChamado(index) {
    chamados.splice(index, 1);
    localStorage.setItem('chamados', JSON.stringify(chamados));
    exibirChamados();
}

function editarChamado(index) {
    btnRegistrar.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline';
    const chamado = chamados[index];

    document.getElementById('titulo').value = chamado.titulo;
    document.getElementById('descricao').value = chamado.descricao;
    document.getElementById('prioridade').value = chamado.prioridade;

    modoEdicao = true;
    indiceEdicao = index;
}

btnCancelar.addEventListener('click', function () {
    form.reset();
    modoEdicao = false;
    indiceEdicao = null;
    btnRegistrar.textContent = 'Registrar';
    btnCancelar.style.display = 'none';
    exibirChamados();
});


form.addEventListener('submit', function (e) {
    e.preventDefault();
    btnRegistrar.textContent = 'Registrar';
    btnCancelar.style.display = 'none';
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prioridade = document.getElementById('prioridade').value;
    const data = new Date().toLocaleString();

    const chamado = { titulo, descricao, prioridade, data };

    if (modoEdicao) {
        chamados[indiceEdicao] = chamado;
        modoEdicao = false;
        indiceEdicao = null;
    } else {
        chamados.push(chamado);
    }

    localStorage.setItem('chamados', JSON.stringify(chamados));
    form.reset();
    exibirChamados();
});


exibirChamados();

document.getElementById('filtroPrioridade').addEventListener('change', exibirChamados);
