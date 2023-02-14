
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
const modalCriar = new bootstrap.Modal('#modal-criar')

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
    listaCadastros[index].recados.forEach((valor) => {
        tbody.innerHTML += `
        <tr id="${valor.id}">
        
            
            
            <td>${valor.titulo}</td>
            <td>${valor.mensagem}</td>

            <td>
                <button
                    class='border-0 bg-body'
                    data-id="${valor.id}"
                     onclick="editarRecado(this)" 
                >
                    <i
                        class="bi bi-pencil-square text-success"
                    ></i>
                </button>
                <button
                class='border-0 bg-body'
                    data-id="${valor.id}"
                    
                    onclick="apagarRecado(this)" 
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