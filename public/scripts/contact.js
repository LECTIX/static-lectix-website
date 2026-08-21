const startedInput = document.querySelector("[data-form-started]");

if (startedInput instanceof HTMLInputElement) {
  startedInput.value = Math.floor(Date.now() / 1000).toString();
}

const formStatus = new URLSearchParams(window.location.search).get("status");
const statusBox = formStatus ? document.querySelector(`[data-status="${formStatus}"]`) : null;

if (statusBox instanceof HTMLElement) {
  statusBox.hidden = false;
  statusBox.focus();
}
