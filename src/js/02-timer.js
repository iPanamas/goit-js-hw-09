import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  field: document.querySelector('.field'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log(refs.field);

refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.setAttribute('disabled', '');
    } else {
      refs.btnStart.removeAttribute('disabled', '');
    }
  },
};

const fp = flatpickr(refs.input, options);

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
  init() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const selectDate = fp.selectedDates[0];
      const diffTime = selectDate - currentTime;
      const timeToSeconds = timeOnSeconds(diffTime);
      const convertTime = convertMs(diffTime);
      updateClockFace(convertTime);
      if (timeToSeconds === 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Notify.info('Time is over');
      }
    }, 1000);
  }
}

const timer = new Timer();
refs.btnStart.addEventListener('click', timer.init);

function timeOnSeconds(time) {
  return Math.floor((time / 1000).toFixed(1));
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
