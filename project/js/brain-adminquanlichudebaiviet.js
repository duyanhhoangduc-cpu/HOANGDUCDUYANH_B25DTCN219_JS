document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const titleInput = document.querySelector("input[type='text']");
    const categorySelect = document.querySelector("select");
    const contentTextarea = document.querySelector("textarea");
    const statusInputs = document.querySelectorAll("input[name='status']");

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    let editId = localStorage.getItem("editId");

    if (!editId) {
        form.reset();
        statusInputs.forEach(r => r.checked = false);
    }

    
    if (editId) {
        const article = articles.find(a => a.id == editId);

        if (article) {
            titleInput.value = article.title;
            categorySelect.value = article.category;
            contentTextarea.value = article.content;

            statusInputs.forEach(radio => {
                radio.checked = (radio.id === article.status);
            });
        }
    }

    function showError(input, message) {
        let error = input.parentElement.querySelector(".error");

        if (!error) {
            error = document.createElement("span");
            error.className = "error";
            input.parentElement.appendChild(error);
        }

        error.innerText = message;
    }

    function clearError(input) {
        const error = input.parentElement.querySelector(".error");
        if (error) error.innerText = "";
    }

    function showStatusError(message) {
        let container = document.querySelector(".radio-group");
        let error = container.parentElement.querySelector(".error");

        if (!error) {
            error = document.createElement("span");
            error.className = "error";
            container.parentElement.appendChild(error);
        }

        error.innerText = message;
    }

    function clearStatusError() {
        let error = document.querySelector(".radio-group")
            .parentElement.querySelector(".error");
        if (error) error.innerText = "";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const content = contentTextarea.value.trim();
        const status = document.querySelector("input[name='status']:checked")?.id;

        let isValid = true;

        if (!title) {
            showError(titleInput, "Không được để trống tiêu đề");
            isValid = false;
        } else clearError(titleInput);

        if (!category) {
            showError(categorySelect, "Chọn chủ đề");
            isValid = false;
        } else clearError(categorySelect);

        if (!content) {
            showError(contentTextarea, "Nhập nội dung");
            isValid = false;
        } else clearError(contentTextarea);

        if (!status) {
            showStatusError("Chọn trạng thái");
            isValid = false;
        } else clearStatusError();

        if (!isValid) return;

        if (editId) {
            articles = articles.map(a => {
                if (a.id == editId) {
                    return { ...a, title, category, content, status };
                }
                return a;
            });

            localStorage.removeItem("editId");
        } 
        else {
            articles.push({
                id: Date.now(),
                title,
                category,
                content,
                status,
                img: "https://via.placeholder.com/70x45"
            });
        }

        localStorage.setItem("articles", JSON.stringify(articles));

        form.reset();
        statusInputs.forEach(r => r.checked = false);

        window.location.href = "adminthemmoibaiviet2.html";
    });
});