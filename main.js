// JavaScript copied from index.html <script> block
// Purpose: move inline script into this separate file for maintainability

// Simple, accessible interactivity
const nameInput = document.getElementById("name");
const greetBtn = document.getElementById("greetBtn");
const timeBtn = document.getElementById("timeBtn");
const out = document.getElementById("greeting");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function timeOfDayGreeting() {
	const h = new Date().getHours();
	if (h < 12) return "Good morning";
	if (h < 18) return "Good afternoon";
	return "Good evening";
}

greetBtn.addEventListener("click", () => {
	const name = nameInput.value.trim();
	const base = timeOfDayGreeting();
	out.textContent = name
		? `${base}, ${name}! Welcome.`
		: `${base}! Welcome.`;
});

timeBtn.addEventListener("click", () => {
	const now = new Date();
	timeBtn.setAttribute(
		"aria-pressed",
		timeBtn.getAttribute("aria-pressed") === "true" ? "false" : "true"
	);
	out.textContent = `Current local time: ${now.toLocaleTimeString()}`;
});

// announce a greeting on first load (non-intrusive)
window.addEventListener("load", () => {
	out.textContent = `${timeOfDayGreeting()}!`;
});

