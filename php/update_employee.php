<?php
require '../php/db_config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['employeeId'], $data['name'], $data['dob'], $data['gender'], $data['phone'], $data['dept'], $data['role'], $data['address'], $data['email'])) {
    $employeeId = $data['employeeId'];
    $name = $data['name'];
    $dob = $data['dob'];
    $gender = $data['gender'];
    $phone = $data['phone'];
    $dept = $data['dept'];
    $role = $data['role'];
    $address = $data['address'];
    $email = $data['email'];

    $sql = "UPDATE nhanvien SET HOTEN = ?, NGAYSINH = ?, GIOITINH = ?, SODT = ?, MAPHONGBAN = ?, CHUCVU = ?, DIACHI = ?, EMAIL = ? WHERE MANV = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssss", $name, $dob, $gender, $phone, $dept, $role, $address, $email, $employeeId);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Cập nhật nhân viên thành công";
    } else {
        echo "Không thể cập nhật nhân viên. Vui lòng thử lại sau.";
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Dữ liệu không hợp lệ";
}
?>
