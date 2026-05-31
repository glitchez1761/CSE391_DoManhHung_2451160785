const usersWidget =
document.getElementById(
    "usersWidget"
);

const randomWidget =
document.getElementById(
    "randomWidget"
);

const dogsWidget =
document.getElementById(
    "dogsWidget"
);

const loadTime =
document.getElementById(
    "loadTime"
);

const globalLoading =
document.getElementById(
    "globalLoading"
);

const refreshBtn =
document.getElementById(
    "refreshBtn"
);

function setWidgetLoading() {

    usersWidget.innerHTML =
    "Loading...";

    randomWidget.innerHTML =
    "Loading...";

    dogsWidget.innerHTML =
    "Loading...";

}

function renderWidgetError(
    element,
    message
){

    element.innerHTML =
    `
    <p style="color:red">
        ${message}
    </p>
    `;

}

function renderUsers(users){

    usersWidget.innerHTML =
    users
    .slice(0,5)
    .map(user => `
        <div class="user-item">
            <strong>${user.name}</strong>
            <br>
            ${user.email}
        </div>
    `)
    .join("");

}

function renderRandomUsers(data){

    randomWidget.innerHTML =
    data.results
    .map(user => `
        <div class="random-user">

            <img
              src="${user.picture.medium}"
            >

            <div>

                <strong>
                ${user.name.first}
                ${user.name.last}
                </strong>

            </div>

        </div>
    `)
    .join("");

}

function renderDogs(data){

    dogsWidget.innerHTML =
    `
    <div class="dogs-grid">

        ${data.message
            .map(img => `
                <img src="${img}">
            `)
            .join("")
        }

    </div>
    `;

}

async function loadDashboard(){

    const startTime =
    performance.now();

    globalLoading
    .classList.remove(
        "hidden"
    );

    setWidgetLoading();

    const results =
    await Promise.allSettled([

        fetch(
            "https://jsonplaceholder.typicode.com/users"
        ).then(r => r.json()),

        fetch(
            "https://randomuser.me/api/?results=5"
        ).then(r => r.json()),

        fetch(
            "https://dog.ceo/api/breeds/image/random/5"
        ).then(r => r.json())

    ]);

    if(
        results[0].status ===
        "fulfilled"
    ){

        renderUsers(
            results[0].value
        );

    }else{

        renderWidgetError(
            usersWidget,
            "Không tải được users"
        );

    }

    if(
        results[1].status ===
        "fulfilled"
    ){

        renderRandomUsers(
            results[1].value
        );

    }else{

        renderWidgetError(
            randomWidget,
            "Không tải được random users"
        );

    }

    if(
        results[2].status ===
        "fulfilled"
    ){

        renderDogs(
            results[2].value
        );

    }else{

        renderWidgetError(
            dogsWidget,
            "Không tải được ảnh chó"
        );

    }

    const duration =
    performance.now()
    - startTime;

    loadTime.textContent =
    `Data loaded in ${duration.toFixed(0)} ms`;

    globalLoading
    .classList.add(
        "hidden"
    );

}

refreshBtn.addEventListener(
    "click",
    loadDashboard
);

loadDashboard();