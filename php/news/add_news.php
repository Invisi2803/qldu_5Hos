<?php
require '../../php/db_config.php';
// Lấy dữ liệu từ form
$newsId = $_POST['new-news-id'];
$newsTitle = $_POST['new-news-title'];
$newsType = $_POST['new-news-type'];
$newsContent = $_POST['new-news-content'];
$newsDate = $_POST['new-news-time'];



$sql = "INSERT INTO bangtin (MABANGTIN, TIEUDE, LOAIBANGTIN, NOIDUNG, NGAYDANG) VALUES (?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $newsId, $newsTitle, $newsType, $newsContent, $newsDate);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Thêm bảng tin mới thành công";
} else {
    echo "Thêm không thành công";
}


$stmt->close();
$conn->close();
?>

