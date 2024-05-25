<?php
session_start();
require '../../php/db_config.php';

if (!isset($_SESSION['login_user'])) {
    header('Location: ../php/login.php');
    exit;
}

$soDT = $_POST['so-dt'];
$diaChi = $_POST['dia-chi'];
$email = $_POST['email'];
$maNV = $_SESSION['login_user'];


$sql = "UPDATE nhanvien SET SODT=?, DIACHI=?, EMAIL=? WHERE MANV=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $soDT, $diaChi, $email, $maNV);
$result = $stmt->execute();

if ($result) {
    echo "Cập nhật thông tin thành công!";
} else {
    echo "Cập nhật không thành công";
}

$stmt->close();
$conn->close();
?>


