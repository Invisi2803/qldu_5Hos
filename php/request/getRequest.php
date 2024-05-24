<?php
require '../../php/db_config.php';
$sql = "SELECT * FROM yeucau WHERE TRANGTHAI = 'Chờ duyệt'";
$result = $conn->query($sql);
$requests = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
}

$conn->close();

echo json_encode($requests);
?>



