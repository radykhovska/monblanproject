document.addEventListener("DOMContentLoaded", () => {
  const fromEl = document.getElementById("from");
  const toEl = document.getElementById("to");

  const DATE_FORMAT = "d_m_Y";

  const fromPicker = flatpickr(fromEl, {
    dateFormat: DATE_FORMAT,
    allowInput: true,
    prevArrow: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2608 3.5L11.0833 4.3225L8.41159 7L11.0833 9.6775L10.2608 10.5L6.76075 7L10.2608 3.5Z" fill="black"/>
<path d="M6.41676 3.5L7.23926 4.3225L4.56759 7L7.23926 9.6775L6.41676 10.5L2.91676 7L6.41676 3.5Z" fill="black"/>
</svg>`,
    nextArrow: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.73913 3.5L2.91663 4.3225L5.58829 7L2.91663 9.6775L3.73913 10.5L7.23913 7L3.73913 3.5Z" fill="black"/>
<path d="M7.58324 3.5L6.76074 4.3225L9.43241 7L6.76074 9.6775L7.58324 10.5L11.0832 7L7.58324 3.5Z" fill="black"/>
</svg>`,
    onClose: function (selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        toPicker.set("minDate", selectedDates[0]);
      } else {
        toPicker.set("minDate", null);
      }
    },
  });

  const toPicker = flatpickr(toEl, {
    dateFormat: DATE_FORMAT,
    allowInput: true,
    prevArrow: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2608 3.5L11.0833 4.3225L8.41159 7L11.0833 9.6775L10.2608 10.5L6.76075 7L10.2608 3.5Z" fill="black"/>
<path d="M6.41676 3.5L7.23926 4.3225L4.56759 7L7.23926 9.6775L6.41676 10.5L2.91676 7L6.41676 3.5Z" fill="black"/>
</svg>`,
    nextArrow: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.73913 3.5L2.91663 4.3225L5.58829 7L2.91663 9.6775L3.73913 10.5L7.23913 7L3.73913 3.5Z" fill="black"/>
<path d="M7.58324 3.5L6.76074 4.3225L9.43241 7L6.76074 9.6775L7.58324 10.5L11.0832 7L7.58324 3.5Z" fill="black"/>
</svg>`,
    onClose: function (selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        fromPicker.set("maxDate", selectedDates[0]);
      } else {
        fromPicker.set("maxDate", null);
      }
    },
  });

  document
    .getElementById("fromOpen")
    .addEventListener("click", () => fromPicker.open());
  document
    .getElementById("toOpen")
    .addEventListener("click", () => toPicker.open());

  document.getElementById("fromClose").addEventListener("click", () => {
    fromPicker.clear();
    toPicker.set("minDate", null);
    if (
      toPicker.selectedDates.length > 0 &&
      fromPicker.selectedDates.length === 0
    ) {
      toPicker.clear();
    }
  });

  document.getElementById("toClose").addEventListener("click", () => {
    toPicker.clear();
    fromPicker.set("maxDate", null);
    if (
      fromPicker.selectedDates.length > 0 &&
      toPicker.selectedDates.length === 0
    ) {
      fromPicker.clear();
    }
  });
});

// toggle view
const gallery = document.getElementById("gallery");
const buttons = document.querySelectorAll(".view-btn");

const saved = localStorage.getItem("feedView") || "grid";
gallery.dataset.view = saved;
buttons.forEach((b) => {
  const active = b.dataset.view === saved;
  b.classList.toggle("active", active);
  b.setAttribute("aria-pressed", active);
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    gallery.dataset.view = view;
    buttons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active);
    });
    localStorage.setItem("feedView", view);
  });
});
