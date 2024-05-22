<?php
require '../php/db_config.php';
// Lấy dữ liệu từ form
$employeeId = $_POST['new-employee-id'];
$employeeName = $_POST['new-employee-name'];
$employeeDob = $_POST['new-employee-dob'];
$employeeGender = $_POST['new-employee-gender'];
$employeePhone = $_POST['new-employee-phone'];
$employeeDept = $_POST['new-employee-dept'];
$employeeAddress = $_POST['new-employee-address'];
$employeeRole = $_POST['new-employee-role'];
$employeeEmail = $_POST['new-employee-email'];
$employeePassword = password_hash($_POST['new-employee-password'], PASSWORD_DEFAULT); 

$sql = "INSERT INTO nhanvien (MANV, HOTEN, NGAYSINH, GIOITINH, SODT, MAPHONGBAN, CHUCVU, DIACHI, EMAIL, MATKHAU) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Chuẩn bị truy vấn và thực thi
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssss", $employeeId, $employeeName, $employeeDob, $employeeGender, $employeePhone, $employeeDept, $employeeRole, $employeeAddress, $employeeEmail, $employeePassword);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Thêm nhân viên mới thành công";
} else {
    echo "Mã nhân viên đã tồn tại";
}

// Đóng kết nối
$stmt->close();
$conn->close();
?>
