// appointments.js
// Appointment system — stores appointments per logged-in user.

/**
 * Books an appointment for the current user.
 * @param {string} name  - Doctor / appointment name
 * @param {string} date  - Date string (e.g. "2026-04-10")
 * @param {string} time  - Optional time string (e.g. "10:30 AM")
 */
function bookAppointment(name, date, time) {
  if (!name || !date) {
    alert('Please provide both a name and a date for the appointment.');
    return false;
  }

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userKey = user ? user.email : 'guest';
  const storageKey = 'appointments_' + userKey;

  const appointments = _getAppointments(storageKey);

  // Prevent exact duplicate
  const exists = appointments.find(a => a.name === name && a.date === date);
  if (exists) {
    alert('An appointment with this name and date already exists.');
    return false;
  }

  appointments.push({
    id: Date.now(),
    name,
    date,
    time: time || '',
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(storageKey, JSON.stringify(appointments));
  return true;
}

/**
 * Returns all appointments for the current user (newest first).
 */
function getAppointments() {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userKey = user ? user.email : 'guest';
  return _getAppointments('appointments_' + userKey)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Cancels (removes) an appointment by its id.
 * @param {number} id
 */
function cancelAppointment(id) {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userKey = user ? user.email : 'guest';
  const storageKey = 'appointments_' + userKey;

  const appointments = _getAppointments(storageKey).filter(a => a.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

/** Internal helper — safely reads appointments array from localStorage. */
function _getAppointments(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

window.bookAppointment   = bookAppointment;
window.getAppointments   = getAppointments;
window.cancelAppointment = cancelAppointment;
