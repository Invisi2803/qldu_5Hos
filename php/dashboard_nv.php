<?php
session_start();
if (!isset($_SESSION['login_user']) || $_SESSION['user_role'] !== 'Nhân viên') {
    header("location: ./login.php");
    exit;
}
?>

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

</head>
<body>
    <div id="dashboard">
        
    </div>
    <a href="./logout.php">Đăng xuất</a>
</body>
</html>
