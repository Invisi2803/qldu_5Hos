document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

window.onload = function() {
    fetch('../php/profile.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(user => {
            if (user.error) {
                console.error('Error:', user.error);
            } else {
                document.getElementById('ma-nv').textContent = user.MANV;
                document.getElementById('ho-ten').textContent = user.HOTEN;
                document.getElementById('ngay-sinh').textContent = user.NGAYSINH;
                document.getElementById('gioi-tinh').textContent = user.GIOITINH;
                document.getElementById('so-dt').textContent = user.SODT;
                document.getElementById('ma-phong-ban').textContent = user.TENPHONG;
                document.getElementById('chuc-vu').textContent = user.CHUCVU;
                document.getElementById('dia-chi').textContent = user.DIACHI;
                document.getElementById('email').textContent = user.EMAIL;
            }
        })
        .catch(error => console.error('Error:', error));
};

