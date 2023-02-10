const listaCadastros = buscarDadosLocalStorage('cadastrosUsuarios');
const erroDeDadosCadastroHTML = document.querySelector('#erroDeDadosCadastro');
const erroDeDadosLoginHTML = document.querySelector('#erroDeDadosLogin');
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = './home.html';
    }
});

const formCriarConta = document.querySelector('#formCadastro');

formCriarConta.addEventListener('change', (event) => {
    event.preventDefault();
    const emailSign = document.querySelector('#email-sign').value;
    const senhaSign = document.querySelector('#senha-sign').value;
    const reSenhaSign = document.querySelector('#re-senha-sign').value;

    if (!emailSign || !emailSign.includes('@') || !senhaSign || !reSenhaSign) {
        formCriarConta.classList.add('was-validated');
        return;
    }
});

formCriarConta.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const emailSign = document.querySelector('#email-sign').value;
    const senhaSign = document.querySelector('#senha-sign').value;
    const reSenhaSign = document.querySelector('#re-senha-sign').value;
    if (senhaSign !== reSenhaSign) {
        erroDeDadosCadastroHTML.innerHTML =
            '<p class="erroDeDadosCadastro text-danger">Os dados não são iguais</p>';
        setTimeout(() => {
            erroDeDadosCadastroHTML.innerHTML = '';
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
        erroDeDadosCadastroHTML.innerHTML =
            '<p class="erroDeDadosCadastro text-danger">Esse usuario já está cadastrado</p>';
        formCriarConta.reset();
        setTimeout(() => {
            erroDeDadosCadastroHTML.innerHTML = '';
        }, 3000);
        return;
    }
    if (senhaSign.length < 5) {
        erroDeDadosCadastroHTML.innerHTML =
            '<p class="erroDeDadosCadastro text-danger">A senha é muito curta</p>';
        setTimeout(() => {
            erroDeDadosCadastroHTML.innerHTML = '';
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

const formLogin = document.getElementById('form-login');

formLogin.addEventListener('change', (event) => {
    event.preventDefault();
    const emailLogin = document.getElementById('email-login').value;
    const senhaLogin = document.getElementById('senha-login').value;
    if (!emailLogin || !emailLogin.includes('@') || !senhaLogin) {
        formLogin.classList.add('was-validated');
        return;
    }
});

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const emailLogin = document.getElementById('email-login').value;
    const senhaLogin = document.getElementById('senha-login').value;
    const usuarioExiste = listaCadastros.find((usuarioPessoa) => {
        return (
            usuarioPessoa.email === emailLogin &&
            usuarioPessoa.senha === senhaLogin
        );
    });
    console.log(usuarioExiste);
    if (!usuarioExiste) {
        erroDeDadosLoginHTML.innerHTML =
            '<p class="erroDeDadosLogin text-danger">Credencias invalidas</p>';
        setTimeout(() => {
            erroDeDadosLoginHTML.innerHTML = '';
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
