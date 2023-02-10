const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const erroDeDadosHTML = document.querySelector('#erroDeDados');
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = './home.html';
    }
});

const formCriarConta = document.querySelector('#formCadastro');
formCriarConta.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const emailSign = document.querySelector('#email-sign').value;
    const senhaSign = document.querySelector('#senha-sign').value;
    const reSenhaSign = document.querySelector('#re-senha-sign').value;
    if (senhaSign !== reSenhaSign) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Os dados não são iguais</p>';
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    }
    if (
        listaCadastros.some((usuarioCadastrado) => {
            if (usuarioCadastrado.email === emailSign) {
                return true;
            }
        })
    ) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Esse usuario já está cadastrado</p>';
        formCriarConta.reset();
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    }

    const novoUsuario = {
        email: emailSign,
        senha: senhaSign,
        recados: [],
    };

    console.log(novoUsuario);

    listaCadastros.push(novoUsuario);
    guardarDadosLocalStorage('cadastrosUsuarios', listaCadastros);
});

///?/////

////////////

const form = document.getElementById('form-login');

const inputEmail = document.getElementById('email-login').value;

const inputPassword = document.getElementById('senha-login').value;
form.addEventListener('change', (event) => {
    event.preventDefault();

    if (!inputEmail || !inputEmail.includes('@') || !inputPassword) {
        form.classList.add('was-validated');
        return;
    }
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const usuarioExiste = listaCadastros.find((usuarioPessoa) => {
        return (
            usuarioPessoa.email === inputEmail &&
            usuarioPessoa.senha === inputPassword
        );
    });
    console.log(usuarioExiste);
    if (!usuarioExiste) {
        erroDeDadosHTML.innerHTML =
            '<p class="erroDeDados">Credencias invalidas</p>';
        setTimeout(() => {
            erroDeDadosHTML.innerHTML = '';
        }, 3000);
        return;
    } else {
        guardarDadosLocalStorage('usuarioLogado', usuarioExiste);
        window.location.href = './home.html';
    }
    setTimeout(() => {
        window.location.href = './index.html';
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = './home.html';
    }
});

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
