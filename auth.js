// Fake auth system (localStorage based)

function registerUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", email);
    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
}

window.registerUser = registerUser;
window.loginUser = loginUser;
