<?php
session_start();
require '../../php/db_config.php';

$requestId = $_POST['new-request-id'];
$requestType = $_POST['new-request-type'];
$requestContent = $_POST['new-request-content'];
$requestDate = date('Y-m-d');
$manv = $_SESSION['login_user'];
$trangthai = "Chờ duyệt";

$sql = "INSERT INTO yeucau (MAYEUCAU, LOAIYEUCAU, NOIDUNG, NGAYGUI, TRANGTHAI, MANV) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $requestId, $requestType, $requestContent, $requestDate, $trangthai, $manv);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Gửi yêu cầu thành công";
} else {
    echo "Gửi yêu cầu không thành công";
}

$stmt->close();
$conn->close();
?>
