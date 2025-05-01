let countdownInterval;
let statsInterval;

const translations = {
  en: {
    title: "🎉 Birthday Stats & Countdown 🎉",
    birthdayLabel: "Select your birthday:",
    showStatsButton: "Show My Stats",
    timeUntilNextBirthday: "Time until your birthday: ",
    age: "Age",
    monthsLived: "Months lived",
    weeksLived: "Weeks lived",
    daysLived: "Days lived",
    hoursLived: "Hours lived",
    minutesLived: "Minutes lived",
    secondsLived: "Seconds lived",
    leapYears: "Leap years",
    birthdaysCelebrated: "Birthdays celebrated",
    weekendsLived: "Weekends lived",
    cakeDecorating: "Cake Decorating Game",
    candleBlowing: "Candle Blowing Game"
  },
  fi: {
    title: "🎉 Syntymäpäivätilastot & Laskuri 🎉",
    birthdayLabel: "Valitse syntymäpäiväsi:",
    showStatsButton: "Näytä tilastot",
    timeUntilNextBirthday: "Aikaa seuraavaan syntymäpäivääsi: ",
    age: "Ikä",
    monthsLived: "Kuukaudet elossa",
    weeksLived: "Viikot elossa",
    daysLived: "Päivät elossa",
    hoursLived: "Tunnit elossa",
    minutesLived: "Minuutit elossa",
    secondsLived: "Sekunnit elossa",
    leapYears: "Karkausvuodet",
    birthdaysCelebrated: "Vietetyt syntymäpäivät",
    weekendsLived: "Viettämiä viikonloppuja",
    cakeDecorating: "Kakun koristelupeli",
    candleBlowing: "Kynttilän puhaltaminen"
  },
  sv: {
    title: "🎉 Födelsedagsstatistik & Nedräkning 🎉",
    birthdayLabel: "Välj din födelsedag:",
    showStatsButton: "Visa mina statistik",
    timeUntilNextBirthday: "Tid kvar till din födelsedag: ",
    age: "Ålder",
    monthsLived: "Månader levt",
    weeksLived: "Veckor levt",
    daysLived: "Dagar levt",
    hoursLived: "Timmar levt",
    minutesLived: "Minuter levt",
    secondsLived: "Sekunder levt",
    leapYears: "Skottår",
    birthdaysCelebrated: "Födelsedagar firade",
    weekendsLived: "Helger levt",
    cakeDecorating: "Tårtdekoreringsspel",
    candleBlowing: "Blåsa ut ljuset"
  },
  es: {
    title: "🎉 Estadísticas y cuenta atrás de cumpleaños 🎉",
    birthdayLabel: "Selecciona tu cumpleaños:",
    showStatsButton: "Mostrar mis estadísticas",
    timeUntilNextBirthday: "Tiempo hasta tu cumpleaños: ",
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
    cakeDecorating: "Juego de decoración de pasteles",
    candleBlowing: "Juego de soplar velas"
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
  document.getElementById("cakeDecorating").innerText = translations[currentLanguage].cakeDecorating;
  document.getElementById("candleBlowing").innerText = translations[currentLanguage].candleBlowing;
}

function showStats() {
  const bdayInput = document.getElementById("birthday").value;
  if (!bdayInput) {
    alert("Please select your birthday!");
    return;
  }

  document.getElementById("birthday-input").style.display = "none";

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

function updateCountdown(birthDate, today) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const nextBirthday = getNextBirthday(birthDate, today);
    const timeDiff = nextBirthday - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `${translations[currentLanguage].timeUntilNextBirthday} ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

function getNextBirthday(birthDate, today) {
  let nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(today.getFullYear());
  if (nextBirthday <= today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  return nextBirthday;
}

// Function to start the Cake Decorating Game
function startCakeDecoratingGame() {
  const gameContainer = document.createElement("div");
  gameContainer.style.textAlign = "center";
  gameContainer.innerHTML = `
    <h2>🎂 Cake Decorating Game 🎂</h2>
    <div id="cake" style="border: 2px solid #000; width: 300px; height: 150px; background-color: #ffcccc; margin: 20px auto;">
      <p>🎂 Cake Layer 🎂</p>
    </div>
    <button onclick="addLayer()">Add a Cake Layer</button>
    <button onclick="addTopping()">Add Topping</button>
    <button onclick="addCandle()">Add Candle</button>
    <button onclick="finishCake()">Finish Cake</button>
  `;
  document.body.appendChild(gameContainer);
}

function addLayer() {
  const cake = document.getElementById("cake");
  const newLayer = document.createElement("div");
  newLayer.style.height = "50px";
  newLayer.style.backgroundColor = "#ff99cc";
  newLayer.innerHTML = `<p>Layer ${cake.children.length + 1}</p>`;
  cake.appendChild(newLayer);
}

function addTopping() {
  const cake = document.getElementById("cake");
  const topping = document.createElement("div");
  topping.style.height = "20px";
  topping.style.backgroundColor = "#ffcc00";
  topping.innerHTML = "<p>🍬 Topping</p>";
  cake.appendChild(topping);
}

function addCandle() {
  const cake = document.getElementById("cake");
  const candle = document.createElement("div");
  candle.style.display = "inline-block";
  candle.style.marginRight = "5px";
  candle.style.fontSize = "40px";
  candle.innerHTML = "🕯️";
  cake.appendChild(candle);
}

function finishCake() {
  alert("Congratulations! You've finished decorating your cake.");
}

updateText();
