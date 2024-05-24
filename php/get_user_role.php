<?php
session_start();
if (isset($_SESSION['user_role'])) {
    echo $_SESSION['user_role'];
} else {
    echo 'error';
}
?>
