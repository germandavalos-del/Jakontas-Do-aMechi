const dishes = [
  {
    name: "Thimpu de Res Tostado",
    description: "Especialidad de la casa.",
    price: "Bs 25",
    image: "images/thimpu-tostado.jpg",
  },
  {
    name: "Caldo de Kawi",
    description: "Especialidad de la casa.",
    price: "Bs 25",
    image: "images/kawi-en-caldo.jpeg",
  },
  {
    name: "Thimpu de Res",
    description: "Especialidad de la casa.",
    price: "Bs 25",
    image: "images/thimpu-sin-tostar.jpeg",
  },
  {
    name: "Jakonta",
    description: "Especialidad de la casa.",
    price: "Bs 25",
    image: "images/jakonta.jpg",
  },
];

const grid = document.getElementById("menu-grid");
const promoStatus = document.getElementById("promo-status");
const promoModal = document.getElementById("promo-modal");
const openPromosBtn = document.getElementById("open-promos");
const closePromosBtn = document.getElementById("close-promos");
const promoBackdrop = document.getElementById("promo-backdrop");
const confettiLayer = document.getElementById("confetti-layer");

dishes.forEach((dish, index) => {
  const card = document.createElement("article");
  card.className = "dish-card";
  card.style.animationDelay = `${index * 120}ms`;

  const imageBlock = dish.image
    ? `<img src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.outerHTML='<div class=&quot;dish-photo-placeholder&quot;>Espacio para foto<br />${dish.name}<br /><small>${dish.image}</small></div>'" />`
    : `<div class="dish-photo-placeholder">Espacio para foto<br />${dish.name}</div>`;

  card.innerHTML = `
    ${imageBlock}
    <h3>${dish.name}</h3>
    <p>${dish.description}</p>
    <span class="price">${dish.price}</span>
  `;

  grid.appendChild(card);
});

const promoDays = [2, 4]; // Martes y jueves
const dayNames = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
const now = new Date();
const today = now.getDay();

if (promoStatus) {
  if (promoDays.includes(today)) {
    promoStatus.textContent = "Hoy hay 2x1 en platos seleccionados";
    promoStatus.classList.add("active");
  } else {
    const nextPromoDay = promoDays.find((d) => d > today) ?? promoDays[0];
    const daysUntil = nextPromoDay > today ? nextPromoDay - today : 7 - today + nextPromoDay;
    const textNext = daysUntil === 1 ? "mañana" : `en ${daysUntil} días`;
    promoStatus.textContent = `Próxima promo: ${dayNames[nextPromoDay]} (${textNext})`;
    promoStatus.classList.remove("active");
  }
}

function launchConfetti() {
  if (!confettiLayer) return;
  confettiLayer.innerHTML = "";

  const colors = ["#d7133d", "#00a829", "#f7d676", "#ff8cab", "#ffffff"];
  const pieces = 90;

  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 320}ms`;
    piece.style.animationDuration = `${900 + Math.random() * 900}ms`;
    piece.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }

  setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, 2200);
}

function openPromos() {
  if (!promoModal) return;
  promoModal.classList.add("is-open");
  promoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  launchConfetti();
}

function closePromos() {
  if (!promoModal) return;
  promoModal.classList.remove("is-open");
  promoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (openPromosBtn) {
  openPromosBtn.addEventListener("click", openPromos);
}

if (closePromosBtn) {
  closePromosBtn.addEventListener("click", closePromos);
}

if (promoBackdrop) {
  promoBackdrop.addEventListener("click", closePromos);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && promoModal?.classList.contains("is-open")) {
    closePromos();
  }
});
