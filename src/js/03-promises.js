import { delay, first } from 'lodash';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let promisePosition = 0;
  let firstDelay = Number(event.target.delay.value);
  let delayStep = Number(event.target.step.value);
  let amount = event.target.amount.value;

  setTimeout(() => {
    const intervalId = setInterval(() => {
      const delay = () => {
        const delaySum = (firstDelay += delayStep);
        return delaySum - delayStep;
      };
      promisePosition += 1;
      if (promisePosition == amount) {
        clearInterval(intervalId);
      }
      createPromise(promisePosition, delay())
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delayStep);
  }, firstDelay);
}
refs.form.addEventListener('submit', onFormSubmit);
