<?php
require '../../php/db_config.php';
$sql = "SELECT * FROM lichhop";
$result = $conn->query($sql);
$meeting = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $meeting[] = $row;
    }
}

$conn->close();

echo json_encode($meeting);
?>

