<?php
require '../../php/db_config.php';

$sql = "SELECT nv.*, pb.TENPHONG FROM nhanvien nv, phongban pb WHERE nv.MAPHONGBAN = pb.MAPHONG";
$result = $conn->query($sql);
$nhan_vien = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $nhan_vien[] = $row;
    }
}

$conn->close();

// Chuyển mảng thành JSON và in ra
echo json_encode($nhan_vien);
?>

