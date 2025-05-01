// Get the user's birthdate
const birthDate = new Date(); // Change this to your birthday date

// Set the countdown interval
let countdownInterval;

// Function to get the next birthday date based on today's date
function getNextBirthday(birthDate, today) {
  const nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(today.getFullYear());
  
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  return nextBirthday;
}

// Function to update the countdown every second
function updateCountdown() {
  const today = new Date();
  const nextBirthday = getNextBirthday(birthDate, today);
  const timeDiff = nextBirthday - today;
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerText = `Time Until Your Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Set the countdown to update every second
countdownInterval = setInterval(updateCountdown, 1000);

// Ensure the countdown updates immediately when the page loads
updateCountdown();

// Handle share button functionality
document.getElementById("shareButton").addEventListener("click", function() {
  if (navigator.share) {
    navigator.share({
      title: 'Birthday Countdown',
      text: 'Check out my birthday countdown!',
      url: window.location.href,
    })
    .then(() => console.log('Shared successfully'))
    .catch((err) => console.error('Share failed:', err));
  } else {
    alert('Share functionality is not supported on this device.');
  }
});

// Color Picker functionality to change background color
document.getElementById("colorPicker").addEventListener("input", function(event) {
  document.body.style.backgroundColor = event.target.value;
});
