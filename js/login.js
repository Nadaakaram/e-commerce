document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();


  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let loginError = document.getElementById("loginError");

  if (email === "") {
    emailError.textContent = "Email is required.";
  } else {
    emailError.textContent = "";
  }

  if (password === "") {
    passwordError.textContent = "Password is required.";
  } else {
    passwordError.textContent = "";
  }
  let storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (email && password) {
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      alert("Login successful!");
      window.location.href = "index.html"; 
    } else {
      loginError.textContent = "Invalid email or password.";
      loginError.style.color = "red";
    }
  }




























});
