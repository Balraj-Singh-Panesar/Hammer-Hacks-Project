// script.js
const { startOfWeek, endOfWeek, addDays, format, addWeeks, startOfMonth, endOfMonth, isSameDay, isToday } = dateFns;

let currentDate = new Date(); // Start with today's date
let displayedDate = new Date(); // Controls the displayed month/year

// Generate the calendar for the displayed month
function generateCalendar(date) {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Clear previous content

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  let currentWeekStart = startOfWeek(monthStart, { weekStartsOn: 1 });

  while (currentWeekStart <= monthEnd) {
    const weekDiv = document.createElement('div');
    weekDiv.classList.add('week');

    // Add each day of the week
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');

      // Highlight today's date
      if (isToday(day)) {
        dayDiv.classList.add('today');
      }

      dayDiv.innerHTML = `${format(day, 'EEE')}<br>${format(day, 'd')}`;
      weekDiv.appendChild(dayDiv);
    }

    calendar.appendChild(weekDiv);
    currentWeekStart = addWeeks(currentWeekStart, 1); // Move to the next week
  }

  updateMonthYear(date);
  scrollToCurrentWeek();
}

// Update the month and year in the header
function updateMonthYear(date) {
  const monthYear = document.getElementById('monthYear');
  monthYear.textContent = format(date, 'MMMM yyyy');
}

// Scroll to the current week
function scrollToCurrentWeek() {
  const calendar = document.querySelector('.calendar');
  const weeks = document.querySelectorAll('.week');
  const today = new Date();

  weeks.forEach((week, index) => {
    if (week.querySelector('.today')) {
      const scrollAmount = index * calendar.offsetWidth;
      calendar.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  });
}

// Navigate months
function navigateMonth(direction) {
  displayedDate = addWeeks(displayedDate, direction * 4); // Adjust displayed date
  generateCalendar(displayedDate);
}

// Scroll calendar horizontally
function scrollCalendar(direction) {
  const calendar = document.querySelector('.calendar');
  const scrollAmount = calendar.offsetWidth; // Scroll by container's width
  calendar.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Initialize the calendar
generateCalendar(currentDate);