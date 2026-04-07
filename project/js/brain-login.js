document.getElementById("loginBtn").onclick = function () {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    error.innerText = "";

    if (email === "") {
        error.innerText = "Email không được để trống";
        return;
    }

    if (password === "") {
        error.innerText = "Mật khẩu không được để trống";
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm người dùng có email khớp
    let user = users.find(u => u.email === email);

    if (!user) {
        error.innerText = "Email chưa được đăng ký";
        return;
    }

    if (user.password !== password) {
        error.innerText = "Mật khẩu không đúng";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "home.html";
};