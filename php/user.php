<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $identity = '學生';
            $amount = 'all';
            $sql = "SELECT * FROM `user` WHERE `identity` = '$identity'";
            $result = mysqli_query($con, $sql);
            $data = [];
            while($row = mysqli_fetch_array($result))
            {
                array_push($data,$row);
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        default:
            break;
    }

