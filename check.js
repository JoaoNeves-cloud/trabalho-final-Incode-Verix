// checklist.js

// Redireciona para login se não estiver autenticado

if (!localStorage.getItem("usuario_logado")) {

  wi;

}

// Função para logout

function logout() {

  localStorage.clear();

  window.location.href = "login.html";

}

// Função para tratar upload de documento

function handleUpload(event, docKey) {

  const file = event.target.files[0];

  const docItem = event.target.closest(".doc-item");

  const statusText = docItem.querySelector(".status span");

  if (!file) {

    // Caso upload cancelado, volta para pendente

    statusText.textContent = "Pendente";

    statusText.style.color = "#e67e22"; // laranja padrão

    salvarStatus(docKey, { status: "Pendente" });

    return;

  }

  statusText.textContent = "Validando...";

  statusText.style.color = "#f39c12"; // amarelo

  // Simula validação IA

  setTimeout(() => {

    const isValido = Math.random() > 0.2; // 80% chance válido

    if (isValido) {

      statusText.textContent = "Válido até 2026";

      statusText.style.color = "#27ae60"; // verde

      salvarHistorico(`Documento "${docKey}" validado com sucesso.`);

      salvarStatus(docKey, { status: "Válido até 2026", valido: true });

      mostrarNotificacao("✅ Documento validado com sucesso.");

    } else {

      statusText.textContent = "Inválido - reenviar";

      statusText.style.color = "#c0392b"; // vermelho

      salvarHistorico(`Documento "${docKey}" inválido.`);

      salvarStatus(docKey, { status: "Inválido - reenviar", valido: false });

      mostrarNotificacao("⚠️ Documento inválido. Reenvie.");

    }

  }, 1500);

}

// Mostra notificações temporárias

function mostrarNotificacao(texto) {

  const toast = document.getElementById("notificacao");

  toast.textContent = texto;

  toast.style.display = "block";

  setTimeout(() => {

    toast.style.display = "none";

  }, 3000);

}

// Salva histórico de interações no localStorage

function salvarHistorico(entrada) {

  const lista = JSON.parse(localStorage.getItem("verix_historico") || "[]");

  lista.push(`${new Date().toLocaleString()} - ${entrada}`);

  localStorage.setItem("verix_historico", JSON.stringify(lista));

}

// Mostra o modal de histórico

function mostrarHistorico() {

  const modal = document.getElementById("historico");

  const ul = document.getElementById("historico-lista");

  ul.innerHTML = "";

  const lista = JSON.parse(localStorage.getItem("verix_historico") || "[]");

  if (lista.length === 0) {

    ul.innerHTML = "<li>Nenhuma interação registrada.</li>";

  } else {

    lista.slice().reverse().forEach(item => {

      const li = document.createElement("li");

      li.textContent = item;

      ul.appendChild(li);

    });

  }

  modal.classList.remove("hidden");

  modal.focus();

}

// Fecha o modal de histórico

function fecharHistorico() {

  const modal = document.getElementById("historico");

  modal.classList.add("hidden");

}

// Salva status do documento no localStorage para persistência

function salvarStatus(docKey, data) {

  const estados = JSON.parse(localStorage.getItem("verix_status_documentos") || "{}");

  estados[docKey] = data;

  localStorage.setItem("verix_status_documentos", JSON.stringify(estados));

}

// Carrega status salvos dos documentos quando a página carrega

function carregarStatus() {

  const estados = JSON.parse(localStorage.getItem("verix_status_documentos") || "{}");

  Object.entries(estados).forEach(([docKey, data]) => {

    const docItem = document.querySelector(`.doc-item[data-doc="${docKey}"]`);

    if (docItem) {

      const statusText = docItem.querySelector(".status span");

      statusText.textContent = data.status || "Pendente";

      statusText.style.color = data.valido

        ? "#27ae60"

        : (data.status === "Pendente" ? "#e67e22" : "#c0392b");

    }

  });

}

// Placeholder para abrir chat com imobiliária

function abrirChat() {

  alert("🔔 Canal com a imobiliária será implementado futuramente.");

}

// Inicializa ao carregar a página

window.onload = () => {

  carregarStatus();

};