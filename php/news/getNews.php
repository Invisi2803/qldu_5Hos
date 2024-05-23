<?php
require '../../php/db_config.php';
$sql = "SELECT * FROM bangtin";
$result = $conn->query($sql);
$news = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
}

$conn->close();

echo json_encode($news);
?>

