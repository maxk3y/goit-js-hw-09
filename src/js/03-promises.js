import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

let timeOutId = 0;

function onFormSubmit(evt) {
  evt.preventDefault();
  clearTimeout(timeOutId);

  const { delay, step, amount } = evt.target.elements;
  let stepValue = delay.valueAsNumber;

  if (delay.value < 1 || step.value < 1 || amount.value < 1) {
    return Notiflix.Notify.failure('Помилка, заповніть коректно усі поля');
  }

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise #${position} in ${delay}ms`);
      });
    stepValue += Number(step.value);
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    timeOutId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.formEl.addEventListener('submit', onFormSubmit);
