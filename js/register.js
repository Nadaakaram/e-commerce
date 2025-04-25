document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();


let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value;
let confirmPassword = document.getElementById("confirmPassword").value;

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");


nameError.textContent = "";
emailError.textContent = "";
passwordError.textContent = "";
confirmPasswordError.textContent = "";

let isValid = true;

if (name.length < 3 || name.length > 20) {
  nameError.textContent = "Name must be between 3 and 20 characters.";
  isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(name)) {
  nameError.textContent = "Name must contain only letters and spaces.";
  isValid = false;
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(email)) {
  emailError.textContent = "Email must be in the format example@domain.com";
  isValid = false;
} 

if (password.length < 6) {
  passwordError.textContent = "Password must be at least 6 characters long.";
  isValid = false;
}

if (password !== confirmPassword) {
  confirmPasswordError.textContent = "Passwords do not match.";
  isValid = false;
}

if (isValid) {
    let userData = {
        name: name,
        email: email,
        password: password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registration successful!");
    window.location.href = "login.html"; 
  }
});