<?php
session_start();
ob_start();
require 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $conn->prepare("SELECT * FROM nhanvien WHERE MANV = ? AND MATKHAU = ?");
    $stmt->bind_param("ss", $_POST['username'], $_POST['password']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $_SESSION['login_user'] = $user['MANV'];
            $_SESSION['user_role'] = $user['CHUCVU'];
            $_SESSION['date_birth'] = $user['NGAYSINH'];
            echo 'success';
        } else {
            echo 'Tên đăng nhập hoặc mật khẩu không đúng.';
        }
    } else {
        echo 'Lỗi truy vấn cơ sở dữ liệu.';
    }
    $stmt->close();
    $conn->close();
}
?>
