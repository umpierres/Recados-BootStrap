const toastDiv = document.getElementById('toast-alert');
const toast = new bootstrap.Toast(toastDiv);
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = './index.html';
    }
}); 

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