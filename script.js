// ============================================
// SKAMBY - script.js COMPLETO
// Contém: Login, Cadastro, Produtos, Favoritos, etc
// ============================================

// ============================================
// CONTROLE DE LOGIN
// ============================================
let usuarioLogado = localStorage.getItem("skamby_usuario") || null;

// Elementos
const loginBtn = document.getElementById("loginBtn");
const avatarLogado = document.getElementById("avatarLogado");
const loginModal = document.getElementById("loginModal");
const cadastroModal = document.getElementById("cadastroModal");
const publicarModal = document.getElementById("publicarModal");
const nomeUsuarioSpan = document.getElementById("nomeUsuario");
const avatarImg = document.getElementById("avatarImg");

// Função para atualizar UI após login
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

// Função de login
function fazerLogin(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem("skamby_usuarios") || "[]");
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        usuarioLogado = usuario.email;
        localStorage.setItem("skamby_usuario", usuario.email);
        localStorage.setItem("skamby_nome", usuario.nome);
        atualizarUIUsuario();
        fecharTodosModais();
        alert(`✅ Bem-vindo de volta, ${usuario.nome}!`);
        return true;
    } else {
        alert("❌ E-mail ou senha incorretos!");
        return false;
    }
}

// Função de cadastro
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

// Controle de modais
function fecharTodosModais() {
    if (loginModal) loginModal.style.display = "none";
    if (cadastroModal) cadastroModal.style.display = "none";
    if (publicarModal) publicarModal.style.display = "none";
}

function abrirModal(modal) {
    fecharTodosModais();
    if (modal) modal.style.display = "flex";
}

// Eventos de Login/Cadastro
if (loginBtn) loginBtn.onclick = () => abrirModal(loginModal);

const closeLoginModal = document.getElementById("closeLoginModal");
const closeCadastroModal = document.getElementById("closeCadastroModal");
const closePublicarModal = document.getElementById("closePublicarModal");
const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");
const logoutBtn = document.getElementById("logoutBtn");

if (closeLoginModal) closeLoginModal.onclick = () => loginModal.style.display = "none";
if (closeCadastroModal) closeCadastroModal.onclick = () => cadastroModal.style.display = "none";
if (closePublicarModal) closePublicarModal.onclick = () => publicarModal.style.display = "none";

if (abrirCadastro) {
    abrirCadastro.onclick = (e) => {
        e.preventDefault();
        abrirModal(cadastroModal);
    };
}

if (voltarLogin) {
    voltarLogin.onclick = (e) => {
        e.preventDefault();
        abrirModal(loginModal);
    };
}

if (logoutBtn) logoutBtn.onclick = fazerLogout;

// Formulário de Login
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const senha = document.getElementById("loginSenha").value;
        fazerLogin(email, senha);
        e.target.reset();
    });
}

// Formulário de Cadastro
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("cadastroNome").value;
        const email = document.getElementById("cadastroEmail").value;
        const senha = document.getElementById("cadastroSenha").value;
        const confirmarSenha = document.getElementById("cadastroConfirmarSenha").value;
        fazerCadastro(nome, email, senha, confirmarSenha);
        e.target.reset();
    });
}

// ============================================
// DADOS DOS PRODUTOS
// ============================================
let produtos = [
    { id: 1, titulo: "Camiseta Orgânica", categoria: "roupas", tipo: "venda", preco: "R$ 45,00", descricao: "100% algodão orgânico, nunca usada.", favorito: false, imagem: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop" },
    { id: 2, titulo: "Notebook Reciclado", categoria: "eletronicos", tipo: "troca", preco: "", descricao: "Funciona perfeitamente, troco por instrumento musical", favorito: true, imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
    { id: 3, titulo: "Sofá Retrô", categoria: "moveis", tipo: "venda", preco: "R$ 350,00", descricao: "Madeira de demolição, estofado novo", favorito: false, imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop" },
    { id: 4, titulo: "Box de Livros", categoria: "livros", tipo: "troca", preco: "", descricao: "5 livros de ficção científica", favorito: false, imagem: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop" },
    { id: 5, titulo: "Bolsa Ecológica", categoria: "acessorios", tipo: "venda", preco: "R$ 89,00", descricao: "Feita com banners reciclados", favorito: false, imagem: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=300&fit=crop" },
    { id: 6, titulo: "Vaso Autorregável", categoria: "outros", tipo: "troca", preco: "", descricao: "Impressão 3D com PLA biodegradável", favorito: false, imagem: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop" }
];

let categoriaAtiva = "todos";
let termoBusca = "";

// Renderizar produtos
function renderizarProdutos() {
    let filtrados = produtos.filter(produto => {
        const matchCategoria = categoriaAtiva === "todos" || produto.categoria === categoriaAtiva;
        const matchBusca = produto.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
                          produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        return matchCategoria && matchBusca;
    });

    const countSpan = document.getElementById("produtosCount");
    const grid = document.getElementById("produtosGrid");
    
    if (countSpan) countSpan.innerText = filtrados.length;
    if (!grid) return;

    if (filtrados.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px;">
            <i class="fas fa-leaf fa-3x" style="color: #009473;"></i>
            <h3>🌱 Nenhum produto encontrado</h3>
            <p>Seja o primeiro a publicar!</p>
        </div>`;
        return;
    }

    grid.innerHTML = filtrados.map(produto => `
        <div class="card">
            <div class="card-img-container">
                <img src="${produto.imagem}" alt="${produto.titulo}" class="card-img" loading="lazy">
                <button class="favorito-btn ${produto.favorito ? 'favoritado' : ''}" onclick="toggleFavorito(${produto.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="card-info">
                <span class="card-tipo ${produto.tipo === 'troca' ? 'tipo-troca' : 'tipo-venda'}">
                    ${produto.tipo === 'troca' ? '🔄 TROCA' : '💰 VENDA'}
                </span>
                <div class="card-titulo">${produto.titulo}</div>
                ${produto.tipo === 'venda' && produto.preco ? `<div class="card-preco">${produto.preco}</div>` : '<div class="card-preco">♻️ Troca</div>'}
                <div class="card-descricao">${produto.descricao.substring(0, 80)}</div>
            </div>
        </div>
    `).join("");
}

function toggleFavorito(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.favorito = !produto.favorito;
        renderizarProdutos();
    }
}

function adicionarProduto(titulo, categoria, tipo, preco, descricao) {
    if (!usuarioLogado) {
        alert("🔐 Faça login para publicar!");
        abrirModal(loginModal);
        return false;
    }
    
    const novoId = Date.now();
    const novoProduto = {
        id: novoId,
        titulo: titulo,
        categoria: categoria,
        tipo: tipo,
        preco: tipo === "venda" ? preco : "",
        descricao: descricao,
        favorito: false,
        imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    };
    produtos.unshift(novoProduto);
    renderizarProdutos();
    return true;
}

// Eventos de categoria
document.querySelectorAll(".categoria-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".categoria-btn").forEach(b => b.classList.remove("ativo"));
        this.classList.add("ativo");
        categoriaAtiva = this.getAttribute("data-cat");
        renderizarProdutos();
    });
});

// Busca
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function(e) {
        termoBusca = e.target.value;
        renderizarProdutos();
    });
}

// Modal Publicar
const abrirPublicarBtn = document.getElementById("abrirPublicar");
if (abrirPublicarBtn) {
    abrirPublicarBtn.onclick = function(e) {
        e.preventDefault();
        if (!usuarioLogado) {
            alert("🔐 Faça login para publicar!");
            abrirModal(loginModal);
        } else {
            abrirModal(publicarModal);
        }
    };
}

// Formulário de publicação
const formPublicar = document.getElementById("formPublicar");
if (formPublicar) {
    formPublicar.addEventListener("submit", function(e) {
        e.preventDefault();
        const titulo = document.getElementById("produtoTitulo").value;
        const categoria = document.getElementById("produtoCategoria").value;
        const tipo = document.getElementById("produtoTipo").value;
        const preco = document.getElementById("produtoPreco").value;
        const descricao = document.getElementById("produtoDescricao").value;

        if (adicionarProduto(titulo, categoria, tipo, preco, descricao)) {
            if (publicarModal) publicarModal.style.display = "none";
            this.reset();
            alert("✅ Produto publicado!");
        }
    });
}

// Modo Noturno
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = darkModeToggle.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}

// Navegação dos botões superiores
const btnExplorar = document.getElementById("btnExplorar");
const btnFavoritos = document.getElementById("btnFavoritos");
const btnChat = document.getElementById("btnChat");
const btnPerfil = document.getElementById("btnPerfil");
const verTodos = document.getElementById("verTodos");

if (btnExplorar) {
    btnExplorar.addEventListener("click", (e) => {
        e.preventDefault();
        categoriaAtiva = "todos";
        renderizarProdutos();
        document.querySelectorAll(".categoria-btn").forEach(btn => {
            if (btn.getAttribute("data-cat") === "todos") {
                btn.classList.add("ativo");
            } else {
                btn.classList.remove("ativo");
            }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

if (btnFavoritos) {
    btnFavoritos.addEventListener("click", (e) => {
        e.preventDefault();
        if (usuarioLogado) {
            const favoritos = produtos.filter(p => p.favorito);
            if (favoritos.length === 0) {
                alert("💔 Você ainda não tem produtos favoritados.");
            } else {
                alert(`❤️ Você tem ${favoritos.length} produto(s) favoritado(s)!`);
            }
        } else {
            alert("🔐 Faça login para ver seus favoritos!");
            abrirModal(loginModal);
        }
    });
}

if (btnChat) {
    btnChat.addEventListener("click", (e) => {
        e.preventDefault();
        alert("💬 Chat em breve! Em breve você poderá conversar com outros usuários.");
    });
}

if (btnPerfil) {
    btnPerfil.addEventListener("click", (e) => {
        e.preventDefault();
        if (usuarioLogado) {
            const nome = localStorage.getItem("skamby_nome") || "Usuário";
            alert(`👤 Perfil: ${nome}\n\nTotal de produtos no Skamby: ${produtos.length}`);
        } else {
            alert("🔐 Faça login para ver seu perfil!");
            abrirModal(loginModal);
        }
    });
}

if (verTodos) {
    verTodos.addEventListener("click", (e) => {
        e.preventDefault();
        alert(`🌱 Total de produtos no Skamby: ${produtos.length}`);
    });
}

// Fechar modais clicando fora
window.onclick = function(e) {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === cadastroModal) cadastroModal.style.display = "none";
    if (e.target === publicarModal) publicarModal.style.display = "none";
}

// Inicializar
atualizarUIUsuario();
renderizarProdutos();