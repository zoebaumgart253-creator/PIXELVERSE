document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#hauptnavigation");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  // Countdown bis zur PIXELVERSE-Eröffnung
  const countdown = document.querySelector("#event-countdown");
  if (countdown) {
    const targetTime = new Date(countdown.dataset.target).getTime();
    const fields = {
      days: document.querySelector("#countdown-days"),
      hours: document.querySelector("#countdown-hours"),
      minutes: document.querySelector("#countdown-minutes"),
      seconds: document.querySelector("#countdown-seconds")
    };
    const finishedMessage = document.querySelector("#countdown-finished");

    const updateCountdown = () => {
      const remaining = targetTime - Date.now();
      if (remaining <= 0) {
        Object.values(fields).forEach((field) => { if (field) field.textContent = "00"; });
        if (finishedMessage) finishedMessage.hidden = false;
        window.clearInterval(countdownInterval);
        return;
      }
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      if (fields.days) fields.days.textContent = String(days);
      if (fields.hours) fields.hours.textContent = String(hours).padStart(2, "0");
      if (fields.minutes) fields.minutes.textContent = String(minutes).padStart(2, "0");
      if (fields.seconds) fields.seconds.textContent = String(seconds).padStart(2, "0");
    };

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, 1000);
  }

  const form = document.querySelector("#ticket-form");
  const message = document.querySelector("#form-message");
  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.fullname.value.trim();
      message.textContent = `Danke, ${name}! Deine Demo-Vormerkung wurde erfolgreich simuliert. Es wurde nichts übertragen.`;
      form.reset();
    });
  }
});
