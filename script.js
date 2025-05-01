const countdownEl = document.getElementById("countdown");
const birthdayInput = document.getElementById("birthday");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const colorPicker = document.getElementById("colorPicker");
const languageSelector = document.getElementById("language");
const birthdaySound = document.getElementById("birthdaySound");

function getHelsinkiTime() {
  const now = new Date();
  const helsinkiTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Helsinki" }));
  return helsinkiTime;
}

function getNextBirthday(birthDate) {
  const today = getHelsinkiTime();
  const next = new Date(birthDate);
  next.setFullYear(today.getFullYear());
  if (today > next) next.setFullYear(today.getFullYear() + 1);
  return next;
}

function updateCountdown() {
  const birthDate = new Date(localStorage.getItem("birthday"));
  const nextBirthday = getNextBirthday(birthDate);
  const now = getHelsinkiTime();
  const diff = nextBirthday - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  let label = {
    en: "Time Until Your Birthday",
    fi: "Aikaa syntymäpäivääsi",
    sv: "Tid kvar till din födelsedag",
    es: "Tiempo hasta tu cumpleaños"
  }[localStorage.getItem("language") || "en"];

  countdownEl.innerText = `${label} ${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (diff <= 0) {
    launchConfetti();
    birthdaySound.play();
    clearInterval(window.intervalId);
  }
}

function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 500, spread: 160 });
  }
}

function saveBirthday() {
  const birthday = birthdayInput.value;
  const language = languageSelector.value;
  localStorage.setItem("birthday", birthday);
  localStorage.setItem("language", language);
  localStorage.setItem("color", colorPicker.value);
  document.body.style.backgroundColor = colorPicker.value;
  document.getElementById("settings").style.display = "none";
  resetBtn.style.display = "inline-block";
  updateCountdown();
  window.intervalId = setInterval(updateCountdown, 1000);
}

function resetBirthday() {
  localStorage.clear();
  location.reload();
}

saveBtn.addEventListener("click", saveBirthday);
resetBtn.addEventListener("click", resetBirthday);

colorPicker.addEventListener("input", (e) => {
  document.body.style.backgroundColor = e.target.value;
});

if (localStorage.getItem("birthday")) {
  document.getElementById("settings").style.display = "none";
  resetBtn.style.display = "inline-block";
  document.body.style.backgroundColor = colorPicker.value = localStorage.getItem("color") || "#ADD8E6";
  window.intervalId = setInterval(updateCountdown, 1000);
}
