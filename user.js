// User utilities

function getCurrentUser() {
  return localStorage.getItem("loggedInUser");
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out!");
}

window.getCurrentUser = getCurrentUser;
window.logout = logout;
