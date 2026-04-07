document.addEventListener("DOMContentLoaded", function () {

    const articleList = document.getElementById("articleList");
    const perPage = 5;
    let currentPage = 1;

    function getArticles() {
        return JSON.parse(localStorage.getItem("articles")) || [];
    }

    function saveArticles(data) {
        localStorage.setItem("articles", JSON.stringify(data));
    }

    function getCategories() {
        return JSON.parse(localStorage.getItem("categories")) || [];
    }

    function syncCategories() {
        let articles = getArticles();
        let categories = getCategories();

        let articleCats = [...new Set(
            articles.map(a => a.category).filter(Boolean)
        )];

        let updated = false;

        articleCats.forEach(name => {
            if (!categories.some(c => c.name === name)) {
                categories.push({
                    id: Date.now() + Math.random(),
                    name
                });
                updated = true;
            }
        });

        if (updated) localStorage.setItem("categories", JSON.stringify(categories));
    }

    function getArticleImg(img) {
        const defaultImg = 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/12/3/1619788/Chuong-Nhuoc-Nam-1A.jpg?w=800&h=420&crop=auto&scale=both';
        return img && img.trim() ? img : defaultImg;
    }

    function renderArticles() {
        const articles = getArticles();

        if (!articleList) return;
        articleList.innerHTML = "";

        const start = (currentPage - 1) * perPage;
        const pageData = articles.slice(start, start + perPage);

        pageData.forEach(article => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${getArticleImg(article.img)}" class="post-img" onerror="this.src='https://media-cdn-v2.laodong.vn/storage/newsportal/2025/12/3/1619788/Chuong-Nhuoc-Nam-1A.jpg?w=800&h=420&crop=auto&scale=both'"></td>
                <td>${article.title}</td>
                <td>${article.category}</td>
                <td>${article.content}</td>
                <td>
                    <span class="status-badge ${article.status}">
                        ${article.status}
                    </span>
                </td>
                <td>
                    <select onchange="changeStatus(${article.id}, this.value, this)">
                        <option value="public" ${article.status === "public" ? "selected" : ""}>public</option>
                        <option value="private" ${article.status === "private" ? "selected" : ""}>private</option>
                    </select>
                </td>
                <td>
                    <a href="#" onclick="editArticle(${article.id})" class="btn-action btn-edit-green">Sửa</a>
                    <a href="#" onclick="deleteArticle(${article.id})" class="btn-action btn-delete-red">Xóa</a>
                </td>
            `;
            articleList.appendChild(row);
        });

        renderPagination(articles.length);
    }

    window.deleteArticle = function (id) {
        if (!confirm("Xóa bài viết?")) return;
        let articles = getArticles().filter(a => a.id !== id);
        saveArticles(articles);
        syncCategories();
        renderArticles();
    };

    window.editArticle = function (id) {
        localStorage.setItem("editId", id);
        window.location.href = "formarticle.html";
    };

    window.changeStatus = function (id, status, el) {
        let articles = getArticles().map(a => {
            if (a.id === id) a.status = status;
            return a;
        });
        saveArticles(articles);

        const badge = el.closest("tr").querySelector(".status-badge");
        badge.className = "status-badge " + status;
        badge.innerText = status;
    };

    function renderPagination(total) {
        const totalPages = Math.ceil(total / perPage);
        const container = document.querySelector(".page-numbers-group");
        if (!container) return;

        container.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const page = document.createElement("span");
            page.className = "page-num" + (i === currentPage ? " active" : "");
            page.innerText = i;

            page.onclick = () => {
                currentPage = i;
                renderArticles();
            };

            container.appendChild(page);
        }
    }

    document.querySelector(".page-num1")?.addEventListener("click", e => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderArticles();
        }
    });

    document.querySelector(".page-num2")?.addEventListener("click", e => {
        e.preventDefault();
        const totalPages = Math.ceil(getArticles().length / perPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderArticles();
        }
    });

    window.addEventListener("focus", () => {
        syncCategories();
        renderArticles();
    });

    syncCategories();
    renderArticles();

});