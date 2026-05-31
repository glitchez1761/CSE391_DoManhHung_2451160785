const images = [
  {
    title: "Mountain",
    desc: "Beautiful mountain landscape",
    url: "https://picsum.photos/id/10/1200/700"
  },
  {
    title: "Forest",
    desc: "Green forest scenery",
    url: "https://picsum.photos/id/20/1200/700"
  },
  {
    title: "Lake",
    desc: "Calm lake reflection",
    url: "https://picsum.photos/id/30/1200/700"
  },
  {
    title: "Bridge",
    desc: "Modern bridge architecture",
    url: "https://picsum.photos/id/40/1200/700"
  },
  {
    title: "Beach",
    desc: "Sunny beach day",
    url: "https://picsum.photos/id/50/1200/700"
  },
  {
    title: "Road",
    desc: "Road through nature",
    url: "https://picsum.photos/id/60/1200/700"
  },
  {
    title: "City",
    desc: "City skyline",
    url: "https://picsum.photos/id/70/1200/700"
  },
  {
    title: "Flowers",
    desc: "Colorful flowers",
    url: "https://picsum.photos/id/80/1200/700"
  },
  {
    title: "Sunset",
    desc: "Golden sunset",
    url: "https://picsum.photos/id/90/1200/700"
  }
];

const galleryImg = document.getElementById("galleryImg");
const galleryInfo = document.getElementById("galleryInfo");
const galleryStatus = document.getElementById("galleryStatus");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const thumbStrip = document.getElementById("thumbStrip");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");

const galleryFrame = document.getElementById("galleryFrame");

const imgModal = document.getElementById("imgModal");
const imgModalImg = document.getElementById("imgModalImg");
const imgModalCaption = document.getElementById("imgModalCaption");
const imgModalClose = document.getElementById("imgModalClose");

const cmdOverlay = document.getElementById("cmdOverlay");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");

const darkToggle = document.getElementById("darkToggle");

let currentIndex = 0;
let slideshow = null;
let selectedCommand = 0;

function renderImage() {
  const img = images[currentIndex];

  const nextImg = new Image();

  nextImg.onload = () => {

    galleryImg.classList.add("fade");

    setTimeout(() => {

      galleryImg.src = nextImg.src;
      galleryImg.alt = img.title;

      galleryInfo.innerHTML = `
                <h3>${img.title}</h3>
                <p>${img.desc}</p>
            `;

      galleryStatus.textContent =
        `${currentIndex + 1} / ${images.length}`;

      galleryImg.classList.remove("fade");

      updateThumbnails();

    }, 150);
  };

  nextImg.src = img.url;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  renderImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + images.length) % images.length;
  renderImage();
}

function jumpTo(index) {
  currentIndex = index;
  renderImage();
}

function createThumbnails() {
  thumbStrip.innerHTML = "";

  images.forEach((_, index) => {
    const thumb = document.createElement("button");

    thumb.className = "thumb";
    thumb.textContent = index + 1;

    thumb.setAttribute("aria-label", `Ảnh ${index + 1}`);
    thumb.setAttribute("role", "tab");

    thumb.addEventListener("click", () => {
      jumpTo(index);
    });

    thumbStrip.appendChild(thumb);
  });

  updateThumbnails();
}

function updateThumbnails() {
  document.querySelectorAll(".thumb").forEach((thumb, index) => {
    thumb.classList.toggle(
      "active",
      index === currentIndex
    );

    thumb.setAttribute(
      "aria-selected",
      index === currentIndex
    );
  });
}

function startSlideshow() {
  slideshow = setInterval(nextImage, 3000);

  playBtn.classList.add("playing");
  playBtn.setAttribute("aria-pressed", "true");
  playIcon.textContent = "⏸";
}

function stopSlideshow() {
  clearInterval(slideshow);
  slideshow = null;

  playBtn.classList.remove("playing");
  playBtn.setAttribute("aria-pressed", "false");
  playIcon.textContent = "▶";
}

function toggleSlideshow() {
  slideshow
    ? stopSlideshow()
    : startSlideshow();
}

function openModal() {
  imgModal.hidden = false;

  imgModalImg.src = images[currentIndex].url;
  imgModalCaption.textContent =
    images[currentIndex].title;

  imgModalClose.focus();
}

function closeModal() {
  imgModal.hidden = true;
  galleryFrame.focus();
}

galleryFrame.addEventListener("click", openModal);
imgModalClose.addEventListener("click", closeModal);

const commands = [
  {
    icon: "➡️",
    label: "Next Image",
    desc: "Go to next image",
    action: nextImage
  },
  {
    icon: "⬅️",
    label: "Previous Image",
    desc: "Go to previous image",
    action: prevImage
  },
  {
    icon: "▶️",
    label: "Toggle Slideshow",
    desc: "Play or pause slideshow",
    action: toggleSlideshow
  },
  {
    icon: "🌙",
    label: "Toggle Dark Mode",
    desc: "Switch theme",
    action: toggleDarkMode
  }
];

function renderCommands(filter = "") {
  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(
      filter.toLowerCase()
    )
  );

  cmdList.innerHTML = "";

  if (!filtered.length) {
    cmdList.innerHTML =
      `<li class="cmd-empty">No commands found</li>`;
    return;
  }

  filtered.forEach((cmd, index) => {
    const li = document.createElement("li");

    li.className =
      "cmd-item" +
      (index === selectedCommand ? " selected" : "");

    li.innerHTML = `
      <span class="cmd-icon">${cmd.icon}</span>
      <div class="cmd-text">
        <div class="cmd-label">${cmd.label}</div>
        <div class="cmd-desc">${cmd.desc}</div>
      </div>
    `;

    li.addEventListener("click", () => {
      cmd.action();
      closeCommandPalette();
    });

    cmdList.appendChild(li);
  });
}

function openCommandPalette() {
  cmdOverlay.hidden = false;
  selectedCommand = 0;
  renderCommands();
  cmdInput.value = "";

  setTimeout(() => cmdInput.focus(), 50);
}

function closeCommandPalette() {
  cmdOverlay.hidden = true;
}

cmdInput.addEventListener("input", e => {
  selectedCommand = 0;
  renderCommands(e.target.value);
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const active =
    document.body.classList.contains("dark");

  darkToggle.setAttribute(
    "aria-pressed",
    active
  );
}

darkToggle.addEventListener(
  "click",
  toggleDarkMode
);

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

playBtn.addEventListener(
  "click",
  toggleSlideshow
);

document.addEventListener("keydown", e => {

  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openCommandPalette();
    return;
  }

  if (e.key === "Escape") {
    closeModal();
    closeCommandPalette();
    return;
  }

  if (!cmdOverlay.hidden) {

    const items =
      document.querySelectorAll(".cmd-item");

    if (e.key === "ArrowDown") {
      e.preventDefault();

      selectedCommand =
        (selectedCommand + 1) %
        items.length;

      renderCommands(cmdInput.value);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      selectedCommand =
        (selectedCommand - 1 + items.length) %
        items.length;

      renderCommands(cmdInput.value);
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const filtered = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(
          cmdInput.value.toLowerCase()
        )
      );

      if (filtered[selectedCommand]) {
        filtered[selectedCommand].action();
      }

      closeCommandPalette();
    }

    return;
  }

  if (!imgModal.hidden) return;

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    prevImage();
  }

  if (/^[1-9]$/.test(e.key)) {
    const index = Number(e.key) - 1;

    if (index < images.length) {
      jumpTo(index);
    }
  }

  if (e.code === "Space") {
    e.preventDefault();
    toggleSlideshow();
  }
});

createThumbnails();
renderImage();