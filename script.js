let countdownInterval;
let statsInterval;
let currentLanguage = "en";

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
  const today = new Date();
  const ageInMilliseconds = today - birthDate;
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInMinutes = ageInSeconds / 60;
  const ageInHours = ageInMinutes / 60;
  const ageInDays = ageInHours / 24;
  const ageInMonths = ageInDays / 30.4375;
  const ageInYears = ageInDays / 365.25;
  const leapYears = countLeapYears(birthDate, today);
  const weekendsLived = Math.floor(ageInDays / 7 * 2);
  updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived);
  updateCountdown(birthDate, today);
  statsInterval = setInterval(() => {
    updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived);
  }, 1000);
}

function updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived) {
  const t = translations[currentLanguage];
  document.getElementById("stats").innerHTML = `
    <p><strong>${t.age}:</strong> ${Math.floor(ageInYears)} years</p>
    <p><strong>${t.monthsLived}:</strong> ${Math.floor(ageInMonths)} months</p>
    <p><strong>${t.weeksLived}:</strong> ${Math.floor(ageInDays / 7)} weeks</p>
    <p><strong>${t.daysLived}:</strong> ${Math.floor(ageInDays)} days</p>
    <p><strong>${t.hoursLived}:</strong> ${Math.floor(ageInHours)} hours</p>
    <p><strong>${t.minutesLived}:</strong> ${Math.floor(ageInMinutes)} minutes</p>
    <p><strong>${t.secondsLived}:</strong> ${Math.floor(ageInSeconds)} seconds</p>
    <p><strong>${t.leapYears}:</strong> ${leapYears}</p>
    <p><strong>${t.birthdaysCelebrated}:</strong> ${Math.floor(ageInYears)}</p>
    <p><strong>${t.weekendsLived}:</strong> ${weekendsLived}</p>
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

function getNextBirthday(birthDate, today) {
  let nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(today.getFullYear());
  if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
  return nextBirthday;
}

function updateCountdown(birthDate, today) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const nextBirthday = getNextBirthday(birthDate, new Date());
    const timeDiff = nextBirthday - new Date();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText =
      translations[currentLanguage].timeToNextBirthday + " " +
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
