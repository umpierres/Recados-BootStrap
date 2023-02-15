let indiceGlobal = -1;
const usuarioLogado = buscarDadosLocalStorage('usuarioLogado');
const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = './index.html';
    }else {
        mostrarRegistrosHTML();
    }
}); 

const toastDiv = document.getElementById('toast-alert');
const toast = new bootstrap.Toast(toastDiv);
const tbody = document.querySelector('#tabelaBody');
const index = listaCadastros.findIndex(
    (usuario) => usuario.id === usuarioLogado.id
);

const modalExcluir = new bootstrap.Modal('#modal-excluir')
const modalCriar = new bootstrap.Modal('#modal-criar')
const modalAtualizar = new bootstrap.Modal('#modal-atualizar')
const formAtualizar = document.getElementById('form-atualizar')

const formCriar = document.getElementById('form-criar')

formCriar.addEventListener('submit', (event => {
    event.preventDefault();
    if(listaCadastros[index].recados.length > 25){
        formCriar.reset()
        modalCriar.hide()
        toastShow('danger','Numero de recados excedidos')
        return
    }
    if(!formCriar.checkValidity()) {
        formCriar.classList.add('was-validated')
        return
    }

    const tituloRecado = document.querySelector('#tituloRecado').value;
    const mensagemRecado = document.querySelector('#mensagemRecado').value;
    listaCadastros[index].recados.push({
        titulo: tituloRecado,
        mensagem: mensagemRecado,
        id: gerarId()
    });

    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    modalCriar.hide()

    formCriar.classList.remove('was-validated')
    formCriar.reset()
    mostrarRegistrosHTML();
    toastShow('success', 'Recado criado com sucesso!')
}))

function gerarId() {
    return new Date().getTime();
}

function toastShow(tipo, mensagem) {
    toastDiv.classList.add(`text-bg-${tipo}`);

    const espacoMensagem = document.getElementById('mensagem');
    espacoMensagem.innerHTML = mensagem;

    toast.show();

    setTimeout(() => {
        toast.hide();

        toastDiv.classList.remove(`text-bg-${tipo}`);
    }, 5000);
}



function apagarRecado(id) {
    listaCadastros[index].recados.splice(indiceGlobal, 1)
    const trRemover = document.getElementById(id)
    trRemover.remove()
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    modalExcluir.hide()
    toastShow('success', 'Contato excluido com sucesso!')
     
}

function mostrarExcluir(id) {
    modalExcluir.show()
    const botaoExcluir = document.getElementById('btn-delete')
    botaoExcluir.setAttribute('onclick', `apagarRecado(${id})`)
}



function mostrarAtualizar(indice) {
    modalAtualizar.show()
    document.getElementById('tituloAtualizarRecado').value =  listaCadastros[index].recados[indice].titulo
    document.getElementById('mensagemAtualizarRecado').value = listaCadastros[index].recados[indice].mensagem 
    indiceGlobal = indice
}

formAtualizar.addEventListener('submit', (evento) => {
    evento.preventDefault()

    if(!formAtualizar.checkValidity()) {
        formAtualizar.classList.add('was-validated')
        return
    }
    const tituloAtualizar = document.getElementById('tituloAtualizarRecado').value
    const mensagemAtualizar = document.getElementById('mensagemAtualizarRecado').value
    listaCadastros[index].recados[indiceGlobal].titulo = tituloAtualizar;
    listaCadastros[index].recados[indiceGlobal].mensagem = mensagemAtualizar;
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML()
    modalAtualizar.hide()
    formAtualizar.classList.remove('was-validated')
    formAtualizar.reset()
    toastShow('success', 'Contato atualizado com sucesso!')
})


function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = './index.html';
}

function guardarDadosLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function buscarDadosLocalStorage(chave) {
    if (localStorage.getItem(chave)) {
        return JSON.parse(localStorage.getItem(chave));
    } else {
        return [];
    }
}

function mostrarRegistrosHTML() {
    tbody.innerHTML = ''
    listaCadastros[index].recados.forEach((valor,indice) => {
        tbody.innerHTML += `
        <tr id="${valor.id}">
        
            
            
            <td>${valor.titulo}</td>
            <td>${valor.mensagem}</td>

            <td>
                <button
                    class='border-0 bg-body'
                    
                     onclick="mostrarAtualizar(${indice})" 
                >
                    <i
                        class="bi bi-pencil-square text-success"
                    ></i>
                </button>
                <button
                class='border-0 bg-body'
                    
                    
                    onclick="mostrarExcluir(${valor.id})" 
                >
                    <i
                        class="bi bi-trash-fill text-danger"
                    ></i>
                </button>
            </td>
    
        </tr>
        `;
    });
}