document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".posts-grid");
    const pages = document.querySelector(".pages");

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    if (articles.length === 0) {
        articles = [
            { id: 1, title: "Bài 1", category: "Daily Journal", content: "Nội dung 1", date: "2026-04-07", status: "public" },
            { id: 2, title: "Bài 2", category: "Work & Career", content: "Nội dung 2", date: "2026-04-07", status: "public" },
            { id: 3, title: "Bài 3", category: "Personal Thoughts", content: "Nội dung 3", date: "2026-04-07", status: "public" },
            { id: 4, title: "Bài 4", category: "Daily Journal", content: "Nội dung 4", date: "2026-04-07", status: "public" },
            { id: 5, title: "Bài 5", category: "Daily Journal", content: "Nội dung 5", date: "2026-04-07", status: "public" },
            { id: 6, title: "Bài 6", category: "Daily Journal", content: "Nội dung 6", date: "2026-04-07", status: "public" },
            { id: 7, title: "Bài 7", category: "Daily Journal", content: "Nội dung 7", date: "2026-04-07", status: "public" }
        ];

        localStorage.setItem("articles", JSON.stringify(articles));
    }

    let currentPage = 1;
    const perPage = 6;

    render();

    function render() {
        container.innerHTML = "";

        let start = (currentPage - 1) * perPage;
        let pageData = articles.slice(start, start + perPage);

        pageData.forEach(a => {
            container.innerHTML += `
                <div class="post-card">
                    <div class="img-container">
                        <img src="../image/Image.png">
                    </div>
                    <p class="date">Date: ${a.date}</p>
                    <h3 class="post-title">${a.title}</h3>
                    <p class="desc">${a.content}</p>
                    <div class="post-footer">
                        <span class="tag tag-purple">${a.category}</span>
                    </div>
                </div>
            `;
        });

        
        pages.innerHTML = "";
        let totalPages = Math.ceil(articles.length / perPage);

        for (let i = 1; i <= totalPages; i++) {
            pages.innerHTML += `<a href="#" class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
        }

        document.querySelectorAll(".pages a").forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                currentPage = Number(this.dataset.page);
                render();
            };
        });
    }

});