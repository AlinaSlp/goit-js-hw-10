import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timeDays = document.querySelector('span[data-days]');
const timeHours = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true, 
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future.',
        position: 'topRight',
      });
      startBtn.disabled = true;
      return;
    }
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
  },
};

flatpickr(input, options);

startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  let timerId = null;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      input.disabled = false;
      iziToast.success({
        title: "Готово!",
        message: "Time’s up! 🎉",
        position: "topRight",
      });
      return;
    }

    updateTimerDisplay(diff);
  }, 1000);
});


function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timeDays.textContent = addLeadingZero(days);
  timeHours.textContent = addLeadingZero(hours);
  timeMinutes.textContent = addLeadingZero(minutes);
  timeSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






