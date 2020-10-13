<?php
 session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $data = [];
            $account = $_SESSION['account'];
            $sql = "SELECT * FROM game where account='$account'";
            $result = mysqli_query($con, $sql);
            if(mysqli_num_rows($result)<1) insertEmptyTable($con);
            $sql = "SELECT * FROM game where account='$account'";
            $result = mysqli_query($con, $sql);
            echo json_encode(mysqli_fetch_array($result), JSON_UNESCAPED_UNICODE);
            break;
        case 'update':


            break;
        default:
            # code...
            break;
    }

function insertEmptyTable($con)
{
    $account = $_SESSION['account'];
    $sql = "INSERT INTO `game` (`account`) VALUES ('$account')";
    $result = mysqli_query($con, $sql);
}