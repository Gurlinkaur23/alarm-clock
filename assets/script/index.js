'use strict';

import { onEvent, select } from './utils.js';

// Selections
const currentTime = select('.time');
const alarmTime = select('.alarm-time');
const inputHoursElement = select('.hours');
const inputMinutesElement = select('.minutes');
const btnSetAlarm = select('button');

// Main code

// Getting the current time
function getCurrentTime() {
  const now = new Date();

  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');

  currentTime.innerText = `${currentHours}:${currentMinutes}`;
}

// Updating current time every second
setInterval(getCurrentTime, 1000);

// Input validation
function validateInput() {
  const inputHours = inputHoursElement.value.trim();
  const inputMinutes = inputMinutesElement.value.trim();

  if (!(inputHours >= 0 && inputHours <= 23) || inputHours.length !== 2) {
    handleInvalidInput(inputHoursElement);
  }
  if (!(inputMinutes >= 0 && inputMinutes <= 59) || inputMinutes.length !== 2) {
    handleInvalidInput(inputMinutesElement);
  }

  if (inputHours.length === 2 && inputMinutes.length === 2) {
    handleValidInput(inputHours, inputMinutes);
  }
}

function handleValidInput(hours, minutes) {
  if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
    alarmTime.innerText = `${hours}:${minutes}`;
    setAlarm(hours, minutes);
  }
}

function handleInvalidInput(inputElement) {
  inputElement.style.border = '1px solid red';
  setTimeout(() => {
    inputElement.style.border = 'none';
    alarmTime.innerText = '';
  }, 500);
}

function setAlarm(hours, minutes) {
  const now = new Date();
  const alarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );

  const timeDifference = alarmTime - now;

  const startAlarm = new Audio('./assets/audio/alarm-clock-audio.wav');
  setAlarm.type = 'audio/wav';

  if (timeDifference > 0) {
    setTimeout(() => {
      startAlarm.play();
    }, timeDifference);
  }
  if (timeDifference <= 0) {
    alarmTime.setDate(now.getDate() + 1);
  }
}

// Event listener
onEvent('click', btnSetAlarm, event => {
  event.preventDefault();
  validateInput();
  inputHoursElement.value = '';
  inputMinutesElement.value = '';
});
