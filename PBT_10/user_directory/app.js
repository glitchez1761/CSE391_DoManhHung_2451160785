const api = {

    baseURL:
    "https://jsonplaceholder.typicode.com",

    async getUsers() {

        const res =
        await fetch(
            `${this.baseURL}/users`
        );

        if(!res.ok)
            throw new Error(
                "Không tải được users"
            );

        return res.json();
    },

    async createUser(data) {

        const res =
        await fetch(
            `${this.baseURL}/users`,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(data)
            }
        );

        return res.json();
    },

    async updateUser(id,data){

        const res =
        await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(data)
            }
        );

        return res.json();
    },

    async deleteUser(id){

        await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"DELETE"
            }
        );
    }
};

const ui = {

    showLoading(){
        loading.classList.remove("hidden");
    },

    hideLoading(){
        loading.classList.add("hidden");
    },

    showToast(message){

        toast.textContent =
        message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        },3000);
    },

    renderUsers(users){

        usersContainer.innerHTML = "";

        users.forEach(user => {

            usersContainer.insertAdjacentHTML(
                "beforeend",
                `
                <div class="user-card">

                    <h3>${user.name}</h3>

                    <p>${user.email}</p>

                    <p>${user.phone}</p>

                    <div class="card-actions">

                        <button
                          onclick="editUser(${user.id})">
                          Edit
                        </button>

                        <button
                          onclick="removeUser(${user.id})">
                          Delete
                        </button>

                    </div>

                </div>
                `
            );

        });

    }

};

const usersContainer =
document.getElementById(
    "usersContainer"
);

const loading =
document.getElementById(
    "loading"
);

const modal =
document.getElementById(
    "modal"
);

const userForm =
document.getElementById(
    "userForm"
);

const formTitle =
document.getElementById(
    "formTitle"
);

const searchInput =
document.getElementById(
    "searchInput"
);

const toast =
document.getElementById(
    "toast"
);

let users = [];

let editingId = null;

async function loadUsers(){

    try{

        ui.showLoading();

        users =
        await api.getUsers();

        ui.renderUsers(users);

    }catch(error){

        ui.showToast(
            error.message
        );

    }finally{

        ui.hideLoading();

    }

}

document
.getElementById("addBtn")
.addEventListener("click",()=>{

    editingId = null;

    formTitle.textContent =
    "Thêm User";

    userForm.reset();

    modal.classList.remove(
        "hidden"
    );

});

userForm.addEventListener(
"submit",
async e=>{

    e.preventDefault();

    const data = {

        name:
        document.getElementById(
            "name"
        ).value,

        email:
        document.getElementById(
            "email"
        ).value,

        phone:
        document.getElementById(
            "phone"
        ).value
    };

    if(editingId){

        const updated =
        await api.updateUser(
            editingId,
            data
        );

        users =
        users.map(user =>
            user.id === editingId
            ? updated
            : user
        );

        ui.showToast(
            "Cập nhật thành công"
        );

    }else{

        const created =
        await api.createUser(
            data
        );

        created.id =
        Date.now();

        users.unshift(
            created
        );

        ui.showToast(
            "Thêm thành công"
        );
    }

    ui.renderUsers(users);

    modal.classList.add(
        "hidden"
    );

});

function editUser(id){

    const user =
    users.find(
        u => u.id === id
    );

    editingId = id;

    formTitle.textContent =
    "Chỉnh sửa User";

    document.getElementById(
        "name"
    ).value = user.name;

    document.getElementById(
        "email"
    ).value = user.email;

    document.getElementById(
        "phone"
    ).value = user.phone;

    modal.classList.remove(
        "hidden"
    );
}

async function removeUser(id){

    const confirmed =
    confirm(
        "Xóa user này?"
    );

    if(!confirmed) return;

    await api.deleteUser(id);

    users =
    users.filter(
        user =>
        user.id !== id
    );

    ui.renderUsers(users);

    ui.showToast(
        "Đã xóa"
    );
}

searchInput
.addEventListener(
"input",
e=>{

    const keyword =
    e.target.value
    .toLowerCase();

    const filtered =
    users.filter(user =>

        user.name
        .toLowerCase()
        .includes(keyword)

        ||

        user.email
        .toLowerCase()
        .includes(keyword)

    );

    ui.renderUsers(
        filtered
    );

});

document
.getElementById(
    "cancelBtn"
)
.addEventListener(
    "click",
    ()=>{

        modal.classList.add(
            "hidden"
        );

    }
);

loadUsers();