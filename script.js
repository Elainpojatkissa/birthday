let countdownInterval;
let statsInterval;
let currentLanguage = "en";

const translations = {
  en: {
    title: "🎉 Birthday Stats & Countdown 🎉",
    birthdayLabel: "Select your birthday",
    showStatsButton: "Show My Stats",
    selectLanguage: "Select language",
    age: "Age",
    monthsLived: "Months lived",
    weeksLived: "Weeks lived",
    daysLived: "Days lived",
    hoursLived: "Hours lived",
    minutesLived: "Minutes lived",
    secondsLived: "Seconds lived",
    leapYears: "Leap years",
    birthdaysCelebrated: "Birthdays celebrated",
    weekendsLived: "Total number of weekends lived",
    timeToNextBirthday: "Time until your birthday"
  },
  fi: {
    title: "🎉 Syntymäpäivätilastot ja laskuri 🎉",
    birthdayLabel: "Valitse syntymäpäiväsi",
    showStatsButton: "Näytä tilastoni",
    selectLanguage: "Valitse kieli",
    age: "Ikä",
    monthsLived: "Kuukaudet eletty",
    weeksLived: "Viikot eletty",
    daysLived: "Päivät eletty",
    hoursLived: "Tunnit eletty",
    minutesLived: "Minuutit eletty",
    secondsLived: "Sekunnit eletty",
    leapYears: "Karkausvuodet",
    birthdaysCelebrated: "Vietetyt syntymäpäivät",
    weekendsLived: "Vietetyt viikonloput",
    timeToNextBirthday: "Aikaa seuraavaan syntymäpäivään"
  }
};

function changeLanguage() {
  currentLanguage = document.getElementById("language-select").value;
  updateText();
}

function updateText() {
  const t = translations[currentLanguage];
  document.getElementById("page-title").innerText = t.title;
  document.getElementById("birthday-label").innerText = t.birthdayLabel;
  document.getElementById("show-stats-button").innerText = t.showStatsButton;
  document.getElementById("language-label").innerText = t.selectLanguage;
}

function showStats() {
  const bdayInput = document.getElementById("birthday").value;
  if (!bdayInput) {
    alert("Please select your birthday!");
    return;
  }

  document.getElementById("input-container").style.display = "none";

  const birthDate = new Date(bdayInput);

  updateLiveStats(birthDate);
  startCountdown(birthDate);

  // Live update every second
  if (statsInterval) clearInterval(statsInterval);
  statsInterval = setInterval(() => {
    updateLiveStats(birthDate);
  }, 1000);
}

function updateLiveStats(birthDate) {
  const now = new Date();

  const ageInMs = now - birthDate;
  const seconds = ageInMs / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30.4375;
  const years = days / 365.25;

  const leapYears = countLeapYears(birthDate, now);
  const weekends = Math.floor(weeks * 2);

  const t = translations[currentLanguage];

  document.getElementById("stats").innerHTML = `
    <p><strong>${t.age}:</strong> ${Math.floor(years)} years</p>
    <p><strong>${t.monthsLived}:</strong> ${Math.floor(months)} months</p>
    <p><strong>${t.weeksLived}:</strong> ${Math.floor(weeks)} weeks</p>
    <p><strong>${t.daysLived}:</strong> ${Math.floor(days)} days</p>
    <p><strong>${t.hoursLived}:</strong> ${Math.floor(hours)} hours</p>
    <p><strong>${t.minutesLived}:</strong> ${Math.floor(minutes)} minutes</p>
    <p><strong>${t.secondsLived}:</strong> ${Math.floor(seconds)} seconds</p>
    <p><strong>${t.leapYears}:</strong> ${leapYears}</p>
    <p><strong>${t.birthdaysCelebrated}:</strong> ${Math.floor(years)}</p>
    <p><strong>${t.weekendsLived}:</strong> ${weekends}</p>
  `;
}

function countLeapYears(startDate, endDate) {
  let leapYears = 0;
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    if (isLeapYear(year)) leapYears++;
  }
  return leapYears;
}

function isLeapYear(year) {
  return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

function getNextBirthday(birthDate, now) {
  const next = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (next < now) next.setFullYear(next.getFullYear() + 1);
  return next;
}

function startCountdown(birthDate) {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const now = new Date();
    const next = getNextBirthday(birthDate, now);
    const diff = next - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const t = translations[currentLanguage];

    document.getElementById("countdown").innerText = 
      `${t.timeToNextBirthday} ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
