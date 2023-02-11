const usuarioLogado = buscarDadosLocalStorage('usuarioLogado');

document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado.email) {
        window.location.href = './index.html';
    } else {
       /*  mostrarRegistrosHTML(); */
    }
});

const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const tbody = document.querySelector('#tabelaBody');
const index = listaCadastros.find(
        (usuario) => {if(usuario.id === usuarioLogado.id) {return usuario.id}}
);
console.log(index)


function gerarId() {
    return new Date().getTime();
}




    

function apagarRecado(indice) {
    const trRemove = document.getElementById(indice);
    trRemove.remove();
    listaCadastros[index].recados.splice(indice, 1);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
    mostrarRegistrosHTML();
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
        return {};
    }
}
