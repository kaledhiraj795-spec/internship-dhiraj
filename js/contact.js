// =====================
// CONTACT FORM
// =====================

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

if (form && nameInput && emailInput && messageInput && formStatus) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    // Get existing data or create empty array
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Add new submission
    contacts.push(userData);

    // Save updated array
    localStorage.setItem("contacts", JSON.stringify(contacts));

    formStatus.textContent = `Thank you, ${userData.name}! Your message has been received.`;

    console.log("Name:", userData.name);
    console.log("Email:", userData.email);
    console.log("Message:", userData.message);

    form.reset();
  });
}


// =====================
// EVENTS
// =====================
const eventList = document.getElementById("event-list");
const eventResultsStatus = document.getElementById("event-results-status");
const eventFilters = document.getElementById("event-filters");

const events = [
  {
    title: "Kalam Stream Challenges 2026",
    background: "kalam",
    date: "11 Oct 2026",
    dateTime: "2026-10-11",
    description:
      "Kalam Stream Challenges 2026: Proud Moments for Team NextGen 🇮🇳 Kalam Stream Challenges 2026, a National Student Innovation & Model Competition commemorating the 95th birth anniversary of Bharat Ratna Dr. A.P.J. Abdul Kalam, was organised by ASM Group of Institutes.",
    url: "https://asmnext.edu.in/event-detail?slug=kalam-stream-challenges-2026"
  },
  {
    title: "AARAMBH: Guidance from the Leaders of the ASM Family",
    background: "aarambh",
    date: "21 Sep 2026",
    dateTime: "2026-09-21",
    description:
      "Alongside our Chief Guest and Chief Patron, the AARAMBH Induction Program at ASM's NextGen Technical Campus, Talegaon Dabhade was graced by senior leaders of the ASM Group of Institutes.",
    url: "https://asmnext.edu.in/event-detail?slug=aarambh-guidance-from-the-leaders-of-the-asm-family"
  }
];




// =====================
// DISPLAY EVENTS
// =====================

function renderEvents(eventArray) {

  if (!eventList) return;

  eventList.innerHTML = "";
  if (eventResultsStatus) {
    eventResultsStatus.textContent = eventArray.length === 0
      ? "No events match your filters."
      : `${eventArray.length} ${eventArray.length === 1 ? "event" : "events"} shown.`;
  }

  eventArray.forEach(function (event) {
    const card = document.createElement("article");
    card.classList.add("contact-event-card");
    card.dataset.eventBackground = event.background;

    const date = document.createElement("time");
    date.classList.add("contact-event-date");
    date.dateTime = event.dateTime;
    date.textContent = event.date;

    const title = document.createElement("h3");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.textContent = event.description;

    const link = document.createElement("a");
    link.classList.add("contact-event-link");
    link.href = event.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View Event";
    link.setAttribute("aria-label", `View event: ${event.title}`);

    card.append(date, title, description, link);
    eventList.appendChild(card);
  });
}


// =====================
// INITIAL LOAD
// =====================

renderEvents(events);


// =====================
// SEARCH + FILTER
// =====================
const searchInput = document.getElementById("event-search");
const clearButton = document.querySelector(
  "[data-action='clear-filters']"
);
function filterEvents() {
  if (!searchInput) return;

  const searchText = searchInput.value.trim().toLowerCase();
  const filteredEvents = events.filter(function (event) {
    return [event.title, event.date, event.description]
      .some(function (value) {
        return value.toLowerCase().includes(searchText);
      });
  });

  renderEvents(filteredEvents);
}


// =====================
// EVENT LISTENERS
// =====================

if (eventFilters) {
  eventFilters.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

if (searchInput) searchInput.addEventListener("input", filterEvents);

if (clearButton) {
  clearButton.addEventListener("click", function () {
    if (searchInput) searchInput.value = "";
    filterEvents();
  });
}

filterEvents();