let countdownInterval;

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
  const ageInMonths = ageInDays / 30.4375; // Average days in a month
  const ageInYears = ageInDays / 365.25; // Average days in a year

  const leapYears = countLeapYears(birthDate, today);
  const weekendsLived = Math.floor(ageInDays / 7 * 2); // Approximation for weekends

  updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived);
  startCountdown(birthDate, today);
}

function updateStats(ageInYears, ageInMonths, ageInDays, ageInHours, ageInMinutes, ageInSeconds, leapYears, weekendsLived) {
  document.getElementById("stats").innerHTML = `
    <p><strong>Age:</strong> ${Math.floor(ageInYears)} years</p>
    <p><strong>Months lived:</strong> ${Math.floor(ageInMonths)} months</p>
    <p><strong>Weeks lived:</strong> ${Math.floor(ageInDays / 7)} weeks</p>
    <p><strong>Days lived:</strong> ${Math.floor(ageInDays)} days</p>
    <p><strong>Hours lived:</strong> ${Math.floor(ageInHours)} hours</p>
    <p><strong>Minutes lived:</strong> ${Math.floor(ageInMinutes)} minutes</p>
    <p><strong>Seconds lived:</strong> ${Math.floor(ageInSeconds)} seconds</p>
    <p><strong>Leap years:</strong> ${leapYears}</p>
    <p><strong>Birthdays celebrated:</strong> ${Math.floor(ageInYears)}</p>
    <p><strong>Weekends lived:</strong> ${weekendsLived}</p>
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

function startCountdown(birthDate, today) {
  clearInterval(countdownInterval); // Clear any existing countdown intervals

  countdownInterval = setInterval(() => {
    const nextBirthday = getNextBirthday(birthDate, today);
    const timeDiff = nextBirthday - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `
      ${days}d ${hours}h ${minutes}m ${seconds}s
    `;
  }, 1000); // Update every second
}
