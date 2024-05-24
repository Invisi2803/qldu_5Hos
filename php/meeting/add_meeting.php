<?php
require '../../php/db_config.php';

try {
    // Lấy dữ liệu từ form
    $meetingId = $_POST['new-meeting-id'];
    $meetingName = $_POST['new-meeting-name'];
    $meeetingContent = $_POST['new-meeting-content'];
    $meetingTime = $_POST['new-meeting-time'];
    $meetingAddress = $_POST['new-meeting-address'];

    // Kiểm tra xem có cuộc họp nào đã được đặt tại cùng địa điểm và ngày hay không
    $checkSql = "SELECT * FROM lichhop WHERE DATE(THOIGIAN) = DATE(?) AND DIADIEM = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("ss", $meetingTime, $meetingAddress);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        echo "Phòng họp đã đặt lịch cho ngày này.";
    } else {
        // Tiếp tục thêm cuộc họp mới
        $sql = "INSERT INTO lichhop (MALICHHOP, TENLICHHOP, NOIDUNG, THOIGIAN, DIADIEM) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $meetingId, $meetingName, $meeetingContent, $meetingTime, $meetingAddress);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Thêm lịch họp mới thành công";
        } else {
            echo "Thêm không thành công";
        }
    }

    // Kiểm tra xem biến $stmt có tồn tại trước khi gọi phương thức close()
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();
} catch (Exception $e) {
    // Xử lý ngoại lệ ở đây
    echo "Có lỗi xảy ra: " . $e->getMessage();
}
?>
