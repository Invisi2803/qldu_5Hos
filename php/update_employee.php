<?php
require '../php/db_config.php';


$employeeId = $_POST['update-employee-id'];
$employeeName = $_POST['update-employee-name'];
$employeeDob = $_POST['update-employee-dob'];
$employeeGender = $_POST['update-employee-gender'];
$employeePhone = $_POST['update-employee-phone'];
$employeeDept = $_POST['update-employee-dept'];
$employeeAddress = $_POST['update-employee-address'];
$employeeRole = $_POST['update-employee-role'];
$employeeEmail = $_POST['update-employee-email'];
if ($employeeDept === "Nhân sự") {$employeeDept = 1;}
else if ($employeeDept === "DL&CNTT") {$employeeDept = 2;}
else if ($employeeDept === "Truyền thông") { $employeeDept = 3;}
    $sql = "UPDATE nhanvien SET HOTEN = ?, NGAYSINH = ?, GIOITINH = ?, SODT = ?, MAPHONGBAN = ?, CHUCVU = ?, DIACHI = ?, EMAIL = ? WHERE MANV = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssss", $employeeName, $employeeDob, $employeeGender, $employeePhone, $employeeDept, $employeeRole, $employeeAddress, $employeeEmail, $employeeId);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Cập nhật nhân viên thành công";
    } else {
        echo "Cập nhật không thành công;
    }
    $stmt->close();
    $conn->close();
?>
