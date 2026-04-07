form.addEventListener("submit", function(e) {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

   
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "" || lastName === "") {
        alert("Họ và tên không được để trống");
        return;
    }

    if (email === "") {
        alert("Email không được để trống");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng");
        return;
    }

    if (password === "") {
        alert("Mật khẩu không được để trống");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu tối thiểu 6 ký tự");
        return;
    }

    if (confirmPassword === "") {
        alert("Vui lòng nhập mật khẩu xác nhận");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không trùng khớp");
        return;
    }

    
    alert("Đăng ký thành công!");

});
