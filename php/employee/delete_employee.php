<?php

require '../../php/db_config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->employeeId)) {
    $employeeId = $data->employeeId;
} else {
    echo "Thiếu thông tin mã nhân viên.";
    exit;
}

$sql = "SELECT CHUCVU FROM nhanvien WHERE MANV = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $employeeId);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($chucvu);
$stmt->fetch();

if ($stmt->num_rows == 0) {
    echo "Nhân viên không tồn tại.";
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();

if ($chucvu === "Quản lý") {
    echo "Không thể xóa nhân viên này";
    $conn->close();
    exit;
}

$sql = "DELETE FROM nhanvien WHERE MANV = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $employeeId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Xóa nhân viên thành công";
} else {
    echo "Không thể xóa nhân viên. Vui lòng thử lại sau.";
}

$stmt->close();
$conn->close();
?>
