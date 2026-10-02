const formLogin = document.getElementById('login-form');
const caixaErro = document.getElementById('error-message');

formLogin.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const campoCaptcha = document.querySelector('[name="cf-turnstile-response"]');
    const captchaToken = campoCaptcha ? campoCaptcha.value : '';

    console.log("Dados capturados:", email, senha, captchaToken);

    fetch('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha, captcha: captchaToken })
    }).then(function(resposta) {
        if (resposta.status === 200) {
            return resposta.json();
        } else if (resposta.status === 429 || resposta.status === 403) {
            caixaErro.textContent = "Muitas tentativas. Aguarde 15 minutos"
            caixaErro.style.display = 'block'
        } else {
            caixaErro.textContent = "Usuário, senha ou verificação de segurança inválidos."
            caixaErro.style.display = 'block'
        }
    }).then(function(dados) {
        if (dados) {
            localStorage.setItem('token', dados.token);
            alert('Login realizado com sucesso!')
        }
    })

})