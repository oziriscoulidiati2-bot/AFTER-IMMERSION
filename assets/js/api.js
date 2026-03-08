const USE_MOCK = true;
const API_BASE_URL = "http://localhost:5000/api";

export async function fetchAnnonces() {
  if (USE_MOCK) {
    return [
      { id: 1, title: "Nouvelle promotion", content: "Passage au grade supérieur validé." },
      { id: 2, title: "Médaille spéciale", content: "Attribution exceptionnelle." }
    ];
  }

  const res = await fetch(`${API_BASE_URL}/annonces`);
  return res.json();
}

export async function fetchTopSoldats() {
  if (USE_MOCK) {
    return [
      { name: "Soldat Kaboré", points: 950 },
      { name: "Soldat Ouédraogo", points: 870 }
    ];
  }

  const res = await fetch(`${API_BASE_URL}/tops`);
  return res.json();
}

export async function fetchCorps() {
  if (USE_MOCK) {
    return [
      { name: "Infanterie" },
      { name: "Génie Militaire" }
    ];
  }

  const res = await fetch(`${API_BASE_URL}/corps`);
  return res.json();
}

