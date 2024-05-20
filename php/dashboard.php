<?php
session_start();

if (!isset($_SESSION['login_user'])) {
    header("location: ./login.php");
    exit;
}

// Đây là nơi bạn có thể truy vấn cơ sở dữ liệu để lấy thông tin cần thiết cho dashboard
// ...

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <!-- Liên kết tới các file CSS và JavaScript cần thiết -->
</head>
<body>
    <div id="dashboard">
        <h1>Xin chào, <?php echo $_SESSION['login_user']; ?>!</h1>
        <p>Đây là nội dung của dashboard.</p>
        <!-- Thêm nội dung, liên kết, và thông tin khác mà bạn muốn hiển thị trên dashboard -->
    </div>
    <a href="./logout.php">Đăng xuất</a>
</body>
</html>