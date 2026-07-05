/* =====================================================
   UN PEQUEÑO UNIVERSO PARA TI — script.js
   Organizado por secciones. Reemplaza el arreglo `playlist`
   con tus propias canciones dentro de assets/audio/.
===================================================== */

(function () {
  "use strict";

  const isMobile = window.innerWidth < 720;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------
     1. GENERACIÓN DE PARTÍCULAS DE FONDO
  ----------------------------------------------------- */
  function createStars() {
    const layer = document.getElementById("starsLayer");
    const count = prefersReducedMotion ? 40 : isMobile ? 70 : 140;
    const brightIndices = new Set();
    while (brightIndices.size < Math.min(6, Math.floor(count / 20))) {
      brightIndices.add(Math.floor(Math.random() * count));
    }

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const bright = brightIndices.has(i);
      star.className = bright ? "star star--bright" : "star";
      star.style.top = Math.random() * 92 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      star.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + "s";
      if (bright) {
        star.setAttribute("tabindex", "0");
        star.setAttribute("role", "button");
        star.setAttribute("aria-label", "Una estrella brillante. Tócala para descubrir un mensaje.");
        registerInteractive(star, "estrella-" + i, STAR_MESSAGES[Math.floor(Math.random() * STAR_MESSAGES.length)]);
      }
      layer.appendChild(star);
    }
  }

  function createClouds() {
    const layer = document.getElementById("cloudsLayer");
    const count = prefersReducedMotion ? 0 : isMobile ? 2 : 4;
    for (let i = 0; i < count; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      const w = 160 + Math.random() * 220;
      cloud.style.width = w + "px";
      cloud.style.height = w * 0.35 + "px";
      cloud.style.top = 8 + Math.random() * 30 + "%";
      cloud.style.animationDuration = 70 + Math.random() * 50 + "s";
      cloud.style.animationDelay = "-" + Math.random() * 40 + "s";
      layer.appendChild(cloud);
    }
  }

  function createFireflies() {
    const layer = document.getElementById("fireflyLayer");
    const count = prefersReducedMotion ? 0 : isMobile ? 10 : 22;
    for (let i = 0; i < count; i++) {
      const fly = document.createElement("div");
      fly.className = "firefly";
      fly.style.top = 55 + Math.random() * 40 + "%";
      fly.style.left = Math.random() * 100 + "%";
      fly.style.animationDuration = 4 + Math.random() * 4 + "s";
      fly.style.animationDelay = Math.random() * 5 + "s";
      layer.appendChild(fly);
    }
  }

  function createLeaves() {
    const layer = document.getElementById("leafLayer");
    if (prefersReducedMotion) return;
    const variants = ["", "leaf--alt", "leaf--alt2"];
    const count = isMobile ? 10 : 20;
    for (let i = 0; i < count; i++) {
      spawnLeaf(layer, variants, true);
    }
    setInterval(() => {
      if (document.hidden) return;
      spawnLeaf(layer, variants, false);
    }, 1400);
  }

  function spawnLeaf(layer, variants, immediate) {
    const leaf = document.createElement("div");
    leaf.className = "leaf " + variants[Math.floor(Math.random() * variants.length)];
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.setProperty("--drift", (Math.random() * 120 - 60).toFixed(0) + "px");
    const duration = 9 + Math.random() * 8;
    leaf.style.animationDuration = duration + "s";
    leaf.style.animationDelay = immediate ? "-" + (Math.random() * duration).toFixed(2) + "s" : "0s";
    layer.appendChild(leaf);
    setTimeout(() => leaf.remove(), (duration + 1) * 1000 + (immediate ? duration * 1000 : 0));
  }

  /* -----------------------------------------------------
     2. CONSTELACIÓN FINAL (dibujo en forma de corazón)
  ----------------------------------------------------- */
  const HEART_POINTS = [
    [200, 60], [160, 30], [110, 40], [90, 90], [110, 140],
    [200, 210], [290, 140], [310, 90], [290, 40], [240, 30], [200, 60]
  ];

  function buildConstellation() {
    const starsGroup = document.getElementById("constellationStars");
    const linesGroup = document.getElementById("constellationLines");
    HEART_POINTS.forEach(([x, y]) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
      c.setAttribute("r", 3);
      starsGroup.appendChild(c);
    });
    for (let i = 0; i < HEART_POINTS.length - 1; i++) {
      const [x1, y1] = HEART_POINTS[i];
      const [x2, y2] = HEART_POINTS[i + 1];
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      linesGroup.appendChild(line);
    }
  }

  function revealConstellation() {
    document.getElementById("constellation").classList.add("is-visible");
  }

  /* -----------------------------------------------------
     3. MENSAJES POÉTICOS FLOTANTES
  ----------------------------------------------------- */
  const STAR_MESSAGES = [
    "Pedí un deseo una vez. Ahora simplemente disfruto haberte encontrado.",
    "Cada estrella que ves es una razón más para quererte.",
    "Si contara las estrellas, no alcanzarían para contar lo que siento."
  ];

  const MESSAGES = {
    neptune: "Mi amor es tan inmenso y esperanzador como el azul de este planeta.",
    moon: "Siempre hay una luz esperándome cuando pienso en ti.",
    treeLeft: "Cada día contigo es una nueva raíz que crece.",
    lantern: "Tu recuerdo mantiene esta pequeña luz encendida en mí.",
    foxSitting: "Como un zorro encuentra el camino a casa, yo encontré el mío cuando te conocí.",
    foxCurled: "Quiero descansar mi cabeza sabiendo que estás cerca.",
    foxKit: "Los inicios pequeños, como este, se vuelven los más grandes recuerdos.",
    flowerCluster: "Las estaciones cambian, pero lo que siento por ti permanece.",
    river: "Quiero recorrer cada etapa de la vida contigo."
  };

  let discoveredTotal = 0;
  const discovered = new Set();
  const TOTAL_TARGETS = 14;
  const countLabel = document.getElementById("discoveryCount");

  function registerInteractive(el, id, message) {
    const fire = (evt) => {
      evt.preventDefault();
      showFloatingMessage(el, message);
      markDiscovered(id);
    };
    el.addEventListener("click", fire);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") fire(e);
    });
  }

  function markDiscovered(id) {
    if (discovered.has(id)) return;
    discovered.add(id);
    discoveredTotal = discovered.size;
    if (countLabel) {
      countLabel.textContent = `${Math.min(discoveredTotal, TOTAL_TARGETS)} de ${TOTAL_TARGETS} estrellas encontradas`;
    }
    if (discoveredTotal === Math.ceil(TOTAL_TARGETS / 2)) {
      revealConstellation();
    }
    if (discoveredTotal >= TOTAL_TARGETS) {
      setTimeout(showFinale, 900);
    }
  }

  function showFloatingMessage(el, text) {
    const layer = document.getElementById("messageLayer");
    const rect = el.getBoundingClientRect();
    const bubble = document.createElement("div");
    bubble.className = "floating-msg";
    bubble.textContent = text;
    bubble.style.left = Math.min(Math.max(rect.left + rect.width / 2 - 120, 10), window.innerWidth - 250) + "px";
    bubble.style.top = Math.max(rect.top - 70, 10) + window.scrollY + "px";
    layer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 4200);
  }

  function showFinale() {
    const finale = document.getElementById("finale");
    finale.hidden = false;
    document.getElementById("finaleClose").focus();
  }

  function wireStaticInteractives() {
    registerInteractive(document.getElementById("neptune"), "neptune", MESSAGES.neptune);
    registerInteractive(document.getElementById("moon"), "moon", MESSAGES.moon);
    registerInteractive(document.getElementById("treeLeft"), "treeLeft", MESSAGES.treeLeft);
    registerInteractive(document.getElementById("lantern"), "lantern", MESSAGES.lantern);
    registerInteractive(document.getElementById("foxSitting"), "foxSitting", MESSAGES.foxSitting);
    registerInteractive(document.getElementById("foxCurled"), "foxCurled", MESSAGES.foxCurled);
    registerInteractive(document.getElementById("foxKit"), "foxKit", MESSAGES.foxKit);
    registerInteractive(document.getElementById("flowerCluster"), "flowerCluster", MESSAGES.flowerCluster);

    const riverPath = document.querySelector(".river__water");
    riverPath.style.pointerEvents = "auto";
    riverPath.style.cursor = "pointer";
    riverPath.setAttribute("tabindex", "0");
    riverPath.setAttribute("role", "button");
    riverPath.setAttribute("aria-label", "El río. Tócalo para descubrir un mensaje.");
    registerInteractive(riverPath, "river", MESSAGES.river);
  }

  document.getElementById("finaleClose").addEventListener("click", () => {
    document.getElementById("finale").hidden = true;
  });

  /* -----------------------------------------------------
     4. REPRODUCTOR DE MÚSICA
     Reemplaza este arreglo con tus propias pistas.
     Coloca los archivos .mp3 en assets/audio/
  ----------------------------------------------------- */
  const playlist = [
    { title: "TE AMO", artist: "Sebas", src: "assets/audio/musica.mp3" },
    // { title: "Otra canción", artist: "Artista", src: "assets/audio/cancion-2.mp3" },
  ];
  let trackIndex = 0;

  const audio = document.getElementById("audio");
  const playerTitle = document.getElementById("playerTitle");
  const playerArtist = document.getElementById("playerArtist");
  const playBtn = document.getElementById("playerPlay");
  const range = document.getElementById("playerRange");
  const currentEl = document.getElementById("playerCurrent");
  const durationEl = document.getElementById("playerDuration");
  const volumeInput = document.getElementById("playerVolume");

  function loadTrack(i) {
    const track = playlist[i];
    if (!track) return;
    audio.src = track.src;
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
  }

  function formatTime(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function togglePlay() {
    if (!audio.src) return;
    if (audio.paused) {
      audio.play().catch(() => {
        playerArtist.textContent = "Coloca tu archivo .mp3 en assets/audio/";
      });
      playBtn.textContent = "❙❙";
      playBtn.setAttribute("aria-label", "Pausar");
    } else {
      audio.pause();
      playBtn.textContent = "▶";
      playBtn.setAttribute("aria-label", "Reproducir");
    }
  }

  playBtn.addEventListener("click", togglePlay);
  document.getElementById("playerNext").addEventListener("click", () => {
    trackIndex = (trackIndex + 1) % playlist.length;
    loadTrack(trackIndex);
    audio.play().catch(() => {});
  });
  document.getElementById("playerPrev").addEventListener("click", () => {
    trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(trackIndex);
    audio.play().catch(() => {});
  });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    range.value = (audio.currentTime / audio.duration) * 100;
    currentEl.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });
  range.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (range.value / 100) * audio.duration;
  });
  volumeInput.addEventListener("input", () => {
    audio.volume = volumeInput.value / 100;
  });
  audio.volume = 0.7;

  const player = document.getElementById("player");
  document.getElementById("playerToggle").addEventListener("click", () => {
    const willMinimize = !player.classList.contains("is-minimized");
    player.classList.toggle("is-minimized");
    document.getElementById("playerToggle").setAttribute("aria-expanded", String(!willMinimize));
  });

  loadTrack(trackIndex);

  /* -----------------------------------------------------
     5. INICIO DEL VIAJE
  ----------------------------------------------------- */
  document.getElementById("startJourney").addEventListener("click", () => {
    const hero = document.getElementById("hero");
    hero.classList.add("is-leaving");
    togglePlay();
    setTimeout(() => {
      document.getElementById("letterSection").scrollIntoView({ behavior: "smooth" });
    }, 500);
  });

  /* -----------------------------------------------------
     6. INICIALIZACIÓN
  ----------------------------------------------------- */
  createStars();
  createClouds();
  createFireflies();
  createLeaves();
  buildConstellation();
  wireStaticInteractives();
})();
