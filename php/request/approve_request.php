<?php
require '../../php/db_config.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->requestId)) {
    $requestId = $data->requestId;
}

$sql = "UPDATE yeucau SET TRANGTHAI = 'Đã phê duyệt' WHERE MAYEUCAU = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $requestId);

$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Phê duyệt thành công";
} else {
    echo "Không thể phê duyệt. Vui lòng thử lại sau.";
}

$stmt->close();
$conn->close();
?>
