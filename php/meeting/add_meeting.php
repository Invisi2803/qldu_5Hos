<?php
require '../../php/db_config.php';
// Lấy dữ liệu từ form
$meetingId = $_POST['new-meeting-id'];
$meetingName = $_POST['new-meeting-name'];
$meeetingContent = $_POST['new-meeting-content'];
$meetingTime = $_POST['new-meeting-time'];
$meetingAddress = $_POST['new-meeting-address'];


$sql = "INSERT INTO lichhop (MALICHHOP, TENLICHHOP, NOIDUNG, THOIGIAN, DIADIEM) VALUES (?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $meetingId, $meetingName, $meeetingContent, $meetingTime, $meetingAddress);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Thêm lịch họp mới thành công";
} else {
    echo "Thêm không thành công";
}


$stmt->close();
$conn->close();
?>

