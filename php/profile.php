<?php
session_start();
require 'db_config.php';

$manv = $_SESSION['login_user']; 

$sql = "SELECT nv.*, TENPHONG FROM nhanvien nv, phongban pb WHERE MANV = ? AND nv.MAPHONGBAN = pb.MAPHONG";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $manv);
$stmt->execute();
$result = $stmt->get_result();

header('Content-Type: application/json');
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user); 
} else {
    echo json_encode(array('error' => 'Không tìm thấy thông tin người dùng'));
}

$stmt->close();
$conn->close();
?>
