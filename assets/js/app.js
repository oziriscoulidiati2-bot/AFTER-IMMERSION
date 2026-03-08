import { fetchAnnonces, fetchTopSoldats, fetchCorps } from "./api.js";
import { renderCards } from "./ui.js";
import "./auth.js";

const annoncesContainer = document.getElementById("annoncesContainer");
const topContainer = document.getElementById("topSoldats");
const corpsContainer = document.getElementById("corpsContainer");
const totalMembers = document.getElementById("totalMembers");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

async function init() {

  const annonces = await fetchAnnonces();
  renderCards(annoncesContainer, annonces, a =>
    `<div class="card">
      <h3>${a.title}</h3>
      <p>${a.content}</p>
    </div>`
  );

  const tops = await fetchTopSoldats();
  renderCards(topContainer, tops, s =>
    `<div class="card">
      <h3>${s.name}</h3>
      <p>${s.points} points</p>
    </div>`
  );

  const corps = await fetchCorps();
  renderCards(corpsContainer, corps, c =>
    `<div class="card">
      <h3>${c.name}</h3>
    </div>`
  );

  animateCounter(12458);
}

function animateCounter(target) {
  let count = 0;
  const interval = setInterval(() => {
    count += 150;
    totalMembers.textContent = count;
    if (count >= target) clearInterval(interval);
  }, 30);
}

init();

// login

import { renderLogin } from "./ui.js";
import { renderDashboardSoldat } from "./ui.js";
import { state } from "./state.js";

const app = document.getElementById("app");

export function navigate(route) {
  app.innerHTML = "";

  if (route === "login") {
    renderLogin(app);
  }

  if (route === "dashboard-soldat") {
    if (!state.user) return navigate("login");
    renderDashboardSoldat(app);
  }

  if (route === "dashboard-admin") {
    app.innerHTML = "<h1>Dashboard Admin (à construire)</h1>";
  }
}

// Initial route
navigate("login");