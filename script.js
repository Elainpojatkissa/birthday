let countdownInterval;
let statsInterval;
let ageInSeconds, ageInMinutes, ageInHours, ageInDays, ageInMonths, ageInYears;

const translations = {
  en: {
    title: "🎉 Birthday Stats & Countdown 🎉",
    birthdayLabel: "Select your birthday:",
    showStatsButton: "Show My Stats",
    selectLanguage: "Select language:",
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
    timeToNextBirthday: "Time until next birthday:"
  },
  fi: {
    title: "🎉 Syntymäpäivätilastot ja laskuri 🎉",
    birthdayLabel: "Valitse syntymäpäiväsi:",
    showStatsButton: "Näytä tilastoni",
    selectLanguage: "Valitse kieli:",
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
    timeToNextBirthday: "Aikaa seuraavaan syntymäpäivään:"
  },
  es: {
    title: "🎉 Estadísticas de Cumpleaños y Cuenta Atrás 🎉",
    birthdayLabel: "Selecciona tu cumpleaños:",
    showStatsButton: "Ver mis estadísticas",
    selectLanguage: "Seleccionar idioma:",
    age: "Edad",
    monthsLived: "Meses vividos",
    weeksLived: "Semanas vividas",
    daysLived: "Días vividos",
    hoursLived: "Horas vividas",
    minutesLived: "Minutos vividos",
    secondsLived: "Segundos vividos",
    leapYears: "Años bisiestos",
    birthdaysCelebrated: "Cumpleaños celebrados",
    weekendsLived: "Fines de semana vividos",
    timeToNextBirthday: "Tiempo hasta el próximo cumpleaños:"
  },
  sv: {
    title: "🎉 Födelsedagsstatistik och Nedräkning 🎉",
    birthdayLabel: "Välj din födelsedag:",
    showStatsButton: "Visa mina statistik",
    selectLanguage: "Välj språk:",
    age: "Ålder",
    monthsLived: "Månader levda",
    weeksLived: "Veckor levda",
    daysLived: "Dagar levda",
    hoursLived: "Timmar levda",
    minutesLived: "Minuter levda",
    secondsLived: "Sekunder levda",
    leapYears: "Skottår",
    birthdaysCelebrated: "Firade födelsedagar",
    weekendsLived: "Helger levda",
    timeToNextBirthday: "Tid tills nästa födelsedag:"
  }
};

let currentLanguage = "en";

function changeLanguage() {
  currentLanguage = document.getElementById("language-select").value;
  updateText();
}

function updateText() {
  document.getElementById("page-title").innerText = translations[currentLanguage].title;
  document.getElementById("birthday-label").innerText = translations[currentLanguage].birthdayLabel;
  document.getElementById("show-stats-button").innerText = translations[currentLanguage].showStatsButton;
  document.getElementById("language-label").innerText = translations[currentLanguage].selectLanguage;
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

  // Lasketaan aikarajat
  const ageInMilliseconds = today - birthDate;
  ageInSeconds = ageInMilliseconds / 1000;
  ageInMinutes = ageInSeconds / 60;
  ageInHours = ageInMinutes / 60;
  ageInDays = ageInHours / 24;
  ageInMonths = ageInDays / 30.4375;
  ageInYears = ageInDays / 365.25;

  const leapYears = countLeapYears(birthDate, today);
  const weekendsLived = Math.floor(ageInDays / 7 * 2);

  updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived);
  updateCountdown(birthDate, today);
  
  // Päivitä tilastoja joka sekunti
  statsInterval = setInterval(function() {
    ageInSeconds++;
    ageInMinutes++;
    ageInHours++;
    ageInDays++;
    ageInMonths++;
    ageInYears++;
    updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived);
  }, 1000);
}

function updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived) {
  document.getElementById("stats").innerHTML = `
    <p><strong>${translations[currentLanguage].age}:</strong> ${Math.floor(ageInYears)} years</p>
    <p><strong>${translations[currentLanguage].monthsLived}:</strong> ${Math.floor(ageInMonths)} months</p>
    <p><strong>${translations[currentLanguage].weeksLived}:</strong> ${Math.floor(ageInDays / 7)} weeks</p>
    <p><strong>${translations[currentLanguage].daysLived}:</strong> ${Math.floor(ageInDays)} days</p>
    <p><strong>${translations[currentLanguage].hoursLived}:</strong> ${Math.floor(ageInHours)} hours</p>
    <p><strong>${translations[currentLanguage].minutesLived}:</strong> ${Math.floor(ageInMinutes)} minutes</p>
    <p><strong>${translations[currentLanguage].secondsLived}:</strong> ${Math.floor(ageInSeconds)} seconds</p>
    <p><strong>${translations[currentLanguage].leapYears}:</strong> ${leapYears}</p>
    <p><strong>${translations[currentLanguage].birthdaysCelebrated}:</strong> ${Math.floor(ageInYears)}</p>
    <p><strong>${translations[currentLanguage].weekendsLived}:</strong> ${weekendsLived}</p>
  `;
}

function countLeapYears(startDate, endDate) {
  let leapYears = 0;
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    if (isLeapYear(year)) {
      leapYears++;
    }
  }
  return leapYears;
}

function isLeapYear(year) {
  return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

function getNextBirthday(birthDate, today) {
  let nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(today.getFullYear());
  if (nextBirthday <= today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  return nextBirthday;
}

function updateCountdown(birthDate, today) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const nextBirthday = getNextBirthday(birthDate, today);
    const timeDiff = nextBirthday - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `
      ${translations[currentLanguage].timeToNextBirthday} ${days}d ${hours}h ${minutes}m ${seconds}s
    `;
  }, 1000);
}
