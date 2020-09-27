<?php
    session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $account = $_SESSION['account'];
            $sql = "SELECT * FROM test where account='$account'";
            $result = mysqli_query($con, $sql);
            echo json_encode(mysqli_fetch_array($result), JSON_UNESCAPED_UNICODE);
            break;
        default:
            # code...
            break;
    }
