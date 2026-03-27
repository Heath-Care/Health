// App entry point

console.log("App started");

// Simple navigation (if needed)
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

window.showPage = showPage;
