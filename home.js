// dashboard.js

// Verifica se o usuário está logado

if (!localStorage.getItem("usuario_logado")) {


}

// Exibe o nome do usuário

const nome = localStorage.getItem("nome_usuario") || "Usuário";

const msg = document.getElementById("welcome-msg");

if (msg) {

  msg.textContent = `Bem-vindo, ${nome}!`;

}

// Logout

function logout() {

  localStorage.removeItem("usuario_logado");

  localStorage.removeItem("nome_usuario");

  window.location.href = "login.html";

}