document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("danh-sach");
    const searchInput = document.querySelector(".o-tim");

    let currentPage = 1;
    const perPage = 5;
    let currentSort = "asc"; 

    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    let allUsers = getUsers();
    let filteredUsers = [...allUsers];

  
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();

        filteredUsers = allUsers.filter(u =>
            u.name.toLowerCase().includes(keyword) ||
            u.email.toLowerCase().includes(keyword)
        );

        currentPage = 1;
        render();
    });

    const sortBtn = document.querySelector(".tieu-de-cot");

    sortBtn.addEventListener("click", function () {
        currentSort = currentSort === "asc" ? "desc" : "asc";

        filteredUsers.sort((a, b) => {
            if (currentSort === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        render();
    });

    function renderPagination(total) {
        const pagination = document.querySelector(".phan-trang");
        pagination.innerHTML = "";

        let totalPages = Math.ceil(total / perPage);

        pagination.innerHTML += `
            <a href="#" class="trang-so nut-ke" id="prev">← Previous</a>
        `;

        for (let i = 1; i <= totalPages; i++) {
            pagination.innerHTML += `
                <a href="#" class="trang-so ${i === currentPage ? "dang-mo" : ""}" data-page="${i}">${i}</a>
            `;
        }

        pagination.innerHTML += `
            <a href="#" class="trang-so nut-ke" id="next">Next →</a>
        `;

        document.querySelectorAll(".trang-so[data-page]").forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                currentPage = Number(this.dataset.page);
                render();
            };
        });

        document.getElementById("prev").onclick = function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                render();
            }
        };

        document.getElementById("next").onclick = function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                render();
            }
        };
    }

    function render() {
        table.innerHTML = "";

        let start = (currentPage - 1) * perPage;
        let pageData = filteredUsers.slice(start, start + perPage);

        pageData.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="user-the">
                        <img src="https://i.pravatar.cc/150?u=${user.id}" class="anh-tron">
                        <div>
                            <span class="ten-chinh">${user.name}</span>
                            <span class="ten-phu">User</span>
                        </div>
                    </div>
                </td>
                <td><span class="trang-thai">${user.status}</span></td>
                <td class="mail">${user.email}</td>
                <td>
                    <a href="#" class="link-hanh-dong1" onclick="blockUser(${user.id})">Block</a>
                    <a href="#" class="link-hanh-dong" onclick="unblockUser(${user.id})">Unblock</a>
                </td>
            `;

            table.appendChild(row);
        });

        renderPagination(filteredUsers.length);
    }

    window.blockUser = function (id) {
        let users = getUsers();
        users = users.map(u => {
            if (u.id === id) u.status = "blocked";
            return u;
        });
        localStorage.setItem("users", JSON.stringify(users));
        allUsers = users;
        filteredUsers = [...users];
        render();
    };

    window.unblockUser = function (id) {
        let users = getUsers();
        users = users.map(u => {
            if (u.id === id) u.status = "active";
            return u;
        });
        localStorage.setItem("users", JSON.stringify(users));
        allUsers = users;
        filteredUsers = [...users];
        render();
    };

    render();
});