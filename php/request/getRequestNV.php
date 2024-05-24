<?php
session_start();

require '../../php/db_config.php';

$manv = $_SESSION['login_user'];

$sql = "SELECT * FROM yeucau WHERE MANV = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $manv);
$stmt->execute();
$result = $stmt->get_result();

$requests = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
}

$conn->close();

echo json_encode($requests);
?>
