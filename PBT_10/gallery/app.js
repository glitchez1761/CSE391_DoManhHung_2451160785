const gallery =
    document.getElementById("gallery");

const loading =
    document.getElementById("loading");

const trigger =
    document.getElementById("load-trigger");

const modal =
    document.getElementById("modal");

const modalImg =
    document.getElementById("modalImg");

const closeBtn =
    document.getElementById("closeBtn");

const errorBox =
    document.getElementById("error");

let page = 1;

let isLoading = false;

let hasMore = true;

async function loadPhotos() {

    if (isLoading || !hasMore)
        return;

    try {

        isLoading = true;

        loading.classList.remove(
            "hidden"
        );

        errorBox.classList.add("hidden");

        const response =
            await fetch(
                `https://picsum.photos/v2/list?page=${page}&limit=20`
            );

        if (!response.ok)
            throw new Error();

        const photos =
            await response.json();

        if (photos.length === 0) {

            hasMore = false;

            return;
        }

        renderPhotos(photos);

        page++;

    }
    catch (error) {

        console.error(error);

        errorBox.textContent =
            "❌ Không tải được ảnh";

        errorBox.classList.remove(
            "hidden"
        );

    }
    finally {

        loading.classList.add(
            "hidden"
        );

        isLoading = false;

    }

}

function renderPhotos(photos) {

    photos.forEach(photo => {

        const div =
            document.createElement("div");

        div.className =
            "photo";

        div.innerHTML =
            `
        <img
            data-src="${photo.download_url}"
            alt="${photo.author}"
        >
        `;

        const img =
            div.querySelector("img");

        lazyObserver.observe(img);

        div.addEventListener(
            "click",
            () => openModal(
                photo.download_url
            )
        );

        gallery.appendChild(div);

    });

}

const lazyObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img =
                    entry.target;

                img.src =
                    img.dataset.src;

                lazyObserver.unobserve(
                    img
                );

            }

        });

    },
        {
            threshold: 0.1
        });

const infiniteObserver =
    new IntersectionObserver(entries => {

        if (
            entries[0].isIntersecting
        ) {

            loadPhotos();

        }

    });

infiniteObserver.observe(
    trigger
);

function openModal(src) {

    modalImg.src = src;

    modal.classList.remove(
        "hidden"
    );

}

function closeModal() {

    modal.classList.add(
        "hidden"
    );

}

closeBtn.addEventListener(
    "click",
    closeModal
);

modal.addEventListener(
    "click",
    e => {

        if (e.target === modal) {

            closeModal();

        }

    }
);

errorBox.textContent = "Không tải được ảnh";

loadPhotos();