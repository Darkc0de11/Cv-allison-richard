/* ============================================================
   CV_DATA — modifiez uniquement ce qui est entre guillemets " "
   ============================================================ */
const CV_DATA = {
  identite: {
    prenomNom: "Camille Rivière",
    initiales: "CR",
    titre: "Webdesigner &amp; Graphiste",
    localisation: "Lyon, France",
    disponibilite: "Disponible en freelance",
    telephone: "+33 6 12 34 56 78",
  },

  apropos: {
    texte: "Webdesigner et graphiste passionnée par les identités visuelles qui racontent une histoire. Je conçois des interfaces et des supports print qui allient esthétique soignée et expérience utilisateur fluide, du premier croquis jusqu'à l'intégration finale. J'aime autant travailler la typographie d'un logo que la grille d'un site responsive.",
    tags: ["UI Design", "Direction artistique", "Branding", "Motion léger", "Design responsive"],
  },

  experiences: [
    {
      poste: "Webdesigner freelance",
      entreprise: "Studio indépendant",
      periode: "2022 — Aujourd'hui",
      points: [
        "Conception d'identités visuelles complètes (logo, charte graphique, déclinaisons) pour une dizaine de clients",
        "Design et intégration de sites vitrines et e-commerce responsives",
        "Direction artistique de campagnes visuelles pour réseaux sociaux",
      ],
    },
    {
      poste: "Graphiste UI/UX",
      entreprise: "Agence Pixel &amp; Sens",
      periode: "2019 — 2022",
      points: [
        "Maquettage d'applications mobiles et web sur Figma, du wireframe au prototype interactif",
        "Création de systèmes de design (design systems) réutilisables pour trois clients grands comptes",
        "Collaboration quotidienne avec les équipes développement pour garantir la fidélité des intégrations",
      ],
    },
    {
      poste: "Graphiste junior",
      entreprise: "Imprimerie Nova",
      periode: "2017 — 2019",
      points: [
        "Réalisation de supports print (plaquettes, packaging, affiches) en respect des chartes clients",
        "Préparation de fichiers pour impression offset et numérique",
      ],
    },
  ],

  competences: [
    {
      categorie: "Design &amp; UI",
      items: [
        { nom: "Figma", niveau: 95 },
        { nom: "Adobe Photoshop", niveau: 90 },
        { nom: "Adobe Illustrator", niveau: 88 },
        { nom: "Adobe InDesign", niveau: 75 },
      ],
    },
    {
      categorie: "Web &amp; intégration",
      items: [
        { nom: "HTML / CSS", niveau: 80 },
        { nom: "Design responsive", niveau: 85 },
        { nom: "Prototypage interactif", niveau: 88 },
        { nom: "Accessibilité (WCAG)", niveau: 65 },
      ],
    },
    {
      categorie: "Savoir-être",
      tags: ["Créativité", "Sens du détail", "Écoute client", "Travail d'équipe", "Gestion de projet"],
    },
  ],

  formations: [
    {
      diplome: "Master Design Graphique &amp; Numérique",
      ecole: "École de Design de Lyon",
      periode: "2015 — 2017",
      detail: "Spécialisation identité visuelle et design d'interface.",
    },
    {
      diplome: "BTS Communication Visuelle",
      ecole: "Lycée des Arts Appliqués",
      periode: "2013 — 2015",
      detail: "Option graphisme et multimédia.",
    },
  ],

  langues: [
    { nom: "Français", niveau: "Langue maternelle" },
    { nom: "Anglais", niveau: "Courant (C1)" },
    { nom: "Espagnol", niveau: "Intermédiaire (B1)" },
  ],

  contact: {
    email: "jessesteven26@gmail.com",
    texte: "Un projet en tête ? Discutons-en autour d'un café virtuel ou d'un brief détaillé.",
    liens: [
      { label: "Email", type: "mail", url: "mailto:jessesteven26@gmail.com" },
      { label: "Téléphone", type: "phone", url: "tel:+33612345678" },
      { label: "LinkedIn", type: "linkedin", url: "#" },
      { label: "Portfolio", type: "globe", url: "#" },
    ],
  },
};

/* ============================================================
   Rendu — vous n'avez normalement rien à modifier ci-dessous
   ============================================================ */
const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6Z"></path><path d="m22 6-10 7L2 6"></path></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
};

function renderHero() {
  const d = CV_DATA.identite;
  const hero = document.querySelector(".hero");
  hero.innerHTML = `
    <div class="avatar">${d.initiales}</div>
    <div>
      <h1 class="hero-name">${d.prenomNom.split(" ").slice(0, -1).join(" ")} <span class="accent">${d.prenomNom.split(" ").slice(-1)}</span></h1>
      <p class="hero-title">${d.titre}</p>
      <svg class="hero-flourish" viewBox="0 0 132 20" aria-hidden="true">
        <path d="M2 10 C30 -2 40 20 66 10 C92 0 102 20 130 10" fill="none" stroke="url(#flourishGradient)" stroke-width="1.6" stroke-linecap="round"></path>
        <circle cx="66" cy="10" r="2.4" fill="url(#flourishGradient)"></circle>
      </svg>
      <div class="hero-meta">
        <span>${ICONS.pin}${d.localisation}</span>
        <span><span class="status-dot"></span>${d.disponibilite}</span>
      </div>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#contact">${ICONS.mail}Me contacter</a>
        <button class="btn btn-ghost" type="button" onclick="window.print()">Télécharger en PDF</button>
      </div>
    </div>
  `;
}

function renderApropos() {
  document.getElementById("apropos-title").textContent = CV_DATA.identite.prenomNom.split(" ")[0] + ", en quelques mots";
  const card = document.querySelector(".about-card");
  card.innerHTML = `
    <p>${CV_DATA.apropos.texte}</p>
    <div class="about-tags">${CV_DATA.apropos.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
  `;
}

function renderExperience() {
  const list = document.getElementById("experience-list");
  list.innerHTML = CV_DATA.experiences.map(exp => `
    <div class="tl-item" data-reveal>
      <span class="tl-dot"></span>
      <div class="tl-card glass">
        <div class="tl-head">
          <span class="tl-role">${exp.poste}</span>
          <span class="tl-period">${exp.periode}</span>
        </div>
        <div class="tl-company">${exp.entreprise}</div>
        <ul class="tl-points">${exp.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    </div>
  `).join("");
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = CV_DATA.competences.map(cat => `
    <div class="skill-card glass" data-reveal>
      <h3>${cat.categorie}</h3>
      ${
        cat.items
          ? cat.items.map(it => `
            <div class="skill-row">
              <div class="skill-row-top"><span>${it.nom}</span></div>
              <div class="skill-bar"><div class="skill-bar-fill" data-level="${it.niveau}"></div></div>
            </div>
          `).join("")
          : `<div class="soft-tags">${cat.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>`
      }
    </div>
  `).join("");
}

function renderFormation() {
  const eduList = document.getElementById("education-list");
  eduList.innerHTML = CV_DATA.formations.map(f => `
    <div class="edu-item glass" data-reveal>
      <div class="edu-top">
        <span class="edu-degree">${f.diplome}</span>
        <span class="edu-period">${f.periode}</span>
      </div>
      <div class="edu-school">${f.ecole}</div>
      <div class="edu-detail">${f.detail}</div>
    </div>
  `).join("");

  const langList = document.getElementById("lang-list");
  langList.innerHTML = CV_DATA.langues.map(l => `
    <div class="lang-row">
      <span>${l.nom}</span>
      <span class="lang-level">${l.niveau}</span>
    </div>
  `).join("");
}

function renderContact() {
  document.getElementById("contact-title").textContent = "Travaillons ensemble";
  document.getElementById("contact-sub").textContent = CV_DATA.contact.texte;
  const grid = document.getElementById("contact-grid");
  grid.innerHTML = CV_DATA.contact.liens.map(l => `
    <a class="contact-pill" href="${l.url}" target="${l.url.startsWith('http') ? '_blank' : '_self'}" rel="noopener">
      ${ICONS[l.type] || ""}${l.label}
    </a>
  `).join("");
  document.getElementById("footer-text").textContent = `${CV_DATA.identite.prenomNom} — CV mis à jour en ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}`;
}

renderHero();
renderApropos();
renderExperience();
renderSkills();
renderFormation();
renderContact();

/* ---------- Reveal au scroll ---------- */
const revealTargets = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll(".skill-bar-fill").forEach(b => { b.style.width = b.dataset.level + "%"; });
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(t => io.observe(t));

/* ---------- Navigation active au scroll ---------- */
const navLinks = document.querySelectorAll(".topbar nav a");
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href")));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = "#" + entry.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && navObserver.observe(s));

/* ---------- Thème ---------- */
const themeBtn = document.getElementById("themeBtn");
function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr) return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  readAccentColors();
});

/* ---------- Impression ---------- */
document.getElementById("printBtn").addEventListener("click", () => window.print());

/* ---------- Retour en haut ---------- */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > window.innerHeight * 0.6);
}, { passive: true });

/* ============================================================
   Scène magique : particules ambiantes en continu
   + éclairs de lame (traînée de lumière, sans lame visible)
   ============================================================ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let ACCENTS = ["255,95,168", "138,92,245", "63,157,255"];
function readAccentColors() {
  const style = getComputedStyle(document.documentElement);
  const toRgb = (hex) => {
    const h = hex.trim().replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  };
  try {
    ACCENTS = [
      toRgb(style.getPropertyValue("--accent-pink")),
      toRgb(style.getPropertyValue("--accent-violet")),
      toRgb(style.getPropertyValue("--accent-blue")),
    ];
  } catch (e) { /* garde les valeurs par défaut */ }
}
readAccentColors();

(function vfxScene() {
  const canvas = document.getElementById("vfx");
  const ctx = canvas.getContext("2d");
  let w, h, particles, slashes = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.round((w * h) / 24000);
    particles = Array.from({ length: count }, spawnParticle);
  }

  function spawnParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.3 + 0.08,
      drift: Math.random() * 0.5 - 0.25,
      color: ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
      alpha: Math.random() * 0.45 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
    };
  }

  function spawnSlash() {
    const margin = 80;
    const startX = Math.random() * w;
    const startY = Math.random() * h * 0.7;
    const angle = Math.PI / 5 + Math.random() * (Math.PI / 6);
    const length = Math.min(w, h) * (0.35 + Math.random() * 0.25);
    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;
    const bow = (Math.random() - 0.5) * 60;
    const midX = (startX + endX) / 2 - Math.sin(angle) * bow;
    const midY = (startY + endY) / 2 + Math.cos(angle) * bow;
    slashes.push({
      x0: startX, y0: startY, cx: midX, cy: midY, x1: endX, y1: endY,
      color: ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
      start: performance.now(),
      duration: 850,
    });
    if (slashes.length > 4) slashes.shift();
  }

  function bezierPoint(t, p0, p1, p2) {
    const mt = 1 - t;
    return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2;
  }

  function drawSlash(s, now) {
    const t = (now - s.start) / s.duration;
    if (t > 1) return false;
    const drawT = Math.min(1, t / 0.32);
    const fadeT = t < 0.32 ? 1 : Math.max(0, 1 - (t - 0.32) / 0.68);

    ctx.save();
    ctx.globalAlpha = fadeT;
    ctx.strokeStyle = `rgb(${s.color})`;
    ctx.shadowColor = `rgb(${s.color})`;
    ctx.shadowBlur = 18;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    const steps = 26;
    for (let i = 0; i <= steps; i++) {
      const segT = (i / steps) * drawT;
      if (segT > drawT) break;
      const x = bezierPoint(segT, s.x0, s.cx, s.x1);
      const y = bezierPoint(segT, s.y0, s.cy, s.y1);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (t > 0.22 && t < 0.5) {
      const tipX = bezierPoint(drawT, s.x0, s.cx, s.x1);
      const tipY = bezierPoint(drawT, s.y0, s.cy, s.y1);
      const burst = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 26);
      burst.addColorStop(0, `rgba(${s.color},0.55)`);
      burst.addColorStop(1, `rgba(${s.color},0)`);
      ctx.fillStyle = burst;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 26, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return true;
  }

  function draw(now) {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      const twinkle = 0.6 + Math.sin(p.twinklePhase + now * 0.0015) * 0.4;
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha * twinkle})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (!prefersReducedMotion) {
        p.y -= p.speed;
        p.x += p.drift * 0.15;
        if (p.y < -10) Object.assign(p, spawnParticle(), { y: h + 10 });
      }
    });

    slashes = slashes.filter(s => drawSlash(s, now));

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);

  if (!prefersReducedMotion) {
    setInterval(spawnSlash, 6500 + Math.random() * 2500);
    setTimeout(spawnSlash, 1800);
  }
})();
