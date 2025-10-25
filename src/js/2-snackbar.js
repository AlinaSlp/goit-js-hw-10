import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value.trim());
  const state = form.elements.state.value;

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: "Error",
      message: "Please enter a valid positive delay value",
      position: "topRight",
    });
    return;
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: "✅ Success",
        message: `Fulfilled promise in ${delay}ms`,
        position: "topRight",
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: "❌ Rejected",
        message: `Rejected promise in ${delay}ms`,
        position: "topRight",
        timeout: 3000,
      });
    });

  form.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
