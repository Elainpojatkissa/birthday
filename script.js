document.getElementById("set-language").addEventListener("click", function() {
    const language = document.getElementById("language").value;
    localStorage.setItem("language", language);
});

document.getElementById("show-time").addEventListener("click", function() {
    const birthdayInput = document.getElementById("birthday").value;
    if (birthdayInput) {
        const birthDate = new Date(birthdayInput);
        localStorage.setItem("birthday", birthDate.toISOString());
        document.getElementById("birthday-settings").style.display = "none";
        document.getElementById("countdown-container").style.display = "block";
        startCountdown(birthDate);
    }
});

document.getElementById("reset-birthday").addEventListener("click", function() {
    localStorage.removeItem("birthday");
    location.reload();
});

function startCountdown(birthDate) {
    function updateCountdown() {
        const today = new Date();
        const nextBirthday = getNextBirthday(birthDate, today);
        const timeDiff = nextBirthday - today;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText = `Time Until Your Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Show confetti when it's the birthday
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            document.getElementById("confetti").style.display = "block";
            playBirthdaySounds();
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // initial call
}

function getNextBirthday(birthDate, today) {
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());

    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    return nextBirthday;
}

function playBirthdaySounds() {
    const sound = new Audio('birthday_song.mp3');
    sound.play();
}
