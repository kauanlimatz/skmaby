// ============================================
// SKAMBY - auth.js
// Login, cadastro, logout
// ============================================

let usuarioLogado = localStorage.getItem("skamby_usuario") || null;

// Elementos
const loginBtn = document.getElementById("loginBtn");
const avatarLogado = document.getElementById("avatarLogado");
const loginModal = document.getElementById("loginModal");
const cadastroModal = document.getElementById("cadastroModal");
const nomeUsuarioSpan = document.getElementById("nomeUsuario");
const avatarImg = document.getElementById("avatarImg");

// Atualizar UI após login
function atualizarUIUsuario() {
    if (usuarioLogado) {
        if (loginBtn) loginBtn.style.display = "none";
        if (avatarLogado) avatarLogado.style.display = "flex";
        const nome = localStorage.getItem("skamby_nome") || usuarioLogado;
        if (nomeUsuarioSpan) nomeUsuarioSpan.innerText = nome.split(" ")[0];
        if (avatarImg) avatarImg.innerText = nome.charAt(0).toUpperCase();
    } else {
        if (loginBtn) loginBtn.style.display = "flex";
        if (avatarLogado) avatarLogado.style.display = "none";
    }
}

// Fechar modais
function fecharTodosModais() {
    if (loginModal) loginModal.style.display = "none";
    if (cadastroModal) cadastroModal.style.display = "none";
}

// Login
function fazerLogin(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem("skamby_usuarios") || "[]");
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        usuarioLogado = usuario.email;
        localStorage.setItem("skamby_usuario", usuario.email);
        localStorage.setItem("skamby_nome", usuario.nome);
        atualizarUIUsuario();
        fecharTodosModais();
        alert(`✅ Bem-vindo, ${usuario.nome}!`);
        return true;
    } else {
        alert("❌ E-mail ou senha incorretos!");
        return false;
    }
}

// Cadastro
function fazerCadastro(nome, email, senha, confirmarSenha) {
    if (senha !== confirmarSenha) {
        alert("❌ As senhas não coincidem!");
        return false;
    }
    
    const usuarios = JSON.parse(localStorage.getItem("skamby_usuarios") || "[]");
    
    if (usuarios.find(u => u.email === email)) {
        alert("❌ Este e-mail já está cadastrado!");
        return false;
    }
    
    usuarios.push({ nome, email, senha });
    localStorage.setItem("skamby_usuarios", JSON.stringify(usuarios));
    
    usuarioLogado = email;
    localStorage.setItem("skamby_usuario", email);
    localStorage.setItem("skamby_nome", nome);
    atualizarUIUsuario();
    fecharTodosModais();
    alert(`✅ Conta criada! Bem-vindo, ${nome}!`);
    return true;
}

// Logout
function fazerLogout() {
    usuarioLogado = null;
    localStorage.removeItem("skamby_usuario");
    localStorage.removeItem("skamby_nome");
    atualizarUIUsuario();
    alert("👋 Você saiu da conta!");
}

// Inicializar eventos de autenticação
function initAuth() {
    // Botão de login
    if (loginBtn) {
        loginBtn.onclick = () => {
            if (loginModal) loginModal.style.display = "flex";
        };
    }
    
    // Fechar modais
    const closeLogin = document.getElementById("closeLoginModal");
    const closeCadastro = document.getElementById("closeCadastroModal");
    
    if (closeLogin) closeLogin.onclick = () => fecharTodosModais();
    if (closeCadastro) closeCadastro.onclick = () => fecharTodosModais();
    
    // Abrir cadastro
    const abrirCadastro = document.getElementById("abrirCadastro");
    if (abrirCadastro) {
        abrirCadastro.onclick = (e) => {
            e.preventDefault();
            if (loginModal) loginModal.style.display = "none";
            if (cadastroModal) cadastroModal.style.display = "flex";
        };
    }
    
    // Voltar login
    const voltarLogin = document.getElementById("voltarLogin");
    if (voltarLogin) {
        voltarLogin.onclick = (e) => {
            e.preventDefault();
            if (cadastroModal) cadastroModal.style.display = "none";
            if (loginModal) loginModal.style.display = "flex";
        };
    }
    
    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.onclick = fazerLogout;
    
    // Formulário de login
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const senha = document.getElementById("loginSenha").value;
            fazerLogin(email, senha);
            formLogin.reset();
        });
    }
    
    // Formulário de cadastro
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("cadastroNome").value;
            const email = document.getElementById("cadastroEmail").value;
            const senha = document.getElementById("cadastroSenha").value;
            const confirmar = document.getElementById("cadastroConfirmarSenha").value;
            fazerCadastro(nome, email, senha, confirmar);
            formCadastro.reset();
        });
    }
    
    // Fechar modais clicando fora
    window.onclick = (e) => {
        if (e.target === loginModal) loginModal.style.display = "none";
        if (e.target === cadastroModal) cadastroModal.style.display = "none";
    };
    
    atualizarUIUsuario();
}

// Tornar global para acesso de outros scripts
window.usuarioLogado = usuarioLogado;

// Inicializar
document.addEventListener("DOMContentLoaded", initAuth);