<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Birthday Stats & Countdown</title>
  <style>
    /* Add your styles here */
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #d0f0ff, #a0e0ff);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px;
      min-height: 100vh;
    }

    .container {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 100%;
      text-align: center;
    }

    h1 {
      color: #0077b6;
      margin-bottom: 20px;
    }

    input[type="date"], select {
      font-size: 16px;
      padding: 10px;
      width: 100%;
      margin-bottom: 20px;
    }

    .stats, #countdown {
      font-size: 18px;
      line-height: 1.6;
      color: #023e8a;
      margin-top: 20px;
    }

    .label {
      font-weight: bold;
    }

    button {
      padding: 10px 20px;
      background-color: #0077b6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
    }

    button:hover {
      background-color: #005f8f;
    }

    #countdown {
      font-size: 36px;
      font-weight: bold;
      color: #ff6f61;
      margin-top: 30px;
    }

    .language-selector {
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>🎉 Birthday Stats & Countdown 🎉</h1>

  <div id="input-container">
    <label for="birthday" id="birthday-label">Select your birthday:</label>
    <input type="date" id="birthday" max="9999-12-31">
    <button onclick="showStats()" id="show-stats-button">Show My Stats</button>
  </div>

  <div class="stats" id="stats"></div>
  <div id="countdown"></div>
</div>

<script>
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
        Time until next birthday: ${days}d ${hours}h ${minutes}m ${seconds}s
      `;
    }, 1000); // Update every second
  }
</script>

</body>
</html>
