// Counter app behavior with per-user counters and table
const usernameInput = document.getElementById("username");
const counterEl = document.getElementById("counter");
const incBtn = document.getElementById("incBtn");
const decBtn = document.getElementById("decBtn");
const resetBtn = document.getElementById("resetBtn");
const countersBody = document.getElementById("countersBody");
const year = document.getElementById("year");

// Map of username -> count
const counters = {};

function getCurrentName() {
	return usernameInput ? usernameInput.value.trim() : "";
}

function renderSelected() {
	const name = getCurrentName();
	const value = name && counters[name] !== undefined ? counters[name] : 0;
	if (counterEl) counterEl.textContent = name ? String(value) : "—";
	if (decBtn) decBtn.disabled = !name || value <= 0;
	if (incBtn) incBtn.disabled = !name;
	if (resetBtn) resetBtn.disabled = !name || value === 0;
}

function renderTable() {
	if (!countersBody) return;
	// Clear
	countersBody.innerHTML = "";
	const entries = Object.entries(counters);
	if (entries.length === 0) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.setAttribute("colspan", "2");
		td.textContent = "No counters yet";
		td.style.textAlign = "center";
		tr.appendChild(td);
		countersBody.appendChild(tr);
		return;
	}
	// Sort by name
	entries.sort((a, b) => a[0].localeCompare(b[0]));
	for (const [name, count] of entries) {
		const tr = document.createElement("tr");
		const nameTd = document.createElement("td");
		nameTd.textContent = name;
		const countTd = document.createElement("td");
		countTd.textContent = String(count);
		tr.appendChild(nameTd);
		tr.appendChild(countTd);
		countersBody.appendChild(tr);
	}
}

function ensureCounter(name) {
	if (!counters[name]) counters[name] = 0;
}

year.textContent = new Date().getFullYear();

// Update selected UI when username changes
if (usernameInput) {
	usernameInput.addEventListener("input", () => {
		renderSelected();
	});
}

if (incBtn) incBtn.addEventListener("click", () => {
	const name = getCurrentName();
	if (!name) return;
	ensureCounter(name);
	counters[name] += 1;
	renderSelected();
	renderTable();
});

if (decBtn) decBtn.addEventListener("click", () => {
	const name = getCurrentName();
	if (!name) return;
	ensureCounter(name);
	counters[name] = Math.max(0, counters[name] - 1);
	renderSelected();
	renderTable();
});

if (resetBtn) resetBtn.addEventListener("click", () => {
	const name = getCurrentName();
	if (!name) return;
	ensureCounter(name);
	counters[name] = 0;
	renderSelected();
	renderTable();
});

window.addEventListener("load", () => {
	renderSelected();
	renderTable();
});

