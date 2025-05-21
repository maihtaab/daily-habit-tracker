let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
    const list = document.getElementById('habitList');
    list.innerHTML = '';
  
    habits.forEach((habit, index) => {
      const li = document.createElement('li');
  
      li.innerHTML = `
        <button onclick="deleteHabit(${index})">🗑️</button>
        <span class="habit-text ${habit.completed ? 'completed' : ''}" ondblclick="editHabit(${index})">${habit.name}</span>
        <span class="toggle" onclick="toggleHabit(${index})">
          ${habit.completed ? '🎀' : '🤍'}
        </span>
      `;
  
      list.appendChild(li);
    });
  
    localStorage.setItem('habits', JSON.stringify(habits));
  }  

function addHabit() {
  const input = document.getElementById('habitInput');
  const name = input.value.trim();
  if (name === '') return;

  habits.push({ name, completed: false });
  input.value = '';
  renderHabits();
}

function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  renderHabits();
}

// Initial render
renderHabits();

function editHabit(index) {
    const newName = prompt("Edit your habit:", habits[index].name);
    if (newName !== null && newName.trim() !== "") {
      habits[index].name = newName.trim();
      renderHabits();
    }
  }

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    document.getElementById('datetime').textContent = `${formattedDate} — ${formattedTime}`;
  }
  
  updateDateTime();
  setInterval(updateDateTime, 60000); // updates time every minute
  
function showDailyQuote() {
  const quotes = [
    "You’re not behind — you’re building.",
    "Effort > Perfection 💖",
    "You’re becoming her. Keep going.",
    "One habit at a time ✨",
    "Discipline is a form of self-love 🫶",
    "Soft life, hard work 🩷"
  ];
  
  const quote = quotes[new Date().getDate() % quotes.length];
  document.getElementById('dailyQuote').textContent = `"${quote}"`;
}

showDailyQuote();

document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all habits?")) {
      habits = [];
      renderHabits();
    }
  });
  