<?php
require '../../php/db_config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->meetingId)) {
    $meetingId = $data->meetingId;
}

$sql = "DELETE FROM lichhop WHERE MALICHHOP = ?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $meetingId);


$stmt->execute();


if ($stmt->affected_rows > 0) {
    echo "Xóa thành công";
} else {
    echo "Không thể xóa. Vui lòng thử lại sau.";
}


$stmt->close();
$conn->close();
?>



