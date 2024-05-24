<?php
require '../../php/db_config.php';
$meetingId = $_POST['update-meeting-id'];
$meetingName = $_POST['update-meeting-name'];
$meetingContent = $_POST['update-meeting-content'];
$meetingTime = $_POST['update-meeting-time'];
$meetingAddress = $_POST['update-meeting-address'];

$sql = "UPDATE lichhop SET TENLICHHOP = ?, NOIDUNG = ?, THOIGIAN = ?, PHONGHOP = ? WHERE MALICHHOP = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $meetingName, $meetingContent, $meetingTime, $meetingAddress, $meetingId);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Cập nhật thành công";
    } else {
        echo "Cập nhật không thành công";
    }
    $stmt->close();
    $conn->close();
?>
