document.addEventListener("DOMContentLoaded", function () {

    const input = document.querySelector(".o-nhap-lieu");
    const btnAdd = document.querySelector(".nut-them");
    const tableBody = document.querySelector("tbody");

    let editId = null;

    function getCategories() {
        return JSON.parse(localStorage.getItem("categories")) || [];
    }

    function saveCategories(data) {
        localStorage.setItem("categories", JSON.stringify(data));
    }

    function syncFromArticles() {
        let categories = getCategories();
        let articles = JSON.parse(localStorage.getItem("articles")) || [];

        let updated = false;

        articles.forEach(a => {
            if (
                a.category &&
                !categories.some(c => c.name === a.category)
            ) {
                categories.push({
                    id: Date.now() + Math.random(),
                    name: a.category
                });
                updated = true;
            }
        });

        if (updated) {
            saveCategories(categories);
        }
    }

    function renderCategories() {
        const categories = getCategories();
        tableBody.innerHTML = "";

        categories.forEach((cat, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${cat.name}</td>
                <td>
                    <a href="#" onclick="editCategory(${cat.id})" class="nut-hanh-dong">Sửa</a>
                    <a href="#" onclick="deleteCategory(${cat.id})" class="nut-hanh-dong">Xóa</a>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    btnAdd.onclick = function () {
        const name = input.value.trim();

        if (!name) {
            alert("Không được để trống!");
            return;
        }

        let categories = getCategories();

        const isExist = categories.some(c => c.name.toLowerCase() === name.toLowerCase());

        if (!editId && isExist) {
            alert("Danh mục đã tồn tại!");
            return;
        }

        let oldName = null;

        if (editId) {
            categories = categories.map(c => {
                if (c.id === editId) {
                    oldName = c.name;
                    c.name = name;
                }
                return c;
            });

            if (oldName) {
                let articles = JSON.parse(localStorage.getItem("articles")) || [];
                articles = articles.map(a => {
                    if (a.category === oldName) a.category = name;
                    return a;
                });
                localStorage.setItem("articles", JSON.stringify(articles));
            }

            editId = null;
        } else {
            categories.push({
                id: Date.now(),
                name
            });
        }

        saveCategories(categories);
        input.value = "";
        renderCategories();
    };

    window.deleteCategory = function (id) {
        if (!confirm("Xóa danh mục?")) return;

        let categories = getCategories();
        const catToDelete = categories.find(c => c.id === id);

        categories = categories.filter(c => c.id !== id);

        if (catToDelete) {
            let articles = JSON.parse(localStorage.getItem("articles")) || [];
            articles = articles.map(a => {
                if (a.category === catToDelete.name) a.category = "";
                return a;
            });
            localStorage.setItem("articles", JSON.stringify(articles));
        }

        saveCategories(categories);
        renderCategories();
    };

    window.editCategory = function (id) {
        const categories = getCategories();
        const cat = categories.find(c => c.id === id);

        if (cat) {
            input.value = cat.name;
            editId = id;
        }
    };
    syncFromArticles(); 
    renderCategories();
});