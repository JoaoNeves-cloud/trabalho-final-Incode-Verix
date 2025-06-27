const form = document.getElementById("login-form");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const errorMessage = document.getElementById("error-message");

const button = form.querySelector("button");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const email = emailInput.value.trim();

  const password = passwordInput.value.trim();

  if (!email || !password) {

    showError("Preencha todos os campos.");

    return;

  }

  if (!validateEmail(email)) {

    showError("E-mail inválido.");

    return;

  }

  button.disabled = true;

  button.textContent = "Entrando...";

  setTimeout(() => {

    if (email === "teste@verix.com" && password === "123456") {

      window.location.href = "dashboard.html";

    } else {

      showError("E-mail ou senha incorretos.");

      button.disabled = false;

      button.textContent = "Entrar";

    }

  }, 1000);

});

emailInput.addEventListener("input", clearError);

passwordInput.addEventListener("input", clearError);

function validateEmail(email) {

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);

}

function showError(msg) {

  errorMessage.textContent = msg;

}

function clearError() {

  errorMessage.textContent = "";

}