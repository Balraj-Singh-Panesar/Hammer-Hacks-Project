const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("current-month");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");

const habitPopup = document.getElementById("habit-popup");
const recordPopup = document.getElementById("record-popup");
const addHabitBtn = document.getElementById("add-habit-btn");
const recordHabitBtn = document.getElementById("record-habit-btn");
const closePopup = document.getElementById("close-popup");
const closeRecordPopup = document.getElementById("close-record-popup");

const habitList = document.getElementById("habit-list");
const recordSelect = document.getElementById("record-habit-name");

let habits = [];
let date = new Date();

function renderCalendar() {
    calendar.innerHTML = "";
    currentMonth.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Fill days
    for (let i = 0; i < firstDay; i++) calendar.innerHTML += `<div></div>`;
    for (let d = 1; d <= lastDate; d++) {
        const day = document.createElement("div");
        day.textContent = d;
        if (d === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            day.classList.add("current-date");
        }
        calendar.appendChild(day);
    }
}

function openHabitPopup() {
    habitPopup.classList.remove("hidden");
}

function closeHabitPopup() {
    habitPopup.classList.add("hidden");
}

function addHabit() {
    const name = document.getElementById("habit-name").value;
    const goal = parseInt(document.getElementById("habit-goal").value);
    if (name && goal) {
        habits.push({ name, goal, done: 0 });
        updateHabitList();
        closeHabitPopup();
    }
}

function updateHabitList() {
    habitList.innerHTML = "";
    recordSelect.innerHTML = "";
    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.textContent = `${habit.name} - ${habit.goal - habit.done} left`;
        li.classList.add("status");
        habitList.appendChild(li);

        const option = document.createElement("option");
        option.value = index;
        option.textContent = habit.name;
        recordSelect.appendChild(option);
    });
}

function recordHabit() {
    const habitIndex = parseInt(recordSelect.value);
    const recordDate = new Date(document.getElementById("record-date").value);
    if (habits[habitIndex]){ 
        habits[habitIndex].done += 1;
        updateHabitList();
    }
    closeRecordPopup();
}

prevMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

addHabitBtn.addEventListener("click", openHabitPopup);
closePopup.addEventListener("click", closeHabitPopup);
document.getElementById("save-habit").addEventListener("click", addHabit);

recordHabitBtn.addEventListener("click", () => recordPopup.classList.remove("hidden"));
document.getElementById("save-record").addEventListener("click", recordHabit);
closeRecordPopup.addEventListener("click", () => recordPopup.classList.add("hidden"));

renderCalendar();
