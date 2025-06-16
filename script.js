let modoEdicao = false;
let indiceEdicao = null;

const form = document.getElementById('chamadoForm');
const listaChamados = document.getElementById('listaChamados');
const campoStatus = document.getElementById('status');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCancelar = document.getElementById('btnCancelar');




let chamados = JSON.parse(localStorage.getItem('chamados')) || [];

function salvarChamado(chamado) {
    chamados.push(chamado);
    localStorage.setItem('chamados', JSON.stringify(chamados));
    exibirChamados();
}

function exibirChamados() {
    const filtroPrioridade = document.getElementById('filtroPrioridade').value;
    const filtroStatus = document.getElementById('filtroStatus').value;
    listaChamados.innerHTML = '';

    chamados
        .filter(chamado =>
            (filtroPrioridade === "Todas" || chamado.prioridade === filtroPrioridade) &&
            (filtroStatus === "Todos" || chamado.status === filtroStatus)
        )
        .forEach((chamado, index) => {
            const li = document.createElement('li');

            if (modoEdicao && index === indiceEdicao) {
                li.style.backgroundColor = '#ffe4b3';
                li.style.border = '1px solid orange';
            }

            li.innerHTML = `
                <strong>${chamado.titulo}</strong> <br>
                ${chamado.descricao}<br>
                Prioridade: ${chamado.prioridade} <br>
                Status: <span class="status ${chamado.status.replace(/\s/g, '').toLowerCase()}">${chamado.status}</span><br>
                <small>${chamado.data}</small><br>
                ${chamado.resolvidoEm ? `<small><strong>Resolvido em:</strong> ${chamado.resolvidoEm}</small><br>` : ''}
                <button onclick="editarChamado(${index})">Editar</button>
                <button onclick="removerChamado(${index})">Excluir</button>
            `;


            listaChamados.appendChild(li);
        });
}

function atualizarDashboard() {
    let abertos = 0, andamento = 0, resolvidos = 0;

    chamados.forEach(chamado => {
        if (chamado.status === "Aberto") abertos++;
        else if (chamado.status === "Em andamentos") andamento++;
        else if (chamado.status === "Resolvido") resolvidos++;
    });

    document.getElementById('qtdAbertos').textContent = abertos;
    document.getElementById('qtdEmAndamento').textContent = andamento;
    document.getElementById('qtdResolvidos').textContent = resolvidos;
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
    document.getElementById('status').value = chamado.status;

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
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const prioridade = document.getElementById('prioridade').value;
    const status = document.getElementById('status').value;
    const data = new Date().toLocaleString();

    
    const resolvidoEm = status === "Resolvido" ? new Date().toLocaleString() : null;

    const chamado = { titulo, descricao, prioridade, status, data, resolvidoEm };




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
atualizarDashboard();

document.getElementById('filtroPrioridade').addEventListener('change', exibirChamados);
document.getElementById('filtroStatus').addEventListener('change', exibirChamados);
