<?php
require '../../php/db_config.php';
$newsId = $_POST['update-news-id'];
$newsTitle = $_POST['update-news-title'];
$newsType = $_POST['update-news-type'];
$newsContent = $_POST['update-news-content'];
$newsDate = $_POST['update-news-time'];

$sql = "UPDATE bangtin SET TIEUDE = ?, LOAIBANGTIN = ?, NOIDUNG = ?, NGAYDANG = ? WHERE MABANGTIN = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $newsTitle, $newsType, $newsContent, $newsDate, $newsId);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Cập nhật thành công";
    } else {
        echo "Cập nhật không thành công";
    }
    $stmt->close();
    $conn->close();
?>