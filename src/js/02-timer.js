import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let selectedValue = 0;

const refs = {
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

function startCountdown() {
  let timerId;
  function onCheck() {
    const diff = selectedValue - new Date().getTime();
    if (diff < 0) {
      clearInterval(timerId);
      startBtn.disabled = true;
    } else {
      correctTimerValues(convertMs(diff));
      startBtn.disabled = true;
    }
  }
  timerId = setInterval(onCheck, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedValue = selectedDates[0].getTime();
    nowValue = new Date().getTime();
    const diff = selectedValue - nowValue;
    if (diff <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

function correctTimerValues(timerValues) {
  refs.daysRef.textContent = addLeadingZero(timerValues.days);
  refs.hoursRef.textContent = addLeadingZero(timerValues.hours);
  refs.minutesRef.textContent = addLeadingZero(timerValues.minutes);
  refs.secondsRef.textContent = addLeadingZero(timerValues.seconds);
}

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

startBtn.addEventListener('click', startCountdown);
