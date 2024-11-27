import { getTodos } from './todos.js';

const calendarBody = document.getElementById('calendar-body');
const currentMonthElement = document.getElementById('current-month');

export function renderCalendar(month, year) {
  calendarBody.innerHTML = '';
  currentMonthElement.textContent = new Date(year, month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    calendarBody.appendChild(cell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    cell.dataset.cy = 'calendar-cell';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = day;
    dateSpan.dataset.cy = 'calendar-cell-date';

    const todoCount = document.createElement('span');
    todoCount.dataset.cy = 'calendar-cell-todos';

    cell.appendChild(dateSpan);
    cell.appendChild(todoCount);
    calendarBody.appendChild(cell);
  }
}

export function updateCalendarTodos() {
  const todos = getTodos();
  const cells = document.querySelectorAll('[data-cy="calendar-cell"]');

  cells.forEach((cell) => {
    const date = cell.querySelector('[data-cy="calendar-cell-date"]').textContent;
    const monthYear = currentMonthElement.textContent;
    const fullDate = new Date(`${monthYear} ${date}`).toLocaleDateString();

    const todosForDate = todos.filter((todo) => todo.date === fullDate);
    const todoCount = cell.querySelector('[data-cy="calendar-cell-todos"]');
    todoCount.textContent = todosForDate.length ? `(${todosForDate.length})` : '';
  });
}

export function changeMonth(currentMonth, currentYear, step) {
  currentMonth += step;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  return { currentMonth, currentYear };
}
