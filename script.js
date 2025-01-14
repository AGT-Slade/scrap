// Set the target date and time in Belize time (America/Belize, UTC-6)
const targetTimeZone = 'America/Belize';
const targetDate = new Date('January 30, 2025 24:00:00 GMT-0600'); // 6:00 PM Belize time

// Function to convert the target time to the user's local time
function convertToLocalTime(date, timeZone) {
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // Use 24-hour format for conversion
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);
  const localTime = new Date(
    parts.find((p) => p.type === 'year').value,
    parts.find((p) => p.type === 'month').value - 1, // Months are 0-indexed
    parts.find((p) => p.type === 'day').value,
    parts.find((p) => p.type === 'hour').value,
    parts.find((p) => p.type === 'minute').value,
    parts.find((p) => p.type === 'second').value
  );
  return localTime.getTime();
}

// Convert the target time to the user's local time
const targetTimeLocal = convertToLocalTime(targetDate, targetTimeZone);

// Function to update the countdown
function updateCountdown() {
  const now = new Date().getTime(); // Current time in the user's local time
  const timeDifference = targetTimeLocal - now; // Difference in milliseconds

  // Check if the countdown has ended
  if (timeDifference <= 0) {
    clearInterval(timer); // Stop the timer
    document.getElementById('countdown-timer').textContent = "Time's up!";
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the countdown in the format DD:HH:MM:SS
  document.getElementById('countdown-timer').textContent =
    `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the countdown every second (1000 milliseconds)
const timer = setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();