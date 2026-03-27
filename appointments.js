// Appointment system (stored in browser)

function bookAppointment(name, date) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments.push({ name, date });
  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("Appointment booked!");
}

function getAppointments() {
  return JSON.parse(localStorage.getItem("appointments")) || [];
}

window.bookAppointment = bookAppointment;
window.getAppointments = getAppointments;
