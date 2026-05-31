const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const weatherCard =
document.getElementById("weatherCard");

const loading =
document.getElementById("loading");

const errorBox =
document.getElementById("error");

const historyContainer =
document.getElementById("history");

const cityName =
document.getElementById("cityName");

const temperature =
document.getElementById("temperature");

const humidity =
document.getElementById("humidity");

const description =
document.getElementById("description");

const weatherIcon =
document.getElementById("weatherIcon");

const HISTORY_KEY =
"weather-history";

function showLoading() {

    loading.classList.remove("hidden");

    weatherCard.classList.add("hidden");

    errorBox.classList.add("hidden");
}

function showError(message) {

    loading.classList.add("hidden");

    weatherCard.classList.add("hidden");

    errorBox.classList.remove("hidden");

    errorBox.textContent = message;
}

function showWeather() {

    loading.classList.add("hidden");

    errorBox.classList.add("hidden");

    weatherCard.classList.remove("hidden");
}

async function searchWeather(city) {

    if (!city.trim()) return;

    try {

        showLoading();

        const response =
        await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if (!response.ok) {
            throw new Error(
                "Không thể lấy dữ liệu."
            );
        }

        const data =
        await response.json();

        const current =
        data.current_condition[0];

        cityName.textContent =
        city;

        temperature.textContent =
        `🌡 Nhiệt độ: ${current.temp_C} °C`;

        humidity.textContent =
        `💧 Độ ẩm: ${current.humidity}%`;

        description.textContent =
        `☁ ${current.weatherDesc[0].value}`;

        weatherIcon.src =
        current.weatherIconUrl[0].value;

        showWeather();

        saveHistory(city);

    } catch (error) {

        showError(
            "Không tìm thấy thành phố hoặc mất kết nối mạng."
        );
    }
}


function getHistory() {

    return JSON.parse(
        localStorage.getItem(HISTORY_KEY)
    ) || [];
}

function saveHistory(city) {

    let history =
    getHistory();

    history =
    history.filter(
        item =>
        item.toLowerCase() !==
        city.toLowerCase()
    );

    history.unshift(city);

    history =
    history.slice(0,5);

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory() {

    const history =
    getHistory();

    historyContainer.innerHTML = "";

    history.forEach(city => {

        const btn =
        document.createElement("button");

        btn.textContent = city;

        btn.addEventListener(
            "click",
            () => searchWeather(city)
        );

        historyContainer.appendChild(btn);

    });
}

searchBtn.addEventListener(
    "click",
    () => {

        searchWeather(
            cityInput.value.trim()
        );

    }
);

cityInput.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            searchWeather(
                cityInput.value.trim()
            );

        }

    }
);

renderHistory();

searchWeather("Hanoi");