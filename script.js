const calendarGrid = document.getElementById('calendar-grid');
const monthYearDisplay = document.getElementById('month-year');
const currentDateDisplay = document.getElementById('current-date');
const eventModal = document.getElementById('event-modal');
const eventForm = document.getElementById('event-form');
const eventDateInput = document.getElementById('event-date');
const eventTitleInput = document.getElementById('event-title');

let events = []; // Store events
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
  calendarGrid.innerHTML = '';
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday =
      date.toDateString() === new Date().toDateString()
        ? 'current-day'
        : '';

    calendarGrid.innerHTML += `
      <div class="${isToday}" onclick="openModal('${date.toISOString()}')">
        ${day}
      </div>`;
  }

  monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
  currentDateDisplay.textContent = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
}

function navigateMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

function openModal(date) {
  eventDateInput.value = date.split('T')[0];
  eventModal.style.display = 'block';
}

function closeModal() {
  eventModal.style.display = 'none';
}

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const eventDate = eventDateInput.value;
  const eventTitle = eventTitleInput.value;
  events.push({ date: eventDate, title: eventTitle });
  closeModal();
});

generateCalendar(currentMonth, currentYear);
