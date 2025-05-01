// Translation object for all supported languages
const translations = {
    en: {
        headerText: "🎉 Birthday Stats & Countdown 🎉",
        selectBirthdayLabel: "Select your birthday:",
        showStatsBtn: "Show Stats",
        timeUntilBirthdayText: "Time until your birthday:",
        happyBirthdayMessage: "🎉 Happy Birthday! 🎉<br> Wishing you an amazing year ahead, ",
        thisDayInHistory: "This Day in History",
        birthdayQuiz: "Birthday Quiz",
        zodiacInfo: "Your Zodiac Sign: ",
        shareButton: "Share Your Birthday Stats"
    },
    es: {
        headerText: "🎉 Estadísticas de Cumpleaños y Cuenta Atrás 🎉",
        selectBirthdayLabel: "Selecciona tu cumpleaños:",
        showStatsBtn: "Mostrar Estadísticas",
        timeUntilBirthdayText: "Tiempo hasta tu cumpleaños:",
        happyBirthdayMessage: "🎉 ¡Feliz Cumpleaños! 🎉<br> Te deseo un año increíble por delante, ",
        thisDayInHistory: "Este Día en la Historia",
        birthdayQuiz: "Quiz de Cumpleaños",
        zodiacInfo: "Tu Signo Zodiacal: ",
        shareButton: "Comparte tus Estadísticas de Cumpleaños"
    },
    sv: {
        headerText: "🎉 Födelsedagsstatistik & Nedräkning 🎉",
        selectBirthdayLabel: "Välj din födelsedag:",
        showStatsBtn: "Visa Statistik",
        timeUntilBirthdayText: "Tid kvar tills din födelsedag:",
        happyBirthdayMessage: "🎉 Grattis på födelsedagen! 🎉<br> Jag önskar dig ett fantastiskt år framöver, ",
        thisDayInHistory: "Denna Dag i Historien",
        birthdayQuiz: "Födelsedagsquiz",
        zodiacInfo: "Ditt Stjärntecken: ",
        shareButton: "Dela dina Födelsedagsstatistik"
    },
    fi: {
        headerText: "🎉 Syntymäpäivätilastot & Laskenta 🎉",
        selectBirthdayLabel: "Valitse syntymäpäiväsi:",
        showStatsBtn: "Näytä tilastot",
        timeUntilBirthdayText: "Aika syntymäpäivääsi:",
        happyBirthdayMessage: "🎉 Hyvää syntymäpäivää! 🎉<br> Toivotan sinulle upeaa vuotta eteenpäin, ",
        thisDayInHistory: "Tänä päivänä historiassa",
        birthdayQuiz: "Syntymäpäiväkysely",
        zodiacInfo: "Horoskooppimerkki: ",
        shareButton: "Jaa syntymäpäivätilastosi"
    }
};

// Current language setting
let currentLanguage = 'en'; // Default to English

// Function to update language
function changeLanguage() {
    currentLanguage = document.getElementById('language-selector').value;
    updateTextContent();
    saveLanguageToLocalStorage();
}

// Update the text content based on the selected language
function updateTextContent() {
    const textContent = translations[currentLanguage];
    
    document.getElementById('header-text').innerText = textContent.headerText;
    document.getElementById('select-birthday-label').innerText = textContent.selectBirthdayLabel;
    document.getElementById('show-stats-btn').innerText = textContent.showStatsBtn;
    document.getElementById('share-button').innerText = textContent.shareButton;
    // Other dynamic text content update can go here
}

// Load birthday from localStorage (if already stored)
function loadBirthdayFromLocalStorage() {
    const storedBirthday = localStorage.getItem('birthday');
    if (storedBirthday) {
        document.getElementById('birthday').value = storedBirthday;
        showStats();
    }
}

// Save birthday to localStorage
function saveBirthdayToLocalStorage() {
    const birthdayInput = document.getElementById('birthday').value;
    if (birthdayInput) {
        localStorage.setItem('birthday', birthdayInput);
    }
}

// Show Stats when birthday is entered
function showStats() {
    saveBirthdayToLocalStorage();
    const statsDiv = document.getElementById("stats");
    const today = new Date();
    const birthDate = new Date(document.getElementById('birthday').value);

    const ageInMilliseconds = today - birthDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.4375; // Average days in a month
    const ageInYears = ageInDays / 365.25; // Average days in a year

    statsDiv.innerHTML = `
        <p><strong>${translations[currentLanguage].timeUntilBirthdayText}:</strong> ${Math.floor(ageInYears)} years</p>
        <p><strong>${translations[currentLanguage].monthsLived}:</strong> ${Math.floor(ageInMonths)} months</p>
        <p><strong>${translations[currentLanguage].daysLived}:</strong> ${Math.floor(ageInDays)} days</p>
        <p><strong>${translations[currentLanguage].hoursLived}:</strong> ${Math.floor(ageInHours)} hours</p>
    `;
    updateCountdown();
}

// Update the countdown
function updateCountdown() {
    const countdownDiv = document.getElementById("countdown");
    const today = new Date();
    const birthDate = new Date(document.getElementById('birthday').value);
    birthDate.setFullYear(today.getFullYear());

    if (today > birthDate) {
        birthDate.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = birthDate - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    countdownDiv.innerHTML = `
        <p>${translations[currentLanguage].timeUntilBirthdayText}: ${days}d ${hours}h ${minutes}m ${seconds}s</p>
    `;
}

// Confetti Explosion
function explodeConfetti() {
    const confetti = canvasConfetti.create(document.getElementById('confetti'), {
        resize: true,
        useWorker: true
    });

    confetti({
        particleCount: 200,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }
    });
}

// Share birthday page
function shareBirthdayPage() {
    const url = window.location.href;
    navigator.share({
        title: 'Check out my Birthday Stats & Countdown!',
        url: url
    });
}

// Initialize the page with stored language
function loadLanguageFromLocalStorage() {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        currentLanguage = storedLanguage;
        document.getElementById('language-selector').value = currentLanguage;
        updateTextContent();
    }
}

function saveLanguageToLocalStorage() {
    localStorage.setItem('language', currentLanguage);
}

// Load language settings when the page loads
loadLanguageFromLocalStorage();
