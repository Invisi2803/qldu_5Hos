<?php
require '../../php/db_config.php';

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


$target_dir = 'D:/uploads/';
$target_file = $target_dir . basename($_FILES["new-employee-photo"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$check = getimagesize($_FILES["new-employee-photo"]["tmp_name"]);
if ($check !== false) {
    $uploadOk = 1;
} else {
    echo "File này không phải hình ảnh.";
    $uploadOk = 0;
}

if (file_exists($target_file)) {
    echo "File đã tồn tại";
    $uploadOk = 0;
}

if ($_FILES["new-employee-photo"]["size"] > 500000) {
    echo "File ảnh quá lớn";
    $uploadOk = 0;
}


if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo "Chỉ file ảnh được chấp nhận";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo "Chưa upload ảnh";
}


$photoPath = basename($_FILES["new-employee-photo"]["name"]);


$sql = "INSERT INTO nhanvien (MANV, HOTEN, NGAYSINH, GIOITINH, SODT, MAPHONGBAN, CHUCVU, DIACHI, EMAIL, MATKHAU, ANH) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssss", $employeeId, $employeeName, $employeeDob, $employeeGender, $employeePhone, $employeeDept, $employeeRole, $employeeAddress, $employeeEmail, $employeePassword, $photoPath);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Thêm nhân viên mới thành công";
} else {
    echo "Mã nhân viên đã tồn tại";
}

$stmt->close();
$conn->close();
?>
