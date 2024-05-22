<?php

require '../php/db_config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->employeeId)) {
    // Lấy employeeId từ dữ liệu POST
    $employeeId = $data->employeeId;
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

