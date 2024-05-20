<?php
include '../php/db_config.php'; 

// Hàm thêm nhân viên mới
function addEmployee($manv, $matkhau, $hoten, $ngaysinh, $gioitinh, $sdt, $maphongban, $email) {
  global $conn;
  $stmt = $conn->prepare("INSERT INTO nhanvien (MANV, MATKHAU, HOTEN, NGAYSINH, GIOITINH, SODT, MAPHONGBAN, EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssssisis", $manv, $matkhau, $hoten, $ngaysinh, $gioitinh, $sdt, $maphongban, $email);
  $stmt->execute();
  $stmt->close();
}

// Hàm lấy danh sách nhân viên
function getEmployees() {
  global $conn;
  $result = $conn->query("SELECT * FROM nhanvien");
  return $result->fetch_all(MYSQLI_ASSOC);
}

// Hàm cập nhật thông tin nhân viên
function updateEmployee($manv, $matkhau, $hoten, $ngaysinh, $gioitinh, $sdt, $maphongban, $email) {
  global $conn;
  $stmt = $conn->prepare("UPDATE nhanvien SET MATKHAU=?, HOTEN=?, NGAYSINH=?, GIOITINH=?, SODT=?, MAPHONGBAN=?, EMAIL=? WHERE MANV=?");
  $stmt->bind_param("sssisiss", $matkhau, $hoten, $ngaysinh, $gioitinh, $sdt, $maphongban, $email, $manv);
  $stmt->execute();
  $stmt->close();
}

// Hàm xóa nhân viên
function deleteEmployee($manv) {
  global $conn;
  $stmt = $conn->prepare("DELETE FROM nhanvien WHERE MANV=?");
  $stmt->bind_param("s", $manv);
  $stmt->execute();
  $stmt->close();
}

function searchEmployeeByMANV($manv) {
  global $conn;
  $stmt = $conn->prepare("SELECT * FROM nhanvien WHERE MANV = ?");
  $stmt->bind_param("s", $manv);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_assoc(); // Trả về một hàng duy nhất vì MANV là duy nhất
}

$conn->close();
?>
