export function renderCards(container, data, templateFn) {
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += templateFn(item);
  });
}

export function showToast(message, isError = false) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  toast.classList.add("toast");
  if (isError) toast.classList.add("error");

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// login

import { login } from "./auth.js";
import { state } from "./state.js";

export function renderLogin(container) {
  container.innerHTML = `
    <div class="login-container">
      <h1>Connexion</h1>
      <form id="loginForm">
        <input type="text" placeholder="Téléphone" id="phone" required />
        <input type="password" placeholder="Mot de passe" id="password" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  `;

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    login(
      document.getElementById("phone").value,
      document.getElementById("password").value
    );
  });
}

export function renderDashboardSoldat(container) {
  container.innerHTML = `
  
  <main class="dashboard">

    <!-- ===================== -->
    <!-- HEADER PROFIL + GRADE -->
    <!-- ===================== -->
    <section class="dashboard-header section">

      <div class="profile-grade-wrapper">
        <div 
          class="grade-icon profile-grade"
          id="profileGradeIcon">
        </div>

        <div class="profile-info">
          <h1 id="soldierName">Nom du soldat</h1>
          <h2 id="soldierGrade">Grade actuel</h2>
        </div>
      </div>

      <div class="xp-section">
        <div class="xp-info">
          <span id="currentPoints">0 pts</span>
          <span id="pointsToNext">0 pts restants</span>
        </div>

        <div class="xp-bar">
          <div class="xp-fill" id="xpFill"></div>
        </div>
      </div>

    </section>


    <!-- ===================== -->
    <!-- MÉDAILLES -->
    <!-- ===================== -->
    <section class="medals-section section">
      <header class="section-header">
        <h3>🎖 Médailles</h3>
      </header>

      <div class="medals-grid" id="medalsContainer">
        <!-- Médailles dynamiques injectées ici -->
      </div>
    </section>


    <!-- ===================== -->
    <!-- MISSIONS -->
    <!-- ===================== -->
    <section class="missions-section section">
      <header class="section-header">
        <h3>🎯 Missions en cours</h3>
      </header>

      <div class="missions-list" id="missionsContainer">
        <!-- Missions dynamiques -->
      </div>
    </section>


    <!-- ===================== -->
    <!-- SECTIONS D’APPARTENANCE -->
    <!-- ===================== -->
    <section class="sections-section section">
      <header class="section-header">
        <h3>🏢 Sections</h3>
      </header>

      <ul class="sections-list" id="sectionsContainer">
        <!-- Sections dynamiques -->
      </ul>
    </section>


    <!-- ===================== -->
    <!-- DOCUMENTS -->
    <!-- ===================== -->
    <section class="documents-section section">
      <header class="section-header">
        <h3>📄 Documents</h3>
      </header>

      <div class="documents-actions">
        <button class="btn-download" data-doc="certificat">
          Télécharger certificat
        </button>

        <button class="btn-download" data-doc="attestation">
          Télécharger attestation
        </button>

        <button class="btn-download" data-doc="fiche">
          Télécharger fiche d'identité
        </button>
      </div>
    </section>

  </main>


  <!-- ===================== -->
  <!-- NAVIGATION MOBILE FIXE -->
  <!-- ===================== -->
  <nav class="mobile-nav">

    <button class="nav-btn" id="annoncesBtn">
      📢 Annonces
    </button>

    <button class="nav-btn" id="commandementBtn">
      Commandement
    </button>

    <button class="nav-btn danger" id="signalerBtn">
       Signaler
    </button>

  </nav>


  <!-- ===================== -->
  <!-- MODAL ANNONCES -->
  <!-- ===================== -->
  <div class="modal" id="annoncesModal">
    <div class="modal-content">
      <header class="modal-header">
        <h3>Annonces officielles</h3>
        <button class="close-modal" data-close="annoncesModal">✖</button>
      </header>

      <div class="modal-body" id="annoncesContainer">
        <!-- Annonces dynamiques -->
      </div>
    </div>
  </div>


  <!-- ===================== -->
  <!-- MODAL COMMANDEMENT -->
  <!-- ===================== -->
  <div class="modal" id="commandementModal">
    <div class="modal-content">
      <header class="modal-header">
        <h3>Commandement</h3>
        <button class="close-modal" data-close="commandementModal">✖</button>
      </header>

      <div class="modal-body">

        <div class="commandement-members">
          <h4>Membres du commandement</h4>
          <ul id="commandementMembers"></ul>
        </div>

        <div class="commandement-sections">
          <h4>Sections existantes</h4>
          <ul id="commandementSections"></ul>
        </div>

      </div>
    </div>
  </div>


  <!-- ===================== -->
  <!-- SLIDE PANEL SIGNALER -->
  <!-- ===================== -->
  <aside class="slide-panel" id="signalPanel">

    <div class="slide-header">
      <h3>Signaler un problème</h3>
      <button class="close-slide" id="closeSignalPanel">✖</button>
    </div>

    <form id="signalForm" class="signal-form">
      <textarea 
        id="signalMessage" 
        placeholder="Décrivez le problème..."
        required>
      </textarea>

      <button type="submit" class="btn-submit">
        Envoyer
      </button>
    </form>

  </aside>

  `;
}
  container.innerHTML = `
    <div class="dashboard">
      <h1>Bienvenue ${state.user.name}</h1>
      <p>Points : ${state.user.points}</p>
      <button id="logoutBtn">Déconnexion</button>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}