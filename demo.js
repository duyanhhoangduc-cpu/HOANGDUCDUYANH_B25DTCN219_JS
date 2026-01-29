console.log("Hello  World")
//biến
//từ khóa khai báo + tên biến + (gán giá trị)
var a; // var và let gán lại được giá trị. còn const thì ko
let b;
const c; //bắt buộc phải khởi tạo giá trị ban đầu
//vdu:
var myName = "An"
//var đặt tên biến trùng nhau được (ko báo lỗi và chạy sẽ sai) còn let thì ko (sẽ báo lỗi)
//ưu tiên: chỉ dùng let và const

let str = "" ; ` `;'' //"" chuỗi bình thường
                        //`` chuỗi đặc biệt , nhận cả các dấu , đưa các biến vào chuỗi
                        //vdu: let str=`hello,${myname}`
//3 giá trị đặc biệt
NULL //kiểu dự liệu là number nma đại diện đây ko phải số
        //biến này ko chứa gì cả
Underfined // có chứa nhưng ko xác định được

//input vầ output 
let inputName = prompt("Vui lòng nhập tên của bạn");
//giá trị khi nhập vào luôn là chuỗi (string)
console.log("xin chào", inputname);
console.log("xin chào" + inputname);
console.log(`xin chào ${inputname}`);
//cả 3 đều nối chuỗi

alert(inputname);



